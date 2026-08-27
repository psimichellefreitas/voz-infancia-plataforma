import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

/**
 * ACESSO ABERTO
 *
 * Enquanto o Voz Protetora não está sendo vendido, todas as páginas do
 * /voz-protetora ficam abertas: ninguém precisa se autenticar.
 *
 * Para voltar a exigir login (quando iniciar a venda), basta mudar
 * ACESSO_ABERTO para false.
 */
export const ACESSO_ABERTO = true;

const KEY = "voz:preview-unlock";

/** Ambientes de construção: dev local + preview do Lovable (nunca o site publicado). */
function isBuildEnvironment(): boolean {
  if (import.meta.env.DEV) return true;
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.startsWith("id-preview--") ||
    host.endsWith("-dev.lovable.app") ||
    host.endsWith(".lovableproject.com")
  );
}

/** true = conteúdo liberado sem login. */
export function isPreviewUnlocked(): boolean {
  if (ACESSO_ABERTO) return true;
  if (typeof window === "undefined") return false;
  if (!isBuildEnvironment()) return false;

  const param = new URLSearchParams(window.location.search).get("preview");
  if (param === "1") {
    window.localStorage.setItem(KEY, "1");
    return true;
  }
  if (param === "0") {
    window.localStorage.removeItem(KEY);
    return false;
  }

  return window.localStorage.getItem(KEY) === "1";
}

/**
 * Versão em hook: evita divergência entre SSR e cliente.
 */
export function usePreviewUnlocked(): boolean {
  const [unlocked, setUnlocked] = useState(() => isPreviewUnlocked());
  useEffect(() => {
    setUnlocked(isPreviewUnlocked());
  }, []);
  return unlocked;
}

/**
 * Parâmetros de busca a propagar na navegação interna.
 * Com acesso aberto não é preciso carregar ?preview=1 nas URLs.
 */
export function usePreviewSearch(): { preview: 1 } | undefined {
  const unlocked = usePreviewUnlocked();
  if (ACESSO_ABERTO) return undefined;
  return unlocked ? { preview: 1 } : undefined;
}

/** Sessão real do usuário — usada para permitir gravações no banco. */
export function useHasSession(): boolean {
  const [hasSession, setHasSession] = useState(false);
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setHasSession(Boolean(data.session));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(Boolean(session));
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  return hasSession;
}
