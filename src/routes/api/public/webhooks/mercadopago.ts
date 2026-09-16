import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type AdminClient = SupabaseClient<Database>;

/**
 * Webhook oficial do Mercado Pago para a assinatura recorrente (Preapproval).
 * A liberação de acesso acontece SOMENTE aqui, e somente após consultar o status real
 * junto à API do Mercado Pago. Ver DOC_PRODUTO_VOZ_PROTETORA_V1.md §13.
 *
 * Tópicos tratados:
 * - `subscription_preapproval`: mudança de status da assinatura (pending → authorized,
 *   cancelled, etc.).
 * - `subscription_authorized_payment`: cada cobrança dentro da assinatura (autorização
 *   inicial e cada renovação anual).
 */
export const Route = createFileRoute("/api/public/webhooks/mercadopago")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const mp = await import("@/lib/mercadopago.server");
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const rawBody = await request.text();

        let payload: { type?: string; action?: string; data?: { id?: string | number } };
        try {
          payload = JSON.parse(rawBody || "{}");
        } catch {
          return new Response("Invalid body", { status: 400 });
        }

        const dataId = payload.data?.id != null ? String(payload.data.id) : null;
        if (!dataId) return new Response("ok", { status: 200 });

        // Validação de assinatura (x-signature: ts=...,v1=...)
        const secret = mp.getWebhookSecret();
        if (secret) {
          const signatureHeader = request.headers.get("x-signature") ?? "";
          const requestId = request.headers.get("x-request-id") ?? "";
          const parts = Object.fromEntries(
            signatureHeader.split(",").map((chunk) => {
              const [key, ...rest] = chunk.trim().split("=");
              return [key ?? "", rest.join("=")];
            }),
          ) as Record<string, string>;

          const ts = parts["ts"];
          const v1 = parts["v1"];
          if (!ts || !v1) return new Response("Invalid signature", { status: 401 });

          const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
          const expected = createHmac("sha256", secret).update(manifest).digest("hex");
          const received = Buffer.from(v1);
          const computed = Buffer.from(expected);
          if (received.length !== computed.length || !timingSafeEqual(received, computed)) {
            console.error("[MercadoPago] assinatura inválida no webhook");
            return new Response("Invalid signature", { status: 401 });
          }
        } else {
          console.warn("[MercadoPago] MERCADOPAGO_WEBHOOK_SECRET ausente — webhook não validado");
        }

        const topic = payload.type ?? payload.action ?? "";

        if (topic.includes("subscription_authorized_payment")) {
          return handleAuthorizedPayment(dataId, mp, supabaseAdmin);
        }

        if (topic.includes("subscription_preapproval")) {
          return handlePreapproval(dataId, mp, supabaseAdmin);
        }

        // Outros tópicos (ex.: "payment" solto) não se aplicam à assinatura recorrente.
        return new Response("ok", { status: 200 });
      },
    },
  },
});

async function handlePreapproval(
  preapprovalId: string,
  mp: typeof import("@/lib/mercadopago.server"),
  supabaseAdmin: AdminClient,
) {
  const preapproval = await mp.fetchPreapproval(preapprovalId);
  if (!preapproval) return new Response("Preapproval not found", { status: 404 });

  const subscriptionId = preapproval.externalReference;
  if (!subscriptionId) {
    console.error("[MercadoPago] preapproval sem external_reference", preapproval.id);
    return new Response("ok", { status: 200 });
  }

  const { data: subscription } = await supabaseAdmin
    .from("subscriptions")
    .select("id, status, current_period_start")
    .eq("id", subscriptionId)
    .maybeSingle();

  if (!subscription) {
    console.error("[MercadoPago] assinatura não encontrada", subscriptionId);
    return new Response("ok", { status: 200 });
  }

  const newStatus = mp.mapSubscriptionStatus(preapproval.status);
  const update: Database["public"]["Tables"]["subscriptions"]["Update"] = {
    mp_preapproval_id: preapproval.id,
    status: newStatus,
  };

  // Primeira autorização: abre o ciclo pago de 1 ano.
  if (newStatus === "authorized" && !subscription.current_period_start) {
    const start = new Date();
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + 1);
    update["current_period_start"] = start.toISOString();
    update["current_period_end"] = end.toISOString();
    update["payment_retry_until"] = null;
  }

  if (newStatus === "cancelled") {
    update["cancelled_at"] = new Date().toISOString();
  }

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update(update)
    .eq("id", subscription.id);

  if (error) {
    console.error("[MercadoPago] falha ao atualizar assinatura", error);
    return new Response("Failed to update subscription", { status: 500 });
  }

  return new Response("ok", { status: 200 });
}

async function handleAuthorizedPayment(
  authorizedPaymentId: string,
  mp: typeof import("@/lib/mercadopago.server"),
  supabaseAdmin: AdminClient,
) {
  const charge = await mp.fetchAuthorizedPayment(authorizedPaymentId);
  if (!charge) return new Response("Authorized payment not found", { status: 404 });

  if (!charge.preapprovalId) {
    console.error("[MercadoPago] cobrança sem preapproval_id", charge.id);
    return new Response("ok", { status: 200 });
  }

  const { data: subscription } = await supabaseAdmin
    .from("subscriptions")
    .select("id, buyer_id, product_id, current_period_end")
    .eq("mp_preapproval_id", charge.preapprovalId)
    .maybeSingle();

  if (!subscription) {
    console.error("[MercadoPago] assinatura não encontrada para preapproval", charge.preapprovalId);
    return new Response("ok", { status: 200 });
  }

  // Histórico de cobranças — reaproveita `purchases` (uma linha por cobrança).
  await supabaseAdmin.from("purchases").upsert(
    {
      buyer_id: subscription.buyer_id,
      product_id: subscription.product_id,
      amount: charge.amount ?? 0,
      payment_provider: "mercadopago",
      payment_id: charge.id,
      payment_status: charge.status === "approved" ? "approved" : "rejected",
    },
    { onConflict: "payment_provider,payment_id" },
  );

  if (charge.status !== "approved") {
    // Renovação falhou: abre a janela de tolerância de 5 dias (DOC_PRODUTO §13.4, item 4).
    // NOTA: não há job agendado para, ao final da janela, suspender automaticamente quem
    // não regularizar — isso ainda precisa ser implementado (cron/Edge Function agendada)
    // antes de ir para produção.
    const retryUntil = new Date();
    retryUntil.setDate(retryUntil.getDate() + 5);
    await supabaseAdmin
      .from("subscriptions")
      .update({ status: "payment_failed", payment_retry_until: retryUntil.toISOString() })
      .eq("id", subscription.id);
    return new Response("ok", { status: 200 });
  }

  // Cobrança aprovada: estende o ciclo pago por mais 1 ano a partir do fim do ciclo atual
  // (ou de hoje, se por algum motivo ainda não havia ciclo aberto).
  const base = subscription.current_period_end
    ? new Date(subscription.current_period_end)
    : new Date();
  const newEnd = new Date(base);
  newEnd.setFullYear(newEnd.getFullYear() + 1);

  await supabaseAdmin
    .from("subscriptions")
    .update({
      status: "authorized",
      current_period_start: base.toISOString(),
      current_period_end: newEnd.toISOString(),
      payment_retry_until: null,
    })
    .eq("id", subscription.id);

  return new Response("ok", { status: 200 });
}
