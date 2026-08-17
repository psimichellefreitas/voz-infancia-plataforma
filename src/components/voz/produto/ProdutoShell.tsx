import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getMyProductAccess } from "@/lib/access.functions";
import { ProdutoNav } from "./ProdutoNav";

interface ProdutoShellProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  backTo?: { to: string; label: string };
  children: ReactNode;
}

/**
 * Casca da ferramenta VOZ PROTETORA V1.
 * A autorização é sempre validada no backend (server function + banco).
 */
export function ProdutoShell({ eyebrow, title, intro, backTo, children }: ProdutoShellProps) {
  const fetchAccess = useServerFn(getMyProductAccess);
  const { data, isPending } = useQuery({
    queryKey: ["voz-protetora-access"],
    queryFn: () => fetchAccess({ data: undefined }),
    staleTime: 60_000,
  });

  return (
    <div className="min-h-screen bg-secondary">
      <ProdutoNav />
      <main className="pt-16">
        {isPending ? (
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-20 text-muted-foreground sm:px-8">
            <Loader2 className="h-5 w-5 animate-spin" />
            Verificando seu acesso...
          </div>
        ) : data?.hasAccess ? (
          <>
            <section className="border-b border-border bg-primary text-primary-foreground">
              <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
                {backTo && (
                  <Link
                    to={backTo.to as never}
                    className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/80 hover:text-primary-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {backTo.label}
                  </Link>
                )}
                {eyebrow && (
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                    {eyebrow}
                  </p>
                )}
                <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">{title}</h1>
                {intro && (
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
                    {intro}
                  </p>
                )}
              </div>
            </section>
            <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">{children}</div>
          </>
        ) : (
          <section className="mx-auto max-w-xl px-5 py-16 sm:px-8">
            <div className="rounded-[12px] border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <h1 className="mt-5 text-2xl font-bold text-primary">Acesso ainda não liberado</h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Não encontramos uma compra confirmada para {data?.email ?? "este e-mail"}. Se você
                acabou de pagar, aguarde alguns instantes. Se usou outro e-mail na compra, entre com
                ele.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button asChild variant="hero" size="xl">
                  <Link to="/checkout">QUERO TER O VOZ PROTETORA</Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/contato">FALAR COM O MOVIMENTO</Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
