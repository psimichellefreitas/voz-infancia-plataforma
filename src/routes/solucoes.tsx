import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/voz/PageShell";

const OFFERS = [
  { t: "Palestras e campanhas", d: "Encontros de conscientização para famílias e comunidades." },
  { t: "Formação de equipes", d: "Capacitação de educadores e profissionais que atuam com crianças." },
  { t: "Cultura de proteção", d: "Apoio na construção de políticas e protocolos institucionais." },
];

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções — Formações e programas de proteção" },
      {
        name: "description",
        content:
          "Palestras, formações e apoio institucional para escolas, igrejas, empresas e organizações que atuam com crianças.",
      },
      { property: "og:title", content: "Soluções — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Programas de formação e cultura de proteção para instituições.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Para instituições"
      title="Soluções para quem cuida de crianças todos os dias"
      intro="Levamos formação e método para escolas, igrejas, organizações e equipes."
    >
      <div className="space-y-5">
        {OFFERS.map((o) => (
          <article
            key={o.t}
            className="rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
          >
            <h2 className="text-lg font-bold text-primary">{o.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.d}</p>
          </article>
        ))}
      </div>
      <div className="mt-10">
        <Button asChild variant="hero" size="lg">
          <Link to="/contato">Solicitar proposta</Link>
        </Button>
      </div>
    </PageShell>
  ),
});
