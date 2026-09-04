import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

/**
 * Destino público do link de acesso enviado por e-mail.
 * Aqui esperamos a sessão ser criada a partir do link antes de entrar na
 * área protegida — evita que o link pareça "morto" ao abrir direto.
 */
export const Route = createFileRoute("/acesso")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Entrando na sua área — Voz Protetora" },
      { name: "description", content: "Confirmando seu acesso ao Voz Protetora." },
      { property: "og:title", content: "Entrando na sua área — Voz Protetora" },
      { property: "og:description", content: "Confirmando seu acesso ao Voz Protetora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: isSafePath(search["redirect"]) ? search["redirect"] : undefined,
  }),
  component: AcessoPage,
});

function isSafePath(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//");
}

function AcessoPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/acesso" });
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let done = false;

    const go = () => {
      if (done) return;
      done = true;
      navigate({ to: (redirect ?? "/voz-protetora") as never, replace: true });
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) go();
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) go();
    });

    const timeout = setTimeout(() => {
      if (!done) setFailed(true);
    }, 6000);

    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigate, redirect]);

  return (
    <div className="grid min-h-screen place-items-center bg-secondary px-5">
      <div className="w-full max-w-md rounded-[12px] border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10">
          <ShieldCheck className="h-7 w-7 text-primary" />
        </div>
        {failed ? (
          <>
            <h1 className="mt-5 text-xl font-bold text-primary">Este link expirou</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Links de acesso são de uso único. Peça um novo link com o mesmo e-mail da compra.
            </p>
            <Button asChild variant="hero" size="xl" className="mt-6 w-full">
              <Link to="/auth" search={{ redirect: "/voz-protetora" }}>
                RECEBER NOVO LINK
              </Link>
            </Button>
          </>
        ) : (
          <>
            <h1 className="mt-5 text-xl font-bold text-primary">Confirmando seu acesso...</h1>
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Um instante
            </p>
          </>
        )}
      </div>
    </div>
  );
}
