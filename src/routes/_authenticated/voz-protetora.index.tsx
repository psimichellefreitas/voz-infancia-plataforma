import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Search,
  Shield,
  Sprout,
} from "lucide-react";

import { AppShell } from "@/components/voz/produto/AppShell";
import { BoasVindas, CartoesIniciais } from "@/components/voz/produto/BoasVindas";
import { SearchBox } from "@/components/voz/produto/SearchBox";
import { usePreviewSearch } from "@/lib/preview-mode";

export const Route = createFileRoute("/_authenticated/voz-protetora/")({
  head: () => ({
    meta: [
      { title: "Voz Protetora: Minha área" },
      {
        name: "description",
        content: "Orientação prática para adultos que querem proteger melhor a infância.",
      },
      { property: "og:title", content: "Voz Protetora: Minha área" },
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
    tile: "bg-primary/10 text-primary",
  },
  {
    icon: Shield,
    to: "/voz-protetora/vai-acontecer",
    t: "VAI ACONTECER",
    d: "A criança vai viver uma situação. Como posso me preparar?",
    tile: "bg-accent/15 text-accent",
  },
  {
    icon: Sprout,
    to: "/voz-protetora/fortalecer",
    t: "QUERO FORTALECER",
    d: "Quero fortalecer a proteção. Por onde começo?",
    tile: "bg-voz-yellow/25 text-[#8A5F00] dark:text-voz-yellow",
  },
] as const;

const ATALHOS = [
  {
    icon: Shield,
    to: "/voz-protetora/minha-voz",
    t: "MINHA VOZ PROTETORA",
    d: "Conheça a postura de uma Voz Protetora.",
  },
  {
    icon: ClipboardList,
    to: "/voz-protetora/minha-presenca",
    t: "MINHA PRESENÇA PROTETIVA",
    d: "Perceba onde você pode fortalecer sua presença.",
  },
  {
    icon: ArrowRight,
    to: "/voz-protetora/meu-passo",
    t: "MEU PASSO DE PROTEÇÃO",
    d: "Transforme uma orientação em uma ação.",
  },
  {
    icon: CreditCard,
    to: "/voz-protetora/minha-assinatura",
    t: "MINHA COMPRA",
    d: "Veja os dados da sua compra.",
  },
] as const;

function VozProtetoraHome() {
  const previewSearch = usePreviewSearch();

  return (
    <AppShell>
      <BoasVindas />
      {/* Abertura */}
      <section className="relative overflow-hidden rounded-[24px] bg-primary px-5 pb-5 pt-6 text-primary-foreground">
        <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-accent opacity-35" />
        <div className="relative">
          <span className="block h-0.5 w-7 rounded-full bg-voz-yellow" />
          <h1 className="mt-4 font-display text-[1.9rem] font-bold leading-[1.1] text-balance">
            Como posso ajudar você hoje?
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-primary-foreground/85">
            Orientação prática para adultos que querem proteger melhor a infância.
          </p>
          <div className="mt-5">
            <SearchBox placeholder="Digite sua dúvida..." />
          </div>
        </div>
      </section>

      <CartoesIniciais />

      {/* As 3 portas */}
      <div className="flex flex-col gap-3">
        {PORTAS.map((porta) => (
          <Link
            key={porta.t}
            to={porta.to}
            search={previewSearch}
            className="group flex items-center gap-4 rounded-[22px] bg-card p-4 shadow-[var(--shadow-soft)] transition-shadow active:scale-[0.99] hover:shadow-[var(--shadow-lift)]"
          >
            <span
              className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${porta.tile}`}
            >
              <porta.icon className="h-7 w-7" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold tracking-wide text-primary">
                {porta.t}
              </span>
              <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                {porta.d}
              </span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>

      {/* Quando a orientação não basta */}
      <Link
        to="/voz-protetora/preciso-de-ajuda"
        search={previewSearch}
        className="flex items-center gap-4 rounded-[22px] bg-[#F6E1DA] p-4 transition-shadow active:scale-[0.99] dark:bg-[#3A2A2E]"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/70 text-[#B8472F] dark:bg-white/10 dark:text-[#F08B70]">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-bold tracking-wide text-[#8E3320] dark:text-[#F08B70]">
            PRECISO DE AJUDA
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug text-[#8E3320]/85 dark:text-[#F4EDE0]/80">
            Quando a orientação não é suficiente.
          </span>
        </span>
        <ChevronRight className="h-5 w-5 shrink-0 text-[#B8472F] dark:text-[#F08B70]" />
      </Link>

      {/* Atalhos */}
      <div className="grid grid-cols-2 gap-3">
        {ATALHOS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            search={previewSearch}
            className="flex min-h-[124px] flex-col gap-2 rounded-[20px] bg-card p-4 shadow-[var(--shadow-soft)] transition-shadow active:scale-[0.99] hover:shadow-[var(--shadow-lift)]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-accent">
              <item.icon className="h-5 w-5" />
            </span>
            <span className="text-[13px] font-bold leading-tight tracking-wide text-primary">
              {item.t}
            </span>
            <span className="text-xs leading-snug text-muted-foreground">{item.d}</span>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
