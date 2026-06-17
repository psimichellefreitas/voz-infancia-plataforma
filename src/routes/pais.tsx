import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/pais")({
  head: () => ({
    meta: [
      { title: "Para Pais — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Conteúdos, guias e ferramentas para pais e responsáveis protegerem e cuidarem dos seus filhos com confiança e amor.",
      },
      { property: "og:title", content: "Para Pais — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Apoio prático e acolhedor para quem ama e protege uma criança.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Para Você · Pais"
      icon={Users}
      title="Para Pais e Responsáveis"
      subtitle="Você é a primeira voz de proteção."
      description="Orientações, guias e ferramentas para ajudar você a proteger, educar e acolher seus filhos com mais segurança, presença e amor em cada fase da vida."
    />
  ),
});