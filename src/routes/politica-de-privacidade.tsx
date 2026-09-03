import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Como a Voz Pela Infância trata dados pessoais, consentimento e comunicações, em conformidade com a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade — Voz Pela Infância" },
      { property: "og:description", content: "Tratamento de dados pessoais e privacidade no site." },
    ],
  }),
  component: PrivacidadePage,
});

function H2({ children }: { children: string }) {
  return <h2 className="mt-10 text-lg font-semibold text-primary">{children}</h2>;
}

function PrivacidadePage() {
  return (
    <PageShell eyebrow="Legal" title="Política de Privacidade">
      <div className="rounded-[8px] border border-dashed border-border bg-secondary/60 p-4 text-xs text-muted-foreground">
        Rascunho. Antes de publicar, revisar com assessoria jurídica e completar os dados do
        controlador. Última atualização: <span className="text-muted-foreground/80">[a definir]</span>.
      </div>

      <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <H2>Quem é responsável pelos dados</H2>
        <p>
          A Voz Pela Infância é o controlador dos dados tratados neste site.
          <span className="text-muted-foreground/80"> [Incluir identificação formal — responsável
          legal / CNPJ, quando houver — e o canal do encarregado.]</span> Contato para assuntos de
          privacidade: pela{" "}
          <Link to="/contato" className="font-semibold text-primary hover:text-accent">
            página de contato
          </Link>
          .
        </p>

        <H2>Quais dados coletamos</H2>
        <ul className="ml-4 list-disc space-y-1.5">
          <li>
            <strong className="text-foreground">Inscrição para novidades:</strong> nome e e-mail,
            fornecidos por você e mediante consentimento explícito.
          </li>
          <li>
            <strong className="text-foreground">Contato:</strong> os dados que você inclui na
            mensagem (nome, e-mail e o conteúdo enviado).
          </li>
          <li>
            <strong className="text-foreground">Navegação:</strong> atualmente não utilizamos
            ferramentas de análise de audiência. Usamos apenas armazenamento essencial no seu
            navegador (preferência de tema e do aviso de cookies). Caso venhamos a adotar medição de
            audiência, esta política será atualizada e o consentimento solicitado quando exigido.
          </li>
        </ul>

        <H2>Para que usamos</H2>
        <p>
          Responder aos seus contatos; enviar os conteúdos e comunicações que você solicitou;
          entender de forma agregada como o site é usado, para melhorá-lo.
        </p>

        <H2>Base legal</H2>
        <p>
          O envio de novidades ocorre com base no seu <strong className="text-foreground">consentimento</strong>
          {" "}
          (art. 7º, I, da LGPD). O atendimento a contatos ocorre para a realização de diligências a
          seu pedido (art. 7º, V).
        </p>

        <H2>Compartilhamento</H2>
        <p>
          Não vendemos nem compartilhamos dados pessoais para fins comerciais. Utilizamos provedores
          de tecnologia (hospedagem e, futuramente, envio de e-mail) apenas para operar o serviço,
          sob obrigação de confidencialidade e segurança.
        </p>

        <H2>Por quanto tempo guardamos</H2>
        <p>
          Enquanto durar a finalidade que justificou a coleta, ou até que você solicite a exclusão
          ou retire o consentimento — o que ocorrer primeiro.
        </p>

        <H2>Seus direitos</H2>
        <p>
          Conforme o art. 18 da LGPD, você pode solicitar confirmação e acesso, correção,
          anonimização ou exclusão, portabilidade, informação sobre compartilhamentos e revogação do
          consentimento. Para exercê-los, use a{" "}
          <Link to="/contato" className="font-semibold text-primary hover:text-accent">
            página de contato
          </Link>
          . O descadastro das novidades também poderá ser feito pelo link presente em cada e-mail.
        </p>

        <H2>Crianças e adolescentes</H2>
        <p>
          O site destina-se a pessoas adultas. Não coletamos intencionalmente dados de crianças ou
          adolescentes e não publicamos imagens ou informações que possam identificar crianças em
          situação de vulnerabilidade.
        </p>

        <H2>Segurança</H2>
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra acesso
          não autorizado, perda ou alteração indevida.
        </p>

        <H2>Alterações desta política</H2>
        <p>
          Podemos atualizar este documento. A data de atualização é indicada no início da página.
        </p>
      </div>
    </PageShell>
  );
}
