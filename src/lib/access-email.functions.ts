import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Envia o e-mail de acesso (link por e-mail) para o assinante de uma assinatura já
 * autorizada. Nenhum acesso é liberado aqui — o acesso continua sendo liberado
 * exclusivamente pelo webhook do Mercado Pago (`subscription_preapproval` → authorized).
 */
export const sendAccessEmail = createServerFn({ method: "POST" })
  .inputValidator(z.object({ purchaseId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { resolvePublicBaseUrl } = await import("./mercadopago.server");
    const { getRequest } = await import("@tanstack/react-start/server");

    const { data: subscription } = await supabaseAdmin
      .from("subscriptions")
      .select("id, buyer_id, status")
      .eq("id", data.purchaseId)
      .maybeSingle();

    if (!subscription || subscription.status !== "authorized") {
      return { sent: false as const, reason: "not-approved" };
    }

    const { data: buyer } = await supabaseAdmin
      .from("buyers")
      .select("email")
      .eq("id", subscription.buyer_id)
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
