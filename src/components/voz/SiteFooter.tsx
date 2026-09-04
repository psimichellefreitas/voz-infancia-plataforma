import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import {
  FOOTER_NAV,
  FOOTER_INSTITUTIONAL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  DESCRITOR,
  ASSINATURA,
  LINHA_SEGURANCA,
} from "./nav";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 text-sm text-muted-foreground">{DESCRITOR}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {ASSINATURA}
          </p>
        </div>

        <nav aria-label="Navegar">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Navegar
          </h2>
          <ul className="mt-4 grid gap-2.5">
            {FOOTER_NAV.map((l) => (
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

        <nav aria-label="Institucional">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Institucional
          </h2>
          <ul className="mt-4 grid gap-2.5">
            {FOOTER_INSTITUTIONAL.map((l) => (
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

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Acompanhar
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            <Instagram className="h-4 w-4" />
            {INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>

      <div className="border-t border-border/70">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs leading-relaxed text-muted-foreground sm:px-8">
          {LINHA_SEGURANCA}
        </p>
      </div>

      <div className="border-t border-border/70 py-5">
        <p className="mx-auto max-w-6xl px-5 text-xs text-muted-foreground sm:px-8">
          © {new Date().getFullYear()} Voz Pela Infância. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
