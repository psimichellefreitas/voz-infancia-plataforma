import { createFileRoute, notFound, useParams } from "@tanstack/react-router";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { OrientationBody } from "@/components/voz/produto/OrientationBody";
import { VAI_ACONTECER, VAI_ACONTECER_STRUCTURE, findItem } from "@/lib/voz-protetora/content";

export const Route = createFileRoute("/_authenticated/voz-protetora/vai-acontecer/$slug")({
  head: () => ({
    meta: [
      { title: "Preparação — Vai acontecer — Voz Protetora" },
      { name: "description", content: "Preparação protetiva para a situação escolhida." },
      { property: "og:title", content: "Preparação — Voz Protetora" },
      { property: "og:description", content: "Preparação protetiva para a situação escolhida." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ params }) => {
    if (!findItem(VAI_ACONTECER, params.slug)) throw notFound();
    return null;
  },
  notFoundComponent: () => (
    <ProdutoShell
      title="Situação não encontrada"
      backTo={{ to: "/voz-protetora/vai-acontecer", label: "Voltar" }}
    >
      <p className="text-sm text-muted-foreground">Escolha uma situação na lista.</p>
    </ProdutoShell>
  ),
  component: VaiAcontecerDetalhe,
});

function VaiAcontecerDetalhe() {
  const { slug } = useParams({ from: "/_authenticated/voz-protetora/vai-acontecer/$slug" });
  const item = findItem(VAI_ACONTECER, slug);

  return (
    <ProdutoShell
      eyebrow="Vai acontecer"
      title={`${item?.emoji ?? ""} ${item?.title ?? "Preparação"}`.trim()}
      backTo={{ to: "/voz-protetora/vai-acontecer", label: "Voltar" }}
    >
      <OrientationBody blocks={item?.blocks ?? VAI_ACONTECER_STRUCTURE} />
    </ProdutoShell>
  );
}