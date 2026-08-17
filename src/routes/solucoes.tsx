import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções — Ferramentas para fortalecer a proteção" },
      {
        name: "description",
        content:
          "Conheça o Voz Protetora, a ferramenta digital do Voz Pela Infância para transformar conhecimento em atitudes mais protetivas.",
      },
      { property: "og:title", content: "Soluções — Voz Pela Infância" },
      {
        property: "og:description",
        content:
          "Ferramenta digital de orientação prática para adultos que querem proteger melhor a infância.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolucoesPage,
});

function SolucoesPage() {
  return (
    <PageShell
      eyebrow="Soluções"
      title="Soluções para fortalecer a proteção."
      intro="O Voz Pela Infância desenvolve recursos que ajudam adultos a transformar conhecimento em atitudes mais protetivas."
    >
      <section className="space-y-10">
        <div className="rounded-[12px] border border-border bg-card p-7 shadow-[var(--shadow-soft)] sm:p-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            <Shield className="h-4 w-4" />
            Ferramenta digital de orientação prática
          </div>
          <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">VOZ PROTETORA</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Uma ferramenta digital que ajuda adultos a saber o que dizer, como agir e como se
            preparar diante de situações reais da infância.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold text-primary">
              O que dizer.
            </span>
            <span className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold text-primary">
              Como agir.
            </span>
            <span className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold text-primary">
              Como se preparar.
            </span>
          </div>
          <div className="mt-8">
            <Button asChild variant="hero" size="lg">
              <Link to="/solucoes/voz-protetora">
                CONHECER VOZ PROTETORA
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-[12px] border border-border bg-secondary p-8 sm:p-10">
          <h2 className="text-xl font-bold text-primary sm:text-2xl">
            Mais soluções poderão fazer parte desse caminho.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            O Movimento poderá desenvolver novos recursos ao longo do tempo, sempre com o
            compromisso de fortalecer a proteção da infância.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
