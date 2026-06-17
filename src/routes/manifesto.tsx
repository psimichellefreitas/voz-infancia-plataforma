import { createFileRoute } from "@tanstack/react-router";
import { Feather } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/manifesto")({
  head: () => ({
    meta: [
      { title: "Manifesto — Voz Pela Infância" },
      {
        name: "description",
        content:
          "O manifesto do Voz Pela Infância: nossos princípios, nossa fé na transformação e nosso compromisso inegociável com a proteção de cada criança.",
      },
      { property: "og:title", content: "Manifesto — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Toda criança merece um adulto que não se cale. Este é o nosso compromisso.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Manifesto"
      icon={Feather}
      title="Toda criança merece um adulto que não se cale"
      subtitle="Este é o nosso compromisso."
      description="Cremos que proteger a infância é responsabilidade de todos. Nosso manifesto reúne os princípios que guiam cada conteúdo, ferramenta e ação do Voz Pela Infância."
      ctaLabel="Assinar o manifesto"
    />
  ),
});