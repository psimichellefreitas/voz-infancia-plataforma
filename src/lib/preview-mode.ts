import { useEffect, useState } from "react";

/**
 * Modo de visualização para construção/análise.
 *
 * Só funciona no ambiente de desenvolvimento/preview (import.meta.env.DEV).
 * Em produção (site publicado) retorna sempre false — nenhuma página
 * protegida fica aberta para o público.
 *
 * Como usar: abrir qualquer página com ?preview=1 (ex.: /voz-protetora?preview=1).
 * Para sair: abrir com ?preview=0.
 */
const KEY = "voz:preview-unlock";

export function isPreviewUnlocked(): boolean {
  if (!import.meta.env.DEV) return false;
  if (typeof window === "undefined") return false;

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
 * Retorna false no primeiro render e atualiza após a hidratação.
 */
export function usePreviewUnlocked(): boolean {
  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => {
    setUnlocked(isPreviewUnlocked());
  }, []);
  return unlocked;
}
