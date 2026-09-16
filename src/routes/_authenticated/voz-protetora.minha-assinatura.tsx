import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { cancelMySubscription, getMySubscriptionStatus } from "@/lib/checkout.functions";
import { formatBRL } from "@/lib/product";
import { useHasSession } from "@/lib/preview-mode";

export const Route = createFileRoute("/_authenticated/voz-protetora/minha-assinatura")({
  head: () => ({
    meta: [
      { title: "Minha assinatura: Voz Protetora" },
      { name: "description", content: "Gerencie sua assinatura do Voz Protetora." },
      { property: "og:title", content: "Minha assinatura: Voz Protetora" },
      { property: "og:description", content: "Gerencie sua assinatura do Voz Protetora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MinhaAssinaturaPage,
});

const STATUS_LABEL: Record<string, string> = {
  pending: "Aguardando autorização no Mercado Pago",
  authorized: "Ativa",
  payment_failed: "Cobrança da renovação não aprovada",
  cancelled: "Cancelada",
};

function formatDate(iso: string | null) {
  if (!iso) return "N/D";
  return new Date(iso).toLocaleDateString("pt-BR");
}

function MinhaAssinaturaPage() {
  const queryClient = useQueryClient();
  const fetchStatus = useServerFn(getMySubscriptionStatus);
  const cancel = useServerFn(cancelMySubscription);
  const [cancelling, setCancelling] = useState(false);
  const hasSession = useHasSession();

  const { data, isLoading } = useQuery({
    queryKey: ["my-subscription-status"],
    queryFn: () => fetchStatus(),
    enabled: hasSession,
    retry: false,
  });

  async function handleCancel() {
    if (!window.confirm("Cancelar sua assinatura do Voz Protetora?")) return;
    setCancelling(true);
    try {
      await cancel();
      toast.success("Assinatura cancelada. Seu acesso continua até o fim do ciclo já pago.");
      await queryClient.invalidateQueries({ queryKey: ["my-subscription-status"] });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Não foi possível cancelar. Tente novamente.",
      );
    } finally {
      setCancelling(false);
    }
  }

  return (
    <ProdutoShell
      eyebrow="🛡️ Minha assinatura"
      title="Gerencie sua assinatura do Voz Protetora."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      {!hasSession ? (
        <p className="rounded-[12px] border border-border bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
          Entre com a conta usada na assinatura para ver e gerenciar seu status aqui.
        </p>
      ) : isLoading ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Carregando...
        </p>
      ) : !data?.found ? (
        <p className="text-sm text-muted-foreground">Nenhuma assinatura encontrada.</p>
      ) : (
        <div className="space-y-5">
          <div className="rounded-[12px] border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-2">
              {data.hasAccess ? (
                <CheckCircle2 className="h-5 w-5 text-accent" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              )}
              <h2 className="text-base font-bold text-primary">
                {STATUS_LABEL[data.status] ?? data.status}
              </h2>
            </div>
            <dl className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <dt>Valor</dt>
                <dd>{formatBRL(data.amount)} / ano</dd>
              </div>
              <div className="flex justify-between">
                <dt>Acesso válido até</dt>
                <dd>{formatDate(data.currentPeriodEnd)}</dd>
              </div>
              {data.cancelledAt ? (
                <div className="flex justify-between">
                  <dt>Cancelada em</dt>
                  <dd>{formatDate(data.cancelledAt)}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          {data.status === "authorized" && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleCancel}
              disabled={cancelling}
              className="w-full"
            >
              {cancelling ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Cancelando...
                </>
              ) : (
                "CANCELAR ASSINATURA"
              )}
            </Button>
          )}

          <p className="text-xs leading-relaxed text-muted-foreground">
            Ao cancelar, seu acesso continua até o fim do ciclo já pago: você não perde o que
            pagou. Nos primeiros 7 dias após a contratação, o cancelamento dá direito a reembolso
            integral, conforme o Código de Defesa do Consumidor.
          </p>
        </div>
      )}
    </ProdutoShell>
  );
}
