import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, ClipboardList, Search, Shield, Sprout } from "lucide-react";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { usePreviewUnlocked } from "@/lib/preview-mode";

export const Route = createFileRoute("/_authenticated/voz-protetora/")({
  head: () => ({
    meta: [
      { title: "Voz Protetora — Minha área" },
      {
        name: "description",
        content: "Orientação prática para adultos que querem proteger melhor a infância.",
      },
      { property: "og:title", content: "Voz Protetora — Minha área" },
      { property: "og:description", content: "Sua ferramenta de orientação protetiva." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VozProtetoraHome,
});

const PORTAS = [
  {
    icon: Search,
    to: "/voz-protetora/aconteceu",
    t: "ACONTECEU",
    d: "Algo aconteceu. Como devo agir?",
  },
  {
    icon: Shield,
    to: "/voz-protetora/vai-acontecer",
    t: "VAI ACONTECER",
    d: "A criança vai viver uma situação. Como posso me preparar?",
  },
  {
    icon: Sprout,
    to: "/voz-protetora/fortalecer",
    t: "QUERO FORTALECER",
    d: "Quero fortalecer a proteção. Por onde começo?",
  },
] as const;

const ATALHOS = [
  {
    icon: Shield,
    to: "/voz-protetora/minha-voz",
    t: "🛡️ MINHA VOZ PROTETORA",
    d: "Conheça a postura de uma Voz Protetora.",
  },
  {
    icon: ClipboardList,
    to: "/voz-protetora/minha-presenca",
    t: "📋 MINHA PRESENÇA PROTETIVA",
    d: "Perceba onde você pode fortalecer sua presença.",
  },
  {
    icon: ArrowRight,
    to: "/voz-protetora/meu-passo",
    t: "➡️ MEU PASSO DE PROTEÇÃO",
    d: "Transforme uma orientação em uma ação.",
  },
  {
    icon: AlertTriangle,
    to: "/voz-protetora/preciso-de-ajuda",
    t: "🚨 PRECISO DE AJUDA",
    d: "Quando a orientação não é suficiente.",
  },
] as const;

function VozProtetoraHome() {
  const previewUnlocked = usePreviewUnlocked();
  const previewSearch = previewUnlocked ? { preview: 1 } : undefined;

  return (
    <ProdutoShell
      eyebrow="🛡️ Voz Protetora"
      title="Como posso ajudar você hoje?"
      intro="Orientação prática para adultos que querem proteger melhor a infância."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {PORTAS.map((porta) => (
          <Link
            key={porta.t}
            to={porta.to}
            search={previewSearch}
            className="group rounded-[12px] border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
          >
            <div className="grid h-12 w-12 place-items-center rounded-[10px] bg-primary/5">
              <porta.icon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mt-5 text-lg font-bold text-primary">{porta.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{porta.d}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              Abrir
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {ATALHOS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            search={previewSearch}
            className="rounded-[12px] border border-border bg-card p-5 transition-colors hover:border-accent"
          >
            <h3 className="text-sm font-bold text-primary">{item.t}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{item.d}</p>
          </Link>
        ))}
      </div>
    </ProdutoShell>
  );
}
