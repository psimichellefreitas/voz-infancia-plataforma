import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Presentation, Users, Globe2 } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Eventos, encontros, palestras e capacitações do movimento Voz Pela Infância em todo o Brasil.",
      },
      { property: "og:title", content: "Eventos — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Encontros que mobilizam, capacitam e transformam comunidades.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Eventos"
      icon={CalendarDays}
      title="Encontros que transformam"
      subtitle="Juntos, ampliamos o cuidado."
      description="Palestras, congressos, treinamentos e mobilizações que reúnem pessoas comprometidas com a proteção da infância em todo o Brasil, presencialmente e online."
      features={[
        {
          icon: Presentation,
          title: "Palestras",
          description: "Conteúdos inspiradores com especialistas em proteção infantil.",
        },
        {
          icon: Users,
          title: "Capacitações",
          description: "Treinamentos para pais, educadores e profissionais.",
        },
        {
          icon: Globe2,
          title: "Online e presencial",
          description: "Participe de onde estiver, em qualquer lugar do país.",
        },
      ]}
    />
  ),
});