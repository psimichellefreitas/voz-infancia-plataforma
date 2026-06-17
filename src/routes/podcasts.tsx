import { createFileRoute } from "@tanstack/react-router";
import { Mic } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/podcasts")({
  head: () => ({
    meta: [
      { title: "Podcasts — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Podcasts com conversas, histórias e reflexões sobre proteção infantil para ouvir onde e quando quiser.",
      },
      { property: "og:title", content: "Podcasts — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Conversas e reflexões sobre proteção da infância para ouvir onde quiser.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Biblioteca · Podcasts"
      icon={Mic}
      title="Conversas que dão voz à infância"
      subtitle="Reflexões para ouvir e levar com você."
      description="Episódios com especialistas, histórias reais e reflexões profundas sobre como proteger, acolher e cuidar das crianças em cada fase da vida."
    />
  ),
});