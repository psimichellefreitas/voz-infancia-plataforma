import { useEffect, useState } from "react";
import { Menu, X, HeartHandshake, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV } from "./nav";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase =
    "text-[0.78rem] font-semibold uppercase tracking-wide text-foreground/75 transition-colors hover:text-accent";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-[var(--shadow-soft)]"
          : "bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
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
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                {item.to ? (
                  <Link
                    to={item.to}
                    className={cn(linkBase, "flex items-center gap-1")}
                    activeProps={{ className: "text-accent" }}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </Link>
                ) : (
                  <button type="button" className={cn(linkBase, "flex items-center gap-1")}>
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                )}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[15rem] rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-lift)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-accent"
                        activeProps={{ className: "bg-secondary text-accent" }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className={linkBase}
                activeProps={{ className: "text-accent" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Button asChild variant="hero" size="default">
            <Link to="/movimento">Quero Ajudar</Link>
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
        <div className="max-h-[80vh] overflow-y-auto border-t border-border bg-background/95 px-5 pb-6 pt-2 backdrop-blur-xl xl:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-border/60">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenGroup((g) => (g === item.label ? null : item.label))
                    }
                    className="flex w-full items-center justify-between py-3 text-base font-semibold text-foreground/85"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openGroup === item.label && "rotate-180",
                      )}
                    />
                  </button>
                  {openGroup === item.label && (
                    <div className="flex flex-col pb-2">
                      {item.to && (
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="py-2 pl-4 text-sm font-medium text-accent"
                        >
                          Ver tudo
                        </Link>
                      )}
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={() => setOpen(false)}
                          className="py-2 pl-4 text-sm font-medium text-foreground/75"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3 text-base font-semibold text-foreground/85"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Button asChild variant="hero" size="lg" className="mt-4">
              <Link to="/movimento" onClick={() => setOpen(false)}>
                Quero Ajudar
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}