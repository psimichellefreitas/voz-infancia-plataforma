import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/metodologia")({
  head: () => ({
    meta: [
      { title: "Metodologia — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Cultura Protetiva da Infância, Visão VOZ, Método dos 5C da Proteção, 5 Vozes da Proteção e Bússola VOZ — a estrutura que sustenta o movimento.",
      },
      { property: "og:title", content: "Metodologia — Voz Pela Infância" },
      {
        property: "og:description",
        content: "A postura, o método, a expressão e a ferramenta do movimento, na ordem oficial.",
      },
    ],
  }),
  component: MetodologiaPage,
});

const JUMP = [
  { to: "cultura-protetiva", label: "Cultura Protetiva" },
  { to: "visao-voz", label: "Visão VOZ" },
  { to: "metodo-5c", label: "Método dos 5C" },
  { to: "cinco-vozes", label: "5 Vozes" },
  { to: "bussola-voz", label: "Bússola VOZ" },
];

const DIMENSOES = ["Valores", "Relações", "Conhecimentos", "Práticas", "Ambientes", "Continuidade"];

const VISAO = [
  {
    verbo: "Valorizar a Infância",
    conceito:
      "Reconhecer que crianças e adolescentes têm dignidade, direitos, necessidades e voz própria — no presente, não apenas como preparo para o futuro.",
    // Ajuste de "merece" para "a que ela tem direito" (PROPOSTA de revisão do DOC 07, §4 —
    // decisão da idealizadora; o documento oficial deve ser atualizado depois).
    pergunta:
      "Estou tratando esta criança com o valor, o respeito e a dignidade a que ela tem direito?",
  },
  {
    verbo: "Orientar para Proteger",
    conceito:
      "Transformar conhecimento em orientação acessível e prática, no cotidiano, antes que exista um problema.",
    pergunta:
      "O que esta criança precisa saber para estar mais segura e desenvolver autonomia?",
  },
  {
    verbo: "Zelar pela Proteção",
    conceito:
      "Assumir responsabilidade ativa: perceber, acompanhar, agir dentro do próprio papel e buscar ajuda quando necessário.",
    pergunta: "O que está ao meu alcance fazer para aumentar a proteção desta criança?",
  },
];

const CINCO_C = [
  { c: "Consciência", ideia: "Perceber", guia: "Por que proteger?" },
  { c: "Conexão", ideia: "Relacionar-se", guia: "Com quem proteger?" },
  {
    c: "Conhecimento",
    ideia: "Saber",
    guia: "O que preciso saber para prevenir e agir corretamente?",
  },
  {
    c: "Comprometimento",
    ideia: "Assumir responsabilidade",
    guia: "Como transformo esse conhecimento em ações concretas?",
  },
  {
    c: "Cuidado",
    ideia: "Sustentar como prática",
    guia: "Como mantenho essa proteção de forma contínua?",
  },
];

const VOZES = [
  { nome: "Ensina", principio: "Conhecimento deve aumentar a capacidade de proteção, não o medo." },
  {
    nome: "Escuta",
    principio: "Escutar é criar condições para a criança falar sem medo de ser desqualificada.",
  },
  { nome: "Acolhe", principio: "Acolher é fazer a criança perceber que falar não foi um erro." },
  {
    nome: "Protege",
    principio: "Proteger exige responsabilidade para agir — e discernimento para saber quando buscar ajuda.",
  },
  {
    nome: "Inspira",
    principio:
      "Uma atitude protetiva pode proteger uma criança; uma cultura protetiva pode fortalecer muitos ambientes.",
  },
];

const BUSSOLA = [
  {
    m: "Ver",
    pergunta: "O que está acontecendo?",
    principio: "Observar não é concluir.",
  },
  {
    m: "Ouvir",
    pergunta: "O que a criança está comunicando?",
    principio: "Escutar não é investigar.",
  },
  {
    m: "Zelar",
    pergunta: "O que posso fazer para proteger?",
    principio: "Proteger também é saber quando buscar ajuda.",
  },
];

const BUSSOLA_NAO_E = [
  "instrumento diagnóstico",
  "protocolo de investigação",
  "teste para identificar violência",
  "checklist para concluir que houve abuso",
  "substituto de profissionais ou da rede de proteção",
];

const CADEIA = [
  { termo: "Visão VOZ", papel: "a postura" },
  { termo: "Método dos 5C da Proteção", papel: "desenvolve as capacidades" },
  { termo: "5 Vozes da Proteção", papel: "expressam a postura em ação" },
  { termo: "Bússola VOZ", papel: "organiza a percepção e a resposta" },
  { termo: "Cultura Protetiva da Infância", papel: "o resultado buscado" },
];

const NAO_PROMETE = [
  "não elimina o risco de violência",
  "não torna qualquer adulto automaticamente preparado",
  "não substitui a rede de proteção nem o atendimento especializado",
  "não transfere para a criança a responsabilidade de prevenir ou resolver a violência",
];

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent">
      {children}
    </span>
  );
}

function MetodologiaPage() {
  return (
    <PageShell
      eyebrow="Metodologia"
      title="A estrutura que sustenta o movimento"
      intro="Tudo o que a Voz Pela Infância faz serve a um propósito: construir uma Cultura Protetiva da Infância. Para chegar lá, o movimento se organiza em uma postura, um método, uma expressão e uma ferramenta — nesta ordem."
    >
      <nav
        aria-label="Nesta página"
        className="flex flex-wrap gap-2.5 border-b border-border pb-8"
      >
        {JUMP.map((j) => (
          <a
            key={j.to}
            href={`#${j.to}`}
            className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {j.label}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-16">
        {/* 1. CULTURA PROTETIVA */}
        <section id="cultura-protetiva" className="scroll-mt-24">
          <SectionLabel>Propósito</SectionLabel>
          <h2 className="mt-2 text-2xl font-semibold text-primary sm:text-3xl">
            Cultura Protetiva da Infância
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            É o horizonte — o que o movimento quer fortalecer. Não é um método, uma ferramenta ou
            uma campanha, e não é sinônimo dos 5C.
          </p>
          <blockquote className="mt-6 border-l-2 border-accent pl-5 text-base leading-relaxed text-foreground/90">
            Cultura Protetiva da Infância é o conjunto de valores, atitudes, conhecimentos, relações
            e práticas compartilhadas que tornam a proteção da infância uma responsabilidade
            cotidiana, coletiva e inegociável.
          </blockquote>
          <p className="mt-6 text-sm font-medium text-foreground">
            Ela se caracteriza quando a proteção está presente de forma consistente em seis
            dimensões:
          </p>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {DIMENSOES.map((d) => (
              <li
                key={d}
                className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-muted-foreground"
              >
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <p className="rounded-[10px] border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Não é cultura do medo.</strong> Favorece vínculo,
              diálogo, autonomia progressiva e presença adulta — não vigilância ou desconfiança.
            </p>
            <p className="rounded-[10px] border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Não é apenas informação.</strong> O caminho é
              informação → consciência → compreensão → postura → ação → prática.
            </p>
          </div>
          <p className="mt-6 font-display text-lg leading-snug text-primary">
            Cultura Protetiva é quando proteger crianças deixa de ser uma ação isolada e passa a
            fazer parte da maneira como uma família, uma escola, uma instituição ou uma comunidade
            pensa, se relaciona, educa e age.
          </p>
        </section>

        {/* 2. VISÃO VOZ */}
        <section id="visao-voz" className="scroll-mt-24 border-t border-border pt-14">
          <SectionLabel>Postura</SectionLabel>
          <h2 className="mt-2 text-2xl font-semibold text-primary sm:text-3xl">Visão VOZ</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            É a postura que o movimento convida adultos e instituições a assumir. “V.O.Z.” é apenas
            o acróstico dos três verbos; o nome do conceito é <strong className="text-foreground">Visão
            VOZ</strong>. Não é uma ferramenta e não é o método.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {VISAO.map((v) => (
              <article
                key={v.verbo}
                className="flex flex-col rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <h3 className="text-base font-semibold text-primary">{v.verbo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.conceito}</p>
                <p className="mt-4 border-t border-border pt-3 text-sm italic text-foreground/80">
                  {v.pergunta}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
            Valorizar. Orientar. Zelar.
          </p>
        </section>

        {/* 3. MÉTODO DOS 5C */}
        <section id="metodo-5c" className="scroll-mt-24 border-t border-border pt-14">
          <SectionLabel>Método</SectionLabel>
          <h2 className="mt-2 text-2xl font-semibold text-primary sm:text-3xl">
            Método dos 5C da Proteção
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            É a estrutura metodológica oficial para desenvolver <strong className="text-foreground">capacidade
            protetiva</strong>. Os cinco C são os pilares que estruturam o método — não se usa “5
            Pilares da Proteção” como nome.
          </p>
          <blockquote className="mt-6 border-l-2 border-accent pl-5 text-base leading-relaxed text-foreground/90">
            Capacidade protetiva é a possibilidade de uma pessoa, relação, instituição ou ambiente
            reconhecer a responsabilidade de proteger a infância e transformar esse reconhecimento
            em percepção, relação, conhecimento, decisão, ação e continuidade.
          </blockquote>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 pr-4 font-semibold text-foreground">C</th>
                  <th className="py-2 pr-4 font-semibold text-foreground">Ideia</th>
                  <th className="py-2 font-semibold text-foreground">Pergunta-guia</th>
                </tr>
              </thead>
              <tbody>
                {CINCO_C.map((row) => (
                  <tr key={row.c} className="border-b border-border/60">
                    <td className="py-3 pr-4 font-semibold text-primary">{row.c}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.ideia}</td>
                    <td className="py-3 text-muted-foreground">{row.guia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Os cinco formam um sistema integrado, não uma escada rígida: uma dimensão fortalece a
            outra.
          </p>
          <p className="mt-4 font-display text-lg leading-snug text-primary">
            Consciência para perceber. Conexão para relacionar-se. Conhecimento para compreender.
            Comprometimento para assumir responsabilidade. Cuidado para sustentar.
          </p>
        </section>

        {/* 4. 5 VOZES */}
        <section id="cinco-vozes" className="scroll-mt-24 border-t border-border pt-14">
          <SectionLabel>Expressão em ação</SectionLabel>
          <h2 className="mt-2 text-2xl font-semibold text-primary sm:text-3xl">
            5 Vozes da Proteção
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            São cinco formas complementares de exercer a postura protetiva na relação com a
            infância. Não são tipos de pessoas, profissões, etapas obrigatórias ou diagnóstico. Os
            5C desenvolvem capacidades; as 5 Vozes expressam essas capacidades em ação.
          </p>
          <ul className="mt-6 space-y-3">
            {VOZES.map((v) => (
              <li
                key={v.nome}
                className="rounded-[10px] border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
              >
                <span className="text-sm font-semibold text-primary">Voz que {v.nome}</span>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.principio}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-display text-lg leading-snug text-primary">
            Ensinar para preparar. Escutar para perceber. Acolher para oferecer segurança. Proteger
            para agir. Inspirar para ampliar.
          </p>
        </section>

        {/* 5. BÚSSOLA VOZ */}
        <section id="bussola-voz" className="scroll-mt-24 border-t border-border pt-14">
          <SectionLabel>Ferramenta</SectionLabel>
          <h2 className="mt-2 text-2xl font-semibold text-primary sm:text-3xl">Bússola VOZ</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            É a ferramenta prática para o adulto organizar o olhar, a escuta e a resposta diante de
            uma situação — sem transformar algo complexo em conclusão precipitada.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {BUSSOLA.map((b) => (
              <article
                key={b.m}
                className="flex flex-col rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-primary">
                  {b.m}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">“{b.pergunta}”</p>
                <p className="mt-4 border-t border-border pt-3 text-sm italic text-foreground/80">
                  {b.principio}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm font-medium text-foreground">A Bússola não é:</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {BUSSOLA_NAO_E.map((n) => (
              <li
                key={n}
                className="rounded-[6px] border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {n}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Ver não é vigiar · Ouvir não é interrogar · Zelar
            não é resolver sozinho.</strong>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Tem uma <strong className="text-foreground">Versão Essencial</strong> (uso imediato, sem
            conhecimento prévio) e uma <strong className="text-foreground">Versão Avançada</strong>
            {" "}
            (aprofunda as situações à luz do Método dos 5C — os 5C são usados como lente de
            reflexão, não passam a fazer parte da Bússola).
          </p>
          <p className="mt-4 font-display text-lg leading-snug text-primary">
            VER para perceber. OUVIR para compreender. ZELAR para proteger.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            O Mapa da Proteção — ferramenta de autoavaliação — é visão futura e não está ativo nesta
            fase.
          </p>
        </section>

        {/* 6. COMO SE CONECTA */}
        <section className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-xl font-semibold text-primary sm:text-2xl">Como tudo se conecta</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A Pergunta Norteadora — <strong className="text-foreground">“Isso protege a infância?”</strong>
            {" "}
            — atravessa todas as camadas como critério permanente; não é uma delas.
          </p>
          <ol className="mt-6 space-y-2">
            {CADEIA.map((n, i) => (
              <li
                key={n.termo}
                className="flex items-baseline gap-3 rounded-[10px] border border-border bg-card p-4"
              >
                <span className="font-display text-sm font-semibold text-accent">{i + 1}</span>
                <span className="text-sm">
                  <strong className="text-primary">{n.termo}</strong>
                  <span className="text-muted-foreground"> — {n.papel}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* 7. O QUE NÃO PROMETE */}
        <section className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-xl font-semibold text-primary sm:text-2xl">
            O que a metodologia não promete
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {NAO_PROMETE.map((n) => (
              <li key={n} className="flex gap-2">
                <span aria-hidden className="text-accent">·</span>
                {n}
              </li>
            ))}
          </ul>
        </section>

        {/* 8. FECHO */}
        <section className="border-t border-border pt-14">
          <p className="text-base text-muted-foreground">
            As formações e palestras aplicam o Método dos 5C da Proteção.
          </p>
          <Link
            to="/solucoes"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            Conhecer as soluções
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </PageShell>
  );
}
