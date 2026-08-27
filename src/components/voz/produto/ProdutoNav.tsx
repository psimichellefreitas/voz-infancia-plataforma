import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, Shield, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { usePreviewUnlocked } from "@/lib/preview-mode";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Início", to: "/voz-protetora" },
  { label: "Aconteceu", to: "/voz-protetora/aconteceu" },
  { label: "Vai acontecer", to: "/voz-protetora/vai-acontecer" },
  { label: "Quero fortalecer", to: "/voz-protetora/fortalecer" },
  { label: "Minha Voz", to: "/voz-protetora/minha-voz" },
  { label: "Minha Presença", to: "/voz-protetora/minha-presenca" },
  { label: "Meu Passo", to: "/voz-protetora/meu-passo" },
  { label: "Preciso de ajuda", to: "/voz-protetora/preciso-de-ajuda" },
] as const;

export function ProdutoNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const previewUnlocked = usePreviewUnlocked();
  const previewSearch = previewUnlocked ? { preview: 1 } : undefined;

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { redirect: undefined }, replace: true });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link
          to="/voz-protetora"
          search={previewSearch}
          className="flex items-center gap-2 text-primary"
        >
          <Shield className="h-5 w-5 text-accent" />
          <span className="text-sm font-bold uppercase tracking-[0.14em]">Voz Protetora</span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              search={previewSearch}
              className="text-sm font-semibold text-foreground/70 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/voz-protetora" }}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </nav>

        <button
          className="grid h-10 w-10 place-items-center rounded-[10px] text-primary xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-border bg-background px-5 pb-5 pt-1 xl:hidden",
          !open && "hidden",
        )}
      >
        <nav className="flex flex-col">
          {ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              search={previewSearch}
              onClick={() => setOpen(false)}
              className="border-b border-border/70 py-3 text-base font-semibold text-foreground/85"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-muted-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
}
