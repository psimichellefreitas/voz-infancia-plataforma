import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/protecao-social")({
  head: () => ({
    meta: [
      { title: "Proteção Social — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Proteção social da infância: direitos da criança, rede de apoio, comunidade e enfrentamento das vulnerabilidades sociais.",
      },
      { property: "og:title", content: "Proteção Social — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Proteger é também garantir direitos, dignidade e oportunidades.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Proteções · Social"
      icon={Users}
      title="Proteção Social"
      subtitle="Toda criança tem direito a crescer com dignidade."
      description="Conteúdos sobre direitos da criança, redes de apoio e enfrentamento das vulnerabilidades sociais, mobilizando comunidades inteiras em torno do cuidado."
    />
  ),
});