import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Phone } from "lucide-react";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import {
  AJUDA_CONTEUDO,
  AVISO_LEGAL,
  CANAIS_NACIONAIS,
  CANAIS_VERIFICADO_EM,
} from "@/lib/voz-protetora/content";

export const Route = createFileRoute("/_authenticated/voz-protetora/preciso-de-ajuda")({
  head: () => ({
    meta: [
      { title: "Preciso de ajuda: Voz Protetora" },
      { name: "description", content: "Quando a orientação não é suficiente." },
      { property: "og:title", content: "Preciso de ajuda: Voz Protetora" },
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
      intro="Algumas situações exigem apoio da rede de proteção e de profissionais. O Voz Protetora não substitui esse apoio: ele te ajuda a saber por onde começar."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      <div className="rounded-[12px] border-2 border-destructive/40 bg-destructive/5 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h2 className="text-base font-bold text-destructive">
            Risco imediato à vida ou à integridade da criança?
          </h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          Não espere ter certeza de tudo antes de agir. Ligue agora: <strong>190</strong> (Polícia)
          ou <strong>192</strong> (SAMU). Priorize a segurança primeiro.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-primary">
          Canais nacionais de proteção
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {CANAIS_NACIONAIS.map((canal) => (
            <div key={canal.nome} className="rounded-[12px] border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-bold text-primary">{canal.nome}</h3>
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground/90">{canal.contato}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{canal.quando}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Informação verificada em {CANAIS_VERIFICADO_EM}. Números e serviços podem mudar,
          confirme localmente quando possível.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-primary">
          O que fazer, por tema
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {AJUDA_CONTEUDO.map((item) => (
            <div key={item.tema} className="rounded-[12px] border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-bold text-primary">{item.tema}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.oQueFazer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[12px] border border-border bg-secondary p-5">
        <p className="text-sm leading-relaxed text-foreground/85">{AVISO_LEGAL}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Você não precisa ter certeza para procurar ajuda, e não precisa investigar ou resolver
          sozinho. Buscar orientação é, em si, um passo de proteção.
        </p>
      </div>
    </ProdutoShell>
  );
}
