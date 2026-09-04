import { createFileRoute, notFound, useParams } from "@tanstack/react-router";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { OrientationBody } from "@/components/voz/produto/OrientationBody";
import { ACONTECEU, ACONTECEU_STRUCTURE, findItem } from "@/lib/voz-protetora/content";

export const Route = createFileRoute("/_authenticated/voz-protetora/aconteceu/$slug")({
  head: () => ({
    meta: [
      { title: "Orientação — Aconteceu — Voz Protetora" },
      { name: "description", content: "Orientação prática para a situação escolhida." },
      { property: "og:title", content: "Orientação — Voz Protetora" },
      { property: "og:description", content: "Orientação prática para a situação escolhida." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ params }) => {
    if (!findItem(ACONTECEU, params.slug)) throw notFound();
    return null;
  },
  notFoundComponent: () => (
    <ProdutoShell
      title="Situação não encontrada"
      backTo={{ to: "/voz-protetora/aconteceu", label: "Voltar para Aconteceu" }}
    >
      <p className="text-sm text-muted-foreground">Escolha uma situação na lista.</p>
    </ProdutoShell>
  ),
  component: AcontceuDetalhe,
});

function AcontceuDetalhe() {
  const { slug } = useParams({ from: "/_authenticated/voz-protetora/aconteceu/$slug" });
  const item = findItem(ACONTECEU, slug);

  return (
    <ProdutoShell
      eyebrow="Aconteceu"
      title={item?.title ?? "Orientação"}
      backTo={{ to: "/voz-protetora/aconteceu", label: "Voltar para Aconteceu" }}
    >
      <OrientationBody blocks={item?.blocks ?? ACONTECEU_STRUCTURE} />
    </ProdutoShell>
  );
}
