import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/protecao-emocional")({
  head: () => ({
    meta: [
      { title: "Proteção Emocional — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Como cuidar da saúde emocional das crianças: acolhimento, vínculo, escuta e segurança afetiva para um desenvolvimento saudável.",
      },
      { property: "og:title", content: "Proteção Emocional — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Acolher os sentimentos é proteger o futuro de cada criança.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Proteções · Emocional"
      icon={HeartPulse}
      title="Proteção Emocional"
      subtitle="Acolher os sentimentos é proteger o futuro."
      description="Conteúdos e ferramentas para fortalecer o vínculo, a escuta e a segurança afetiva das crianças, cuidando da saúde emocional desde os primeiros anos."
    />
  ),
});