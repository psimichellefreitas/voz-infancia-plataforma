import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { Button } from "@/components/ui/button";
import { PRESENCA_PERGUNTAS } from "@/lib/voz-protetora/content";

export const Route = createFileRoute("/_authenticated/voz-protetora/minha-presenca")({
  head: () => ({
    meta: [
      { title: "Minha Presença Protetiva — Voz Protetora" },
      { name: "description", content: "Perceba onde você pode fortalecer sua presença." },
      { property: "og:title", content: "Minha Presença Protetiva" },
      { property: "og:description", content: "Perceba onde você pode fortalecer sua presença." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MinhaPresencaPage,
});

type Answer = "sim" | "as-vezes" | "ainda-nao";

const OPTIONS: { value: Answer; label: string }[] = [
  { value: "sim", label: "Sim" },
  { value: "as-vezes", label: "Às vezes" },
  { value: "ainda-nao", label: "Ainda não" },
];

function MinhaPresencaPage() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [showResult, setShowResult] = useState(false);

  const fortalecer = PRESENCA_PERGUNTAS.filter(
    (_, index) => answers[index] === "as-vezes" || answers[index] === "ainda-nao",
  );

  return (
    <ProdutoShell
      eyebrow="📋 Minha Presença Protetiva"
      title="Perceba onde você pode fortalecer sua presença."
      intro="Esta reflexão não é um teste psicológico e não gera diagnóstico. Serve apenas para você olhar sua própria prática."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      <div className="space-y-3">
        {PRESENCA_PERGUNTAS.map((pergunta, index) => (
          <div key={pergunta} className="rounded-[12px] border border-border bg-card p-5">
            <p className="text-sm font-semibold text-foreground/90">{pergunta}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setAnswers((prev) => ({ ...prev, [index]: option.value }))}
                  className={
                    answers[index] === option.value
                      ? "rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground"
                      : "rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:border-accent"
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button variant="hero" size="xl" className="mt-7" onClick={() => setShowResult(true)}>
        VER O QUE POSSO FORTALECER
      </Button>

      {showResult && (
        <div className="mt-7 rounded-[12px] border border-border bg-secondary p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.1em] text-primary">
            O que posso fortalecer?
          </h2>
          {fortalecer.length === 0 ? (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Você marcou “Sim” em todos os pontos. Continue praticando e revisite esta reflexão de
              tempo em tempo.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {fortalecer.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-foreground/85">
                  • {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </ProdutoShell>
  );
}
