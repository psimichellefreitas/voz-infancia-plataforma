import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Clock, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";
import { getPurchaseStatus } from "@/lib/checkout.functions";

export const Route = createFileRoute("/pagamento/processando")({
  head: () => ({
    meta: [
      { title: "Confirmando seu pagamento — Voz Pela Infância" },
      {
        name: "description",
        content: "Estamos confirmando seu pagamento do Voz Protetora junto ao Mercado Pago.",
      },
      { property: "og:title", content: "Confirmando seu pagamento" },
      { property: "og:description", content: "Aguardando a confirmação do pagamento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    compra: typeof search["compra"] === "string" ? search["compra"] : undefined,
  }),
  component: ProcessandoPage,
});

function ProcessandoPage() {
  const { compra } = useSearch({ from: "/pagamento/processando" });
  const fetchStatus = useServerFn(getPurchaseStatus);

  const { data } = useQuery({
    queryKey: ["purchase-status", compra],
    enabled: Boolean(compra),
    refetchInterval: 5000,
    queryFn: () => fetchStatus({ data: { purchaseId: compra! } }),
  });

  const status = data?.found ? data.paymentStatus : null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10">
            <Clock className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-primary sm:text-3xl">
            Estamos confirmando seu pagamento.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Assim que o pagamento for confirmado, seu acesso ao Voz Protetora será liberado.
          </p>

          {compra ? (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Status atual: {statusLabel(status)}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {status === "approved" ? (
              <Button asChild variant="hero" size="xl">
                <Link to="/pagamento/aprovado" search={{ compra }}>
                  VER MEU ACESSO
                </Link>
              </Button>
            ) : null}
            <Button asChild variant="outline" size="xl">
              <Link to="/">VOLTAR AO SITE</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function statusLabel(status: string | null) {
  switch (status) {
    case "approved":
      return "pagamento aprovado";
    case "pending":
      return "aguardando confirmação";
    case "rejected":
      return "pagamento não aprovado";
    case "cancelled":
      return "pagamento cancelado";
    case "initiated":
      return "pagamento iniciado";
    default:
      return "verificando";
  }
}
