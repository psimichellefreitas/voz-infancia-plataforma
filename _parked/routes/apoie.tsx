import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/apoie")({
  head: () => ({
    meta: [
      { title: "Apoie o Voz — Sustente a proteção da infância" },
      {
        name: "description",
        content:
          "Apoie o Voz Pela Infância: divulgue, participe ou contribua para levar informação e formação a mais famílias e escolas.",
      },
      { property: "og:title", content: "Apoie o Voz Pela Infância" },
      { property: "og:description", content: "Formas de apoiar e ampliar o alcance do movimento." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Apoie"
      title="Ajude a levar essa voz mais longe"
      intro="Cada apoio amplia o alcance da informação que protege crianças."
    >
      <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
        <p>Você pode apoiar de três formas:</p>
        <ul className="space-y-3">
          <li>
            <strong className="text-primary">Divulgando</strong> — compartilhe os conteúdos com sua
            rede, escola ou comunidade.
          </li>
          <li>
            <strong className="text-primary">Participando</strong> — leve uma formação ou campanha
            para o seu contexto.
          </li>
          <li>
            <strong className="text-primary">Contribuindo</strong> — apoie a produção de materiais
            gratuitos.
          </li>
        </ul>
        <div className="pt-2">
          <Button asChild variant="hero" size="lg">
            <Link to="/contato">Quero apoiar</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  ),
});
