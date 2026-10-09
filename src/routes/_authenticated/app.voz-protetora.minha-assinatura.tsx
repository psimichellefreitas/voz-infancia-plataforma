import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Loader2 } from "lucide-react";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { getMyPurchaseStatus } from "@/lib/checkout.functions";
import { formatBRL } from "@/lib/product";
import { CONTATO_EMAIL } from "@/components/voz/nav";
import { useHasSession } from "@/lib/preview-mode";

export const Route = createFileRoute("/_authenticated/app/voz-protetora/minha-assinatura")({
  head: () => ({
    meta: [
      { title: "Minha compra: Voz Protetora" },
      { name: "description", content: "Veja os dados da sua compra do Voz Protetora." },
      { property: "og:title", content: "Minha compra: Voz Protetora" },
      { property: "og:description", content: "Veja os dados da sua compra do Voz Protetora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MinhaCompraPage,
});

function formatDate(iso: string | null) {
  if (!iso) return "N/D";
  return new Date(iso).toLocaleDateString("pt-BR");
}

function MinhaCompraPage() {
  const fetchStatus = useServerFn(getMyPurchaseStatus);
  const hasSession = useHasSession();

  const { data, isLoading } = useQuery({
    queryKey: ["my-purchase-status"],
    queryFn: () => fetchStatus(),
    enabled: hasSession,
    retry: false,
  });

  return (
    <ProdutoShell
      eyebrow="🛡️ Minha compra"
      title="Dados da sua compra do Voz Protetora."
      backTo={{ to: "/app/voz-protetora", label: "Voltar ao início" }}
    >
      {!hasSession ? (
        <p className="rounded-[20px] border border-border/60 shadow-[var(--shadow-soft)] bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
          Entre com a conta usada na compra para ver seus dados aqui.
        </p>
      ) : isLoading ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Carregando...
        </p>
      ) : !data?.found ? (
        <p className="text-sm text-muted-foreground">Nenhuma compra aprovada encontrada.</p>
      ) : (
        <div className="space-y-5">
          <div className="rounded-[20px] border border-border/60 shadow-[var(--shadow-soft)] bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <h2 className="text-base font-bold text-primary">Compra aprovada</h2>
            </div>
            <dl className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <dt>Valor pago</dt>
                <dd>{formatBRL(data.amount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Data da compra</dt>
                <dd>{formatDate(data.purchasedAt)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Acesso</dt>
                <dd>Vitalício</dd>
              </div>
            </dl>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Nos primeiros 7 dias após a compra, você tem direito a reembolso integral, conforme
            o Código de Defesa do Consumidor. Para solicitar, entre em contato pelo e-mail{" "}
            <a href={`mailto:${CONTATO_EMAIL}`} className="font-semibold text-primary underline">
              {CONTATO_EMAIL}
            </a>
            .
          </p>
        </div>
      )}
      {!isLoading && (
        <p className="mt-6 text-xs text-muted-foreground">
          Perguntas sobre pagamento?{" "}
          <Link to="/contato" className="font-semibold text-primary underline">
            Fale com a gente
          </Link>
          .
        </p>
      )}
    </ProdutoShell>
  );
}
