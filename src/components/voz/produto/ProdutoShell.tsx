import { useEffect, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Lock } from "lucide-react";

import { getMyProductAccess } from "@/lib/access.functions";
import { isPreviewUnlocked } from "@/lib/preview-mode";
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
  const previewUnlocked = isPreviewUnlocked();
  const { data, isPending } = useQuery({
    queryKey: ["voz-protetora-access"],
    queryFn: () => fetchAccess({ data: undefined }),
    staleTime: 60_000,
    enabled: !previewUnlocked,
  });
  const navigate = useNavigate();

  // Sem autorização válida no backend, o comprador vai para a página comercial.
  useEffect(() => {
    if (!previewUnlocked && data && !data.hasAccess) {
      navigate({ to: "/solucoes/voz-protetora", replace: true });
    }
  }, [data, navigate, previewUnlocked]);

  const loading = isPending && !previewUnlocked;
  const allowed = previewUnlocked || data?.hasAccess;

  return (
    <div className="min-h-screen bg-secondary">
      <ProdutoNav />
      <main className="pt-16">
        {loading ? (
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-20 text-muted-foreground sm:px-8">
            <Loader2 className="h-5 w-5 animate-spin" />
            Verificando seu acesso...
          </div>
        ) : allowed ? (
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
              <h1 className="mt-5 text-xl font-bold text-primary">Acesso ainda não liberado</h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Não encontramos uma compra confirmada para {data?.email ?? "este e-mail"}. Levando
                você para a página do Voz Protetora...
              </p>
              <Link
                to="/solucoes/voz-protetora"
                className="mt-6 inline-flex text-sm font-semibold text-primary underline"
              >
                Ver o Voz Protetora
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
