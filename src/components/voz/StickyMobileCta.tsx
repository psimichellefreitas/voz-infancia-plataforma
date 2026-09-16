import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { VOZ_PROTETORA, formatBRL } from "@/lib/product";

/**
 * Barra fixa de CTA para mobile. Só aparece depois que o Hero sai da tela
 * (~altura do Hero), para não competir com o CTA principal logo no topo.
 * Visual discreto (linha fina, blur, sem cor chapada) — não é o estilo
 * "barra de infoproduto" chamativa.
 */
export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <p className="text-sm font-semibold text-primary">
          {formatBRL(VOZ_PROTETORA.amount)}
          <span className="ml-1 font-normal text-muted-foreground">/ano</span>
        </p>
        <Button asChild variant="hero" size="sm">
          <Link to="/checkout">Assinar</Link>
        </Button>
      </div>
    </div>
  );
}
