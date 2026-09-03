import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { usePreviewSearch } from "@/lib/preview-mode";
import { FORTALECER } from "@/lib/voz-protetora/content";

export const Route = createFileRoute("/_authenticated/voz-protetora/fortalecer/")({
  head: () => ({
    meta: [
      { title: "Quero fortalecer — Voz Protetora" },
      { name: "description", content: "Temas para fortalecer sua prática protetiva." },
      { property: "og:title", content: "Quero fortalecer — Voz Protetora" },
      { property: "og:description", content: "Temas para fortalecer sua prática protetiva." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FortalecerLista,
});

function FortalecerLista() {
  const previewSearch = usePreviewSearch();

  return (
    <ProdutoShell
      eyebrow="Quero fortalecer"
      title="Quero fortalecer a proteção. Por onde começo?"
      intro="Escolha um tema para fortalecer sua prática."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {FORTALECER.map((item) => (
          <Link
            key={item.slug}
            to="/voz-protetora/fortalecer/$slug"
            params={{ slug: item.slug }}
            search={previewSearch}
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
