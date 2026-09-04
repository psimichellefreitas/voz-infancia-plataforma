import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/acessibilidade")({
  head: () => ({
    meta: [
      { title: "Acessibilidade — Voz Pela Infância" },
      {
        name: "description",
        content:
          "O compromisso da Voz Pela Infância com um site acessível: contraste, navegação por teclado, textos alternativos e linguagem clara.",
      },
      { property: "og:title", content: "Acessibilidade — Voz Pela Infância" },
      { property: "og:description", content: "Compromisso de acessibilidade e como relatar barreiras." },
    ],
  }),
  component: AcessibilidadePage,
});

function H2({ children }: { children: string }) {
  return <h2 className="mt-10 text-lg font-semibold text-primary">{children}</h2>;
}

const COMPROMISSO = [
  "contraste de cor adequado nos temas claro e escuro",
  "navegação por teclado e foco visível",
  "hierarquia de títulos e marcação semântica",
  "textos alternativos em imagens e ilustrações",
  "legendas em vídeos, quando houver",
  "linguagem clara, evitando jargão desnecessário",
  "layout responsivo, legível em telas pequenas",
  "respeito à preferência do sistema por menos movimento",
];

function AcessibilidadePage() {
  return (
    <PageShell
      eyebrow="Acessibilidade"
      title="Um site para todas as pessoas"
      intro="A Voz Pela Infância busca um site que possa ser usado por pessoas com diferentes necessidades, em diferentes dispositivos."
    >
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <H2>Nosso compromisso</H2>
        <ul className="ml-4 list-disc space-y-1.5">
          {COMPROMISSO.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <H2>Em construção</H2>
        <p>
          A identidade visual do site ainda é provisória. Ajustes finos de acessibilidade —
          incluindo revisão de contraste e testes com leitores de tela — serão feitos ao longo do
          desenvolvimento.
        </p>

        <H2>Encontrou uma barreira?</H2>
        <p>
          Se você teve dificuldade para usar alguma parte do site, conte para nós pela{" "}
          <Link to="/contato" className="font-semibold text-primary hover:text-accent">
            página de contato
          </Link>
          , indicando a página e o que aconteceu. Isso nos ajuda a corrigir.
        </p>

        <p className="pt-4 text-xs text-muted-foreground/80">
          Última atualização: [a definir].
        </p>
      </div>
    </PageShell>
  );
}
