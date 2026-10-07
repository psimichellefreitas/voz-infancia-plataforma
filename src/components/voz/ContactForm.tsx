import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { sendContactMessage } from "@/lib/contact.functions";
import { CONTATO_EMAIL } from "./nav";

const FIELD_CLS =
  "mt-1.5 w-full rounded-[8px] border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Formulário que envia a mensagem direto para a caixa do movimento (sem depender do
 * programa de e-mail do visitante). `tipo="formacao"` mostra os campos de solicitação.
 */
export function ContactForm({ tipo }: { tipo: "contato" | "formacao" }) {
  const isFormacao = tipo === "formacao";
  const [form, setForm] = useState({
    nome: "",
    email: "",
    instituicao: "",
    publico: "",
    formato: "Palestra",
    local: "",
    mensagem: "",
    website: "",
  });
  const [consentimento, setConsentimento] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consentimento) return;
    setStatus("sending");
    try {
      const res = await sendContactMessage({
        data: { tipo, ...form, consentimento: true },
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="max-w-xl rounded-[12px] border border-border bg-secondary p-6 text-sm leading-relaxed text-foreground"
      >
        <p className="font-semibold text-primary">Mensagem enviada.</p>
        <p className="mt-2 text-muted-foreground">
          Recebemos o seu contato e respondemos pelo e-mail que você informou. Se preferir,
          escreva também para {CONTATO_EMAIL}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl space-y-4"
      aria-label={isFormacao ? "Solicitar uma formação" : "Enviar mensagem"}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-foreground">Seu nome</span>
          <input
            className={FIELD_CLS}
            type="text"
            required
            minLength={2}
            maxLength={120}
            value={form.nome}
            onChange={(e) => set("nome", e.target.value)}
            autoComplete="name"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-foreground">Seu e-mail</span>
          <input
            className={FIELD_CLS}
            type="email"
            required
            maxLength={200}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
          />
        </label>
        {isFormacao && (
          <>
            <label className="block text-sm">
              <span className="font-medium text-foreground">Instituição</span>
              <input
                className={FIELD_CLS}
                type="text"
                maxLength={200}
                value={form.instituicao}
                onChange={(e) => set("instituicao", e.target.value)}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-foreground">Público</span>
              <input
                className={FIELD_CLS}
                type="text"
                maxLength={200}
                placeholder="famílias, educadores, profissionais"
                value={form.publico}
                onChange={(e) => set("publico", e.target.value)}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-foreground">Formato</span>
              <select
                className={FIELD_CLS}
                value={form.formato}
                onChange={(e) => set("formato", e.target.value)}
              >
                <option>Palestra</option>
                <option>Formação</option>
                <option>Formação continuada</option>
                <option>Ainda não sei</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-foreground">Cidade / Estado</span>
              <input
                className={FIELD_CLS}
                type="text"
                maxLength={120}
                value={form.local}
                onChange={(e) => set("local", e.target.value)}
              />
            </label>
          </>
        )}
      </div>

      <label className="block text-sm">
        <span className="font-medium text-foreground">Mensagem</span>
        <textarea
          className={`${FIELD_CLS} min-h-[120px] resize-y`}
          required
          minLength={5}
          maxLength={4000}
          value={form.mensagem}
          onChange={(e) => set("mensagem", e.target.value)}
          placeholder={
            isFormacao
              ? "Conte um pouco sobre o contexto e o que a instituição espera."
              : "Como podemos ajudar?"
          }
        />
      </label>

      {/* Campo isca contra robôs: fica fora da tela e fora da navegação por teclado. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Não preencha
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </label>
      </div>

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          required
          checked={consentimento}
          onChange={(e) => setConsentimento(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          Concordo que a Voz Pela Infância use estes dados para responder à minha mensagem, conforme
          a{" "}
          <Link to="/politica-de-privacidade" className="font-semibold text-primary hover:text-accent">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          Não foi possível enviar agora. Tente de novo em instantes ou escreva para{" "}
          <a href={`mailto:${CONTATO_EMAIL}`} className="font-semibold underline">
            {CONTATO_EMAIL}
          </a>
          .
        </p>
      )}

      <Button type="submit" variant="hero" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}
