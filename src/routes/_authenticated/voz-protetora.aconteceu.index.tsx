import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { usePreviewSearch } from "@/lib/preview-mode";
import { ACONTECEU } from "@/lib/voz-protetora/content";

export const Route = createFileRoute("/_authenticated/voz-protetora/aconteceu/")({
  head: () => ({
    meta: [
      { title: "Aconteceu: Voz Protetora" },
      {
        name: "description",
        content: "Algo aconteceu. Escolha a situação para receber orientação.",
      },
      { property: "og:title", content: "Aconteceu: Voz Protetora" },
      { property: "og:description", content: "Orientação para situações que já aconteceram." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AcontceuLista,
});

function AcontceuLista() {
  const previewSearch = usePreviewSearch();
  const [grupoAtivo, setGrupoAtivo] = useState<string | null>(null);

  const itens = useMemo(() => ACONTECEU.map((item, index) => ({ item, numero: index + 1 })), []);
  const grupos = useMemo(() => {
    const vistos = new Set<string>();
    return itens
      .map(({ item }) => item.grupo)
      .filter((g): g is string => {
        if (!g || vistos.has(g)) return false;
        vistos.add(g);
        return true;
      });
  }, [itens]);
  const filtrados = grupoAtivo ? itens.filter(({ item }) => item.grupo === grupoAtivo) : itens;

  return (
    <ProdutoShell
      eyebrow="Aconteceu"
      title="Algo aconteceu. Como devo agir?"
      intro="Escolha a situação mais próxima do que você viveu."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      {grupos.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          <button
            onClick={() => setGrupoAtivo(null)}
            className={
              grupoAtivo === null
                ? "rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground"
                : "rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-accent"
            }
          >
            Todas
          </button>
          {grupos.map((grupo) => (
            <button
              key={grupo}
              onClick={() => setGrupoAtivo(grupo)}
              className={
                grupoAtivo === grupo
                  ? "rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground"
                  : "rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-accent"
              }
            >
              {grupo}
            </button>
          ))}
        </div>
      )}
      <ul className="space-y-3">
        {filtrados.map(({ item, numero }) => (
          <li key={item.slug}>
            <Link
              to="/voz-protetora/aconteceu/$slug"
              params={{ slug: item.slug }}
              search={previewSearch}
              className="flex items-center justify-between gap-4 rounded-[12px] border border-border bg-card px-5 py-4 transition-colors hover:border-accent"
            >
              <span className="text-sm font-semibold text-foreground/90 sm:text-base">
                <span className="mr-2 text-muted-foreground">{numero}.</span>
                {item.title}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
            </Link>
          </li>
        ))}
      </ul>
      {filtrados.length === 0 && (
        <p className="text-sm text-muted-foreground">Nenhuma situação neste grupo.</p>
      )}
    </ProdutoShell>
  );
}
