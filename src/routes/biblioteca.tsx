import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, FileText, BookMarked, Video, Mic } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca — Voz Pela Infância" },
      {
        name: "description",
        content:
          "A biblioteca do Voz Pela Infância reúne artigos, guias, vídeos e podcasts sobre proteção infantil em um só lugar, gratuito e confiável.",
      },
      { property: "og:title", content: "Biblioteca — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Conhecimento que protege: artigos, guias, vídeos e podcasts em um só lugar.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Biblioteca"
      icon={BookOpen}
      title="Conhecimento que protege"
      subtitle="Tudo o que você precisa saber, em um só lugar."
      description="Uma biblioteca viva de artigos, guias, vídeos e podcasts criada para informar, capacitar e inspirar quem cuida da infância. Confiável, acessível e em constante crescimento."
      ctaLabel="Explorar conteúdos"
      ctaTo="/artigos"
      features={[
        {
          icon: FileText,
          title: "Artigos",
          description: "Textos aprofundados sobre proteção, desenvolvimento e cuidado infantil.",
        },
        {
          icon: BookMarked,
          title: "Guias",
          description: "Materiais práticos passo a passo para aplicar no dia a dia.",
        },
        {
          icon: Video,
          title: "Vídeos",
          description: "Conteúdos visuais que explicam temas complexos de forma simples.",
        },
        {
          icon: Mic,
          title: "Podcasts",
          description: "Conversas e reflexões para ouvir onde e quando quiser.",
        },
      ]}
    />
  ),
});