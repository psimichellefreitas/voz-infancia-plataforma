import type { ReactNode } from "react";

import logoSrc from "@/assets/logo-voz-pela-infancia.png";
import { LINHA_SEGURANCA } from "@/components/voz/nav";
import { AVISO_DIREITOS } from "@/lib/voz-protetora/bonus";

/**
 * Folhas dos bônus: na tela aparecem como uma folha branca; ao imprimir saem em A4, uma página,
 * com cabeçalho, linha de segurança e aviso de direitos autorais. Os textos vêm das orientações
 * aprovadas (ver NOTAS_BONUS_RASCUNHO.md).
 */

const FORCAR_CORES = "[print-color-adjust:exact] [-webkit-print-color-adjust:exact]";

function Folha({
  titulo,
  children,
  fundo,
  tituloGrande,
}: {
  titulo: string;
  children: ReactNode;
  fundo?: string;
  tituloGrande?: boolean;
}) {
  return (
    <article
      className={`${FORCAR_CORES} mx-auto w-full max-w-[210mm] rounded-[20px] p-5 text-[#27384f] shadow-[var(--shadow-soft)] print:flex print:min-h-[268mm] print:max-w-none print:flex-col print:rounded-none print:p-0 print:shadow-none ${fundo ?? "bg-white"}`}
    >
      <header className="flex items-center justify-between border-b-2 border-voz-yellow pb-3 print:pb-[4mm]">
        <img src={logoSrc} alt="Voz Pela Infância" className="h-12 w-auto print:h-[14mm]" />
        <p className="text-right text-[10px] font-bold uppercase leading-snug tracking-[0.16em] text-accent print:text-[8pt]">
          Voz Protetora
          <br />
          Bônus para imprimir
        </p>
      </header>

      <h1
        className={`font-display font-bold leading-[1.1] text-primary ${
          tituloGrande
            ? "mt-8 text-center text-[2rem] print:mt-[10mm] print:text-[34pt]"
            : "mt-5 text-[1.6rem] print:mt-[5mm] print:text-[21pt]"
        }`}
      >
        {titulo}
      </h1>

      <div className="print:flex-1">{children}</div>

      <footer className="mt-6 border-t border-[#C9D3E0] pt-3 text-[11px] leading-snug text-muted-foreground print:mt-[4mm] print:pt-[3mm] print:text-[7pt]">
        <p>{LINHA_SEGURANCA}</p>
        <p className="mt-1">{AVISO_DIREITOS}</p>
        <div className="mt-1.5 flex justify-between">
          <strong className="text-primary">Voz Pela Infância</strong>
          <span>Educar. Prevenir. Proteger.</span>
        </div>
      </footer>
    </article>
  );
}

function Secao({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="mt-5 print:mt-[4mm]">
      <h2 className="flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-primary print:text-[11pt]">
        <span className="h-1 w-6 rounded bg-voz-yellow" />
        {titulo}
      </h2>
      <div className="mt-2 print:mt-[2mm]">{children}</div>
    </section>
  );
}

function Apoio({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 text-[15px] leading-snug text-muted-foreground print:text-[10.5pt]">
      {children}
    </p>
  );
}

function Campo({ rotulo, className }: { rotulo: string; className?: string }) {
  return (
    <div className={`flex items-end gap-2 ${className ?? ""}`}>
      <span className="whitespace-nowrap text-[12px] font-semibold text-muted-foreground print:text-[8.5pt]">
        {rotulo}
      </span>
      <i className="h-6 flex-1 border-b border-[#C9D3E0] print:h-[5.5mm]" />
    </div>
  );
}

function Linha3() {
  return (
    <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-[1.3fr_1.2fr_.9fr] sm:gap-4 print:grid-cols-[1.3fr_1.2fr_.9fr] print:gap-[4mm]">
      {["Nome", "Quem é para a criança", "Telefone"].map((rotulo) => (
        <div key={rotulo}>
          <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground sm:hidden print:hidden">
            {rotulo}
          </span>
          <div className="h-7 border-b border-[#C9D3E0] print:h-[7mm]" />
        </div>
      ))}
    </div>
  );
}

function Item({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-[3px] h-4 w-4 shrink-0 rounded-[3px] border-[1.5px] border-primary print:mt-[1mm] print:h-[4mm] print:w-[4mm]" />
      <p className="text-[15px] leading-snug print:text-[10pt]">{children}</p>
    </li>
  );
}

// ---------------------------------------------------------------------------------------------
// 1. Minha rede de apoio
// ---------------------------------------------------------------------------------------------

export function FolhaRedeDeApoio() {
  return (
    <Folha titulo="Minha rede de apoio">
      <Apoio>
        Ter uma rede de apoio não é sobre desconfiar de ninguém, é sobre ter opções. Monte esta lista
        junto com a criança.
      </Apoio>

      <Secao titulo="Adultos de confiança da criança">
        <p className="text-[13px] text-muted-foreground print:text-[9pt]">
          Pergunte à criança em quem ela confia. Inclua apenas pessoas que você conhece bem e em quem
          confia plenamente.
        </p>
        <div className="mt-2 hidden grid-cols-[1.3fr_1.2fr_.9fr] gap-4 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground sm:grid print:grid print:gap-[4mm] print:text-[7.5pt]">
          <span>Nome</span>
          <span>Quem é para a criança</span>
          <span>Telefone</span>
        </div>
        <div className="space-y-3 print:space-y-[4mm]">
          {[0, 1, 2, 3].map((i) => (
            <Linha3 key={i} />
          ))}
        </div>
        <Campo
          className="mt-4 print:mt-[5mm]"
          rotulo="Se eu não conseguir falar com ela, a criança disse que procuraria:"
        />
      </Secao>

      <Secao titulo="Profissionais e serviços da minha cidade">
        <div className="space-y-3 print:space-y-[4mm]">
          <Campo rotulo="Pediatra ou unidade de saúde" />
          <Campo rotulo="Escola (professor ou coordenação)" />
          <Campo rotulo="Psicólogo(a)" />
          <Campo rotulo="Conselho Tutelar da minha cidade" />
          <Campo rotulo="CREAS da minha cidade" />
        </div>
      </Secao>

      <section className="mt-5 rounded-[12px] border border-primary p-3 print:mt-[4mm] print:rounded-[3mm] print:p-[3.5mm]">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary print:text-[9pt]">
          Canais nacionais
        </h3>
        <div className="mt-1.5 grid gap-x-6 gap-y-1 text-[14px] sm:grid-cols-2 print:grid-cols-2 print:text-[9.5pt]">
          <p>
            <b className="text-primary">190</b> Polícia · <b className="text-primary">192</b> SAMU
            (risco imediato)
          </p>
          <p>
            <b className="text-primary">Disque 100</b>, ligação gratuita, 24h
          </p>
          <p>
            <b className="text-primary">CVV 188</b>, apoio emocional, 24h
          </p>
          <p>
            <b className="text-primary">SaferNet</b>: safernet.org.br
          </p>
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground print:text-[8pt]">
          Informação verificada em 16/09/2026. Números e serviços podem mudar: confirme localmente
          quando possível.
        </p>
      </section>

      <p className="mt-4 text-[13px] text-muted-foreground print:mt-[4mm] print:text-[9pt]">
        Revise esta rede de tempos em tempos, conforme a vida da criança muda. &nbsp;&nbsp;
        Preenchida em: ____ / ____ / ________
      </p>
    </Folha>
  );
}

// ---------------------------------------------------------------------------------------------
// 2. Combinados antes de a criança ficar com outra pessoa
// ---------------------------------------------------------------------------------------------

export function FolhaCombinados() {
  return (
    <Folha titulo="Combinados antes de a criança ficar com outra pessoa">
      <Apoio>
        Para usar antes de deixar a criança com um cuidador, babá, familiar ou outro adulto. Leia com
        a pessoa que vai cuidar e marque o que já foi combinado.
      </Apoio>

      <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 print:mt-[4mm] print:grid-cols-2 print:gap-y-[4mm]">
        <Campo rotulo="Quem vai cuidar" />
        <Campo rotulo="Quando e por quanto tempo" />
        <Campo rotulo="Telefone para contato" />
        <Campo rotulo="Sinal combinado com a criança" />
      </div>

      <Secao titulo="Antes: com quem vai cuidar">
        <ul className="space-y-2 print:space-y-[1.8mm]">
          <Item>Escolher essa pessoa com critério, mesmo que seja alguém de confiança da família.</Item>
          <Item>
            Verificar as referências da pessoa com cuidado, mesmo que tenha sido indicada por alguém
            de confiança.
          </Item>
          <Item>Combinar as regras básicas de rotina e limites.</Item>
          <Item>Combinar as regras da casa sobre limites do corpo, banho e troca de roupa.</Item>
        </ul>
      </Secao>

      <Secao titulo="Antes: com a criança">
        <ul className="space-y-2 print:space-y-[1.8mm]">
          <Item>Conversar sobre quem vai cuidar dela e por quanto tempo.</Item>
          <Item>
            Combinar um sinal ou uma forma de ela pedir para voltar para casa, mesmo à noite, sem
            constrangimento.
          </Item>
          <Item>
            Ensinar que os limites do corpo dela valem com qualquer cuidador, mesmo alguém querido
            pela família.
          </Item>
          <Item>
            Ensinar que ela pode recusar banho, troca de roupa ou colo se não quiser, e que isso deve
            ser respeitado.
          </Item>
          <Item>Ensinar que ela pode ligar para você a qualquer hora, sem se meter em problema.</Item>
        </ul>
      </Secao>

      <Secao titulo="Durante">
        <ul className="space-y-2 print:space-y-[1.8mm]">
          <Item>
            Ficar disponível por contato. Se for a primeira vez, considerar checar em algum momento.
          </Item>
          <Item>
            Com um novo cuidador, nas primeiras semanas, considerar estar por perto ou fazer visitas
            sem aviso prévio, se possível.
          </Item>
        </ul>
      </Secao>

      <Secao titulo="Depois">
        <ul className="space-y-2 print:space-y-[1.8mm]">
          <Item>
            Perguntar como foi, com perguntas abertas e sem pressa. Exemplo: "Como foi dormir lá? Teve
            alguma coisa diferente do que você esperava?"
          </Item>
          <Item>Observar a reação da criança ao ver ou mencionar o cuidador depois.</Item>
        </ul>
      </Secao>

      <section className="mt-5 rounded-[12px] border border-[#B8472F] bg-[#FBEDE9] p-3 print:mt-[4mm] print:rounded-[3mm] print:p-[3.5mm]">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8E3320] print:text-[9pt]">
          Quando buscar ajuda
        </h3>
        <p className="mt-1 text-[14px] leading-snug print:text-[10pt]">
          Se a criança demonstrar medo, recusa firme de ficar novamente com essa pessoa, ou mudança de
          comportamento associada aos períodos de cuidado, procure orientação.
        </p>
        <p className="mt-1 text-[14px] font-bold leading-snug print:text-[10pt]">
          Se houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda
          imediatamente e acione a rede de proteção.
        </p>
      </section>
    </Folha>
  );
}

// ---------------------------------------------------------------------------------------------
// 3. Cartaz: Frases que protegem
// ---------------------------------------------------------------------------------------------

const FRASES = [
  "Você não precisa fazer isso se não quiser.",
  "Quem decide sobre o seu corpo é você.",
  "Seu corpo é seu, e você pode fazer perguntas sobre ele sempre que quiser.",
  "Pedir ajuda é uma força, não uma fraqueza.",
  "Não existe motivo pequeno demais para pedir ajuda.",
  "Nenhum adulto deveria pedir para você guardar segredo sobre o próprio corpo.",
];

export function FolhaCartaz() {
  return (
    <Folha titulo="Frases que protegem" fundo="bg-[#FBF6EA]" tituloGrande>
      <div className="mt-6 flex flex-col gap-3 print:mt-[8mm] print:gap-[6mm]">
        {FRASES.map((frase, i) => (
          <p
            key={frase}
            className={`relative rounded-[20px] py-4 pl-8 pr-5 font-display text-[1.15rem] font-semibold leading-snug before:absolute before:bottom-4 before:left-0 before:top-4 before:w-1.5 before:rounded-r before:bg-voz-yellow print:rounded-[6mm] print:py-[6mm] print:pl-[14mm] print:pr-[8mm] print:text-[17pt] ${
              i % 2 === 1
                ? "bg-primary text-primary-foreground"
                : "bg-white text-primary ring-1 ring-[#E2D8C6]"
            }`}
          >
            {frase}
          </p>
        ))}
      </div>
    </Folha>
  );
}

export const FOLHAS: Record<string, (() => ReactNode) | undefined> = {
  "minha-rede-de-apoio": () => <FolhaRedeDeApoio />,
  "combinados-antes-de-outra-pessoa": () => <FolhaCombinados />,
  "frases-que-protegem": () => <FolhaCartaz />,
};
