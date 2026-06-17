import { createFileRoute } from "@tanstack/react-router";
import { Video } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Vídeos — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Vídeos educativos sobre proteção infantil que explicam temas importantes de forma simples, visual e acessível.",
      },
      { property: "og:title", content: "Vídeos — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Conteúdos visuais que tornam a proteção infantil simples de entender.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Biblioteca · Vídeos"
      icon={Video}
      title="Vídeos que ensinam e sensibilizam"
      subtitle="Aprender vendo, sentir entendendo."
      description="Uma videoteca crescente com conteúdos que explicam temas essenciais da proteção infantil de forma clara, visual e emocionante."
    />
  ),
});