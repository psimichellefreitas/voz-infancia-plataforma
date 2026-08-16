import { createFileRoute, notFound, useParams } from "@tanstack/react-router";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { OrientationBody } from "@/components/voz/produto/OrientationBody";
import { FORTALECER, FORTALECER_STRUCTURE, findItem } from "@/lib/voz-protetora/content";

export const Route = createFileRoute("/_authenticated/voz-protetora/fortalecer/$slug")({
  head: () => ({
    meta: [
      { title: "Tema — Quero fortalecer — Voz Protetora" },
      { name: "description", content: "Orientação para fortalecer sua prática protetiva." },
      { property: "og:title", content: "Tema — Voz Protetora" },
      { property: "og:description", content: "Orientação para fortalecer sua prática protetiva." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ params }) => {
    if (!findItem(FORTALECER, params.slug)) throw notFound();
    return null;
  },
  notFoundComponent: () => (
    <ProdutoShell
      title="Tema não encontrado"
      backTo={{ to: "/voz-protetora/fortalecer", label: "Voltar" }}
    >
      <p className="text-sm text-muted-foreground">Escolha um tema na lista.</p>
    </ProdutoShell>
  ),
  component: FortalecerDetalhe,
});

function FortalecerDetalhe() {
  const { slug } = useParams({ from: "/_authenticated/voz-protetora/fortalecer/$slug" });
  const item = findItem(FORTALECER, slug);

  return (
    <ProdutoShell
      eyebrow="Quero fortalecer"
      title={`${item?.emoji ?? ""} ${item?.title ?? "Tema"}`.trim()}
      backTo={{ to: "/voz-protetora/fortalecer", label: "Voltar" }}
    >
      <OrientationBody blocks={item?.blocks ?? FORTALECER_STRUCTURE} />
    </ProdutoShell>
  );
}