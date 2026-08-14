import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Ear, HeartHandshake, Compass, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/voz/PageShell";

const PILARES = [
  {
    letra: "V",
    t: "Valorizar a infância",
    d: "Reconhecer a infância como uma fase que merece respeito, cuidado, desenvolvimento e proteção.",
  },
  {
    letra: "O",
    t: "Orientar para a proteção",
    d: "Compartilhar conhecimento e caminhos que ajudem adultos e instituições a agir de forma mais consciente e protetiva.",
  },
  {
    letra: "Z",
    t: "Zelar pela proteção",
    d: "Transformar atenção e responsabilidade em atitudes concretas de cuidado e proteção.",
  },
];

const SER_VOZ = [
  { icon: Eye, t: "Olhar", d: "Perceber o que acontece." },
  { icon: Ear, t: "Escutar", d: "Criar espaço para a criança falar." },
  { icon: HeartHandshake, t: "Acolher", d: "Receber sem julgamento." },
  { icon: Compass, t: "Orientar", d: "Ensinar caminhos seguros." },
  { icon: ShieldCheck, t: "Agir", d: "Fortalecer a proteção quando necessário." },
];

export const Route = createFileRoute("/o-movimento")({
  head: () => ({
    meta: [
      { title: "O Movimento — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Conheça o Voz Pela Infância: um movimento em defesa da infância que valoriza, orienta e zela pela proteção de crianças e adolescentes.",
      },
      { property: "og:title", content: "O Movimento — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Propósito e princípios do movimento em defesa da infância.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OMovimentoPage,
});

function OMovimentoPage() {
  return (
    <PageShell
      eyebrow="Voz Pela Infância"
      title="Um movimento em defesa da infância."
      intro="O Voz Pela Infância nasce do compromisso de fortalecer uma Cultura Protetiva para que crianças e adolescentes sejam valorizados, orientados e protegidos em todos os espaços onde vivem, crescem e se relacionam."
    >
      <div className="space-y-16">
        <div>
          <Button asChild variant="hero" size="lg">
            <Link to="/seja-voz">SEJA VOZ</Link>
          </Button>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-primary">Por que o Voz existe?</h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Proteger a infância não é apenas saber reconhecer situações de risco.
            </p>
            <p>
              É construir, no cotidiano, relações, ambientes e atitudes que favoreçam segurança,
              respeito, escuta e cuidado.
            </p>
            <p>
              O Voz existe para aproximar conhecimento e prática e ajudar mais pessoas a
              compreenderem que a proteção da infância também acontece nas escolhas de todos os dias.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary">O que nos orienta?</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {PILARES.map((p) => (
              <article
                key={p.letra}
                className="rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-secondary text-lg font-bold text-accent">
                  {p.letra}
                </span>
                <h3 className="mt-4 text-base font-semibold uppercase tracking-[0.08em] text-primary">
                  {p.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[12px] border border-border bg-secondary p-8 text-center sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Pergunta norteadora do Movimento
          </p>
          <h2 className="mt-3 text-xl font-semibold text-primary">
            Uma pergunta para orientar nossas escolhas.
          </h2>
          <p className="mt-8 text-3xl font-bold leading-tight text-primary sm:text-4xl">
            “Isso protege a infância?”
          </p>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Uma pergunta simples para nos ajudar a refletir sobre escolhas, atitudes e ambientes que
            envolvem crianças e adolescentes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary">O que significa ser Voz?</h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>Ser Voz não significa saber tudo.</p>
            <p>
              Significa escolher não ser indiferente diante das necessidades da infância.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {SER_VOZ.map(({ icon: Icon, t, d }) => (
              <li
                key={t}
                className="flex items-start gap-4 rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.6} />
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
                    {t}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button asChild variant="hero" size="lg">
              <Link to="/seja-voz">SEJA VOZ</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
