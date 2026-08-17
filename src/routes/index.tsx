import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/voz/Reveal";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/components/voz/nav";
import heroImg from "@/assets/v1-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Voz Pela Infância — Movimento em defesa da infância" },
      {
        name: "description",
        content:
          "Valorizar, orientar e zelar. Um movimento que informa e mobiliza adultos para proteger crianças com clareza, respeito e responsabilidade.",
      },
      { property: "og:title", content: "Voz Pela Infância — Movimento em defesa da infância" },
      {
        property: "og:description",
        content: "Valorizar. Orientar. Zelar. Conheça o movimento e torne-se voz pela infância.",
      },
    ],
  }),
  component: Home,
});

const SHELL = "mx-auto max-w-6xl px-5 sm:px-8";

const PILLARS = [
  {
    icon: HeartHandshake,
    title: "Valorizar",
    text: "Reconhecer a infância como tempo próprio, com dignidade, escuta e cuidado.",
  },
  {
    icon: Compass,
    title: "Orientar",
    text: "Levar informação clara e responsável a famílias, escolas e comunidades.",
  },
  {
    icon: ShieldCheck,
    title: "Zelar",
    text: "Sustentar ambientes seguros por meio de prevenção, presença e vigilância adulta.",
  },
];

const HIGHLIGHTS = [
  {
    title: "O Movimento",
    text: "Quem somos, no que acreditamos e como atuamos em defesa da infância.",
    to: "/o-movimento",
  },
  {
    title: "Bússola Voz",
    text: "Uma direção prática para adultos que querem agir com equilíbrio e critério.",
    to: "/bussola-voz",
  },
  {
    title: "Recursos",
    text: "Materiais, orientações e conteúdos para aprofundar e compartilhar.",
    to: "/recursos",
  },
  {
    title: "Soluções",
    text: "Programas e formações para escolas, instituições e comunidades.",
    to: "/solucoes",
  },
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
                Movimento em defesa da infância
              </p>
              <h1 className="mt-4 text-[2rem] font-bold leading-[1.12] text-primary sm:text-4xl lg:text-5xl">
                Toda criança precisa de adultos que a valorizem, orientem e zelem por ela.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                O Voz Pela Infância informa, forma e mobiliza pessoas para uma proteção real — sem
                alarmismo, com responsabilidade e cuidado.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="hero" size="lg">
                  <Link to="/seja-voz">Seja Voz</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/o-movimento">Conheça o movimento</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <img
                src={heroImg}
                alt="Adulto caminhando ao lado de uma criança com a mão em seu ombro, em luz natural"
                width={1600}
                height={1200}
                fetchPriority="high"
                className="w-full rounded-[10px] border border-border object-cover shadow-[var(--shadow-lift)]"
              />
            </Reveal>
          </div>
        </section>

        {/* PILARES */}
        <section className="py-16 sm:py-24">
          <div className={SHELL}>
            <Reveal>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">Nossos princípios</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Três compromissos orientam cada conteúdo, formação e ação do movimento.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <article className="h-full rounded-[10px] border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
                    <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-primary/10 text-primary">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-primary">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* DESTAQUES */}
        <section className="border-y border-border bg-secondary py-16 sm:py-24">
          <div className={SHELL}>
            <Reveal>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">Por onde começar</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {HIGHLIGHTS.map((h, i) => (
                <Reveal key={h.to} delay={i * 70}>
                  <Link
                    to={h.to}
                    className="group flex h-full flex-col rounded-[10px] border border-border bg-card p-7 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
                  >
                    <h3 className="text-lg font-bold text-primary">{h.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {h.text}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Acessar
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24">
          <div className={SHELL}>
            <Reveal>
              <div className="rounded-[10px] bg-primary px-7 py-12 text-primary-foreground sm:px-12">
                <Sparkles className="h-6 w-6 text-primary-foreground/80" />
                <h2 className="mt-5 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">
                  Se uma criança precisasse da sua voz hoje, ela encontraria?
                </h2>
                <p className="mt-4 max-w-xl text-primary-foreground/80">
                  Assuma o compromisso público de valorizar, orientar e zelar pela infância.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="green" size="lg">
                    <Link to="/seja-voz">Quero ser voz</Link>
                  </Button>
                  <Button asChild variant="heroOutline" size="lg">
                    <Link to="/apoie">Apoie o movimento</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* INSTAGRAM */}
        <section className="border-t border-border bg-secondary py-14">
          <div
            className={`${SHELL} flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between`}
          >
            <div>
              <h2 className="text-xl font-bold text-primary">Acompanhe no Instagram</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Conteúdos diários de conscientização e orientação.
              </p>
            </div>
            <Button asChild variant="navy">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <Instagram className="h-4 w-4" />
                {INSTAGRAM_HANDLE}
              </a>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
