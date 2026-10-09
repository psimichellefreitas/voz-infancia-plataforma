import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Painel de vendas da idealizadora (/admin).
 *
 * Quem pode ver: e-mails da variável ADMIN_EMAILS (separados por vírgula). Sem a variável,
 * vale só o e-mail da idealizadora. O e-mail vem do token validado no servidor, nunca do
 * navegador. Os dados são lidos com a chave de serviço (ignora RLS), por isso a checagem
 * abaixo é obrigatória antes de qualquer leitura.
 */
const FALLBACK_ADMIN_EMAILS = ["psi.michellefreitas@gmail.com"];

function adminEmails(): string[] {
  const raw = process.env["ADMIN_EMAILS"];
  const list = raw
    ? raw
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean)
    : FALLBACK_ADMIN_EMAILS;
  return list;
}

export const getAdminSales = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String(context.claims["email"] ?? "").toLowerCase();
    if (!email || !adminEmails().includes(email)) {
      return { allowed: false as const, email };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [purchasesResult, buyersResult, accessResult] = await Promise.all([
      supabaseAdmin
        .from("purchases")
        .select("id, buyer_id, product_id, amount, payment_status, payment_id, created_at")
        .order("created_at", { ascending: false })
        .limit(500),
      supabaseAdmin.from("buyers").select("id, name, email"),
      supabaseAdmin.from("product_access").select("buyer_id, product_id, access_status"),
    ]);

    if (purchasesResult.error || buyersResult.error || accessResult.error) {
      console.error(
        "[admin] falha ao ler vendas",
        purchasesResult.error ?? buyersResult.error ?? accessResult.error,
      );
      throw new Error("Não foi possível carregar as vendas agora.");
    }

    const buyers = new Map(buyersResult.data.map((buyer) => [buyer.id, buyer]));
    const activeAccess = new Set(
      accessResult.data
        .filter((item) => item.access_status === "active")
        .map((item) => `${item.buyer_id}:${item.product_id}`),
    );

    const sales = purchasesResult.data.map((purchase) => {
      const buyer = buyers.get(purchase.buyer_id);
      return {
        id: purchase.id,
        name: buyer?.name ?? "",
        email: buyer?.email ?? "",
        productId: purchase.product_id,
        amount: Number(purchase.amount),
        status: purchase.payment_status,
        createdAt: purchase.created_at,
        hasAccess: activeAccess.has(`${purchase.buyer_id}:${purchase.product_id}`),
      };
    });

    const approved = sales.filter((sale) => sale.status === "approved");

    return {
      allowed: true as const,
      email,
      totals: {
        approvedCount: approved.length,
        approvedAmount: approved.reduce((sum, sale) => sum + sale.amount, 0),
        buyersWithAccess: new Set(
          accessResult.data
            .filter((item) => item.access_status === "active")
            .map((item) => item.buyer_id),
        ).size,
      },
      sales,
    };
  });

/** Sugestões de tema enviadas em "Não achou o que procura?". Só para a administradora. */
export const getAdminSugestoes = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String(context.claims["email"] ?? "").toLowerCase();
    if (!email || !adminEmails().includes(email)) {
      return { allowed: false as const, itens: [], tabelaAusente: false };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("suggestions")
      .select("id, created_at, busca, mensagem")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      // Normalmente a tabela ainda não foi criada no Supabase.
      console.error("[admin] falha ao ler sugestões", error.message);
      return { allowed: true as const, itens: [], tabelaAusente: true };
    }
    return { allowed: true as const, itens: data, tabelaAusente: false };
  });

export const apagarSugestao = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ context, data }) => {
    const email = String(context.claims["email"] ?? "").toLowerCase();
    if (!email || !adminEmails().includes(email)) throw new Error("Sem permissão.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("suggestions").delete().eq("id", data.id);
    if (error) throw new Error("Não foi possível apagar agora.");
    return { ok: true as const };
  });
