import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";

import { AppShell } from "@/components/voz/produto/AppShell";
import { FOLHAS } from "@/components/voz/produto/bonus/folhas";
import { Button } from "@/components/ui/button";
import { usePreviewSearch } from "@/lib/preview-mode";
import { findBonus } from "@/lib/voz-protetora/bonus";

export const Route = createFileRoute("/_authenticated/app/voz-protetora/bonus/$slug")({
  head: () => ({
    meta: [
      { title: "Bônus: Voz Protetora" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BonusPagina,
});

function BonusPagina() {
  const { slug } = Route.useParams();
  const previewSearch = usePreviewSearch() as never;
  const bonus = findBonus(slug);
  const folha = FOLHAS[slug];

  return (
    <AppShell>
      <div className="flex items-center justify-between gap-3 print:hidden">
        <Link
          to="/app/voz-protetora/bonus"
          search={previewSearch}
          className="inline-flex items-center gap-1.5 rounded-full bg-card px-3.5 py-2 text-sm font-semibold text-primary shadow-[var(--shadow-soft)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Bônus
        </Link>
        {bonus && folha && (
          <Button type="button" variant="hero" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
        )}
      </div>

      {bonus && folha ? (
        folha()
      ) : (
        <p className="rounded-[20px] bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-soft)]">
          Bônus não encontrado.
        </p>
      )}
    </AppShell>
  );
}
