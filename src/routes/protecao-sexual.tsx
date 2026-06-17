import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PortalPage } from "@/components/voz/PortalPage";

export const Route = createFileRoute("/protecao-sexual")({
  head: () => ({
    meta: [
      { title: "Proteção Sexual — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Prevenção do abuso sexual infantil: informação, educação e ferramentas para identificar sinais, proteger e agir com responsabilidade.",
      },
      { property: "og:title", content: "Proteção Sexual — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Informar é prevenir. Proteger é dever de todos.",
      },
    ],
  }),
  component: () => (
    <PortalPage
      eyebrow="Proteções · Sexual"
      icon={ShieldCheck}
      title="Proteção Sexual"
      subtitle="Informar é prevenir. Proteger é dever de todos."
      description="Recursos sérios e responsáveis para a prevenção do abuso sexual infantil: como reconhecer sinais, abrir o diálogo e criar ambientes verdadeiramente seguros."
    />
  ),
});