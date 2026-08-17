import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { ACONTECEU } from "@/lib/voz-protetora/content";

export const Route = createFileRoute("/_authenticated/voz-protetora/aconteceu/")({
  head: () => ({
    meta: [
      { title: "Aconteceu — Voz Protetora" },
      {
        name: "description",
        content: "Algo aconteceu. Escolha a situação para receber orientação.",
      },
      { property: "og:title", content: "Aconteceu — Voz Protetora" },
      { property: "og:description", content: "Orientação para situações que já aconteceram." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AcontceuLista,
});

function AcontceuLista() {
  return (
    <ProdutoShell
      eyebrow="Aconteceu"
      title="Algo aconteceu. Como devo agir?"
      intro="Escolha a situação mais próxima do que você viveu."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      <ul className="space-y-3">
        {ACONTECEU.map((item, index) => (
          <li key={item.slug}>
            <Link
              to="/voz-protetora/aconteceu/$slug"
              params={{ slug: item.slug }}
              className="flex items-center justify-between gap-4 rounded-[12px] border border-border bg-card px-5 py-4 transition-colors hover:border-accent"
            >
              <span className="text-sm font-semibold text-foreground/90 sm:text-base">
                <span className="mr-2 text-muted-foreground">{index + 1}.</span>
                {item.title}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
            </Link>
          </li>
        ))}
      </ul>
    </ProdutoShell>
  );
}
