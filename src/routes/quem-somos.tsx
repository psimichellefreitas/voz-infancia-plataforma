import { createFileRoute } from "@tanstack/react-router";
import { Building2, Target, Eye, Heart } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Conheça o Voz Pela Infância, iniciativa do Instituto Iluminar: nossa missão, visão e valores na proteção da infância brasileira.",
      },
      { property: "og:title", content: "Quem Somos — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Uma iniciativa do Instituto Iluminar pela proteção de cada criança.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Quem Somos"
      icon={Building2}
      title="Uma iniciativa que nasceu para proteger"
      subtitle="Voz Pela Infância — um projeto do Instituto Iluminar."
      description="Somos um movimento que une tecnologia, educação, fé e conscientização para proteger crianças. Acreditamos que informação e cuidado podem transformar realidades e salvar histórias."
      ctaLabel="Conheça nosso manifesto"
      ctaTo="/manifesto"
      features={[
        {
          icon: Target,
          title: "Missão",
          description:
            "Levar conscientização, educação e tecnologia para proteger crianças em todo o Brasil.",
        },
        {
          icon: Eye,
          title: "Visão",
          description:
            "Ser a maior referência brasileira em proteção da infância, acessível a todos.",
        },
        {
          icon: Heart,
          title: "Valores",
          description:
            "Cuidado, responsabilidade, esperança, autoridade e amor incondicional pela infância.",
        },
      ]}
    />
  ),
});