import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram } from "lucide-react";
import { PageShell } from "@/components/voz/PageShell";
import { NewsletterForm } from "@/components/voz/NewsletterForm";
import { MANIFESTO, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/components/voz/nav";

export const Route = createFileRoute("/participe")({
  head: () => ({
    meta: [
      { title: "Participe — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Receba novos conteúdos, compartilhe de forma consciente e leve a Voz Pela Infância para a sua instituição.",
      },
      { property: "og:title", content: "Participe — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Toda infância precisa de proteção. Todo adulto pode ser Voz.",
      },
    ],
  }),
  component: ParticipePage,
});

const JUMP = [
  { to: "ser-voz", label: "Ser Voz" },
  { to: "conteudos", label: "Receber conteúdos" },
  { to: "compartilhar", label: "Compartilhar" },
  { to: "instituicao", label: "Levar a Voz" },
  { to: "acompanhar", label: "Acompanhar" },
];

const HOJE = [
  "Respeite quando uma criança disser não.",
  "Escute sem pressionar.",
  "Converse sobre limites.",
  "Ensine onde pedir ajuda.",
  "Não normalize situações que causam desconforto.",
  "Procure orientação quando tiver dúvidas.",
];

function ParticipePage() {
  return (
    <PageShell eyebrow="Participe" title="Faça parte do movimento">
      <div className="rounded-[12px] border border-border bg-secondary p-7 text-center sm:p-10">
        <p className="mx-auto max-w-[24ch] font-display text-[1.5rem] italic leading-snug text-primary sm:text-[2rem]">
          {MANIFESTO}
        </p>
        <p className="mt-6 flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-[0.14em] text-primary">
          <span className="h-px w-11 bg-border" />
          Seja Voz.
          <span className="h-px w-11 bg-border" />
        </p>
      </div>

      <nav
        aria-label="Nesta página"
        className="mt-10 flex flex-wrap gap-2.5 border-b border-border pb-8"
      >
        {JUMP.map((j) => (
          <a
            key={j.to}
            href={`#${j.to}`}
            className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {j.label}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-16">
        {/* SER VOZ */}
        <section id="ser-voz" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">O que é ser Voz</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Ser Voz não é saber tudo, ser especialista ou resolver sozinho uma situação. É escolher
            <strong className="text-foreground"> não ser indiferente</strong> diante da proteção da
            infância — assumir uma postura de presença, responsabilidade e cuidado.
          </p>
          <p className="mt-6 text-sm font-medium text-foreground">Você pode começar hoje:</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {HOJE.map((h) => (
              <li key={h} className="flex gap-2">
                <span aria-hidden className="text-accent">
                  ·
                </span>
                {h}
              </li>
            ))}
          </ul>
        </section>

        {/* RECEBER CONTEÚDOS */}
        <section id="conteudos" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">Receba os conteúdos</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            Novos conteúdos sobre proteção no cotidiano e formas de participar do movimento, no seu
            e-mail.
          </p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </section>

        {/* COMPARTILHAR */}
        <section id="compartilhar" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Compartilhe de forma consciente
          </h2>
          <p className="mt-5 font-display text-lg leading-snug text-primary">
            A proteção não é tarefa de um. É cultura de muitos.
          </p>
          <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li className="flex gap-2">
              <span aria-hidden className="text-accent">
                ·
              </span>
              Envie um conteúdo da Voz para um adulto que convive com crianças.
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="text-accent">
                ·
              </span>
              Converse sobre o tema hoje, com alguém próximo.
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="text-accent">
                ·
              </span>
              Compartilhe sem transformar dor em espetáculo e sem expor crianças.
            </li>
          </ul>
        </section>

        {/* LEVAR A VOZ */}
        <section id="instituicao" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Leve a Voz para a sua instituição
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            Escolas, instituições, equipes e comunidades podem receber uma formação ou palestra a
            partir do Método dos 5C da Proteção.
          </p>
          <Link
            to="/solucoes"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            Conhecer as formações
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* ACOMPANHAR */}
        <section id="acompanhar" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">Acompanhe o movimento</h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            <Instagram className="h-4 w-4" />
            {INSTAGRAM_HANDLE}
          </a>
        </section>
      </div>
    </PageShell>
  );
}
