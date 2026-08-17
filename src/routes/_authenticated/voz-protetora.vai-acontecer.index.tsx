import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { VAI_ACONTECER } from "@/lib/voz-protetora/content";

export const Route = createFileRoute("/_authenticated/voz-protetora/vai-acontecer/")({
  head: () => ({
    meta: [
      { title: "Vai acontecer — Voz Protetora" },
      { name: "description", content: "Prepare-se antes de a criança viver a situação." },
      { property: "og:title", content: "Vai acontecer — Voz Protetora" },
      { property: "og:description", content: "Preparação protetiva para situações futuras." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VaiAcontecerLista,
});

function VaiAcontecerLista() {
  return (
    <ProdutoShell
      eyebrow="Vai acontecer"
      title="A criança vai viver uma situação. Como posso me preparar?"
      intro="Escolha a situação para ver a preparação protetiva."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {VAI_ACONTECER.map((item) => (
          <Link
            key={item.slug}
            to="/voz-protetora/vai-acontecer/$slug"
            params={{ slug: item.slug }}
            className="flex items-center justify-between gap-4 rounded-[12px] border border-border bg-card px-5 py-4 transition-colors hover:border-accent"
          >
            <span className="text-sm font-semibold text-foreground/90">
              <span className="mr-2">{item.emoji}</span>
              {item.title}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
          </Link>
        ))}
      </div>
    </ProdutoShell>
  );
}
