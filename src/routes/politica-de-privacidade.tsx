import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade: Voz Pela Infância" },
      {
        name: "description",
        content:
          "Como a Voz Pela Infância trata dados pessoais, consentimento e comunicações, em conformidade com a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade: Voz Pela Infância" },
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
          <span className="text-muted-foreground/80"> [Incluir identificação formal: responsável
          legal / CNPJ, quando houver, e o canal do encarregado.]</span> Contato para assuntos de
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
          <li>
            <strong className="text-foreground">Compra e área do Voz Protetora:</strong> veja a
            seção abaixo.
          </li>
        </ul>

        <H2>Compra e área do Voz Protetora</H2>
        <p>
          <strong className="text-foreground">Dados da compra e do acesso.</strong> Para vender o
          Voz Protetora e liberar o acesso, tratamos:
        </p>
        <ul className="ml-4 list-disc space-y-1.5">
          <li>nome e e-mail informados na compra;</li>
          <li>
            dados da compra: valor, data, situação do pagamento e o código do pagamento;
          </li>
          <li>liberação de acesso: o registro de que o e-mail tem acesso ao produto;</li>
          <li>
            login: o e-mail usado para entrar, por link ou código enviado por e-mail.
          </li>
        </ul>
        <p>
          Não pedimos nem guardamos número de cartão.{" "}
          <strong className="text-foreground">
            O pagamento é processado pelo Mercado Pago
          </strong>
          , que trata os dados de pagamento conforme a política dele. Recebemos apenas a
          confirmação e a situação do pagamento.
        </p>
        <p>
          <strong className="text-foreground">Dados que ficam só no seu aparelho.</strong> O que
          você escreve ou escolhe dentro do Voz Protetora fica guardado apenas no navegador do seu
          aparelho, e não é enviado a nós:
        </p>
        <ul className="ml-4 list-disc space-y-1.5">
          <li>anotações de "Meu Passo de Proteção" e de "Minha Presença Protetiva";</li>
          <li>quais avisos você leu;</li>
          <li>a faixa etária escolhida, o tamanho da letra e a preferência de tema claro ou escuro.</li>
        </ul>
        <p>
          Por isso, ao trocar de aparelho ou limpar os dados do navegador, essas informações não
          acompanham você. Orientamos que não sejam escritos nomes nem dados que identifiquem uma
          criança.
        </p>
        <p>
          <strong className="text-foreground">Onde os dados ficam e quem os trata.</strong>{" "}
          Utilizamos provedores de tecnologia para operar o serviço, apenas para essa finalidade:
        </p>
        <ul className="ml-4 list-disc space-y-1.5">
          <li>
            <strong className="text-foreground">Supabase</strong> (banco de dados e login): nome,
            e-mail, compra e acesso; servidor em São Paulo (Brasil).
          </li>
          <li>
            <strong className="text-foreground">Mercado Pago</strong> (pagamento): dados de
            pagamento, com controle próprio sobre esses dados.
          </li>
          <li>
            <strong className="text-foreground">Resend</strong> (envio de e-mails de acesso):
            e-mail do destinatário e registro de envio.{" "}
            <span className="text-muted-foreground/80">[a confirmar: localização dos servidores]</span>
          </li>
          <li>
            <strong className="text-foreground">Vercel</strong> (hospedagem do site): dados
            técnicos de acesso.{" "}
            <span className="text-muted-foreground/80">[a confirmar: localização dos servidores]</span>
          </li>
        </ul>
        <p className="text-muted-foreground/80">
          [Revisão jurídica: se algum provedor tratar dados fora do Brasil, incluir a menção à
          transferência internacional e à base legal correspondente (LGPD, art. 33).]
        </p>
        <p>
          <strong className="text-foreground">Por quanto tempo guardamos a compra.</strong>{" "}
          <span className="text-muted-foreground/80">[a definir]</span> Os dados da compra e do
          acesso são guardados enquanto o acesso ao produto existir e pelo prazo exigido em lei.{" "}
          <span className="text-muted-foreground/80">
            [Definir prazos e a rotina de exclusão ou anonimização.]
          </span>
        </p>
        <p>
          <strong className="text-foreground">Sugestão de tema.</strong> Se você enviar o assunto de
          uma busca sem resultado, guardamos apenas o texto enviado, para decidirmos novas
          orientações. A mensagem não leva o seu nome nem o seu e-mail e não recebe resposta. Não
          escreva nomes nem dados que identifiquem uma criança. As mensagens são apagadas depois de
          180 dias.
        </p>
        <p>
          <strong className="text-foreground">Crianças e adolescentes.</strong> O Voz Protetora é
          destinado a adultos. O produto não coleta dados de crianças e orienta o adulto a não
          registrar nele informações que identifiquem uma criança.
        </p>

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
          seu pedido (art. 7º, V). O tratamento dos dados da compra e do acesso ocorre para a
          execução do contrato de compra do produto (art. 7º, V), e a guarda de registros de compra
          pode também decorrer de obrigação legal ou regulatória (art. 7º, II).{" "}
          <span className="text-muted-foreground/80">
            [Revisão jurídica: confirmar as bases e os prazos aplicáveis.]
          </span>
        </p>

        <H2>Compartilhamento</H2>
        <p>
          Não vendemos nem compartilhamos dados pessoais para fins comerciais. Utilizamos provedores
          de tecnologia (hospedagem, banco de dados, envio de e-mail e processamento de pagamento)
          apenas para operar o serviço,
          sob obrigação de confidencialidade e segurança.
        </p>

        <H2>Por quanto tempo guardamos</H2>
        <p>
          Enquanto durar a finalidade que justificou a coleta, ou até que você solicite a exclusão
          ou retire o consentimento, o que ocorrer primeiro.
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
