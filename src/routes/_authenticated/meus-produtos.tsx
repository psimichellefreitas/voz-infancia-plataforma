import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, Download, Loader2, LogOut, Mail, Menu, Shield } from "lucide-react";

import { CONTATO_EMAIL } from "@/components/voz/nav";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { FraseDoDia, Saudacao } from "@/components/voz/produto/Saudacao";
import { getMyProductAccess } from "@/lib/access.functions";
import { usePreviewSearch, usePreviewUnlocked } from "@/lib/preview-mode";
import { useInstalarApp } from "@/lib/use-instalar-app";

export const Route = createFileRoute("/_authenticated/meus-produtos")({
  head: () => ({
    meta: [
      { title: "Meus produtos: Voz Pela Infância" },
      { name: "description", content: "Os produtos da Voz Pela Infância que você adquiriu." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MeusProdutosPage,
});

/**
 * Tela inicial do app da Voz Pela Infância (a plataforma, não um produto). Mostra só o que a
 * pessoa adquiriu: cada novo produto vira um cartão aqui, sem mudar a estrutura do app.
 */
function MeusProdutosPage() {
  const fetchAccess = useServerFn(getMyProductAccess);
  const previewUnlocked = usePreviewUnlocked();
  const previewSearch = usePreviewSearch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mostrarAjuda, setMostrarAjuda] = useState(false);
  const instalarApp = useInstalarApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["voz-protetora-access"],
    queryFn: () => fetchAccess({ data: undefined }),
    staleTime: 60_000,
    enabled: !previewUnlocked,
    retry: false,
  });

  const loading = isPending && !previewUnlocked;
  const temVozProtetora = previewUnlocked || data?.hasAccess === true;

  async function handleSignOut() {
    setMenuOpen(false);
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { redirect: undefined }, replace: true });
  }

  return (
    <div className="min-h-screen bg-[#F7F1E6] text-foreground dark:bg-background">
      <div className="mx-auto min-h-screen max-w-[520px] px-4 pb-10">
        <header className="sticky top-0 z-30 -mx-4 flex items-center justify-between bg-[#F7F1E6] px-4 py-3 dark:bg-background">
          <span className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
            Voz Pela Infância
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="grid h-10 w-10 place-items-center rounded-full bg-card text-primary shadow-[var(--shadow-soft)]"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        <section className="relative mt-1 overflow-hidden rounded-[24px] bg-primary px-5 pb-6 pt-6 text-primary-foreground">
          <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-accent opacity-35" />
          <div className="relative">
            <Saudacao />
            <h1 className="mt-4 font-display text-[1.9rem] font-bold leading-[1.1] text-balance">
              Meus produtos
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-primary-foreground/85">
              Os produtos que você adquiriu ficam reunidos aqui.
            </p>
          </div>
        </section>

        <div className="mt-5">
          <FraseDoDia />
        </div>


        <div className="mt-5 flex flex-col gap-3">
          {loading ? (
            <p className="flex items-center gap-3 py-8 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Verificando seus produtos...
            </p>
          ) : temVozProtetora ? (
            <Link
              to="/voz-protetora"
              search={previewSearch}
              className="group flex items-center gap-4 rounded-[22px] bg-card p-4 shadow-[var(--shadow-soft)] transition-shadow active:scale-[0.99] hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <Shield className="h-7 w-7" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-bold tracking-wide text-primary">
                  VOZ PROTETORA
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                  Orientação prática para adultos que querem proteger melhor a infância.
                </span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <div className="rounded-[22px] bg-card p-6 text-sm leading-relaxed text-muted-foreground shadow-[var(--shadow-soft)]">
              Ainda não há produtos liberados para {data?.email ?? "este e-mail"}. Se você acabou de
              comprar, aguarde a confirmação do pagamento.
            </div>
          )}
        </div>
        {/* "Conheça os outros produtos": entra quando houver o 2º produto publicado (tela Conheça dentro do app). */}
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="bottom" className="mx-auto max-h-[88vh] max-w-[520px] overflow-y-auto rounded-t-3xl">
          <SheetHeader>
            <SheetTitle className="text-left text-primary">Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-4 flex flex-col">
            {/* Contato: dúvidas sobre o app ou a compra. A linha de risco evita que relatos sensíveis cheguem por e-mail. */}
            <a
              href={`mailto:${CONTATO_EMAIL}?subject=${encodeURIComponent("Voz Protetora: dúvida")}`}
              className="flex items-start gap-3 border-b border-border/70 py-3.5 text-base font-semibold text-foreground/90"
            >
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span>
                Falar com a gente
                <span className="block text-sm font-normal text-primary underline">{CONTATO_EMAIL}</span>
                <span className="mt-0.5 block text-xs font-normal leading-snug text-muted-foreground">
                  Dúvidas sobre o app ou a compra. Em situação de risco, use Ajuda.
                </span>
              </span>
            </a>
            {instalarApp.disponivel && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    instalarApp.manual ? setMostrarAjuda((v) => !v) : instalarApp.instalar()
                  }
                  className="flex items-center gap-3 border-b border-border/70 py-3.5 text-left text-base font-semibold text-foreground/90"
                >
                  <Download className="h-5 w-5 text-accent" />
                  Instalar o app
                </button>
                {instalarApp.manual && mostrarAjuda && (
                  <p className="rounded-2xl bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
                    {instalarApp.ios
                      ? "No iPhone: toque em Compartilhar (o quadrado com uma seta para cima, na barra do Safari) e depois em Adicionar à Tela de Início."
                      : "No Android ou no computador: abra o menu do navegador (os três pontinhos, no canto de cima) e toque em Instalar app ou Adicionar à tela inicial."}
                  </p>
                )}
              </>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-3 flex items-center gap-3 py-3.5 text-base font-semibold text-muted-foreground"
            >
              <LogOut className="h-5 w-5" />
              Sair
            </button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
