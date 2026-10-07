import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}

export type PlataformaInstalacao = "ios" | "android" | "desktop";

/**
 * Instalação do app na tela inicial (PWA).
 *
 * O navegador envia o `beforeinstallprompt` uma única vez, logo depois que a página carrega,
 * possivelmente antes de a tela do produto existir. Por isso o evento é guardado aqui, no nível
 * do módulo, que o `__root` importa no início: a tela só lê o que já foi guardado.
 *
 * - Android/Chrome com evento guardado: o botão abre a janela nativa de instalação.
 * - Sem evento (iPhone, ou Chrome que já mostrou/dispensou o aviso): mostra a instrução manual.
 * - Já instalado (aberto em tela cheia): não oferece nada.
 */
let eventoGuardado: BeforeInstallPromptEvent | null = null;
const ouvintes = new Set<() => void>();

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    eventoGuardado = e as BeforeInstallPromptEvent;
    ouvintes.forEach((fn) => fn());
  });
  window.addEventListener("appinstalled", () => {
    eventoGuardado = null;
    ouvintes.forEach((fn) => fn());
  });
}

export function useInstalarApp() {
  const [, forcar] = useState(0);
  const [plataforma, setPlataforma] = useState<PlataformaInstalacao>("desktop");
  const [instalado, setInstalado] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalado(standalone);
    const ua = navigator.userAgent;
    setPlataforma(/iphone|ipad|ipod/i.test(ua) ? "ios" : /android/i.test(ua) ? "android" : "desktop");

    const atualizar = () => forcar((n) => n + 1);
    ouvintes.add(atualizar);
    atualizar();
    return () => {
      ouvintes.delete(atualizar);
    };
  }, []);

  async function instalar() {
    if (!eventoGuardado) return;
    const evento = eventoGuardado;
    eventoGuardado = null;
    await evento.prompt();
    forcar((n) => n + 1);
  }

  return {
    /** Mostra o item "Instalar o app": sempre, exceto dentro do app já instalado. */
    disponivel: !instalado,
    /** true quando não há janela nativa para abrir e só dá para orientar a instalação manual. */
    manual: eventoGuardado === null,
    plataforma,
    ios: plataforma === "ios",
    instalar,
  };
}
