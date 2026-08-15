import { createFileRoute, Link } from "@tanstack/react-router";
import { Hourglass } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";

export const Route = createFileRoute("/pagamento/pendente")({
  head: () => ({
    meta: [
      { title: "Aguardando confirmação do pagamento — Voz Protetora" },
      {
        name: "description",
        content: "Seu pagamento ainda não foi confirmado pelo Mercado Pago.",
      },
      { property: "og:title", content: "Aguardando confirmação do pagamento" },
      { property: "og:description", content: "O acesso será liberado após a confirmação." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PendentePage,
});

function PendentePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-voz-yellow/20">
            <Hourglass className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-primary sm:text-3xl">
            Estamos aguardando a confirmação do pagamento.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Seu pagamento ainda não foi confirmado. Assim que recebermos a confirmação, seu acesso
            será liberado.
          </p>
          <div className="mt-8">
            <Button asChild variant="hero" size="xl">
              <Link to="/">VOLTAR AO SITE</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}