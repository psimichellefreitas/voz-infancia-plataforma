import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/artigos")({
  head: () => ({
    meta: [
      { title: "Artigos — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Artigos aprofundados sobre proteção, desenvolvimento, educação e cuidado infantil, escritos com responsabilidade e linguagem acessível.",
      },
      { property: "og:title", content: "Artigos — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Conteúdo aprofundado e confiável sobre proteção e cuidado com a infância.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Biblioteca · Artigos"
      icon={FileText}
      title="Artigos que informam e transformam"
      subtitle="Conhecimento profundo, linguagem acessível."
      description="Reflexões, pesquisas e orientações sobre proteção infantil escritas para ajudar pais, educadores e profissionais a cuidarem melhor das crianças."
    />
  ),
});