import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * Formulário de inscrição para novidades.
 *
 * O envio ainda não está ligado — falta definir o provedor de newsletter.
 * Até lá, o formulário valida o consentimento e informa que a inscrição
 * estará disponível em breve.
 *
 * `tone`: "onAccent" para uso sobre fundo primário (ex.: faixa Participe da Home);
 *         "plain" para uso sobre o fundo padrão da página.
 */
export function NewsletterForm({ tone = "plain" }: { tone?: "onAccent" | "plain" }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      toast.info("Marque o consentimento para continuar.");
      return;
    }
    toast.info("As inscrições estarão disponíveis em breve.");
  }

  const onAccent = tone === "onAccent";
  const inputCls = onAccent
    ? "min-w-0 flex-1 rounded-[8px] border border-primary-foreground/40 bg-transparent px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/55 focus-visible:border-primary-foreground focus-visible:outline-none"
    : "min-w-0 flex-1 rounded-[8px] border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none";
  const consentCls = onAccent
    ? "mt-4 flex items-start gap-2.5 text-left text-xs text-primary-foreground/80"
    : "mt-4 flex items-start gap-2.5 text-left text-xs text-muted-foreground";

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          autoComplete="email"
          className={inputCls}
        />
        <Button type="submit" variant={onAccent ? "green" : "hero"} size="lg">
          Confirmar inscrição
        </Button>
      </div>
      <label className={consentCls}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span className="max-w-[42ch]">
          Concordo em receber e-mails da Voz Pela Infância. Posso cancelar quando quiser.
        </span>
      </label>
    </form>
  );
}
