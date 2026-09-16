import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw } from "lucide-react";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { Button } from "@/components/ui/button";
import { PRESENCA_GRUPOS } from "@/lib/voz-protetora/content";
import { usePreviewSearch } from "@/lib/preview-mode";

export const Route = createFileRoute("/_authenticated/voz-protetora/minha-presenca")({
  head: () => ({
    meta: [
      { title: "Minha Presença Protetiva: Voz Protetora" },
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

const GRUPO_INTRO: Record<string, string> = {
  VER: "Perceber o que está acontecendo, antes de interpretar ou concluir.",
  OUVIR: "Compreender o que a criança está comunicando, com palavras, comportamento ou silêncio.",
  ZELAR: "Assumir a responsabilidade pela proteção e buscar a resposta adequada.",
};

/**
 * Cada pergunta aponta para uma leitura concreta — sem transformar isso em pontuação ou
 * diagnóstico sobre a pessoa (DOC_PRODUTO §10.3). A "transformação" vem de indicar o próximo
 * passo, não de rotular quem respondeu.
 */
const SUGESTAO: Record<string, { label: string; to: string }> = {
  "VER-0": { label: "Vínculo e presença protetiva", to: "/voz-protetora/fortalecer/vinculo-e-presenca" },
  "VER-1": { label: "Vínculo e presença protetiva", to: "/voz-protetora/fortalecer/vinculo-e-presenca" },
  "VER-2": { label: "Vínculo e presença protetiva", to: "/voz-protetora/fortalecer/vinculo-e-presenca" },
  "OUVIR-0": {
    label: "Abrir espaço para conversar",
    to: "/voz-protetora/fortalecer/abrir-espaco-conversar",
  },
  "OUVIR-1": { label: "Ensinar e respeitar o \"não\"", to: "/voz-protetora/fortalecer/respeitar-o-nao" },
  "OUVIR-2": {
    label: "Abrir espaço para conversar",
    to: "/voz-protetora/fortalecer/abrir-espaco-conversar",
  },
  "ZELAR-0": {
    label: "Combinar regras e rotinas seguras",
    to: "/voz-protetora/fortalecer/regras-e-rotinas-seguras",
  },
  "ZELAR-1": {
    label: "Ensinar a criança a pedir ajuda",
    to: "/voz-protetora/fortalecer/ensinar-a-pedir-ajuda",
  },
  "ZELAR-2": { label: "Preciso de ajuda: por onde começar", to: "/voz-protetora/preciso-de-ajuda" },
  "ZELAR-3": {
    label: "Autoproteção sem responsabilizar a criança",
    to: "/voz-protetora/fortalecer/postura-do-adulto",
  },
};

interface FortalecerItem {
  pergunta: string;
  key: string;
  grupo: string;
  sugestao: { label: string; to: string };
}

/** Uma mesma leitura pode responder a mais de uma pergunta marcada — mostra uma vez só. */
function groupBySugestao(items: FortalecerItem[]) {
  const byTo = new Map<string, { sugestao: FortalecerItem["sugestao"]; perguntas: string[] }>();
  for (const item of items) {
    const existing = byTo.get(item.sugestao.to);
    if (existing) {
      existing.perguntas.push(item.pergunta);
    } else {
      byTo.set(item.sugestao.to, { sugestao: item.sugestao, perguntas: [item.pergunta] });
    }
  }
  return Array.from(byTo.values());
}

/**
 * Guardado no localStorage (mesmo raciocínio de Meu Passo — reflexão pessoal, sem servidor)
 * para sobreviver a navegação: clicar num próximo passo e voltar não pode zerar o resultado.
 */
const STORAGE_KEY = "voz-protetora:minha-presenca";

interface StoredState {
  answers: Record<string, Answer>;
  showResult: boolean;
}

function readStored(): StoredState {
  if (typeof window === "undefined") return { answers: {}, showResult: false };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredState) : { answers: {}, showResult: false };
  } catch {
    return { answers: {}, showResult: false };
  }
}

function writeStored(state: StoredState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Armazenamento indisponível — a reflexão continua na tela até recarregar.
  }
}

function MinhaPresencaPage() {
  const [answers, setAnswersState] = useState<Record<string, Answer>>({});
  const [showResult, setShowResultState] = useState(false);
  const previewSearch = usePreviewSearch();

  useEffect(() => {
    const stored = readStored();
    setAnswersState(stored.answers);
    setShowResultState(stored.showResult);
  }, []);

  function setAnswers(updater: (prev: Record<string, Answer>) => Record<string, Answer>) {
    setAnswersState((prev) => {
      const next = updater(prev);
      writeStored({ answers: next, showResult });
      return next;
    });
  }

  function setShowResult(value: boolean) {
    setShowResultState(value);
    writeStored({ answers, showResult: value });
  }

  function handleReset() {
    setAnswersState({});
    setShowResultState(false);
    writeStored({ answers: {}, showResult: false });
  }

  const fortalecer = PRESENCA_GRUPOS.flatMap((grupo) =>
    grupo.perguntas
      .map((pergunta, index) => {
        const key = `${grupo.grupo}-${index}`;
        return { pergunta, key, grupo: grupo.grupo, sugestao: SUGESTAO[key] };
      })
      .filter(({ key }) => answers[key] === "as-vezes" || answers[key] === "ainda-nao"),
  );

  return (
    <ProdutoShell
      eyebrow="📋 Minha Presença Protetiva"
      title="Perceba onde você pode fortalecer sua presença."
      intro="Organizada pela Bússola VOZ: Ver · Ouvir · Zelar. Esta reflexão não é um teste psicológico e não gera diagnóstico ou pontuação: serve só para você olhar a própria prática."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      <div className="space-y-8">
        {PRESENCA_GRUPOS.map((grupo) => (
          <div key={grupo.grupo}>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
              {grupo.grupo}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{GRUPO_INTRO[grupo.grupo]}</p>
            <div className="mt-4 space-y-3">
              {grupo.perguntas.map((pergunta, index) => {
                const key = `${grupo.grupo}-${index}`;
                return (
                  <div key={key} className="rounded-[12px] border border-border bg-card p-5">
                    <p className="text-sm font-semibold text-foreground/90">{pergunta}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            setAnswers((prev) => ({ ...prev, [key]: option.value }))
                          }
                          className={
                            answers[key] === option.value
                              ? "rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground"
                              : "rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:border-accent"
                          }
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Button variant="hero" size="xl" className="mt-8" onClick={() => setShowResult(true)}>
        VER O QUE POSSO FORTALECER
      </Button>

      {showResult && (
        <div className="mt-7 rounded-[12px] border border-border bg-secondary p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-bold uppercase tracking-[0.1em] text-primary">
              Seus próximos passos
            </h2>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Refazer
            </button>
          </div>
          {fortalecer.length === 0 ? (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Você marcou "Sim" em todos os pontos. Continue praticando e revisite esta reflexão
              de tempo em tempo, ou explore livremente os temas de{" "}
              <Link
                to="/voz-protetora/fortalecer"
                search={previewSearch}
                className="font-semibold text-primary underline"
              >
                Quero Fortalecer
              </Link>
              .
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Isto não é uma nota sobre você, é um ponto de partida. Cada leitura abaixo
                responde diretamente ao que você marcou "às vezes" ou "ainda não".
              </p>
              <ul className="mt-4 space-y-3">
                {groupBySugestao(fortalecer).map(({ sugestao, perguntas }) => (
                  <li key={sugestao.to}>
                    <Link
                      to={sugestao.to as never}
                      search={previewSearch as never}
                      className="flex items-start justify-between gap-3 rounded-[12px] border border-border bg-card p-4 shadow-[var(--shadow-soft)] transition-colors hover:border-accent"
                    >
                      <div>
                        <p className="text-sm font-bold text-primary">{sugestao.label}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {perguntas.join(" · ")}
                        </p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </ProdutoShell>
  );
}
