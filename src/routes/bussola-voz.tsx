import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/voz/PageShell";

const ESTADOS = [
  { t: "Está fortalecido", d: "Reconhecer o que já protege e merece ser mantido." },
  { t: "Precisa de atenção", d: "Perceber o que pede um olhar mais cuidadoso." },
  { t: "Quero fortalecer", d: "Escolher onde dar o próximo passo." },
];

const NAO_E = [
  "Não é teste psicológico.",
  "Não é diagnóstico.",
  "Não é avaliação profissional.",
  "Não é classificação de famílias.",
];

const PROVOCAR = ["Perceber.", "Refletir.", "Escolher onde fortalecer."];

export const Route = createFileRoute("/bussola-voz")({
  head: () => ({
    meta: [
      { title: "Bússola Voz — Ferramenta de reflexão sobre proteção" },
      {
        name: "description",
        content:
          "A Bússola Voz ajuda a refletir sobre diferentes dimensões da proteção da infância e perceber onde fortalecer o cuidado.",
      },
      { property: "og:title", content: "Bússola Voz — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Uma ferramenta para olhar, refletir e fortalecer a proteção da infância.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BussolaVozPage,
});

function BussolaVozPage() {
  return (
    <PageShell
      eyebrow="Uma ferramenta para olhar, refletir e fortalecer a proteção."
      title="Bússola Voz"
      intro="A Bússola Voz ajuda você a refletir sobre diferentes dimensões da proteção da infância e perceber onde existe fortalecimento, atenção ou oportunidade de mudança."
    >
      <div className="space-y-16">
        <section id="apresentacao">
          <h2 className="text-2xl font-bold text-primary">Como funciona?</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A Bússola convida você a olhar para diferentes dimensões da proteção da infância e
            refletir sobre como elas estão sendo cuidadas.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {ESTADOS.map((e) => (
              <article
                key={e.t}
                className="rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">
                  {e.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary">A Bússola não é...</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {NAO_E.map((n) => (
              <li
                key={n}
                className="rounded-[10px] border border-border bg-secondary p-5 text-sm font-semibold text-primary"
              >
                {n}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            É uma ferramenta de reflexão e orientação.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary">O que ela busca provocar?</h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {PROVOCAR.map((p) => (
              <span
                key={p}
                className="flex-1 rounded-[10px] border border-border bg-card p-5 text-center text-base font-semibold text-primary shadow-[var(--shadow-soft)]"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="mt-6 text-lg font-semibold text-accent">Da percepção para a atitude.</p>
        </section>

        <section className="rounded-[12px] border border-border bg-secondary p-8 sm:p-10">
          <h2 className="text-xl font-bold text-primary sm:text-2xl">
            Como a Pergunta Norteadora e a Bússola se relacionam?
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>A Pergunta Norteadora do Voz nos convida a perguntar:</p>
            <p className="text-xl font-bold text-primary">“Isso protege a infância?”</p>
            <p>
              A Bússola Voz ajuda a transformar essa reflexão em um olhar mais estruturado sobre
              diferentes dimensões da proteção.
            </p>
          </div>
        </section>

        <div>
          <Button asChild variant="hero" size="lg">
            <Link to="/bussola-voz" hash="apresentacao">
              EXPLORAR A BÚSSOLA VOZ
            </Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
