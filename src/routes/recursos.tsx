import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/voz/PageShell";

const CONTEUDOS = [
  {
    n: "01",
    t: "Como começar a construir uma Cultura Protetiva em casa",
    d: "Um conteúdo introdutório para começar a olhar para a proteção no cotidiano.",
  },
  {
    n: "02",
    t: "Como conversar com uma criança sobre limites e segurança",
    d: "Orientações práticas para conversar sobre limites de forma clara e acolhedora.",
  },
  {
    n: "03",
    t: "O que fazer quando uma criança conta algo que preocupa você",
    d: "Orientações para escutar, acolher e pensar nos próximos passos.",
  },
  {
    n: "04",
    t: "Como acolher uma criança sem culpabilizar",
    d: "Um conteúdo pensado para profissionais que precisam acolher situações delicadas com responsabilidade.",
  },
];

const CONTEXTOS = [
  { t: "Famílias", d: "Orientações para situações do cotidiano." },
  { t: "Profissionais", d: "Reflexões e práticas para quem atua com crianças e adolescentes." },
  { t: "Instituições", d: "Conteúdos para fortalecer ambientes mais protetivos." },
];

export const Route = createFileRoute("/recursos")({
  head: () => ({
    meta: [
      { title: "Recursos — Conhecimento para fortalecer a proteção" },
      {
        name: "description",
        content:
          "Conteúdos gratuitos para compreender, refletir e agir diante de situações que fazem parte da proteção da infância.",
      },
      { property: "og:title", content: "Recursos — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Conteúdos gratuitos e introdutórios sobre proteção da infância.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecursosPage,
});

function RecursosPage() {
  return (
    <PageShell
      eyebrow="Conhecimento para fortalecer a proteção."
      title="Recursos"
      intro="Conteúdos gratuitos para ajudar você a compreender, refletir e agir diante de situações que fazem parte da proteção da infância."
    >
      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-primary">Comece por aqui.</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {CONTEUDOS.map((c) => (
              <article
                key={c.n}
                className="rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {c.n}
                </span>
                <h3 className="mt-3 text-base font-semibold leading-snug text-primary">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary">
            Encontre conteúdos para o seu contexto.
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {CONTEXTOS.map((c) => (
              <article key={c.t} className="rounded-[10px] border border-border bg-secondary p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
                  {c.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[12px] border border-border bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10">
          <h2 className="text-2xl font-bold text-primary">
            Quer transformar conhecimento em prática?
          </h2>
          <p className="mt-3 text-base text-muted-foreground">Conheça o Voz Protetora.</p>
          <div className="mt-6">
            <Button asChild variant="hero" size="lg">
              <Link to="/solucoes/voz-protetora">CONHECER VOZ PROTETORA</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
