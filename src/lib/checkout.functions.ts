import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { VOZ_PROTETORA } from "./product";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(120),
  email: z.string().trim().toLowerCase().email("Informe um e-mail válido."),
});

/**
 * Inicia uma compra real: registra comprador + compra (status "initiated")
 * e cria a preferência de pagamento no Mercado Pago.
 * NENHUM acesso é liberado aqui.
 */
export const startCheckout = createServerFn({ method: "POST" })
  .inputValidator(checkoutSchema)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { createPreference, resolvePublicBaseUrl } = await import("./mercadopago.server");
    const { getRequest } = await import("@tanstack/react-start/server");

    const { data: buyer, error: buyerError } = await supabaseAdmin
      .from("buyers")
      .upsert({ name: data.name, email: data.email }, { onConflict: "email" })
      .select("id, email")
      .single();

    if (buyerError || !buyer) {
      console.error("[checkout] falha ao registrar comprador", buyerError);
      throw new Error("Não foi possível iniciar sua compra agora. Tente novamente.");
    }

    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from("purchases")
      .insert({
        buyer_id: buyer.id,
        product_id: VOZ_PROTETORA.id,
        amount: VOZ_PROTETORA.amount,
        payment_provider: "mercadopago",
        payment_status: "initiated",
      })
      .select("id")
      .single();

    if (purchaseError || !purchase) {
      console.error("[checkout] falha ao registrar compra", purchaseError);
      throw new Error("Não foi possível iniciar sua compra agora. Tente novamente.");
    }

    const baseUrl = resolvePublicBaseUrl(getRequest()?.url);

    const preference = await createPreference({
      purchaseId: purchase.id,
      productId: VOZ_PROTETORA.id,
      title: VOZ_PROTETORA.name,
      amount: VOZ_PROTETORA.amount,
      buyerName: data.name,
      buyerEmail: data.email,
      baseUrl,
    });

    return { purchaseId: purchase.id, checkoutUrl: preference.checkoutUrl };
  });

/**
 * Consulta somente o status conhecido pelo sistema para uma compra.
 * Não altera nada e não libera acesso.
 */
export const getPurchaseStatus = createServerFn({ method: "POST" })
  .inputValidator(z.object({ purchaseId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: purchase } = await supabaseAdmin
      .from("purchases")
      .select("id, product_id, payment_status, buyer_id")
      .eq("id", data.purchaseId)
      .maybeSingle();

    if (!purchase) return { found: false as const };

    const { data: access } = await supabaseAdmin
      .from("product_access")
      .select("access_status")
      .eq("buyer_id", purchase.buyer_id)
      .eq("product_id", purchase.product_id)
      .maybeSingle();

    return {
      found: true as const,
      paymentStatus: purchase.payment_status,
      accessStatus: access?.access_status ?? "inactive",
    };
  });
