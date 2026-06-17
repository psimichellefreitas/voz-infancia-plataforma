import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Users, HeartHandshake, Flag, HandHeart, Globe2 } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/movimento")({
  head: () => ({
    meta: [
      { title: "Movimento — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Junte-se ao movimento nacional de proteção à infância. Una sua voz a milhares de pessoas que escolheram não se calar diante do cuidado com as crianças.",
      },
      { property: "og:title", content: "Movimento — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Um movimento nacional por cada criança. A proteção começa onde o silêncio termina.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Movimento"
      icon={Megaphone}
      title="Um movimento nacional por cada criança"
      subtitle="A proteção começa onde o silêncio termina."
      description="Somos pessoas, famílias, escolas, profissionais e igrejas unidas por um propósito: garantir que toda criança tenha um adulto que não se cale. Faça parte dessa rede de cuidado que cresce a cada dia."
      ctaLabel="Quero fazer parte"
      features={[
        {
          icon: Users,
          title: "Rede de pessoas",
          description:
            "Milhares de vozes conectadas em torno da proteção e do bem-estar da infância brasileira.",
        },
        {
          icon: Flag,
          title: "Causa nacional",
          description:
            "Campanhas, mobilizações e ações que levam o tema da proteção infantil a todo o país.",
        },
        {
          icon: HandHeart,
          title: "Cuidado em ação",
          description:
            "Mais do que conscientização: ferramentas práticas para transformar realidades.",
        },
        {
          icon: HeartHandshake,
          title: "Parcerias",
          description:
            "Instituições, voluntários e apoiadores construindo juntos um ecossistema de proteção.",
        },
        {
          icon: Globe2,
          title: "Alcance crescente",
          description:
            "Conteúdos e iniciativas que chegam a cada vez mais comunidades em todo o Brasil.",
        },
        {
          icon: Megaphone,
          title: "Sua voz importa",
          description:
            "Quando você se posiciona, inspira outros a também protegerem as crianças.",
        },
      ]}
    />
  ),
});