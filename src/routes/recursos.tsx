import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";

const ITEMS = [
  { t: "Guias para famílias", d: "Como conversar sobre corpo, limites e segurança em cada idade." },
  { t: "Materiais para escolas", d: "Orientações para acolhimento, protocolos e cultura de cuidado." },
  { t: "Conteúdos de conscientização", d: "Textos e publicações para compartilhar com responsabilidade." },
  { t: "Proteção digital", d: "Boas práticas de mediação, privacidade e uso saudável de telas." },
];

export const Route = createFileRoute("/recursos")({
  head: () => ({
    meta: [
      { title: "Recursos — Materiais de proteção à infância" },
      {
        name: "description",
        content:
          "Guias, materiais e conteúdos de conscientização para famílias, escolas e comunidades protegerem crianças.",
      },
      { property: "og:title", content: "Recursos — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Materiais práticos e confiáveis para a proteção da infância.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Biblioteca"
      title="Recursos para agir com informação"
      intro="Conteúdos organizados por contexto, para que cada adulto encontre o que precisa."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {ITEMS.map((i) => (
          <article
            key={i.t}
            className="rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
          >
            <h2 className="text-lg font-bold text-primary">{i.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.d}</p>
          </article>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted-foreground">
        Novos materiais são publicados continuamente.
      </p>
    </PageShell>
  ),
});
