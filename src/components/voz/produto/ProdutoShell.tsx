import { useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { usePreviewSearch } from "@/lib/preview-mode";
import { AppShell } from "./AppShell";
import { BotaoOuvir, ControlesDeLetra, useTamanhoLetra } from "./LeituraFerramentas";

interface ProdutoShellProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  backTo?: { to: string; label: string };
  /** Mostra Ouvir e A−/A+ nesta página (as orientações têm as próprias ferramentas). */
  ferramentasDeLeitura?: boolean;
  children: ReactNode;
}

/**
 * Página interna do VOZ PROTETORA em formato de app: cabeçalho curto (voltar, título, abertura)
 * dentro da `AppShell` (coluna única + barra de abas). A autorização continua sendo validada no
 * backend, dentro da `AppShell`.
 */
export function ProdutoShell({
  eyebrow,
  title,
  intro,
  backTo,
  ferramentasDeLeitura = true,
  children,
}: ProdutoShellProps) {
  const previewSearch = usePreviewSearch() as never;
  const letra = useTamanhoLetra();
  const conteudoRef = useRef<HTMLDivElement>(null);

  return (
    <AppShell>
      <header className="print:px-0">
        {backTo && (
          <Link
            to={backTo.to as never}
            search={previewSearch}
            className="print:hidden inline-flex items-center gap-1.5 rounded-full bg-card px-3.5 py-2 text-sm font-semibold text-primary shadow-[var(--shadow-soft)]"
          >
            <ArrowLeft className="h-4 w-4" />
            {backTo.label}
          </Link>
        )}
        {eyebrow && (
          <p className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-accent print:mt-0">
            <span className="h-0.5 w-6 rounded-full bg-voz-yellow" />
            {eyebrow}
          </p>
        )}
        <h1
          className={`font-display text-[1.7rem] font-bold leading-[1.15] text-balance text-primary ${
            eyebrow ? "mt-2" : "mt-5"
          }`}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{intro}</p>
        )}
      </header>
      {ferramentasDeLeitura && (
        <div className="flex items-center gap-2 print:hidden">
          <BotaoOuvir
            getTexto={() => `${title}. ${intro ?? ""} ${conteudoRef.current?.innerText ?? ""}`}
          />
          <ControlesDeLetra nivel={letra.nivel} definir={letra.definir} />
        </div>
      )}
      <div ref={conteudoRef} style={ferramentasDeLeitura ? { zoom: letra.escala } : undefined}>
        {children}
      </div>
    </AppShell>
  );
}
