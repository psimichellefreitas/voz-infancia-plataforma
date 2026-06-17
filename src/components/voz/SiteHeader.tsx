import { useEffect, useState } from "react";
import { Menu, X, HeartHandshake, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Início", href: "#top" },
  { label: "Quem Somos", href: "#missao" },
  { label: "Aplicativos", href: "#aplicativos" },
  { label: "Biblioteca", href: "#biblioteca" },
  { label: "Cursos", href: "#trilhas" },
  { label: "Sinais de Alerta", href: "#sinais" },
  { label: "Ferramentas", href: "#ferramentas" },
  { label: "Blog", href: "#blog" },
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
          ? "bg-background/90 backdrop-blur-xl shadow-[var(--shadow-soft)]"
          : "bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
            <HeartHandshake className="h-5 w-5" />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-display text-base font-extrabold tracking-tight text-primary">
              VOZ
            </span>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-accent">
              Pela Infância
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 xl:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[0.8rem] font-semibold uppercase tracking-wide text-foreground/75 transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <button
            className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition-colors hover:text-accent"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </button>
          <Button asChild variant="outline" size="default">
            <a href="#movimento">Entrar</a>
          </Button>
          <Button asChild variant="hero" size="default">
            <a href="#contribuir">Quero Ajudar</a>
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl text-primary xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-5 pb-6 pt-2 backdrop-blur-xl xl:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-base font-semibold text-foreground/85"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Button asChild variant="outline" size="lg">
                <a href="#movimento" onClick={() => setOpen(false)}>
                  Entrar
                </a>
              </Button>
              <Button asChild variant="hero" size="lg">
                <a href="#contribuir" onClick={() => setOpen(false)}>
                  Quero Ajudar
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
