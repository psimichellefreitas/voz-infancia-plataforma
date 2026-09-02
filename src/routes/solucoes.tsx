import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Formações, palestras e materiais para levar a Cultura Protetiva da Infância para a prática — em escolas, instituições, equipes e comunidades.",
      },
      { property: "og:title", content: "Soluções — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Como a Voz Pela Infância ajuda a transformar conhecimento em ação protetiva.",
      },
    ],
  }),
  component: SolucoesPage,
});

function SolucoesPage() {
  return (
    <PageShell
      eyebrow="Soluções"
      title="Como a Voz pode ajudar"
      intro="Formas de levar a Cultura Protetiva da Infância para a prática — de encontros presenciais a materiais para o dia a dia."
    >
      <div className="space-y-6">
        <article className="rounded-[12px] border border-border bg-card p-7 shadow-[var(--shadow-soft)] sm:p-9">
          <span className="inline-block rounded-[6px] bg-secondary px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-primary">
            Disponível
          </span>
          <h2 className="mt-4 text-2xl font-semibold text-primary sm:text-[1.7rem]">
            Formações e palestras
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Encontros e formações para escolas, instituições, equipes e comunidades, a partir do
            Método dos 5C da Proteção. O conteúdo é adaptado ao público e ao contexto, com foco em
            ampliar a capacidade protetiva dos adultos — sem alarmismo e sem substituir a rede de
            proteção.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {["Escolas", "Instituições", "Equipes e serviços", "Comunidades"].map((p) => (
              <li
                key={p}
                className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <Button asChild variant="hero" size="lg">
              <Link to="/contato">
                Levar a Voz para a sua instituição
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>

        <article className="rounded-[12px] border border-border bg-secondary p-7 sm:p-9">
          <span className="inline-block rounded-[6px] border border-border bg-card px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Em desenvolvimento
          </span>
          <h2 className="mt-4 text-xl font-semibold text-primary sm:text-2xl">
            Materiais e produtos
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Materiais práticos e produtos para adultos aplicarem a proteção no cotidiano. Estão em
            desenvolvimento e serão apresentados aqui quando disponíveis.
          </p>
        </article>
      </div>
    </PageShell>
  );
}
