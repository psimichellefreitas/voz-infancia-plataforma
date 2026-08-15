import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";
import { startCheckout } from "@/lib/checkout.functions";
import { VOZ_PROTETORA, formatBRL } from "@/lib/product";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Voz Protetora | Voz Pela Infância" },
      {
        name: "description",
        content:
          "Finalize a compra do Voz Protetora: R$ 1,00, compra única. Pagamento processado pelo Mercado Pago.",
      },
      { property: "og:title", content: "Checkout — Voz Protetora" },
      {
        property: "og:description",
        content: "Compra única do Voz Protetora por R$ 1,00, com pagamento seguro.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const begin = useServerFn(startCheckout);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await begin({ data: { name, email } });
      // Guarda apenas a referência da compra para consultar o status depois.
      window.sessionStorage.setItem("voz.ultimaCompra", result.purchaseId);
      window.location.href = result.checkoutUrl;
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível iniciar o pagamento. Tente novamente.",
      );
      setLoading(false);
    }
  }

  void navigate;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-20">
        <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">Finalizar compra</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Você precisa informar apenas nome e e-mail. O e-mail será usado para liberar e
            reconhecer o seu acesso.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
            <form
              onSubmit={handleSubmit}
              className="rounded-[12px] border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
            >
              <div className="space-y-5">
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    minLength={2}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                    placeholder="Como devemos chamar você"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                    placeholder="seu@email.com"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Use um e-mail que você acessa: é por ele que o acesso será liberado.
                  </p>
                </div>
              </div>

              <Button type="submit" variant="hero" size="xl" className="mt-7 w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    ABRINDO PAGAMENTO...
                  </>
                ) : (
                  "IR PARA O PAGAMENTO"
                )}
              </Button>

              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                O pagamento é processado pelo Mercado Pago. Não armazenamos dados de cartão.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Ao continuar, você concorda com os{" "}
                <Link to="/termos-de-uso" className="font-semibold text-primary underline">
                  Termos de Uso
                </Link>{" "}
                e com a{" "}
                <Link to="/politica-de-privacidade" className="font-semibold text-primary underline">
                  Política de Privacidade
                </Link>
                .
              </p>
            </form>

            <aside className="h-fit rounded-[12px] border border-border bg-secondary p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Resumo
              </p>
              <h2 className="mt-3 text-lg font-bold text-primary">{VOZ_PROTETORA.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">Compra única.</p>
              <p className="mt-5 text-4xl font-bold text-primary">
                {formatBRL(VOZ_PROTETORA.amount)}
              </p>
              <div className="mt-6 flex items-start gap-2 rounded-[10px] border border-border bg-card p-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-xs leading-relaxed text-foreground/80">
                  O acesso é liberado somente após a confirmação real do pagamento.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}