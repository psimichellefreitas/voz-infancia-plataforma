import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";

export const Route = createFileRoute("/pagamento/aprovado")({
  head: () => ({
    meta: [
      { title: "Seu acesso está pronto! — Voz Protetora" },
      {
        name: "description",
        content: "Pagamento confirmado. Acesse agora o Voz Protetora.",
      },
      { property: "og:title", content: "Seu acesso está pronto!" },
      { property: "og:description", content: "Pagamento confirmado do Voz Protetora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AprovadoPage,
});

function AprovadoPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15">
            <CheckCircle2 className="h-7 w-7 text-accent" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-primary sm:text-3xl">
            Seu acesso está pronto!
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Pagamento confirmado. Agora você já pode acessar o Voz Protetora.
          </p>
          <div className="mt-8">
            <Button asChild variant="hero" size="xl">
              <Link to="/voz-protetora">ACESSAR VOZ PROTETORA</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Entre com o mesmo e-mail utilizado na compra.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}