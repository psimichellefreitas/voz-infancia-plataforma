import { createFileRoute } from "@tanstack/react-router";
import { School } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/escolas")({
  head: () => ({
    meta: [
      { title: "Para Escolas — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Programas, materiais e ferramentas para escolas se tornarem ambientes seguros e protetores para todas as crianças.",
      },
      { property: "og:title", content: "Para Escolas — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Escolas que protegem transformam comunidades inteiras.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Para Você · Escolas"
      icon={School}
      title="Para Escolas"
      subtitle="Ambientes que ensinam e protegem."
      description="Programas, formações e materiais para educadores e gestores construírem escolas seguras, acolhedoras e preparadas para proteger cada criança."
    />
  ),
});