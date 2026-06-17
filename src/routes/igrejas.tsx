import { createFileRoute } from "@tanstack/react-router";
import { Church } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/igrejas")({
  head: () => ({
    meta: [
      { title: "Para Igrejas — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Recursos e ferramentas para igrejas e comunidades de fé promoverem a proteção da infância com responsabilidade e cuidado.",
      },
      { property: "og:title", content: "Para Igrejas — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Comunidades de fé como espaços seguros de cuidado e acolhimento.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Para Você · Igrejas"
      icon={Church}
      title="Para Igrejas"
      subtitle="Cuidar das crianças é missão de cada comunidade."
      description="Conteúdos, políticas de proteção e ferramentas para que igrejas e comunidades de fé sejam ambientes verdadeiramente seguros e acolhedores para a infância."
    />
  ),
});