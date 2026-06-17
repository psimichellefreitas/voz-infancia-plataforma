import { createFileRoute } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/guias")({
  head: () => ({
    meta: [
      { title: "Guias — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Guias práticos e passo a passo para proteger crianças no dia a dia, em casa, na escola e na comunidade.",
      },
      { property: "og:title", content: "Guias — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Materiais práticos para aplicar a proteção infantil no dia a dia.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Biblioteca · Guias"
      icon={BookMarked}
      title="Guias práticos para proteger no dia a dia"
      subtitle="Do conhecimento à ação."
      description="Materiais objetivos e passo a passo que ajudam famílias, escolas e profissionais a colocarem a proteção infantil em prática de forma simples e segura."
    />
  ),
});