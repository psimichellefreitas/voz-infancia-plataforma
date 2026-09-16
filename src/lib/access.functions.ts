import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

import { VOZ_PROTETORA } from "./product";

/**
 * Autorização validada no backend, a partir do e-mail autenticado.
 *
 * Acesso é calculado ao vivo a partir de `subscriptions` (não de uma flag estática em
 * `product_access`), para respeitar DOC_PRODUTO_VOZ_PROTETORA_V1.md §13.4: o acesso continua
 * válido até o fim do ciclo pago mesmo depois de cancelada, e durante a janela de tolerância de
 * pagamento — sem precisar de um job agendado para "virar a chave" no momento exato.
 */
export const getMyProductAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String(context.claims["email"] ?? "").toLowerCase();
    if (!email) return { hasAccess: false as const, email: null };

    const { data: buyer } = await context.supabase
      .from("buyers")
      .select("id, name, email")
      .ilike("email", email)
      .maybeSingle();

    if (!buyer) return { hasAccess: false as const, email };

    const { data: subscription } = await context.supabase
      .from("subscriptions")
      .select("status, current_period_end, payment_retry_until")
      .eq("buyer_id", buyer.id)
      .eq("product_id", VOZ_PROTETORA.id)
      .maybeSingle();

    const now = new Date();
    const periodEnd = subscription?.current_period_end
      ? new Date(subscription.current_period_end)
      : null;
    const retryUntil = subscription?.payment_retry_until
      ? new Date(subscription.payment_retry_until)
      : null;

    const hasAccess = Boolean(
      subscription &&
        (subscription.status === "authorized" ||
          (subscription.status === "cancelled" && periodEnd !== null && now < periodEnd) ||
          (subscription.status === "payment_failed" && retryUntil !== null && now < retryUntil)),
    );

    return {
      hasAccess,
      email,
      name: buyer.name,
      grantedAt: subscription ? periodEnd?.toISOString() ?? null : null,
    };
  });
