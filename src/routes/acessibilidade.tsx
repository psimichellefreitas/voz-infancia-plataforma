import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/acessibilidade")({
  head: () => ({
    meta: [
      { title: "Acessibilidade — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Compromisso da Voz Pela Infância com um site acessível: contraste, navegação por teclado, textos alternativos e linguagem clara.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Acessibilidade"
      title="Um site para todas as pessoas."
      intro="A Voz Pela Infância busca contraste adequado, navegação por teclado, textos alternativos em imagens, legendas em vídeos e linguagem compreensível."
    >
      <p className="text-sm text-muted-foreground">
        Página em construção nesta versão do site. Aqui ficará a declaração de acessibilidade e um
        canal para relatar barreiras encontradas.
      </p>
    </PageShell>
  ),
});
