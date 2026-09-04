import { useEffect, useRef, useState } from "react";

/**
 * Revela um elemento com fade/slide quando ele entra na viewport.
 * Retorna um ref para anexar e um booleano de visibilidade.
 *
 * Salvaguardas: se não houver IntersectionObserver, se o usuário pedir menos
 * movimento, ou se o observer não disparar em 600ms, o conteúdo aparece assim
 * mesmo — nunca fica preso invisível.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options },
    );

    observer.observe(node);

    // Fallback: garante a revelação mesmo se o observer não disparar.
    const fallback = window.setTimeout(() => setVisible(true), 600);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return { ref, visible } as const;
}

export function revealClass(visible: boolean, delay = 0) {
  return {
    className: `transition-all duration-700 ease-out ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`,
    style: { transitionDelay: `${delay}ms` },
  };
}
