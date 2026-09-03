import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/voz/Reveal";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";
import { HeroArt } from "@/components/voz/HeroArt";
import { NewsletterForm } from "@/components/voz/NewsletterForm";
import { DESCRITOR, MANIFESTO } from "@/components/voz/nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Voz Pela Infância — Movimento em Defesa da Infância" },
      {
        name: "description",
        content:
          "A proteção da infância começa quando os adultos aprendem a proteger. A Voz Pela Infância educa e mobiliza adultos para prevenir, reconhecer sinais, escutar e agir.",
      },
      { property: "og:title", content: "Voz Pela Infância — Movimento em Defesa da Infância" },
      {
        property: "og:description",
        content:
          "Um movimento de educação e mobilização para preparar adultos que convivem com crianças.",
      },
    ],
  }),
  component: Home,
});

const SHELL = "mx-auto max-w-6xl px-5 sm:px-8";

/** Camada 3–6 da arquitetura oficial (DOC 01, Título VI), na ordem: postura → método → expressão → ferramenta. */
const ESTRUTURA = [
  {
    papel: "Postura",
    nome: "Visão VOZ",
    texto: "Valorizar a Infância · Orientar para Proteger · Zelar pela Proteção.",
  },
  {
    papel: "Método",
    nome: "Método dos 5C da Proteção",
    texto:
      "Consciência · Conexão · Conhecimento · Comprometimento · Cuidado — o que precisa ser fortalecido nos adultos.",
  },
  {
    papel: "Expressão",
    nome: "5 Vozes da Proteção",
    texto:
      "Ensina · Escuta · Acolhe · Protege · Inspira — como a proteção aparece nas relações.",
  },
  {
    papel: "Ferramenta",
    nome: "Bússola VOZ",
    texto: "Ver · Ouvir · Zelar — para perceber e decidir diante de situações reais.",
  },
];

/** Territórios do Sistema Editorial (DOC 02, §12) — nomes oficiais, não alterar. */
const TERRITORIOS = [
  "Educação",
  "Cotidiano",
  "Resposta",
  "Rede",
  "Mobilização",
  "Voz Institucional",
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-20">
        {/* HERO */}
        <section className="border-b border-border bg-secondary">
          <div className={`${SHELL} grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2`}>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {DESCRITOR}
              </p>
              <h1 className="mt-4 text-[2rem] font-semibold leading-[1.12] text-primary sm:text-4xl lg:text-[2.9rem]">
                A proteção da infância começa quando os adultos aprendem a proteger.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A Voz Pela Infância é um movimento de educação e mobilização: prepara adultos para
                prevenir violências, reconhecer sinais, escutar e agir — sem substituir a rede de
                proteção.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="hero" size="lg">
                  <Link to="/o-movimento">Conhecer o movimento</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/conteudos">Explorar conteúdos</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <HeroArt className="aspect-[5/4] w-full" />
            </Reveal>
          </div>
        </section>

        {/* O QUE É / PARA QUEM */}
        <section className="py-16 sm:py-24">
          <div className={`${SHELL} max-w-3xl`}>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                O que é a Voz Pela Infância
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
                Um movimento para preparar quem cuida
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                A Voz existe para transformar informação em consciência, postura e ação protetiva.
                Nosso propósito é construir uma <strong className="text-foreground">Cultura
                Protetiva da Infância</strong> — uma sociedade em que proteger crianças e
                adolescentes seja responsabilidade cotidiana e compartilhada, e não apenas resposta
                à crise.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {[
                  "Famílias e responsáveis",
                  "Educadores e professores",
                  "Profissionais",
                  "Instituições e comunidades",
                ].map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                to="/o-movimento"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                Conhecer o movimento
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* QUEM IDEALIZA */}
        <section className="border-y border-border bg-secondary py-14 sm:py-20">
          <div className={`${SHELL} grid max-w-4xl gap-8 sm:grid-cols-[180px_1fr] sm:items-center`}>
            <Reveal>
              <div className="aspect-square w-[160px] overflow-hidden rounded-[12px] border border-border bg-muted sm:w-full">
                <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">
                  foto
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Quem idealiza
              </p>
              <h2 className="mt-2 text-xl font-semibold text-primary sm:text-2xl">
                Michelle Freitas
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                A Voz Pela Infância é idealizada por Michelle Freitas, psicóloga, no Rio Grande do
                Norte. O movimento nasce de uma compreensão simples: antes da denúncia, existe a
                prevenção — e, antes da prevenção, existe uma cultura.
              </p>
              <Link
                to="/o-movimento"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                Conhecer a trajetória
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* COMO A VOZ ATUA */}
        <section className="py-16 sm:py-24">
          <div className={SHELL}>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Como a Voz atua
              </p>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold text-primary sm:text-3xl">
                Um propósito, sustentado por uma estrutura
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Tudo o que a Voz faz serve a um propósito: construir uma Cultura Protetiva da
                Infância. Para chegar lá, o movimento se organiza em uma postura, um método, uma
                expressão e uma ferramenta.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {ESTRUTURA.map((item, i) => (
                <Reveal key={item.nome} delay={i * 70}>
                  <article className="flex h-full flex-col rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent">
                      {item.papel}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-primary">{item.nome}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.texto}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <Link
                to="/metodologia"
                className="mt-9 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                Conhecer a metodologia
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* COMO PENSAMOS */}
        <section className="border-y border-border bg-secondary py-14 sm:py-16">
          <div className={SHELL}>
            <Reveal>
              <div className="max-w-2xl border-l-2 border-accent pl-6">
                <p className="font-display text-xl leading-snug text-primary sm:text-2xl">
                  Diante de um caso ou de uma notícia, a Voz não expõe a tragédia: pergunta o que
                  aquilo ensina sobre proteção. É a pergunta que orienta cada decisão do movimento —
                  “Isso protege a infância?”
                </p>
                <Link
                  to="/o-movimento"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  Como o movimento pensa
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTEÚDOS EM DESTAQUE */}
        <section className="py-16 sm:py-24">
          <div className={SHELL}>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Conteúdos
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
                Aprender no dia a dia
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Conteúdos que ajudam a reconhecer a proteção — ou a sua ausência — nas situações
                reais da vida com crianças. Os primeiros estão a caminho.
              </p>
            </Reveal>
            <Reveal>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {TERRITORIOS.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                to="/conteudos"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                Ver a área de Conteúdos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* COMO A VOZ PODE AJUDAR */}
        <section className="border-y border-border bg-secondary py-16 sm:py-24">
          <div className={SHELL}>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Soluções
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
                Como a Voz pode ajudar
              </h2>
            </Reveal>
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              <Reveal>
                <article className="flex h-full flex-col rounded-[12px] border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
                  <span className="self-start rounded-[6px] bg-secondary px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-primary">
                    Disponível
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-primary">
                    Formações e palestras
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    Encontros e formações para escolas, instituições, equipes e comunidades, a
                    partir do Método dos 5C da Proteção.
                  </p>
                  <Link
                    to="/solucoes"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
                  >
                    Levar a Voz para a sua instituição
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
              <Reveal delay={80}>
                <article className="flex h-full flex-col rounded-[12px] border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
                  <span className="self-start rounded-[6px] bg-secondary px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Em desenvolvimento
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-primary">Materiais e produtos</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    Materiais práticos e produtos para adultos aplicarem a proteção no cotidiano.
                  </p>
                  <Link
                    to="/solucoes"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
                  >
                    Saber mais
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
            </div>
            <Reveal>
              <Link
                to="/solucoes"
                className="mt-9 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                Conhecer as soluções
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* PARTICIPE */}
        <section className="bg-primary py-20 text-primary-foreground sm:py-28">
          <div className={`${SHELL} max-w-3xl text-center`}>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">
                Participe
              </p>
              <p className="mx-auto mt-4 max-w-[20ch] font-display text-[1.6rem] italic leading-snug sm:text-[2.4rem]">
                {MANIFESTO}
              </p>
              <p className="mx-auto mt-5 max-w-[44ch] text-primary-foreground/85">
                Receba novos conteúdos e formas de participar do movimento.
              </p>
              <p className="my-8 flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-[0.14em]">
                <span className="h-px w-11 bg-primary-foreground/30" />
                Seja Voz.
                <span className="h-px w-11 bg-primary-foreground/30" />
              </p>
              <NewsletterForm tone="onAccent" />
              <p className="mt-6 text-sm text-primary-foreground/80">
                Ou compartilhe com um adulto que convive com crianças.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
