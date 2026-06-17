import { createFileRoute } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/profissionais")({
  head: () => ({
    meta: [
      { title: "Para Profissionais — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Recursos, capacitação e ferramentas para profissionais que atuam na proteção, saúde, educação e assistência à infância.",
      },
      { property: "og:title", content: "Para Profissionais — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Capacitação e ferramentas para quem dedica a vida a cuidar da infância.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Para Você · Profissionais"
      icon={Stethoscope}
      title="Para Profissionais"
      subtitle="Conhecimento técnico a serviço da proteção."
      description="Materiais de capacitação, protocolos e ferramentas para profissionais de saúde, educação, assistência social e direito que atuam na linha de frente da proteção infantil."
    />
  ),
});