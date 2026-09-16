import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";

import { searchContent } from "@/lib/voz-protetora/content";
import { usePreviewSearch } from "@/lib/preview-mode";

const PORTA_COLOR: Record<string, string> = {
  aconteceu: "text-voz-blue",
  "vai-acontecer": "text-voz-green",
  fortalecer: "text-voz-yellow",
};

interface SearchBoxProps {
  autoFocus?: boolean;
  placeholder?: string;
}

/**
 * Busca client-side nas 60 peças do Banco de Situações — título, tema e texto da
 * orientação. Não depende de backend: o conteúdo já está no bundle.
 */
export function SearchBox({ autoFocus, placeholder }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const previewSearch = usePreviewSearch();
  const results = useMemo(() => searchContent(query), [query]);
  const showResults = query.trim().length >= 2;

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          autoFocus={autoFocus}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder ?? "Digite sua dúvida: ex. \"criança com medo\", \"celular\"..."}
          className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-10 text-sm text-foreground shadow-[var(--shadow-soft)] outline-none placeholder:text-muted-foreground focus:border-accent"
          aria-label="Buscar orientação"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Limpar busca"
            className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="mt-3 space-y-2">
          {results.length === 0 ? (
            <div className="rounded-[12px] border border-border bg-card p-4 text-sm text-muted-foreground">
              Nenhuma orientação encontrada para "{query}". Se a situação for urgente, veja{" "}
              <Link
                to="/voz-protetora/preciso-de-ajuda"
                search={previewSearch}
                className="font-semibold text-primary underline"
              >
                Preciso de ajuda
              </Link>
              .
            </div>
          ) : (
            results.slice(0, 12).map((result) => (
              <Link
                key={`${result.porta}-${result.slug}`}
                to={result.to as never}
                search={previewSearch as never}
                className="flex items-start gap-3 rounded-[12px] border border-border bg-card p-4 shadow-[var(--shadow-soft)] transition-colors hover:border-accent"
              >
                {result.emoji && <span className="text-lg leading-none">{result.emoji}</span>}
                <div className="min-w-0">
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.1em] ${PORTA_COLOR[result.porta] ?? "text-accent"}`}
                  >
                    {result.portaLabel}
                  </span>
                  <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
                    {result.title}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
