import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";
import { MANIFESTO } from "@/components/voz/nav";

export const Route = createFileRoute("/participe")({
  head: () => ({
    meta: [
      { title: "Participe — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Receba novos conteúdos, compartilhe e leve a Voz Pela Infância para a sua instituição.",
      },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Participe" title={MANIFESTO}>
      <p className="text-sm text-muted-foreground">
        Página em construção nesta versão do site. Aqui ficarão a inscrição para novidades, o convite
        ao compartilhamento consciente e o contato para levar a Voz à sua instituição.
      </p>
    </PageShell>
  ),
});
