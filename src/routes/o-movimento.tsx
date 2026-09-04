import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/voz/PageShell";

export const Route = createFileRoute("/o-movimento")({
  head: () => ({
    meta: [
      { title: "O Movimento — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Por que a Voz Pela Infância existe, seu posicionamento complementar à rede de proteção, como o movimento pensa e quem o idealiza.",
      },
      { property: "og:title", content: "O Movimento — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Um movimento de educação e mobilização em defesa da infância.",
      },
    ],
  }),
  component: OMovimentoPage,
});

const JUMP = [
  { to: "por-que", label: "Por que existe" },
  { to: "posicionamento", label: "Posicionamento" },
  { to: "como-pensamos", label: "Como pensamos" },
  { to: "responsabilidade", label: "Responsabilidade adulta" },
  { to: "quem-idealiza", label: "Quem idealiza" },
  { to: "atuacao", label: "Onde atua" },
];

const FAZ = [
  "educa e traduz conhecimentos sobre infância, desenvolvimento, direitos e prevenção",
  "orienta, conscientiza e amplia repertório",
  "fortalece adultos e favorece relações protetivas",
  "mobiliza e incentiva a prevenção",
  "orienta para a ação — sempre com um próximo passo seguro",
];

const NAO_E = [
  "espaço de culpabilização, pânico ou exposição de crianças",
  "espaço de investigação amadora",
  "substituta da rede de proteção, de serviços especializados ou de atendimento psicológico, médico ou jurídico",
  "marca que promete soluções simples para problemas complexos",
  "marca que responsabiliza a criança pela prevenção da violência",
];

const CRIANCA = [
  "conhecer o próprio corpo, reconhecer sentimentos e compreender limites",
  "expressar desconfortos, pedir ajuda e reconhecer situações inadequadas",
  "desenvolver autonomia e usar recursos de segurança compatíveis com a idade",
];

const ADULTO = [
  "respeitar limites, criar ambientes seguros e perceber sinais",
  "escutar, acolher, orientar e supervisionar",
  "estabelecer limites protetivos e reconhecer riscos",
  "agir diante de ameaça ou violência e construir redes de proteção",
  "assumir responsabilidade pela segurança e pelo desenvolvimento da criança",
];

const CAMPOS = [
  "Família",
  "Escola",
  "Serviços e profissionais",
  "Comunidade",
  "Ambiente digital",
  "Instituições",
  "Sociedade",
];

const TEMAS = [
  "violência sexual, física e psicológica",
  "negligência",
  "bullying e cyberbullying",
  "exposição digital e aliciamento online",
  "exploração",
  "saúde emocional",
  "limites e educação sexual protetiva",
  "parentalidade e desenvolvimento infantil",
  "inclusão e escuta",
  "rede de proteção",
  "formação de profissionais",
  "direitos da criança e do adolescente",
];

function OMovimentoPage() {
  return (
    <PageShell
      eyebrow="O Movimento"
      title="Um movimento em defesa da infância"
      intro="A Voz Pela Infância é um movimento de educação e mobilização que existe para fortalecer uma Cultura Protetiva da Infância — para que proteger crianças e adolescentes seja responsabilidade cotidiana e compartilhada, e não apenas resposta à crise."
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
        {/* 1. POR QUE EXISTE */}
        <section id="por-que" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">Por que a Voz existe</h2>
          <p className="mt-5 font-display text-lg leading-snug text-primary">
            Antes da denúncia, existe a prevenção. E, antes da prevenção, existe uma cultura.
          </p>
          <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Proteger a infância não é apenas saber reconhecer situações de risco. É construir, no
              cotidiano, relações, ambientes e atitudes que favoreçam segurança, respeito, escuta e
              cuidado.
            </p>
            <p>
              A Voz existe para aproximar conhecimento e prática — e ajudar mais pessoas a
              compreenderem que a proteção da infância também acontece nas escolhas de todos os dias.
            </p>
            <p className="text-foreground">
              A pergunta que orienta o movimento: o que nós, adultos, precisamos saber, perceber e
              fazer para que uma criança esteja mais protegida antes que a violência aconteça?
            </p>
          </div>
        </section>

        {/* 2. POSICIONAMENTO */}
        <section id="posicionamento" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">Posicionamento</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            A Voz Pela Infância ocupa um espaço <strong className="text-foreground">complementar</strong>
            {" "}
            às organizações e serviços que atuam com denúncia, responsabilização, atendimento,
            legislação, políticas públicas ou enfrentamento das violências. Seu lugar é a ponte
            entre informação, consciência, postura e ação protetiva.
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
            Informação → Consciência → Postura → Ação Protetiva
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
                O que a Voz faz
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {FAZ.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden className="text-accent">
                      ·
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[10px] border border-border bg-secondary p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
                O que a Voz não é
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {NAO_E.map((n) => (
                  <li key={n} className="flex gap-2">
                    <span aria-hidden className="text-accent">
                      ·
                    </span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. COMO PENSAMOS */}
        <section id="como-pensamos" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">Como o movimento pensa</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Diante de um caso, uma notícia ou uma situação de violência, a Voz não se coloca como
            espaço de exposição da tragédia. Pergunta: <strong className="text-foreground">o que esse
            caso nos ensina sobre proteção?</strong>
          </p>
          <p className="mt-4 text-sm font-medium text-primary">
            caso → aprendizagem → percepção → orientação → proteção → ação
          </p>
          <div className="mt-6 border-l-2 border-accent pl-5">
            <p className="leading-relaxed text-muted-foreground">
              É também a pergunta que orienta cada decisão do movimento — conteúdo, formação,
              produto, campanha: <strong className="text-foreground">“Isso protege a infância?”</strong>
              {" "}
              Quando a resposta é positiva, a prática pode ser fortalecida; quando negativa, revista;
              havendo dúvida, observada e, se preciso, orientada por conhecimento técnico ou pela
              rede de proteção.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Sequência de aprofundamento: <em>Isso protege a infância? → Essa escolha aumenta ou
              diminui a proteção? → O que posso fazer para fortalecer a proteção?</em>
            </p>
          </div>
        </section>

        {/* 4. POSTURA: VISÃO VOZ */}
        <section id="postura" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">A postura: Visão VOZ</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            A postura que o movimento convida adultos e instituições a assumir:{" "}
            <strong className="text-foreground">Valorizar a Infância · Orientar para Proteger ·
            Zelar pela Proteção.</strong> A Visão VOZ não é uma ferramenta e não é o método — é a
            direção da atuação.
          </p>
          <Link
            to="/metodologia"
            hash="visao-voz"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            Ver a metodologia
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* 5. RESPONSABILIDADE ADULTA */}
        <section id="responsabilidade" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Responsabilidade adulta
          </h2>
          <p className="mt-5 font-display text-lg leading-snug text-primary">
            Crianças precisam aprender sobre proteção, mas adultos precisam aprender a proteger.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A criança participa ativamente de sua proteção, mas não pode carregar a responsabilidade
            pela prevenção da violência ou pela segurança do ambiente.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
                À criança cabe aprender
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {CRIANCA.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span aria-hidden className="text-accent">
                      ·
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
                Aos adultos cabe
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {ADULTO.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span aria-hidden className="text-accent">
                      ·
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Corresponsabilidade não é responsabilidade indistinta: família, escola, serviços,
            instituições, comunidade e Estado têm papéis diferentes.
          </p>
        </section>

        {/* 6. QUEM IDEALIZA */}
        <section id="quem-idealiza" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">Quem idealiza</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-[200px_1fr] sm:items-start">
            <div className="aspect-square w-[160px] overflow-hidden rounded-[12px] border border-border bg-muted sm:w-full">
              <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">
                foto
              </div>
            </div>
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                A Voz Pela Infância é idealizada por{" "}
                <strong className="text-foreground">Michelle Freitas</strong>, psicóloga{" "}
                <span className="text-muted-foreground/80">[registro CRP — a completar]</span>, no
                Rio Grande do Norte.
              </p>
              <p>
                <span className="text-muted-foreground/80">
                  [Parágrafo de formação e atuação com infância — a completar por Michelle: contextos
                  em que atuou (famílias, escolas, serviços de proteção, clínica), tempo de
                  experiência e o que observou nesse percurso.]
                </span>
              </p>
              <p>
                <span className="text-muted-foreground/80">
                  [Parágrafo sobre o que a levou a criar o movimento — a completar: a percepção de
                  que a proteção precisa começar antes da violência, no cotidiano e na cultura.]
                </span>
              </p>
              <p className="text-foreground">
                O movimento traduz essa compreensão em educação, método e ferramentas para preparar
                adultos.
              </p>
              <p className="rounded-[8px] border border-dashed border-border bg-secondary/60 p-3 text-xs not-italic text-muted-foreground">
                Texto-modelo (nível médio). Substituir os trechos entre colchetes pela redação final
                de Michelle e adicionar a foto.
              </p>
            </div>
          </div>
        </section>

        {/* 7. ONDE ATUA */}
        <section id="atuacao" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">Onde a Voz atua</h2>
          <p className="mt-5 text-sm font-medium text-foreground">Campos de aplicação</p>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {CAMPOS.map((c) => (
              <li
                key={c}
                className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground"
              >
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-medium text-foreground">Temas de atuação</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {TEMAS.map((t) => (
              <li
                key={t}
                className="rounded-[6px] border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* 8. FECHO */}
        <section className="border-t border-border pt-14">
          <p className="text-base text-muted-foreground">
            A construção de uma Cultura Protetiva acontece por muitas pessoas, em muitos lugares.
          </p>
          <Link
            to="/participe"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            Faça parte do movimento
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </PageShell>
  );
}
