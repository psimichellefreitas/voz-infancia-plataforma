import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { AJUDA_TEMAS, AVISO_LEGAL } from "@/lib/voz-protetora/content";

export const Route = createFileRoute("/_authenticated/voz-protetora/preciso-de-ajuda")({
  head: () => ({
    meta: [
      { title: "Preciso de ajuda — Voz Protetora" },
      { name: "description", content: "Quando a orientação não é suficiente." },
      { property: "og:title", content: "Preciso de ajuda — Voz Protetora" },
      { property: "og:description", content: "Quando a orientação não é suficiente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrecisoDeAjudaPage,
});

function PrecisoDeAjudaPage() {
  return (
    <ProdutoShell
      eyebrow="🚨 Preciso de ajuda"
      title="Quando a orientação não é suficiente."
      intro="Algumas situações exigem apoio da rede de proteção e de profissionais."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {AJUDA_TEMAS.map((tema) => (
          <div key={tema} className="rounded-[12px] border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-accent" />
              <h2 className="text-sm font-bold text-primary">{tema}</h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Orientação em produção. Este bloco receberá a orientação oficial revisada.
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[12px] border border-border bg-secondary p-5">
        <p className="text-sm leading-relaxed text-foreground/85">{AVISO_LEGAL}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Os canais oficiais de proteção serão inseridos em etapa específica, após revisão.
        </p>
      </div>
    </ProdutoShell>
  );
}
