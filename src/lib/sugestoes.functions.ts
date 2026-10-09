import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const sugestaoSchema = z.object({
  busca: z.string().trim().max(200),
  mensagem: z
    .string()
    .trim()
    .min(5, "Escreva um pouco mais sobre o que você procura.")
    .max(500, "Use no máximo 500 caracteres."),
});

/**
 * "Não achou o que procura?": guarda só o texto enviado, sem nome, e-mail ou identificação de
 * quem enviou. Só envia quem tem o acesso liberado (evita lixo vindo de contas criadas à toa).
 * O texto é lido por você no painel /admin e apagado após 180 dias.
 */
export const enviarSugestao = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(sugestaoSchema)
  .handler(async ({ context, data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const email = String(context.claims["email"] ?? "").toLowerCase();
    const { data: buyer } = await supabaseAdmin
      .from("buyers")
      .select("id")
      .ilike("email", email)
      .maybeSingle();
    if (!buyer) throw new Error("Acesso não liberado.");

    const { data: acesso } = await supabaseAdmin
      .from("product_access")
      .select("access_status")
      .eq("buyer_id", buyer.id)
      .eq("access_status", "active")
      .limit(1);
    if (!acesso || acesso.length === 0) throw new Error("Acesso não liberado.");

    // Limite geral contra excesso de envios em pouco tempo.
    const desde = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("suggestions")
      .select("id", { count: "exact", head: true })
      .gte("created_at", desde);
    if ((count ?? 0) >= 60) {
      throw new Error("Recebemos muitas sugestões agora. Tente novamente mais tarde.");
    }

    const { error } = await supabaseAdmin
      .from("suggestions")
      .insert({ busca: data.busca, mensagem: data.mensagem });
    if (error) {
      console.error("[sugestoes] falha ao guardar", error.message);
      throw new Error("Não foi possível enviar agora. Tente novamente em instantes.");
    }
    return { ok: true as const };
  });
