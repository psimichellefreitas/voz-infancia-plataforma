import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Envia o e-mail de acesso (link por e-mail) para o comprador de uma compra
 * já aprovada. Nenhum acesso é liberado aqui — o acesso continua sendo
 * liberado exclusivamente pelo webhook do Mercado Pago.
 */
export const sendAccessEmail = createServerFn({ method: "POST" })
  .inputValidator(z.object({ purchaseId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { resolvePublicBaseUrl } = await import("./mercadopago.server");
    const { getRequest } = await import("@tanstack/react-start/server");

    const { data: purchase } = await supabaseAdmin
      .from("purchases")
      .select("id, buyer_id, product_id, payment_status")
      .eq("id", data.purchaseId)
      .maybeSingle();

    if (!purchase || purchase.payment_status !== "approved") {
      return { sent: false as const, reason: "not-approved" };
    }

    const { data: access } = await supabaseAdmin
      .from("product_access")
      .select("access_status")
      .eq("buyer_id", purchase.buyer_id)
      .eq("product_id", purchase.product_id)
      .maybeSingle();

    if (access?.access_status !== "active") {
      return { sent: false as const, reason: "no-access" };
    }

    const { data: buyer } = await supabaseAdmin
      .from("buyers")
      .select("email")
      .eq("id", purchase.buyer_id)
      .maybeSingle();

    if (!buyer?.email) return { sent: false as const, reason: "no-buyer" };

    const baseUrl = resolvePublicBaseUrl(getRequest()?.url);
    const supabasePublic = createClient(
      process.env["SUPABASE_URL"]!,
      process.env["SUPABASE_PUBLISHABLE_KEY"]!,
      { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
    );

    const { error } = await supabasePublic.auth.signInWithOtp({
      email: buyer.email,
      options: { emailRedirectTo: `${baseUrl}/acesso` },
    });

    if (error) {
      console.error("[acesso] falha ao enviar e-mail de acesso", error.message);
      return { sent: false as const, reason: "send-failed" };
    }

    return { sent: true as const, email: buyer.email };
  });