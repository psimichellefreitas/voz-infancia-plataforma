import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";

const STEPS = [
  { t: "Perceber", d: "Observe mudanças de comportamento, silêncios e sinais de desconforto." },
  { t: "Acolher", d: "Escute sem interrogar, sem duvidar e sem expor a criança." },
  { t: "Orientar", d: "Ofereça linguagem adequada à idade sobre corpo, limites e segurança." },
  { t: "Proteger", d: "Ajuste rotinas, ambientes e acessos que ofereçam risco." },
  { t: "Encaminhar", d: "Acione a rede de proteção quando houver suspeita fundamentada." },
];

export const Route = createFileRoute("/bussola-voz")({
  head: () => ({
    meta: [
      { title: "Bússola Voz — Direção prática para proteger crianças" },
      {
        name: "description",
        content:
          "A Bússola Voz orienta adultos em cinco passos: perceber, acolher, orientar, proteger e encaminhar.",
      },
      { property: "og:title", content: "Bússola Voz — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Cinco passos para agir com equilíbrio na proteção da infância.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Ferramenta"
      title="Bússola Voz"
      intro="Uma direção clara para adultos que querem agir com critério, sem medo e sem improviso."
    >
      <ol className="space-y-4">
        {STEPS.map((s, i) => (
          <li
            key={s.t}
            className="rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Passo {i + 1}
            </span>
            <h2 className="mt-2 text-lg font-bold text-primary">{s.t}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>
    </PageShell>
  ),
});
