import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { CONTATO_EMAIL } from "@/components/voz/nav";

/**
 * Envio das mensagens do site (Contato e Solicitar formação) para a caixa do movimento,
 * pelo Resend. É uma rota própria, e não uma server function, de propósito: as server
 * functions do projeto passam por um middleware global do Supabase, e o formulário de contato
 * não deve falhar por causa da configuração de login. A chave fica só no servidor
 * (RESEND_API_KEY). O e-mail do visitante vai em "responder para".
 */

const FROM = "Site Voz Pela Infância <formulario@vozpelainfancia.com.br>";

const schema = z.object({
  tipo: z.enum(["contato", "formacao"]),
  nome: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  instituicao: z.string().trim().max(200).default(""),
  publico: z.string().trim().max(200).default(""),
  formato: z.string().trim().max(60).default(""),
  local: z.string().trim().max(120).default(""),
  mensagem: z.string().trim().min(5).max(4000),
  consentimento: z.literal(true),
  // Campo isca: pessoas não veem nem preenchem; robôs costumam preencher.
  website: z.string().max(200).default(""),
});

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json(body: { ok: boolean; reason?: string }, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export const Route = createFileRoute("/api/contato")({
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

        const apiKey = process.env["RESEND_API_KEY"];
        if (!apiKey) {
          console.error("[contato] RESEND_API_KEY ausente no ambiente");
          return json({ ok: false, reason: "not-configured" }, 500);
        }

        const isFormacao = data.tipo === "formacao";
        const subject = isFormacao
          ? `Solicitação de formação${data.instituicao ? `: ${data.instituicao}` : ""}`
          : `Contato pelo site: ${data.nome}`;

        const linhas: [string, string][] = [
          ["Nome", data.nome],
          ["E-mail", data.email],
          ...(isFormacao
            ? ([
                ["Instituição", data.instituicao],
                ["Público", data.publico],
                ["Formato", data.formato],
                ["Cidade/Estado", data.local],
              ] as [string, string][])
            : []),
        ];

        const text = [
          ...linhas.map(([k, v]) => `${k}: ${v || "(não informado)"}`),
          "",
          data.mensagem,
        ].join("\n");

        const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.55;color:#1c2b3a">
<table style="border-collapse:collapse">${linhas
          .map(
            ([k, v]) =>
              `<tr><td style="padding:2px 14px 2px 0;color:#5b6b7c">${esc(k)}</td><td>${esc(v) || "(não informado)"}</td></tr>`,
          )
          .join("")}</table>
<p style="margin-top:18px;white-space:pre-wrap">${esc(data.mensagem)}</p>
<p style="margin-top:22px;font-size:12px;color:#8a97a6">Enviado pelo formulário do site. Responder a este e-mail responde ao visitante.</p>
</div>`;

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: FROM,
              to: [CONTATO_EMAIL],
              reply_to: data.email,
              subject,
              text,
              html,
            }),
          });
          if (!res.ok) {
            const detail = await res.text().catch(() => "");
            console.error("[contato] Resend recusou o envio", res.status, detail.slice(0, 300));
            return json({ ok: false, reason: "send-failed" }, 502);
          }
          return json({ ok: true });
        } catch (err) {
          console.error("[contato] falha de rede ao chamar o Resend", err);
          return json({ ok: false, reason: "send-failed" }, 502);
        }
      },
    },
  },
});
