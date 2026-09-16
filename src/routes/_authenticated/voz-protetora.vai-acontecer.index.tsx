import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { usePreviewSearch } from "@/lib/preview-mode";
import { VAI_ACONTECER } from "@/lib/voz-protetora/content";

export const Route = createFileRoute("/_authenticated/voz-protetora/vai-acontecer/")({
  head: () => ({
    meta: [
      { title: "Vai acontecer: Voz Protetora" },
      { name: "description", content: "Prepare-se antes de a criança viver a situação." },
      { property: "og:title", content: "Vai acontecer: Voz Protetora" },
      { property: "og:description", content: "Preparação protetiva para situações futuras." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VaiAcontecerLista,
});

function VaiAcontecerLista() {
  const previewSearch = usePreviewSearch();
  const [grupoAtivo, setGrupoAtivo] = useState<string | null>(null);

  const grupos = useMemo(() => {
    const vistos = new Set<string>();
    return VAI_ACONTECER.map((item) => item.grupo).filter((g): g is string => {
      if (!g || vistos.has(g)) return false;
      vistos.add(g);
      return true;
    });
  }, []);
  const filtrados = grupoAtivo
    ? VAI_ACONTECER.filter((item) => item.grupo === grupoAtivo)
    : VAI_ACONTECER;

  return (
    <ProdutoShell
      eyebrow="Vai acontecer"
      title="A criança vai viver uma situação. Como posso me preparar?"
      intro="Escolha a situação para ver a preparação protetiva."
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
      <div className="grid gap-3 sm:grid-cols-2">
        {filtrados.map((item) => (
          <Link
            key={item.slug}
            to="/voz-protetora/vai-acontecer/$slug"
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
      {filtrados.length === 0 && (
        <p className="text-sm text-muted-foreground">Nenhuma situação neste grupo.</p>
      )}
    </ProdutoShell>
  );
}
