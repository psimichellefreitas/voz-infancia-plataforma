import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/voz/Reveal";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";

const SHELL = "mx-auto max-w-[1400px] px-5 sm:px-8";

export interface PortalFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PortalPageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  features?: PortalFeature[];
  /** Optional CTA override */
  ctaLabel?: string;
  ctaTo?: string;
  children?: ReactNode;
}

export function PortalPage({
  eyebrow,
  title,
  subtitle,
  description,
  icon: Icon,
  features,
  ctaLabel = "Quero participar do movimento",
  ctaTo = "/movimento",
  children,
}: PortalPageProps) {
  return (
    <div className="overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-secondary/50" />
            <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className={SHELL}>
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                {eyebrow}
              </span>

              <div className="mx-auto mt-8 grid h-20 w-20 place-items-center rounded-3xl bg-card text-accent shadow-[var(--shadow-soft)]">
                <Icon className="h-9 w-9" />
              </div>

              <h1 className="mt-8 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-6xl text-balance">
                {title}
              </h1>

              <p className="mt-5 font-display text-lg font-semibold text-accent sm:text-xl">
                {subtitle}
              </p>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-balance">
                {description}
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to={ctaTo}>
                    {ctaLabel} <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/biblioteca">Explorar a Biblioteca</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTENT / EXPANSION STRUCTURE */}
        <section className="py-20 sm:py-24">
          <div className={SHELL}>
            {children ?? (
              <>
                <Reveal className="mx-auto max-w-2xl text-center">
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                    O que você encontrará aqui
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Esta área está em construção e crescerá continuamente com novos conteúdos,
                    ferramentas e recursos para fortalecer a proteção da infância.
                  </p>
                </Reveal>

                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {(features ?? DEFAULT_FEATURES).map((f, i) => (
                    <Reveal key={f.title} delay={i * 80}>
                      <article className="group h-full rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                          <f.icon className="h-6 w-6" />
                        </span>
                        <h3 className="mt-5 font-display text-lg font-bold text-primary">
                          {f.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {f.description}
                        </p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* COMING SOON BANNER */}
        <section className="pb-24">
          <div className={SHELL}>
            <Reveal>
              <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-secondary/40 px-8 py-12 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent shadow-sm">
                  <Clock className="h-3.5 w-3.5" /> Em breve
                </span>
                <p className="mt-6 font-display text-2xl font-extrabold leading-snug text-primary sm:text-3xl text-balance">
                  Estamos preparando conteúdos profundos e transformadores para esta seção.
                </p>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  Cadastre-se no movimento e seja avisado assim que novos materiais forem publicados.
                </p>
                <Button asChild variant="hero" size="lg" className="mt-8">
                  <Link to="/movimento">
                    Fazer parte do movimento <ArrowRight />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

import { BookOpen, ShieldCheck, Users } from "lucide-react";

const DEFAULT_FEATURES: PortalFeature[] = [
  {
    icon: BookOpen,
    title: "Conteúdo confiável",
    description:
      "Materiais produzidos com responsabilidade, embasamento e linguagem acessível para todos.",
  },
  {
    icon: ShieldCheck,
    title: "Foco em proteção",
    description:
      "Cada recurso é pensado para fortalecer o cuidado e a segurança das crianças.",
  },
  {
    icon: Users,
    title: "Construído em comunidade",
    description:
      "Um ecossistema vivo que cresce com pais, educadores, profissionais e igrejas.",
  },
];