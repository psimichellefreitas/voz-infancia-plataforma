import { createFileRoute } from "@tanstack/react-router";
import { Smartphone } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/protecao-digital")({
  head: () => ({
    meta: [
      { title: "Proteção Digital — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Segurança das crianças no mundo digital: uso saudável de telas, privacidade, prevenção de riscos online e mediação parental.",
      },
      { property: "og:title", content: "Proteção Digital — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Cuidar das crianças também é cuidar do mundo digital em que elas vivem.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Proteções · Digital"
      icon={Smartphone}
      title="Proteção Digital"
      subtitle="Um mundo conectado também precisa ser seguro."
      description="Orientações e ferramentas para proteger crianças no ambiente online: uso consciente de telas, privacidade, prevenção de riscos e mediação familiar."
    />
  ),
});