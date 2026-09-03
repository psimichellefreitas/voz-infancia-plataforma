import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Condições de uso do site e proteção da propriedade intelectual dos conteúdos e da metodologia da Voz Pela Infância.",
      },
      { property: "og:title", content: "Termos de Uso — Voz Pela Infância" },
      { property: "og:description", content: "Condições de uso do site e dos conteúdos." },
    ],
  }),
  component: TermosPage,
});

function H2({ children }: { children: string }) {
  return <h2 className="mt-10 text-lg font-semibold text-primary">{children}</h2>;
}

function TermosPage() {
  return (
    <PageShell eyebrow="Legal" title="Termos de Uso">
      <div className="rounded-[8px] border border-dashed border-border bg-secondary/60 p-4 text-xs text-muted-foreground">
        Rascunho. Antes de publicar, revisar com assessoria jurídica — em especial a seção de
        propriedade intelectual e o processo de registro da marca. Última atualização:{" "}
        <span className="text-muted-foreground/80">[a definir]</span>.
      </div>

      <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <H2>O que é este site</H2>
        <p>
          Este é o site institucional e educativo do movimento Voz Pela Infância. Seus conteúdos têm
          finalidade informativa e de mobilização.
        </p>

        <H2>O que este site não é</H2>
        <p>
          Não substitui avaliação profissional, atendimento psicológico, médico ou jurídico, nem os
          serviços da rede de proteção. <strong className="text-foreground">Não é canal de denúncia
          nem de emergência.</strong> Em situação de risco imediato a uma criança ou adolescente,
          acione o Conselho Tutelar, o Disque 100 ou a Polícia Militar (190).
        </p>

        <H2>Uso aceitável</H2>
        <p>
          Ao usar o site, você concorda em não empregar seus conteúdos para expor crianças, para
          investigação amadora, ou de qualquer forma que viole a legislação de proteção à infância.
        </p>

        <H2>Propriedade intelectual</H2>
        <ul className="ml-4 list-disc space-y-1.5">
          <li>
            Todo o conteúdo deste site — textos, materiais, estrutura e identidade — é de autoria do
            movimento Voz Pela Infância / Michelle Freitas e protegido por direitos autorais.
          </li>
          <li>
            Os nomes e expressões <strong className="text-foreground">Voz Pela Infância</strong>,
            {" "}
            <strong className="text-foreground">Cultura Protetiva da Infância</strong>,{" "}
            <strong className="text-foreground">Visão VOZ</strong>,{" "}
            <strong className="text-foreground">Método dos 5C da Proteção</strong>,{" "}
            <strong className="text-foreground">5 Vozes da Proteção</strong> e{" "}
            <strong className="text-foreground">Bússola VOZ</strong>, bem como a metodologia que
            representam, são de titularidade do movimento. A marca “Voz Pela Infância” encontra-se em
            processo de registro (uso de ™).
          </li>
          <li>
            São vedadas a reprodução total, a adaptação, a redistribuição, a criação de obras
            derivadas e o uso comercial sem autorização prévia e expressa. É permitida a citação de
            trechos, com atribuição à Voz Pela Infância e link para a fonte.
          </li>
        </ul>

        <H2>Links externos</H2>
        <p>
          O site pode conter links para páginas de terceiros. Não nos responsabilizamos pelo
          conteúdo, pelas práticas de privacidade ou pela disponibilidade desses sites.
        </p>

        <H2>Limitação de responsabilidade</H2>
        <p>
          Os conteúdos têm caráter educativo e não garantem resultados. As decisões diante de
          situações concretas são de responsabilidade de quem as toma, que deve buscar orientação
          adequada e acionar os serviços competentes quando necessário.
        </p>

        <H2>Alterações destes termos</H2>
        <p>
          Podemos atualizar estes termos. O uso continuado do site após a atualização implica
          concordância com a versão vigente.
        </p>

        <H2>Lei aplicável</H2>
        <p>
          Estes termos são regidos pela legislação brasileira. Dúvidas podem ser encaminhadas pela{" "}
          <Link to="/contato" className="font-semibold text-primary hover:text-accent">
            página de contato
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
