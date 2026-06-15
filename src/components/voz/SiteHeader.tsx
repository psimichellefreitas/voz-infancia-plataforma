import { useEffect, useState } from "react";
import { Menu, X, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Missão", href: "#missao" },
  { label: "Aplicativos", href: "#aplicativos" },
  { label: "Biblioteca", href: "#biblioteca" },
  { label: "Trilhas", href: "#trilhas" },
  { label: "Movimento", href: "#movimento" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-xl shadow-[var(--shadow-soft)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-accent transition-colors",
              scrolled ? "bg-primary/10" : "bg-primary-foreground/15",
            )}
          >
            <HeartHandshake className="h-5 w-5" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span
              className={cn(
                "truncate font-display text-base font-extrabold tracking-tight transition-colors",
                scrolled ? "text-primary" : "text-primary-foreground",
              )}
            >
              Voz Pela Infância
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                scrolled
                  ? "text-foreground/80 hover:text-accent"
                  : "text-primary-foreground/90 hover:text-accent",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="hero" size="default">
            <a href="#movimento">🧡 Erga sua voz</a>
          </Button>
        </div>

        <button
          className={cn(
            "grid h-10 w-10 place-items-center rounded-xl lg:hidden",
            scrolled ? "text-primary" : "text-primary-foreground",
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-5 pb-6 pt-2 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-base font-medium text-foreground/85"
              >
                {item.label}
              </a>
            ))}
            <Button asChild variant="hero" size="lg" className="mt-4">
              <a href="#movimento" onClick={() => setOpen(false)}>
                🧡 Erga sua voz
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}