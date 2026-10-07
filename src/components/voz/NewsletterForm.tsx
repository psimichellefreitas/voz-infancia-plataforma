import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Formulário de inscrição para receber conteúdos. Envia para /api/newsletter, que guarda o
 * contato na lista do Resend.
 *
 * `tone`: "onAccent" para uso sobre fundo primário (ex.: faixa Participe da Home);
 *         "plain" para uso sobre o fundo padrão da página.
 */
export function NewsletterForm({ tone = "plain" }: { tone?: "onAccent" | "plain" }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, website, consentimento: true }),
      });
      const body = (await res.json().catch(() => ({ ok: false }))) as { ok?: boolean };
      setStatus(res.ok && body.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const onAccent = tone === "onAccent";
  const inputCls = onAccent
    ? "min-w-0 flex-1 rounded-[8px] border border-primary-foreground/40 bg-transparent px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/55 focus-visible:border-primary-foreground focus-visible:outline-none"
    : "min-w-0 flex-1 rounded-[8px] border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none";
  const consentCls = onAccent
    ? "mt-4 flex items-start gap-2.5 text-left text-xs text-primary-foreground/80"
    : "mt-4 flex items-start gap-2.5 text-left text-xs text-muted-foreground";
  const linkCls = onAccent ? "font-semibold underline" : "font-semibold text-primary hover:text-accent";

  if (status === "sent") {
    return (
      <div
        role="status"
        className={
          onAccent
            ? "mx-auto max-w-lg text-sm leading-relaxed text-primary-foreground"
            : "max-w-lg rounded-[12px] border border-border bg-secondary p-5 text-sm leading-relaxed"
        }
      >
        <p className={onAccent ? "font-semibold" : "font-semibold text-primary"}>
          Inscrição realizada.
        </p>
        <p className={onAccent ? "mt-1 text-primary-foreground/85" : "mt-1 text-muted-foreground"}>
          Obrigada por acompanhar a Voz Pela Infância. Você receberá os próximos conteúdos neste
          e-mail e poderá cancelar quando quiser.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={onAccent ? "mx-auto max-w-lg" : "max-w-lg"}
      aria-label="Inscrição para novidades"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="nf-nome">
          Nome
        </label>
        <input
          id="nf-nome"
          type="text"
          maxLength={120}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          autoComplete="name"
          className={inputCls}
        />
        <label className="sr-only" htmlFor="nf-email">
          E-mail
        </label>
        <input
          id="nf-email"
          type="email"
          required
          maxLength={200}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          autoComplete="email"
          className={inputCls}
        />
        <Button
          type="submit"
          variant={onAccent ? "green" : "hero"}
          size="lg"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Enviando..." : "Confirmar inscrição"}
        </Button>
      </div>

      {/* Campo isca contra robôs: fica fora da tela e fora da navegação por teclado. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Não preencha
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <label className={consentCls}>
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span className="max-w-[46ch]">
          Concordo em receber e-mails da Voz Pela Infância e posso cancelar quando quiser. Meus
          dados serão tratados conforme a{" "}
          <Link to="/politica-de-privacidade" className={linkCls}>
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      {status === "error" && (
        <p
          role="alert"
          className={
            onAccent
              ? "mt-3 text-sm text-primary-foreground"
              : "mt-3 text-sm text-destructive"
          }
        >
          Não foi possível concluir a inscrição agora. Tente de novo em instantes.
        </p>
      )}
    </form>
  );
}
