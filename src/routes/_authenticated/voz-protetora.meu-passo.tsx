import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePreviewUnlocked } from "@/lib/preview-mode";
import { addMyStep, deleteMyStep, listMySteps, toggleMyStep } from "@/lib/steps.functions";

export const Route = createFileRoute("/_authenticated/voz-protetora/meu-passo")({
  head: () => ({
    meta: [
      { title: "Meu Passo de Proteção — Voz Protetora" },
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

function MeuPassoPage() {
  const [text, setText] = useState("");
  const previewUnlocked = usePreviewUnlocked();
  const queryClient = useQueryClient();
  const fetchSteps = useServerFn(listMySteps);
  const create = useServerFn(addMyStep);
  const toggle = useServerFn(toggleMyStep);
  const remove = useServerFn(deleteMyStep);

  const { data: steps, isPending } = useQuery({
    queryKey: ["protection-steps"],
    queryFn: () => fetchSteps({ data: undefined }),
    enabled: !previewUnlocked,
    retry: false,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["protection-steps"] });

  const addMutation = useMutation({
    mutationFn: (value: string) => create({ data: { text: value } }),
    onSuccess: () => {
      setText("");
      toast.success("Passo registrado.");
      invalidate();
    },
    onError: () => toast.error("Não foi possível registrar seu passo."),
  });

  const toggleMutation = useMutation({
    mutationFn: (vars: { id: string; done: boolean }) => toggle({ data: vars }),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: invalidate,
  });

  return (
    <ProdutoShell
      eyebrow="➡️ Meu Passo de Proteção"
      title="Transforme uma orientação em uma ação."
      intro="Registre um passo seu. Informação vira atitude. Não registre dados sobre crianças."
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
        {previewUnlocked && (
          <p className="mt-4 rounded-[12px] border border-border bg-secondary p-4 text-xs leading-relaxed text-muted-foreground">
            Modo visualização: o conteúdo está liberado para análise, mas o salvamento fica
            bloqueado até você entrar com sua conta.
          </p>
        )}
        <Button
          variant="hero"
          size="xl"
          className="mt-5"
          disabled={previewUnlocked || text.trim().length < 3 || addMutation.isPending}
          onClick={() => addMutation.mutate(text.trim())}
        >
          {addMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          REGISTRAR MEU PASSO
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-primary">Meus passos</h2>
        {isPending && !previewUnlocked ? (
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Carregando...
          </p>
        ) : steps && steps.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {steps.map((step) => (
              <li
                key={step.id}
                className="flex items-start justify-between gap-3 rounded-[12px] border border-border bg-card px-4 py-3"
              >
                <button
                  onClick={() => toggleMutation.mutate({ id: step.id, done: !step.done })}
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
                    {step.step_text}
                  </span>
                </button>
                <button
                  onClick={() => deleteMutation.mutate(step.id)}
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
