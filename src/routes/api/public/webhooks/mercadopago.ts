import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Webhook oficial do Mercado Pago.
 * A liberação de acesso acontece SOMENTE aqui, e somente após consultar
 * o status real do pagamento na API do Mercado Pago.
 */
export const Route = createFileRoute("/api/public/webhooks/mercadopago")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { getWebhookSecret, fetchPayment, mapPaymentStatus } = await import(
          "@/lib/mercadopago.server"
        );

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
        const secret = getWebhookSecret();
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
        if (topic && !topic.includes("payment")) {
          return new Response("ok", { status: 200 });
        }

        const payment = await fetchPayment(dataId);
        if (!payment) return new Response("Payment not found", { status: 404 });

        const internalStatus = mapPaymentStatus(payment.status);
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const purchaseId = payment.externalReference;
        if (!purchaseId) {
          console.error("[MercadoPago] pagamento sem external_reference", payment.id);
          return new Response("ok", { status: 200 });
        }

        const { data: purchase } = await supabaseAdmin
          .from("purchases")
          .select("id, buyer_id, product_id, amount")
          .eq("id", purchaseId)
          .maybeSingle();

        if (!purchase) {
          console.error("[MercadoPago] compra não encontrada", purchaseId);
          return new Response("ok", { status: 200 });
        }

        await supabaseAdmin
          .from("purchases")
          .update({ payment_id: payment.id, payment_status: internalStatus })
          .eq("id", purchase.id);

        // REGRA: acesso somente com pagamento aprovado.
        const amountOk =
          payment.amount == null || payment.amount >= Number(purchase.amount) - 0.01;

        if (internalStatus === "approved" && !amountOk) {
          console.error(
            "[MercadoPago] valor pago menor que o esperado — acesso não liberado",
            payment.id,
          );
          return new Response("ok", { status: 200 });
        }

        if (internalStatus === "approved") {
          const grantedAt = new Date().toISOString();
          const { error } = await supabaseAdmin.from("product_access").upsert(
            {
              buyer_id: purchase.buyer_id,
              product_id: purchase.product_id,
              access_status: "active",
              granted_at: grantedAt,
            },
            { onConflict: "buyer_id,product_id" },
          );
          if (error) {
            console.error("[MercadoPago] falha ao liberar acesso", error);
            return new Response("Failed to grant access", { status: 500 });
          }
        } else if (internalStatus === "cancelled") {
          // Estorno/cancelamento/chargeback: acesso é retirado.
          await supabaseAdmin
            .from("product_access")
            .update({ access_status: "inactive" })
            .eq("buyer_id", purchase.buyer_id)
            .eq("product_id", purchase.product_id);
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});