import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/voz-protetora/meu-passo")({
  head: () => ({
    meta: [
      { title: "Meu Passo de Proteção: Voz Protetora" },
      { name: "description", content: "Transforme uma orientação em uma ação." },
      { property: "og:title", content: "Meu Passo de Proteção" },
      { property: "og:description", content: "Transforme uma orientação em uma ação." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MeuPassoPage,
});

const EXEMPLOS = [
  "Vou conversar com a criança sobre quem são seus adultos de confiança.",
  "Vou conversar sobre segurança digital.",
  "Vou começar a respeitar mais explicitamente os limites corporais da criança.",
];

/**
 * DOC_PRODUTO_VOZ_PROTETORA_V1.md §10.2 / PRD §5: "Meu Próximo Passo" é pessoal do adulto e
 * fica no dispositivo dele — o produto não coleta esse texto em servidor. Por isso os passos
 * são guardados só no localStorage do navegador, nunca enviados a um backend.
 */
const STORAGE_KEY = "voz-protetora:meus-passos";

interface Step {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
}

function readSteps(): Step[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Step[]) : [];
  } catch {
    return [];
  }
}

function writeSteps(steps: Step[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(steps));
  } catch {
    // Armazenamento indisponível (modo privado, por exemplo) — a peça continua na tela
    // até recarregar, mas não é possível persistir. Sem dado nenhum sai do dispositivo.
  }
}

function MeuPassoPage() {
  const [text, setText] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSteps(readSteps());
    setHydrated(true);
  }, []);

  function persist(next: Step[]) {
    setSteps(next);
    writeSteps(next);
  }

  function handleAdd() {
    const value = text.trim();
    if (value.length < 3) return;
    const step: Step = {
      id: crypto.randomUUID(),
      text: value,
      done: false,
      createdAt: new Date().toISOString(),
    };
    persist([step, ...steps]);
    setText("");
    toast.success("Passo registrado no seu dispositivo.");
  }

  function handleToggle(id: string) {
    persist(steps.map((step) => (step.id === id ? { ...step, done: !step.done } : step)));
  }

  function handleDelete(id: string) {
    persist(steps.filter((step) => step.id !== id));
  }

  return (
    <ProdutoShell
      eyebrow="➡️ Meu Passo de Proteção"
      title="Transforme uma orientação em uma ação."
      intro="Registre um passo seu. Informação vira atitude. Fica só neste dispositivo: não enviamos este texto para nenhum servidor. Não registre dados sobre crianças."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      <div className="rounded-[12px] border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6">
        <Textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Qual passo de proteção você vai dar?"
          rows={3}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {EXEMPLOS.map((exemplo) => (
            <button
              key={exemplo}
              onClick={() => setText(exemplo)}
              className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-accent"
            >
              {exemplo}
            </button>
          ))}
        </div>
        <Button
          variant="hero"
          size="xl"
          className="mt-5"
          disabled={text.trim().length < 3}
          onClick={handleAdd}
        >
          REGISTRAR MEU PASSO
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-primary">Meus passos</h2>
        {!hydrated ? null : steps.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {steps.map((step) => (
              <li
                key={step.id}
                className="flex items-start justify-between gap-3 rounded-[12px] border border-border bg-card px-4 py-3"
              >
                <button
                  onClick={() => handleToggle(step.id)}
                  className="flex items-start gap-3 text-left"
                >
                  <span
                    className={
                      step.done
                        ? "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-accent text-accent-foreground"
                        : "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border border-border"
                    }
                  >
                    {step.done && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <span
                    className={
                      step.done
                        ? "text-sm text-muted-foreground line-through"
                        : "text-sm text-foreground/90"
                    }
                  >
                    {step.text}
                  </span>
                </button>
                <button
                  onClick={() => handleDelete(step.id)}
                  aria-label="Remover passo"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Você ainda não registrou nenhum passo.
          </p>
        )}
      </div>
    </ProdutoShell>
  );
}
