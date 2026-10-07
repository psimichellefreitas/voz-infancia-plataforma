import { useEffect, useState, type ReactNode } from "react";
import { BookOpen, Download } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Bell,
  ClipboardList,
  CreditCard,
  Home,
  Loader2,
  LogOut,
  Menu,
  Search,
  Shield,
  ArrowRight,
} from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { getMyProductAccess } from "@/lib/access.functions";
import { usePreviewSearch, usePreviewUnlocked } from "@/lib/preview-mode";
import { useInstalarApp } from "@/lib/use-instalar-app";
import { useNotificacoes } from "@/lib/voz-protetora/notificacoes";
import { cn } from "@/lib/utils";

/**
 * Casca em formato de app do VOZ PROTETORA (coluna única, barra de abas na parte de baixo).
 * Mesma regra de acesso da ProdutoShell: a autorização é sempre validada no backend.
 */
const MENU_ITEMS = [
  { icon: Home, to: "/meus-produtos", label: "Meus produtos" },
  { icon: Shield, to: "/voz-protetora/minha-voz", label: "Minha Voz Protetora" },
  { icon: ClipboardList, to: "/voz-protetora/minha-presenca", label: "Minha Presença Protetiva" },
  { icon: ArrowRight, to: "/voz-protetora/meu-passo", label: "Meu Passo de Proteção" },
  { icon: BookOpen, to: "/voz-protetora/como-usar", label: "Como usar o app" },
  { icon: CreditCard, to: "/voz-protetora/minha-assinatura", label: "Minha compra" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const fetchAccess = useServerFn(getMyProductAccess);
  const previewUnlocked = usePreviewUnlocked();
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["voz-protetora-access"],
    queryFn: () => fetchAccess({ data: undefined }),
    staleTime: 60_000,
    enabled: !previewUnlocked,
    retry: false,
  });

  // Sem autorização válida no backend, a pessoa vai para a página comercial.
  useEffect(() => {
    if (!previewUnlocked && data && !data.hasAccess) {
      navigate({ to: "/solucoes/voz-protetora", search: { lp: undefined }, replace: true });
    }
  }, [data, navigate, previewUnlocked]);

  const loading = isPending && !previewUnlocked;
  const allowed = previewUnlocked || data?.hasAccess;

  return (
    <div className="min-h-screen bg-[#F7F1E6] text-foreground dark:bg-background print:bg-white">
      <div className="mx-auto min-h-screen max-w-[520px] px-4 pb-[calc(104px+env(safe-area-inset-bottom,0px))] print:max-w-none print:px-0 print:pb-0">
        <AppTopBar />
        {loading ? (
          <p className="flex items-center gap-3 py-16 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Verificando seu acesso...
          </p>
        ) : allowed ? (
          <div className="flex flex-col gap-5 pb-2 pt-1">{children}</div>
        ) : (
          <div className="mt-10 rounded-3xl bg-card p-8 text-center shadow-[var(--shadow-soft)]">
            <h1 className="text-xl font-bold text-primary">Acesso ainda não liberado</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Não encontramos uma compra confirmada para {data?.email ?? "este e-mail"}. Levando
              você para a página do Voz Protetora...
            </p>
          </div>
        )}
      </div>
      <AppTabBar />
    </div>
  );
}

function AppTopBar() {
  const previewSearch = usePreviewSearch();
  return (
    <header className="print:hidden sticky top-0 z-30 -mx-4 flex items-center bg-[#F7F1E6] px-4 py-3 dark:bg-background">
      <Link
        to="/voz-protetora"
        search={previewSearch}
        className="flex items-center gap-2.5 text-primary"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Shield className="h-5 w-5" />
        </span>
        <span className="text-sm font-bold uppercase tracking-[0.14em]">Voz Protetora</span>
      </Link>
    </header>
  );
}

const TAB_BASE =
  "relative flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-semibold text-muted-foreground transition-colors";

function AppTabBar() {
  const previewSearch = usePreviewSearch();
  const { naoLidas } = useNotificacoes();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mostrarAjudaIos, setMostrarAjudaIos] = useState(false);
  const instalarApp = useInstalarApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    setMenuOpen(false);
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { redirect: undefined }, replace: true });
  }

  return (
    <>
      <nav
        aria-label="Seções do Voz Protetora"
        className="print:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-card/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[520px] px-2">
          <Link
            to="/voz-protetora"
            search={previewSearch}
            className={TAB_BASE}
            activeProps={{ className: "text-primary", "aria-current": "page" }}
            activeOptions={{ exact: true }}
          >
            <Home className="h-5 w-5" />
            Início
          </Link>
          <Link
            to="/voz-protetora/busca"
            search={previewSearch}
            className={TAB_BASE}
            activeProps={{ className: "text-primary", "aria-current": "page" }}
          >
            <Search className="h-5 w-5" />
            Buscar
          </Link>
          <Link
            to="/voz-protetora/preciso-de-ajuda"
            search={previewSearch}
            className={cn(TAB_BASE, "text-[#B8472F] dark:text-[#F08B70]")}
            activeProps={{ "aria-current": "page" }}
          >
            <AlertTriangle className="h-5 w-5" />
            Ajuda
          </Link>
          <Link
            to="/voz-protetora/notificacoes"
            search={previewSearch}
            className={TAB_BASE}
            activeProps={{ className: "text-primary", "aria-current": "page" }}
          >
            <span className="relative">
              <Bell className="h-5 w-5" />
              {naoLidas > 0 && (
                <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground">
                  {naoLidas > 9 ? "9+" : naoLidas}
                </span>
              )}
            </span>
            Avisos
          </Link>
          <button type="button" onClick={() => setMenuOpen(true)} className={TAB_BASE}>
            <Menu className="h-5 w-5" />
            Menu
          </button>
        </div>
      </nav>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="bottom" className="mx-auto max-w-[520px] rounded-t-3xl">
          <SheetHeader>
            <SheetTitle className="text-left text-primary">Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-4 flex flex-col">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                search={previewSearch}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 border-b border-border/70 py-3.5 text-base font-semibold text-foreground/90"
              >
                <item.icon className="h-5 w-5 text-accent" />
                {item.label}
              </Link>
            ))}
            {instalarApp.disponivel && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    instalarApp.manual ? setMostrarAjudaIos((v) => !v) : instalarApp.instalar()
                  }
                  className="flex items-center gap-3 border-b border-border/70 py-3.5 text-left text-base font-semibold text-foreground/90"
                >
                  <Download className="h-5 w-5 text-accent" />
                  Instalar o app
                </button>
                {instalarApp.manual && mostrarAjudaIos && (
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
    </>
  );
}
