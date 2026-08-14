import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { FOOTER_LINKS, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "./nav";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Movimento em defesa da infância.
          </p>
          <p className="mt-2 text-sm font-semibold text-primary">Valorizar. Orientar. Zelar.</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            <Instagram className="h-4 w-4" />
            {INSTAGRAM_HANDLE}
          </a>
        </div>

        <nav aria-label="Links do rodapé">
          <ul className="grid gap-3 sm:grid-cols-2">
            {FOOTER_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border/70 py-5">
        <p className="mx-auto max-w-6xl px-5 text-xs text-muted-foreground sm:px-8">
          © {new Date().getFullYear()} Voz Pela Infância. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
