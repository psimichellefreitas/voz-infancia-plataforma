import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/conteudos")({
  head: () => ({
    meta: [
      { title: "Conteúdos — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Conteúdos que ajudam a reconhecer a proteção da infância nas situações reais do dia a dia.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Conteúdos"
      title="Aprender no dia a dia."
      intro="Conteúdos que ajudam a reconhecer a proteção — ou a sua ausência — nas situações reais da vida com crianças."
    >
      <p className="text-sm text-muted-foreground">
        Página em construção nesta versão do site. Os conteúdos serão organizados pelos seis
        territórios do Sistema Editorial (Educação, Cotidiano, Resposta, Rede, Mobilização, Voz
        Institucional).
      </p>
    </PageShell>
  ),
});
