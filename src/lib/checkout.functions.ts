import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { VOZ_PROTETORA } from "./product";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(120),
  email: z.string().trim().toLowerCase().email("Informe um e-mail válido."),
});

/**
 * Inicia uma assinatura real: registra comprador + assinatura (status "pending")
 * e cria o Preapproval no Mercado Pago (DOC_PRODUTO_VOZ_PROTETORA_V1.md §13).
 * NENHUM acesso é liberado aqui — só quando o Mercado Pago confirmar "authorized"
 * (webhook `subscription_preapproval`).
 */
export const startCheckout = createServerFn({ method: "POST" })
  .inputValidator(checkoutSchema)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { createPreapproval, resolvePublicBaseUrl } = await import("./mercadopago.server");
    const { getRequest } = await import("@tanstack/react-start/server");

    const { data: buyer, error: buyerError } = await supabaseAdmin
      .from("buyers")
      .upsert({ name: data.name, email: data.email }, { onConflict: "email" })
      .select("id, email")
      .single();

    if (buyerError || !buyer) {
      console.error("[checkout] falha ao registrar comprador", buyerError);
      throw new Error("Não foi possível iniciar sua assinatura agora. Tente novamente.");
    }

    const { data: subscription, error: subscriptionError } = await supabaseAdmin
      .from("subscriptions")
      .upsert(
        {
          buyer_id: buyer.id,
          product_id: VOZ_PROTETORA.id,
          amount: VOZ_PROTETORA.amount,
          currency: VOZ_PROTETORA.currency,
          status: "pending",
        },
        { onConflict: "buyer_id,product_id" },
      )
      .select("id")
      .single();

    if (subscriptionError || !subscription) {
      console.error("[checkout] falha ao registrar assinatura", subscriptionError);
      throw new Error("Não foi possível iniciar sua assinatura agora. Tente novamente.");
    }

    const baseUrl = resolvePublicBaseUrl(getRequest()?.url);

    const preapproval = await createPreapproval({
      subscriptionId: subscription.id,
      reason: VOZ_PROTETORA.name,
      amount: VOZ_PROTETORA.amount,
      frequency: VOZ_PROTETORA.recurrence.frequency,
      frequencyType: VOZ_PROTETORA.recurrence.frequencyType,
      payerEmail: data.email,
      backUrl: `${baseUrl}/pagamento/processando?compra=${subscription.id}`,
    });

    await supabaseAdmin
      .from("subscriptions")
      .update({ mp_preapproval_id: preapproval.id })
      .eq("id", subscription.id);

    return { subscriptionId: subscription.id, checkoutUrl: preapproval.checkoutUrl };
  });

/**
 * Consulta somente o status conhecido pelo sistema para uma assinatura.
 * Não altera nada e não libera acesso.
 */
export const getPurchaseStatus = createServerFn({ method: "POST" })
  .inputValidator(z.object({ purchaseId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: subscription } = await supabaseAdmin
      .from("subscriptions")
      .select("id, status")
      .eq("id", data.purchaseId)
      .maybeSingle();

    if (!subscription) return { found: false as const };

    // Mantido como "paymentStatus" para compatibilidade com pagamento.processando.tsx:
    // "authorized" é tratado como aprovado (ver statusLabel/redirect nessa página).
    const paymentStatus = subscription.status === "authorized" ? "approved" : subscription.status;

    return {
      found: true as const,
      paymentStatus,
      accessStatus: subscription.status === "authorized" ? "active" : "inactive",
    };
  });

/** Status detalhado da assinatura do usuário logado, para a área de conta. */
export const getMySubscriptionStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String(context.claims["email"] ?? "").toLowerCase();
    if (!email) return { found: false as const };

    const { data: buyer } = await context.supabase
      .from("buyers")
      .select("id")
      .ilike("email", email)
      .maybeSingle();
    if (!buyer) return { found: false as const };

    const { data: subscription } = await context.supabase
      .from("subscriptions")
      .select(
        "status, amount, currency, current_period_end, payment_retry_until, cancelled_at",
      )
      .eq("buyer_id", buyer.id)
      .eq("product_id", VOZ_PROTETORA.id)
      .maybeSingle();

    if (!subscription) return { found: false as const };

    const now = new Date();
    const periodEnd = subscription.current_period_end
      ? new Date(subscription.current_period_end)
      : null;
    const retryUntil = subscription.payment_retry_until
      ? new Date(subscription.payment_retry_until)
      : null;

    const hasAccess =
      subscription.status === "authorized" ||
      (subscription.status === "cancelled" && periodEnd !== null && now < periodEnd) ||
      (subscription.status === "payment_failed" && retryUntil !== null && now < retryUntil);

    return {
      found: true as const,
      status: subscription.status,
      amount: subscription.amount,
      currency: subscription.currency,
      currentPeriodEnd: subscription.current_period_end,
      cancelledAt: subscription.cancelled_at,
      hasAccess,
    };
  });

/**
 * Cancela a assinatura do usuário logado. O acesso continua até o fim do ciclo já pago
 * (DOC_PRODUTO_VOZ_PROTETORA_V1.md §13.4, item 2) — não é revogado aqui.
 */
export const cancelMySubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String(context.claims["email"] ?? "").toLowerCase();
    if (!email) throw new Error("Sessão inválida.");

    const { data: buyer } = await context.supabase
      .from("buyers")
      .select("id")
      .ilike("email", email)
      .maybeSingle();
    if (!buyer) throw new Error("Assinatura não encontrada.");

    const { data: subscription } = await context.supabase
      .from("subscriptions")
      .select("id, mp_preapproval_id, status")
      .eq("buyer_id", buyer.id)
      .eq("product_id", VOZ_PROTETORA.id)
      .maybeSingle();

    if (!subscription) throw new Error("Assinatura não encontrada.");
    if (subscription.status === "cancelled") return { cancelled: true as const };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { cancelPreapproval } = await import("./mercadopago.server");

    if (subscription.mp_preapproval_id) {
      const ok = await cancelPreapproval(subscription.mp_preapproval_id);
      if (!ok) throw new Error("Não foi possível cancelar no Mercado Pago. Tente novamente.");
    }

    await supabaseAdmin
      .from("subscriptions")
      .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
      .eq("id", subscription.id);

    return { cancelled: true as const };
  });
