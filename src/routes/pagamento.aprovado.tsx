import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";
import { sendAccessEmail } from "@/lib/access-email.functions";

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
  validateSearch: (search: Record<string, unknown>) => ({
    compra: typeof search["compra"] === "string" ? search["compra"] : undefined,
  }),
  component: AprovadoPage,
});

function AprovadoPage() {
  const { compra } = useSearch({ from: "/pagamento/aprovado" });
  const sendEmail = useServerFn(sendAccessEmail);
  const [emailSent, setEmailSent] = useState<string | null>(null);
  const requested = useRef(false);

  useEffect(() => {
    if (!compra || requested.current) return;
    requested.current = true;
    sendEmail({ data: { purchaseId: compra } })
      .then((result) => {
        if (result.sent) setEmailSent(result.email);
      })
      .catch(() => undefined);
  }, [compra, sendEmail]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15">
            <CheckCircle2 className="h-7 w-7 text-accent" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-primary sm:text-3xl">
            Seu acesso ao Voz Protetora está pronto!
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Seu pagamento foi confirmado e seu acesso ao Voz Protetora V1 foi liberado.
          </p>
          <div className="mt-8">
            <Button asChild variant="hero" size="xl">
              <Link to="/voz-protetora">ACESSAR MEU VOZ PROTETORA</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Use este acesso sempre que quiser consultar uma orientação, se preparar para uma
            situação ou fortalecer sua prática protetiva.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Entre com o mesmo e-mail utilizado na compra.
          </p>
          {emailSent && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-primary">
              <Mail className="h-4 w-4" />
              Enviamos seu link de acesso para {emailSent}
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}