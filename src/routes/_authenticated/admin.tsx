import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";
import { getAdminSales } from "@/lib/admin.functions";
import { formatBRL } from "@/lib/product";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{ title: "Painel de vendas" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminPage,
});

const STATUS_LABEL: Record<string, string> = {
  approved: "Aprovada",
  pending: "Aguardando",
  rejected: "Recusada",
  cancelled: "Cancelada ou devolvida",
  initiated: "Não concluída",
};

const STATUS_STYLE: Record<string, string> = {
  approved: "bg-accent/15 text-accent",
  pending: "bg-secondary text-muted-foreground",
  rejected: "bg-destructive/10 text-destructive",
  cancelled: "bg-destructive/10 text-destructive",
  initiated: "bg-secondary text-muted-foreground",
};

const PRODUCT_LABEL: Record<string, string> = {
  "voz-protetora-v1": "VOZ PROTETORA",
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function AdminPage() {
  const fetchSales = useServerFn(getAdminSales);
  const [onlyApproved, setOnlyApproved] = useState(true);

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["admin-sales"],
    queryFn: () => fetchSales(),
    retry: false,
  });

  const rows = data?.allowed
    ? data.sales.filter((sale) => (onlyApproved ? sale.status === "approved" : true))
    : [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">Painel de vendas</h1>

          {isLoading ? (
            <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Carregando...
            </p>
          ) : isError ? (
            <p className="mt-6 rounded-[12px] border border-border bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
              Não foi possível carregar as vendas agora. Tente atualizar a página.
            </p>
          ) : !data?.allowed ? (
            <div className="mt-6 rounded-[12px] border border-border bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
              <p>Esta página é restrita à administradora do site.</p>
              {data?.email ? <p className="mt-2">Você entrou como {data.email}.</p> : null}
              <p className="mt-4">
                <Link to="/voz-protetora" className="font-semibold text-primary underline">
                  Ir para o Voz Protetora
                </Link>
              </p>
            </div>
          ) : (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[12px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Vendas aprovadas
                  </p>
                  <p className="mt-2 text-3xl font-bold text-primary">
                    {data.totals.approvedCount}
                  </p>
                </div>
                <div className="rounded-[12px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Total recebido
                  </p>
                  <p className="mt-2 text-3xl font-bold text-primary">
                    {formatBRL(data.totals.approvedAmount)}
                  </p>
                </div>
                <div className="rounded-[12px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Pessoas com acesso
                  </p>
                  <p className="mt-2 text-3xl font-bold text-primary">
                    {data.totals.buyersWithAccess}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOnlyApproved(true)}
                  aria-pressed={onlyApproved}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${
                    onlyApproved
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  Só aprovadas
                </button>
                <button
                  type="button"
                  onClick={() => setOnlyApproved(false)}
                  aria-pressed={!onlyApproved}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${
                    !onlyApproved
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  Todas as tentativas
                </button>
                <button
                  type="button"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="ml-auto text-sm font-semibold text-primary underline disabled:opacity-60"
                >
                  {isFetching ? "Atualizando..." : "Atualizar"}
                </button>
              </div>

              {rows.length === 0 ? (
                <p className="mt-6 text-sm text-muted-foreground">
                  {onlyApproved
                    ? "Nenhuma venda aprovada ainda."
                    : "Nenhuma tentativa de compra registrada ainda."}
                </p>
              ) : (
                <div className="mt-4 overflow-x-auto rounded-[12px] border border-border bg-card shadow-[var(--shadow-soft)]">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Data</th>
                        <th className="px-4 py-3 font-semibold">Comprador</th>
                        <th className="px-4 py-3 font-semibold">Produto</th>
                        <th className="px-4 py-3 font-semibold">Valor</th>
                        <th className="px-4 py-3 font-semibold">Pagamento</th>
                        <th className="px-4 py-3 font-semibold">Acesso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((sale) => (
                        <tr key={sale.id} className="border-b border-border last:border-0">
                          <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                            {formatDateTime(sale.createdAt)}
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-semibold text-primary">{sale.name || "Sem nome"}</p>
                            <p className="break-all text-muted-foreground">{sale.email}</p>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {PRODUCT_LABEL[sale.productId] ?? sale.productId}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                            {formatBRL(sale.amount)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                                STATUS_STYLE[sale.status] ?? "bg-secondary text-muted-foreground"
                              }`}
                            >
                              {STATUS_LABEL[sale.status] ?? sale.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {sale.hasAccess ? "Liberado" : "Sem acesso"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Reembolsos são feitos no painel do Mercado Pago. "Não concluída" é quem abriu o
                pagamento e saiu antes de finalizar.
              </p>
            </>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
