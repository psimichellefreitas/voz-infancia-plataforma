import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}

/**
 * Instalação do app na tela inicial (PWA).
 * - Android/Chrome: guarda o evento `beforeinstallprompt` e o dispara ao tocar em "Instalar".
 * - iPhone/iPad: o navegador não oferece o evento; o app mostra a instrução manual.
 * - Já instalado (aberto em tela cheia): não oferece nada.
 */
export function useInstalarApp() {
  const [evento, setEvento] = useState<BeforeInstallPromptEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [instalado, setInstalado] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalado(standalone);
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvento(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalado(true);
      setEvento(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function instalar() {
    if (!evento) return;
    await evento.prompt();
    setEvento(null);
  }

  return {
    /** Mostra o item "Instalar o app" no menu. */
    disponivel: !instalado && (evento !== null || ios),
    /** true quando só dá para orientar a instalação manual (iPhone/iPad). */
    manual: ios && evento === null,
    instalar,
  };
}
