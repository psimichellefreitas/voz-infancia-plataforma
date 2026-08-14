import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/solucoes/voz-protetora")({
  head: () => ({
    meta: [
      { title: "Voz Protetora — Conhecimento em prática" },
      {
        name: "description",
        content:
          "O Voz Protetora reúne formação e orientação para transformar conhecimento sobre proteção da infância em prática cotidiana.",
      },
      { property: "og:title", content: "Voz Protetora — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Formação e orientação para fortalecer a Cultura Protetiva.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VozProtetoraPage,
});

function VozProtetoraPage() {
  return (
    <PageShell
      eyebrow="Soluções"
      title="Voz Protetora"
      intro="Um caminho de formação e orientação para transformar conhecimento sobre proteção da infância em prática cotidiana."
    >
      <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
        <p>
          O Voz Protetora aprofunda os temas apresentados nos Recursos e apoia famílias,
          profissionais e instituições na construção de ambientes mais protetivos.
        </p>
        <div className="rounded-[10px] border border-border bg-secondary p-7">
          <p className="font-semibold text-primary">
            Quer saber mais sobre o Voz Protetora?
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero">
              <Link to="/contato">Falar com o movimento</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/recursos">Voltar aos recursos</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
