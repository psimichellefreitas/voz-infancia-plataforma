import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";
import { NewsletterForm } from "@/components/voz/NewsletterForm";

export const Route = createFileRoute("/conteudos")({
  head: () => ({
    meta: [
      { title: "Conteúdos — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Conteúdos que ajudam a reconhecer a proteção da infância nas situações reais do dia a dia. Os primeiros estão a caminho.",
      },
      { property: "og:title", content: "Conteúdos — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Aprender a reconhecer a proteção — ou a sua ausência — no cotidiano.",
      },
    ],
  }),
  component: ConteudosPage,
});

const TERRITORIOS = [
  { nome: "Educação", d: "O que o adulto precisa aprender sobre infância, direitos e prevenção." },
  {
    nome: "Cotidiano",
    d: "Onde a proteção aparece — ou deixa de aparecer — nas situações da vida real.",
  },
  { nome: "Resposta", d: "O que fazer, falar e não fazer diante de uma situação concreta." },
  { nome: "Rede", d: "Quem faz o quê na proteção — a corresponsabilidade entre os atores." },
  { nome: "Mobilização", d: "Convites para participar e assumir uma postura protetiva." },
  { nome: "Voz Institucional", d: "O movimento, suas ações e sua forma de comunicar." },
];

function ConteudosPage() {
  return (
    <PageShell
      eyebrow="Conteúdos"
      title="Aprender no dia a dia"
      intro="Conteúdos que ajudam a reconhecer a proteção — ou a sua ausência — nas situações reais da vida com crianças."
    >
      <div className="rounded-[12px] border border-border bg-secondary p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
        Os primeiros conteúdos estão a caminho. Eles serão organizados pelos seis territórios do
        Sistema Editorial da Voz Pela Infância:
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TERRITORIOS.map((t) => (
          <article
            key={t.nome}
            className="rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
          >
            <h2 className="text-base font-semibold text-primary">{t.nome}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-primary">Receba os primeiros conteúdos</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Deixe seu e-mail para ser avisado quando os conteúdos começarem a ser publicados.
        </p>
        <div className="mt-5">
          <NewsletterForm />
        </div>
      </div>
    </PageShell>
  );
}
