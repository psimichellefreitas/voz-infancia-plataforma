import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, BookOpen, GraduationCap, Gift } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Produtos digitais, cursos e materiais que ajudam a proteger a infância e sustentam o crescimento do movimento.",
      },
      { property: "og:title", content: "Produtos — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Materiais e cursos que protegem crianças e fortalecem o movimento.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Produtos"
      icon={ShoppingBag}
      title="Produtos com propósito"
      subtitle="Cada compra fortalece a proteção da infância."
      description="Cursos, materiais digitais e recursos cuidadosamente criados para capacitar quem cuida das crianças e sustentar a missão do Voz Pela Infância."
      features={[
        {
          icon: GraduationCap,
          title: "Cursos",
          description: "Formações completas sobre proteção e cuidado com a infância.",
        },
        {
          icon: BookOpen,
          title: "Materiais digitais",
          description: "E-books, kits e recursos prontos para aplicar.",
        },
        {
          icon: Gift,
          title: "Apoie a causa",
          description: "Produtos que transformam seu apoio em proteção real.",
        },
      ]}
    />
  ),
});