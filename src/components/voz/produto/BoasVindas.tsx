import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Smartphone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePreviewSearch } from "@/lib/preview-mode";
import { useInstalarApp, type PlataformaInstalacao } from "@/lib/use-instalar-app";

/**
 * Orientação de uso do app (textos aprovados pela idealizadora em 2026-10-07:
 * 03_PRODUTOS/VOZ_PROTETORA/TEXTOS_BOAS_VINDAS_E_INSTALACAO_RASCUNHO.md).
 * Tudo fica só no aparelho (localStorage): nada disso é enviado a servidor.
 */
const CHAVES = {
  boasVindas: "voz-protetora:boas-vindas-vistas",
  comeceAqui: "voz-protetora:comece-aqui-dispensado",
  instalar: "voz-protetora:instalar-dispensado",
} as const;

type Chave = keyof typeof CHAVES;

/** Marca guardada no aparelho. `null` até o navegador responder (evita piscar na tela). */
function useMarca(chave: Chave) {
  const [valor, setValor] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setValor(window.localStorage.getItem(CHAVES[chave]) === "1");
    } catch {
      setValor(false);
    }
  }, [chave]);

  const definir = useCallback(
    (novo: boolean) => {
      setValor(novo);
      try {
        if (novo) window.localStorage.setItem(CHAVES[chave], "1");
        else window.localStorage.removeItem(CHAVES[chave]);
      } catch {
        // sem armazenamento: a orientação só reaparece na próxima visita
      }
    },
    [chave],
  );

  return [valor, definir] as const;
}

/** Apaga a marca das boas-vindas, para a pessoa rever (botão em "Como usar o app"). */
export function reabrirBoasVindas() {
  try {
    window.localStorage.removeItem(CHAVES.boasVindas);
  } catch {
    // ignora
  }
}

const TELAS = [
  {
    titulo: (
      <>
        <span className="whitespace-nowrap">Bem-vinda,</span>{" "}
        <span className="whitespace-nowrap">bem-vindo</span> ao Voz Protetora.
      </>
    ),
    texto:
      "Aqui você encontra orientação prática para situações reais da infância: o que dizer, como agir e quando buscar ajuda.",
  },
  {
    titulo: "Escolha a situação mais próxima da sua.",
    texto:
      "Há três portas. ACONTECEU orienta quando algo já aconteceu. VAI ACONTECER ajuda a se preparar antes. QUERO FORTALECER apoia a proteção no dia a dia. Em cada orientação, comece por \"Meu próximo passo\".",
  },
  {
    titulo: "Você não precisa saber tudo.",
    texto:
      "Se a situação exigir mais do que orientação, use Preciso de ajuda, na barra de baixo. Ele reúne os canais da rede de proteção.",
  },
] as const;

/** Tela cheia na primeira entrada no produto. Pode ser pulada. */
export function BoasVindas() {
  const [vistas, definirVistas] = useMarca("boasVindas");
  const [passo, setPasso] = useState(0);

  if (vistas !== false) return null;

  const tela = TELAS[passo]!;
  const ultima = passo === TELAS.length - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="boas-vindas-titulo"
      className="fixed inset-0 z-50 flex flex-col bg-[#F7F1E6] px-6 pb-8 pt-6 dark:bg-background"
    >
      <div className="mx-auto flex w-full max-w-[520px] flex-1 flex-col">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => definirVistas(true)}
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground"
          >
            Pular
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <span className="block h-0.5 w-8 rounded-full bg-voz-yellow" />
          <h2
            id="boas-vindas-titulo"
            className="mt-5 font-display text-[2rem] font-bold leading-[1.1] text-balance text-primary"
          >
            {tela.titulo}
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-foreground/80">{tela.texto}</p>
        </div>

        <div>
          <div className="mb-5 flex justify-center gap-2" aria-hidden="true">
            {TELAS.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === passo ? "w-6 bg-primary" : "w-2 bg-primary/25"
                }`}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="hero"
            size="xl"
            className="w-full"
            onClick={() => (ultima ? definirVistas(true) : setPasso((p) => p + 1))}
          >
            {ultima ? "COMEÇAR" : "PRÓXIMA"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const PASSOS_INSTALACAO: Record<PlataformaInstalacao, string[]> = {
  ios: [
    "Toque em Compartilhar (o quadrado com uma seta para cima, na barra do Safari).",
    "Toque em Adicionar à Tela de Início.",
    "Toque em Adicionar.",
  ],
  android: [
    "Toque em Instalar o app, abaixo. Se aparecer uma janela, toque em Instalar.",
    "Se o botão não abrir a janela, toque nos três pontinhos do Chrome e depois em Instalar app ou Adicionar à tela inicial.",
  ],
  desktop: [
    "Clique no ícone de instalação, na barra de endereço, ou no botão Instalar o app, abaixo.",
  ],
};

/** Cartões que aparecem no alto da tela inicial: "Comece por aqui" e "Deixe na tela do celular". */
export function CartoesIniciais() {
  const [comeceAquiDispensado, dispensarComeceAqui] = useMarca("comeceAqui");
  const [instalarDispensado, dispensarInstalar] = useMarca("instalar");
  const instalarApp = useInstalarApp();
  const previewSearch = usePreviewSearch() as never;
  const navigate = useNavigate();

  const mostrarComeceAqui = comeceAquiDispensado === false;
  const mostrarInstalar = instalarDispensado === false && instalarApp.disponivel;

  return (
    <>
      {mostrarComeceAqui && (
        <section className="rounded-[22px] bg-card p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-base font-bold text-primary">Comece por aqui</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Escolha uma das três portas, ou use a busca. Leia primeiro "Meu próximo passo". Se
            precisar de apoio, toque em Ajuda, na barra de baixo.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="hero"
              size="sm"
              onClick={() => navigate({ to: "/voz-protetora/como-usar", search: previewSearch })}
            >
              Como usar o app
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => dispensarComeceAqui(true)}>
              Dispensar
            </Button>
          </div>
        </section>
      )}

      {mostrarInstalar && (
        <section className="rounded-[22px] bg-card p-5 shadow-[var(--shadow-soft)]">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-accent">
              <Smartphone className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold text-primary">
                Deixe o Voz Protetora na tela do seu celular.
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Assim você abre com um toque, em tela cheia, quando precisar.
              </p>
            </div>
          </div>
          <ol className="mt-3 list-decimal space-y-1.5 pl-6 text-sm leading-relaxed text-foreground/85 marker:font-semibold marker:text-accent">
            {PASSOS_INSTALACAO[instalarApp.plataforma].map((passo) => (
              <li key={passo}>{passo}</li>
            ))}
          </ol>
          {instalarApp.plataforma === "ios" && (
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              A instalação precisa ser feita pelo Safari. Em outros navegadores, a opção pode não
              aparecer.
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {instalarApp.plataforma !== "ios" && !instalarApp.manual && (
              <Button type="button" variant="hero" size="sm" onClick={() => instalarApp.instalar()}>
                Instalar o app
              </Button>
            )}
            <Button type="button" variant="ghost" size="sm" onClick={() => dispensarInstalar(true)}>
              Dispensar
            </Button>
          </div>
        </section>
      )}
    </>
  );
}
