import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Condições de uso dos conteúdos, materiais e informações publicados pelo Voz Pela Infância.",
      },
      { property: "og:title", content: "Termos de Uso — Voz Pela Infância" },
      { property: "og:description", content: "Condições de uso do portal e dos conteúdos." },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Legal" title="Termos de Uso">
      <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          Os conteúdos deste portal têm finalidade informativa e educativa e não substituem
          avaliação profissional, jurídica ou clínica.
        </p>
        <p>
          É permitida a citação dos materiais com atribuição ao Voz Pela Infância. Reproduções
          integrais, adaptações ou usos comerciais dependem de autorização prévia.
        </p>
        <p>
          Ao utilizar o site, você concorda em não empregar seus conteúdos para práticas que exponham
          crianças ou violem a legislação de proteção à infância.
        </p>
      </div>
    </PageShell>
  ),
});
