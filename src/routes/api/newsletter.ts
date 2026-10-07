import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

/**
 * Inscrição para receber conteúdos. Guarda o contato na lista (Público) do Resend, onde a
 * Voz Pela Infância depois envia as Transmissões, com link de descadastro.
 *
 * Rota própria (e não server function) de propósito: as server functions do projeto passam
 * por um middleware global do Supabase, e a inscrição não deve falhar por causa do login.
 *
 * Ambiente:
 * - RESEND_CONTACTS_API_KEY: chave do Resend com permissão de gerenciar contatos (acesso
 *   total). Se ausente, usa RESEND_API_KEY.
 * - RESEND_AUDIENCE_ID: opcional. Se existir, o contato entra nessa lista específica.
 */

const schema = z.object({
  nome: z.string().trim().max(120).default(""),
  email: z.string().trim().email().max(200),
  consentimento: z.literal(true),
  // Campo isca: pessoas não veem nem preenchem; robôs costumam preencher.
  website: z.string().max(200).default(""),
});

function json(body: { ok: boolean; reason?: string }, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export const Route = createFileRoute("/api/newsletter")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ ok: false, reason: "invalid" }, 400);
        }

        const parsed = schema.safeParse(raw);
        if (!parsed.success) return json({ ok: false, reason: "invalid" }, 400);
        const data = parsed.data;

        if (data.website) return json({ ok: true });

        const apiKey = process.env["RESEND_CONTACTS_API_KEY"] || process.env["RESEND_API_KEY"];
        if (!apiKey) {
          console.error("[newsletter] chave do Resend ausente no ambiente");
          return json({ ok: false, reason: "not-configured" }, 500);
        }

        const audienceId = process.env["RESEND_AUDIENCE_ID"];
        const url = audienceId
          ? `https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`
          : "https://api.resend.com/contacts";

        try {
          const res = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              ...(data.nome ? { first_name: data.nome } : {}),
              unsubscribed: false,
            }),
          });
          if (!res.ok) {
            const detail = await res.text().catch(() => "");
            console.error("[newsletter] Resend recusou o cadastro", res.status, detail.slice(0, 300));
            return json({ ok: false, reason: "send-failed" }, 502);
          }
          return json({ ok: true });
        } catch (err) {
          console.error("[newsletter] falha de rede ao chamar o Resend", err);
          return json({ ok: false, reason: "send-failed" }, 502);
        }
      },
    },
  },
});
