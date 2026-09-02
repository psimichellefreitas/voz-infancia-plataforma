import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/metodologia")({
  head: () => ({
    meta: [
      { title: "Metodologia — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Cultura Protetiva da Infância, Visão VOZ, Método dos 5C da Proteção, 5 Vozes da Proteção e Bússola VOZ — a estrutura que sustenta o movimento.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Metodologia"
      title="A estrutura que sustenta o movimento."
      intro="Cultura Protetiva da Infância, Visão VOZ, Método dos 5C da Proteção, 5 Vozes da Proteção e Bússola VOZ."
    >
      <p className="text-sm text-muted-foreground">
        Página em construção nesta versão do site. O conteúdo desta página será proposto e aprovado
        na etapa seguinte.
      </p>
    </PageShell>
  ),
});
