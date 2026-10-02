import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

import { VOZ_PROTETORA } from "./product";

/**
 * Autorização validada no backend, a partir do e-mail autenticado.
 *
 * V1 é compra única (PRD_VOZ_PROTETORA_V1.md §10-ter): acesso é uma flag simples em
 * `product_access`, sem ciclo nem expiração: liberado pelo webhook do Mercado Pago quando o
 * pagamento é aprovado.
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

    const { data: access } = await context.supabase
      .from("product_access")
      .select("access_status, granted_at")
      .eq("buyer_id", buyer.id)
      .eq("product_id", VOZ_PROTETORA.id)
      .maybeSingle();

    const hasAccess = access?.access_status === "active";

    return {
      hasAccess,
      email,
      name: buyer.name,
      grantedAt: access?.granted_at ?? null,
    };
  });
