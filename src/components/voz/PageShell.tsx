import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Reveal } from "./Reveal";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** Layout institucional reutilizável para páginas internas. */
export function PageShell({ eyebrow, title, intro, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <Reveal>
              {eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {eyebrow}
                </p>
              )}
              <h1 className="mt-3 text-3xl font-bold leading-tight text-primary sm:text-4xl">
                {title}
              </h1>
              {intro && (
                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {intro}
                </p>
              )}
            </Reveal>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
