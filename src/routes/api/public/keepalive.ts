import { createFileRoute } from "@tanstack/react-router";

/**
 * Acesso diário ao banco para o Supabase (plano gratuito) não pausar o projeto por falta de uso.
 * Chamado pelo agendamento do Vercel (`vercel.json`, "crons"). Só faz uma contagem leve; não
 * devolve nenhum dado. Aceita apenas a chamada do agendador do Vercel.
 */
export const Route = createFileRoute("/api/public/keepalive")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const agente = request.headers.get("user-agent") ?? "";
        if (!agente.startsWith("vercel-cron")) {
          return new Response("Not found", { status: 404 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin
          .from("buyers")
          .select("id", { count: "exact", head: true });

        if (error) {
          console.error("[keepalive] falha ao consultar o banco", error.message);
          return new Response("error", { status: 500 });
        }

        // Retenção das sugestões de tema: apaga o que tem mais de 180 dias.
        const limite = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString();
        const { error: erroLimpeza } = await supabaseAdmin
          .from("suggestions")
          .delete()
          .lt("created_at", limite);
        if (erroLimpeza) {
          console.error("[keepalive] falha ao limpar sugestões antigas", erroLimpeza.message);
        }
        return new Response("ok", { status: 200 });
      },
    },
  },
});
