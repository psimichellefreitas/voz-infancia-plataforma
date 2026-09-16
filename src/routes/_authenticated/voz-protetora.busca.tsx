import { createFileRoute } from "@tanstack/react-router";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { SearchBox } from "@/components/voz/produto/SearchBox";

export const Route = createFileRoute("/_authenticated/voz-protetora/busca")({
  head: () => ({
    meta: [
      { title: "Buscar: Voz Protetora" },
      {
        name: "description",
        content: "Busque por sua dúvida entre as orientações do Voz Protetora.",
      },
      { property: "og:title", content: "Buscar: Voz Protetora" },
      { property: "og:description", content: "Busque por sua dúvida entre as orientações." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BuscaPage,
});

function BuscaPage() {
  return (
    <ProdutoShell
      eyebrow="🔎 Buscar"
      title="Qual é a sua dúvida?"
      intro="Digite uma palavra ou uma frase: buscamos em todas as situações e temas do Voz Protetora."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      <SearchBox autoFocus />
    </ProdutoShell>
  );
}
