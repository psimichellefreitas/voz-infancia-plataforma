import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { CONTATO_EMAIL } from "@/components/voz/nav";

/**
 * Envio das mensagens do site (Contato e Solicitar formação) para a caixa do movimento,
 * pelo Resend. A chave fica só no servidor (RESEND_API_KEY) e nunca chega ao navegador.
 * O e-mail do visitante vai em "responder para", então basta responder no Zoho.
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

export type ContactInput = z.input<typeof schema>;
export type ContactResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "send-failed" };

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator(schema)
  .handler(async ({ data }): Promise<ContactResult> => {
    if (data.website) return { ok: true };

    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("[contato] RESEND_API_KEY ausente no ambiente");
      return { ok: false, reason: "not-configured" };
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
        return { ok: false, reason: "send-failed" };
      }
      return { ok: true };
    } catch (err) {
      console.error("[contato] falha de rede ao chamar o Resend", err);
      return { ok: false, reason: "send-failed" };
    }
  });
