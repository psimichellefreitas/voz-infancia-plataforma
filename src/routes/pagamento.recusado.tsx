import { createFileRoute, Link } from "@tanstack/react-router";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";

export const Route = createFileRoute("/pagamento/recusado")({
  head: () => ({
    meta: [
      { title: "Não foi possível concluir o pagamento — Voz Protetora" },
      {
        name: "description",
        content: "O pagamento não foi aprovado. Você pode tentar novamente.",
      },
      { property: "og:title", content: "Não foi possível concluir o pagamento" },
      { property: "og:description", content: "Tente novamente o pagamento do Voz Protetora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RecusadoPage,
});

function RecusadoPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-destructive/10">
            <XCircle className="h-7 w-7 text-destructive" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-primary sm:text-3xl">
            Não foi possível concluir o pagamento.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Seu pagamento não foi aprovado. Você pode tentar novamente.
          </p>
          <div className="mt-8">
            <Button asChild variant="hero" size="xl">
              <Link to="/checkout">TENTAR NOVAMENTE</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}