import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Printer } from "lucide-react";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { usePreviewSearch } from "@/lib/preview-mode";
import { AVISO_DIREITOS, BONUS } from "@/lib/voz-protetora/bonus";

export const Route = createFileRoute("/_authenticated/app/voz-protetora/bonus/")({
  head: () => ({
    meta: [
      { title: "Bônus para imprimir: Voz Protetora" },
      { name: "description", content: "Materiais para imprimir e usar com a criança." },
      { property: "og:title", content: "Bônus para imprimir: Voz Protetora" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BonusLista,
});

function BonusLista() {
  const previewSearch = usePreviewSearch() as never;

  return (
    <ProdutoShell
      title="Bônus para imprimir"
      intro="Materiais para imprimir e usar com a criança e com quem cuida dela. Abra um bônus e toque em Imprimir."
      backTo={{ to: "/app/voz-protetora", label: "Voltar ao início" }}
    >
      <ul className="space-y-3">
        {BONUS.map((bonus) => (
          <li key={bonus.slug}>
            <Link
              to="/app/voz-protetora/bonus/$slug"
              params={{ slug: bonus.slug }}
              search={previewSearch}
              className="group flex items-center gap-4 rounded-[22px] bg-card p-4 shadow-[var(--shadow-soft)] transition-shadow active:scale-[0.99] hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-voz-yellow/30 text-[#8A5F00] dark:text-voz-yellow">
                <Printer className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-bold leading-snug text-primary">
                  {bonus.titulo}
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                  {bonus.descricao}
                </span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{AVISO_DIREITOS}</p>
    </ProdutoShell>
  );
}
