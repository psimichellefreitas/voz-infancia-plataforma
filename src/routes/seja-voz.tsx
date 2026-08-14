import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Ear, HeartHandshake, Compass, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/voz/PageShell";

const SER_VOZ = [
  { icon: Eye, t: "Olhar", d: "Perceber o que acontece ao redor da criança." },
  { icon: Ear, t: "Escutar", d: "Criar espaço para que ela possa falar." },
  {
    icon: HeartHandshake,
    t: "Acolher",
    d: "Receber sem culpabilizar ou diminuir o que ela sente.",
  },
  { icon: Compass, t: "Orientar", d: "Ensinar caminhos seguros." },
  {
    icon: ShieldCheck,
    t: "Agir",
    d: "Fazer o que estiver ao seu alcance para fortalecer a proteção.",
  },
];

const HOJE = [
  "Respeite quando uma criança disser não.",
  "Escute sem pressionar.",
  "Converse sobre limites.",
  "Ensine onde pedir ajuda.",
  "Não normalize situações que causam desconforto.",
  "Procure orientação quando tiver dúvidas.",
];

export const Route = createFileRoute("/seja-voz")({
  head: () => ({
    meta: [
      { title: "Seja Voz — A proteção da infância começa com você" },
      {
        name: "description",
        content:
          "Você não precisa ser especialista para contribuir com a proteção de uma criança. Veja o que significa ser Voz e como começar hoje.",
      },
      { property: "og:title", content: "Seja Voz — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Qualquer pessoa pode assumir uma postura de proteção da infância.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SejaVozPage,
});

function SejaVozPage() {
  return (
    <PageShell
      eyebrow="Seja Voz"
      title="A proteção da infância também começa com você."
      intro="Você não precisa ser especialista para contribuir com a proteção de uma criança."
    >
      <div className="space-y-16">
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Pode começar prestando atenção. Fazendo uma pergunta. Respeitando um limite. Escutando sem
          julgar. Ensinando uma criança a pedir ajuda. Procurando orientação quando não souber o que
          fazer.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-primary">Ser Voz é...</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {SER_VOZ.map(({ icon: Icon, t, d }) => (
              <article
                key={t}
                className="rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-primary">
                  {t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary">Você pode começar hoje.</h2>
          <ul className="mt-6 space-y-3">
            {HOJE.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                <span className="text-sm leading-relaxed text-foreground/85">{h}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[12px] border border-border bg-secondary p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-primary">Não precisa fazer tudo.</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A construção de uma Cultura Protetiva acontece por muitas pessoas, em muitos lugares e
            por meio de pequenas atitudes que, juntas, fazem diferença.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold text-primary">Faça parte do Movimento.</h2>
          <div className="mt-6">
            <Button asChild variant="hero" size="lg">
              <Link to="/contato">EU QUERO SER VOZ</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
