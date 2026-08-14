import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/seja-voz")({
  head: () => ({
    meta: [
      { title: "Seja Voz — Assuma o compromisso pela infância" },
      {
        name: "description",
        content:
          "Torne-se voz pela infância: assuma o compromisso de valorizar, orientar e zelar por cada criança na sua casa, escola e comunidade.",
      },
      { property: "og:title", content: "Seja Voz — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Assuma o compromisso público de proteger a infância.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Compromisso"
      title="Seja voz onde a criança está"
      intro="Ser voz é um compromisso simples e diário: perceber, orientar e agir com responsabilidade."
    >
      <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-xl font-bold text-primary">O compromisso</h2>
        <ol className="space-y-3">
          <li>1. Escutar as crianças com atenção verdadeira.</li>
          <li>2. Informar-me antes de julgar ou minimizar situações.</li>
          <li>3. Não silenciar diante de sinais de risco.</li>
          <li>4. Cuidar dos ambientes que a criança frequenta.</li>
          <li>5. Compartilhar informação responsável com outros adultos.</li>
        </ol>
        <div className="rounded-[10px] border border-border bg-secondary p-7">
          <p className="font-semibold text-primary">
            Comece agora: leve a Bússola Voz para o seu dia a dia.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero">
              <Link to="/bussola-voz">Acessar a Bússola Voz</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contato">Falar com o movimento</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  ),
});
