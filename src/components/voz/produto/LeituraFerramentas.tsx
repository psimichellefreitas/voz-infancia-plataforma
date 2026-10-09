import { useEffect, useRef, useState } from "react";
import { Square, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Ferramentas de leitura compartilhadas do VOZ PROTETORA: ouvir o texto em voz alta (voz do próprio
 * aparelho) e aumentar ou diminuir a letra. A escolha de tamanho vale para todo o aplicativo e
 * fica só neste aparelho.
 */

/** Limpa o texto de uma página (quebras de linha, espaços repetidos) para a leitura em voz alta. */
export function limparParaLeitura(texto: string): string {
  return texto
    .replace(/\s*\n+\s*/g, ". ")
    .replace(/\.\s*\./g, ".")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------------------------------------------------------------------------
// Ouvir (voz do próprio aparelho)
// ---------------------------------------------------------------------------

/** Parte o texto em trechos curtos: alguns celulares interrompem falas muito longas. */
function emTrechos(texto: string, limite = 220): string[] {
  const frases = texto.match(/[^.!?]+[.!?]*/g) ?? [texto];
  const trechos: string[] = [];
  let atual = "";
  for (const frase of frases) {
    if ((atual + frase).length > limite && atual) {
      trechos.push(atual.trim());
      atual = frase;
    } else {
      atual += frase;
    }
  }
  if (atual.trim()) trechos.push(atual.trim());
  return trechos;
}

export function BotaoOuvir({ texto, getTexto }: { texto?: string; getTexto?: () => string }) {
  const [suportado, setSuportado] = useState(false);
  const [falando, setFalando] = useState(false);
  const cancelado = useRef(false);

  useEffect(() => {
    setSuportado(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      cancelado.current = true;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!suportado) return null;

  function parar() {
    cancelado.current = true;
    window.speechSynthesis.cancel();
    setFalando(false);
  }

  function ouvir() {
    const sintese = window.speechSynthesis;
    sintese.cancel();
    cancelado.current = false;
    setFalando(true);

    const vozes = sintese.getVoices();
    const voz =
      vozes.find((v) => v.lang.toLowerCase().replace("_", "-") === "pt-br") ??
      vozes.find((v) => v.lang.toLowerCase().startsWith("pt"));

    const trechos = emTrechos(limparParaLeitura(getTexto ? getTexto() : (texto ?? "")));
    trechos.forEach((trecho, i) => {
      const fala = new SpeechSynthesisUtterance(trecho);
      fala.lang = "pt-BR";
      if (voz) fala.voice = voz;
      fala.rate = 0.95;
      if (i === trechos.length - 1) {
        fala.onend = () => {
          if (!cancelado.current) setFalando(false);
        };
      }
      fala.onerror = () => {
        if (!cancelado.current) setFalando(false);
      };
      sintese.speak(fala);
    });
  }

  return (
    <Button
      type="button"
      variant="hero"
      size="sm"
      onClick={falando ? parar : ouvir}
      aria-pressed={falando}
    >
      {falando ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      {falando ? "Parar" : "Ouvir"}
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Tamanho da letra (A− / A+). Preferência de exibição, guardada só neste aparelho.
// ---------------------------------------------------------------------------

const NIVEIS_DE_LETRA = [0.9, 1, 1.15, 1.3];
const NIVEL_PADRAO = 1;
const LETRA_STORAGE_KEY = "voz-protetora:tamanho-letra";

export function useTamanhoLetra() {
  const [nivel, setNivel] = useState(NIVEL_PADRAO);

  useEffect(() => {
    try {
      const salvo = Number(window.localStorage.getItem(LETRA_STORAGE_KEY));
      if (Number.isInteger(salvo) && salvo >= 0 && salvo < NIVEIS_DE_LETRA.length) {
        setNivel(salvo);
      }
    } catch {
      // sem armazenamento: vale só nesta visita
    }
  }, []);

  function definir(novo: number) {
    const limitado = Math.min(NIVEIS_DE_LETRA.length - 1, Math.max(0, novo));
    setNivel(limitado);
    try {
      window.localStorage.setItem(LETRA_STORAGE_KEY, String(limitado));
    } catch {
      // ignora
    }
  }

  return { nivel, escala: NIVEIS_DE_LETRA[nivel]!, definir };
}

export function ControlesDeLetra({
  nivel,
  definir,
}: {
  nivel: number;
  definir: (novo: number) => void;
}) {
  const base =
    "grid h-9 min-w-[2.5rem] place-items-center rounded-full border border-border bg-card px-3 text-sm font-bold text-primary transition-opacity disabled:opacity-40";
  return (
    <div className="ml-auto flex items-center gap-1.5" role="group" aria-label="Tamanho da letra">
      <button
        type="button"
        className={base}
        onClick={() => definir(nivel - 1)}
        disabled={nivel === 0}
        aria-label="Diminuir a letra"
      >
        A−
      </button>
      <button
        type="button"
        className={`${base} text-base`}
        onClick={() => definir(nivel + 1)}
        disabled={nivel === NIVEIS_DE_LETRA.length - 1}
        aria-label="Aumentar a letra"
      >
        A+
      </button>
    </div>
  );
}

