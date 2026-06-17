import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, MapPin, HeartHandshake } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Fale com o Voz Pela Infância. Tire dúvidas, proponha parcerias ou una sua voz ao movimento de proteção da infância.",
      },
      { property: "og:title", content: "Contato — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Estamos prontos para ouvir você. Vamos proteger juntos.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Contato"
      icon={Mail}
      title="Vamos conversar"
      subtitle="Sua voz também faz parte desta história."
      description="Tire dúvidas, proponha parcerias, compartilhe ideias ou simplesmente diga olá. Estamos prontos para ouvir você e construir juntos um Brasil mais seguro para as crianças."
      ctaLabel="Quero apoiar o movimento"
      features={[
        {
          icon: MessageCircle,
          title: "Atendimento",
          description: "Fale com nossa equipe por e-mail ou redes sociais.",
        },
        {
          icon: HeartHandshake,
          title: "Parcerias",
          description: "Instituições e empresas que querem proteger a infância conosco.",
        },
        {
          icon: MapPin,
          title: "Instituto Iluminar",
          description: "Uma iniciativa comprometida com a transformação de realidades.",
        },
      ]}
    />
  ),
});