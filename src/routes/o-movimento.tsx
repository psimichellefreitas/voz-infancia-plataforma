import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/o-movimento")({
  head: () => ({
    meta: [
      { title: "O Movimento — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Conheça o Voz Pela Infância: origem, propósito e a forma como valorizamos, orientamos e zelamos pela infância.",
      },
      { property: "og:title", content: "O Movimento — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Origem, propósito e princípios do movimento em defesa da infância.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Quem somos"
      title="Um movimento nascido do cuidado, sustentado pela responsabilidade"
      intro="O Voz Pela Infância existe para que nenhuma criança dependa do silêncio dos adultos ao seu redor."
    >
      <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          Acreditamos que proteger a infância não começa na denúncia, mas na atenção diária: no modo
          como escutamos, no ambiente que sustentamos e nas decisões que tomamos por elas.
        </p>
        <p>
          Por isso reunimos informação confiável, formação prática e mobilização social em uma
          linguagem acessível — sem sensacionalismo, sem alarmismo, sem exposição de crianças.
        </p>
        <h2 className="pt-4 text-xl font-bold text-primary">No que acreditamos</h2>
        <ul className="space-y-3">
          <li>Toda criança merece adultos presentes, preparados e atentos.</li>
          <li>Prevenção é mais eficaz do que reação.</li>
          <li>Informação responsável protege; medo paralisa.</li>
          <li>Proteção é obra coletiva: família, escola, comunidade e instituições.</li>
        </ul>
      </div>
    </PageShell>
  ),
});
