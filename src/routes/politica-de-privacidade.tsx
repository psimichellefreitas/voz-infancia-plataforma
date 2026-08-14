import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Como o Voz Pela Infância trata dados pessoais, cookies e comunicações, em conformidade com a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade — Voz Pela Infância" },
      { property: "og:description", content: "Tratamento de dados e privacidade no portal." },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Legal" title="Política de Privacidade">
      <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          Coletamos apenas os dados necessários para responder contatos e enviar conteúdos
          solicitados. Não vendemos nem compartilhamos dados pessoais com terceiros para fins
          comerciais.
        </p>
        <p>
          Utilizamos dados de navegação de forma agregada para melhorar a experiência do site. Você
          pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo nosso
          canal de contato, conforme a Lei Geral de Proteção de Dados (LGPD).
        </p>
        <p>
          Não publicamos imagens ou informações que possam identificar crianças em situação de
          vulnerabilidade.
        </p>
      </div>
    </PageShell>
  ),
});
