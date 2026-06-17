import { createFileRoute } from "@tanstack/react-router";
import { Wrench, ClipboardCheck, Bell, ShieldCheck } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/ferramentas")({
  head: () => ({
    meta: [
      { title: "Ferramentas — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Ferramentas práticas e tecnologias para apoiar pais, escolas e profissionais na proteção das crianças no dia a dia.",
      },
      { property: "og:title", content: "Ferramentas — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Tecnologia a serviço da proteção infantil.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Ferramentas"
      icon={Wrench}
      title="Tecnologia a serviço da proteção"
      subtitle="Recursos práticos para proteger melhor."
      description="Aplicativos, checklists, avaliações e ferramentas digitais criadas para tornar a proteção infantil mais simples, acessível e eficaz no dia a dia."
      features={[
        {
          icon: ClipboardCheck,
          title: "Checklists",
          description: "Listas práticas para avaliar ambientes e rotinas mais seguros.",
        },
        {
          icon: Bell,
          title: "Sinais de alerta",
          description: "Recursos para reconhecer sinais e saber como agir com responsabilidade.",
        },
        {
          icon: ShieldCheck,
          title: "Aplicativos",
          description: "Tecnologias pensadas para fortalecer o cuidado com as crianças.",
        },
      ]}
    />
  ),
});