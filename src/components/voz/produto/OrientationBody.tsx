import { useEffect, useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAIXAS_ETARIAS, type FaixaEtaria, type OrientationBlock } from "@/lib/voz-protetora/content";

const FAIXA_STORAGE_KEY = "voz-protetora:faixa-etaria";

/**
 * Blocos sempre visíveis, fora do acordeão: a ação concreta ("passo") e — quando a porta tiver —
 * a linha de escalada de segurança ("ajuda"). Não ficam escondidos atrás de um toque porque são
 * a parte que mais importa decidir rápido; o resto (contexto, o que evitar etc.) fica sob
 * demanda, para reduzir o tanto de texto sempre visível na tela (feedback da idealizadora,
 * 2026-09-16: a leitura estava pesada, "site de leitura" em vez de interativo).
 */
const DESTAQUE_KEYS = ["passo", "ajuda"];

function readFaixaPreferida(): FaixaEtaria | null {
  try {
    const raw = window.localStorage.getItem(FAIXA_STORAGE_KEY);
    return raw === "0-6" || raw === "7-10" || raw === "11+" ? raw : null;
  } catch {
    return null;
  }
}

/** Troca **negrito** por <strong>, preservando o restante do texto. */
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/** Um parágrafo pode misturar uma linha de rótulo (**Para X:**) com itens de lista ("- "). */
function renderParagraph(text: string, key: number) {
  const lines = text.split("\n");
  const nodes: ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    nodes.push(
      <ul key={`ul-${nodes.length}`} className="list-disc space-y-1 pl-5 marker:text-accent">
        {bulletBuffer.map((line, i) => (
          <li key={i}>{renderInline(line)}</li>
        ))}
      </ul>,
    );
    bulletBuffer = [];
  };

  for (const line of lines) {
    if (line.startsWith("- ")) {
      bulletBuffer.push(line.slice(2));
    } else {
      flushBullets();
      nodes.push(<p key={`p-${nodes.length}`}>{renderInline(line)}</p>);
    }
  }
  flushBullets();

  return (
    <div key={key} className="space-y-2">
      {nodes}
    </div>
  );
}

function renderBody(body: string) {
  return (
    <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/85">
      {body.split("\n\n").map((para, i) => renderParagraph(para, i))}
    </div>
  );
}

function ConteudoEmProducao() {
  return (
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
      Conteúdo em produção. Esta orientação será publicada nesta área assim que o texto oficial
      for revisado.
    </p>
  );
}

/**
 * Seletor de faixa etária — só aparece no bloco indicado por `variantBlockKey` e só quando a
 * peça já tem variações escritas (Opção A, 2026-09-16). Nunca grava nada sobre a criança: é só
 * uma preferência de exibição, lembrada no aparelho (não é "perfil da criança").
 */
function FaixaEtariaSeletor({
  disponiveis,
  onChange,
}: {
  disponiveis: FaixaEtaria[];
  onChange: (faixa: FaixaEtaria | null) => void;
}) {
  const [selecionada, setSelecionada] = useState<FaixaEtaria | null>(null);

  useEffect(() => {
    const preferida = readFaixaPreferida();
    if (preferida && disponiveis.includes(preferida)) {
      setSelecionada(preferida);
      onChange(preferida);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selecionar(faixa: FaixaEtaria) {
    const next = selecionada === faixa ? null : faixa;
    setSelecionada(next);
    onChange(next);
    try {
      if (next) window.localStorage.setItem(FAIXA_STORAGE_KEY, next);
    } catch {
      // preferência não persiste — a peça continua funcionando nesta visita
    }
  }

  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-muted-foreground">Ajustar pela idade:</span>
      {FAIXAS_ETARIAS.filter((f) => disponiveis.includes(f.value)).map((f) => (
        <button
          key={f.value}
          onClick={() => selecionar(f.value)}
          className={
            selecionada === f.value
              ? "rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground"
              : "rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground hover:border-accent"
          }
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

interface OrientationBodyProps {
  blocks: OrientationBlock[];
  /**
   * Variações por faixa etária de UM bloco específico da orientação (Opção A). Qual bloco
   * recebe a variação depende da porta: "o-que-dizer" em ACONTECEU, "ensine" em VAI ACONTECER,
   * "dizer" em QUERO FORTALECER — indicado por `variantBlockKey`.
   */
  variacaoPorIdade?: Partial<Record<FaixaEtaria, string>>;
  /** Chave do bloco que recebe o seletor de faixa etária. Default: "o-que-dizer" (ACONTECEU). */
  variantBlockKey?: string;
}

/**
 * Renderiza a estrutura oficial de orientação: "Meu próximo passo" e "Quando buscar ajuda" (se a
 * porta tiver) ficam sempre visíveis, em destaque; os demais blocos ficam num acordeão — um
 * aberto por vez — para não exibir todo o texto da peça de uma vez.
 */
export function OrientationBody({
  blocks,
  variacaoPorIdade,
  variantBlockKey = "o-que-dizer",
}: OrientationBodyProps) {
  const [faixaAtiva, setFaixaAtiva] = useState<FaixaEtaria | null>(null);
  const disponiveis = variacaoPorIdade
    ? (Object.keys(variacaoPorIdade) as FaixaEtaria[])
    : [];

  function bodyExibidoDe(block: OrientationBlock) {
    const temVariante = block.key === variantBlockKey && disponiveis.length > 0;
    const bodyExibido =
      temVariante && faixaAtiva && variacaoPorIdade?.[faixaAtiva]
        ? variacaoPorIdade[faixaAtiva]
        : block.body;
    return { temVariante, bodyExibido };
  }

  const passo = blocks.find((b) => b.key === "passo");
  const ajuda = blocks.find((b) => b.key === "ajuda");
  const demaisBlocos = blocks.filter((b) => !DESTAQUE_KEYS.includes(b.key));

  return (
    <div className="space-y-4">
      <div className="print:hidden space-y-4">
        {passo && (
          <section className="rounded-[12px] border-2 border-primary bg-primary/5 p-5 shadow-[var(--shadow-soft)] sm:p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-primary">
              {passo.label}
            </h2>
            {passo.body ? renderBody(passo.body) : <ConteudoEmProducao />}
          </section>
        )}

        {ajuda && (
          <section className="rounded-[12px] border border-accent bg-accent/10 p-5 shadow-[var(--shadow-soft)] sm:p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-primary">
              {ajuda.label}
            </h2>
            {ajuda.body ? renderBody(ajuda.body) : <ConteudoEmProducao />}
          </section>
        )}

        {demaisBlocos.length > 0 && (
          <Accordion
            type="single"
            collapsible
            defaultValue={demaisBlocos[0]?.key}
            className="rounded-[12px] border border-border bg-card px-5 shadow-[var(--shadow-soft)] sm:px-6"
          >
            {demaisBlocos.map((block) => {
              const { temVariante, bodyExibido } = bodyExibidoDe(block);
              return (
                <AccordionItem key={block.key} value={block.key}>
                  <AccordionTrigger className="text-sm font-bold uppercase tracking-[0.1em] text-primary hover:no-underline">
                    {block.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    {temVariante && (
                      <FaixaEtariaSeletor disponiveis={disponiveis} onChange={setFaixaAtiva} />
                    )}
                    {bodyExibido ? renderBody(bodyExibido) : <ConteudoEmProducao />}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>

      {/* Versão de impressão/PDF: todos os blocos abertos, sem acordeão nem interação (o "PDF
          de bolso" precisa do conteúdo completo, não só do que está expandido na tela). */}
      <div className="hidden print:block space-y-5">
        {blocks.map((block) => (
          <section key={block.key} className="break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-[0.05em] text-primary">
              {block.label}
            </h2>
            {block.body ? renderBody(block.body) : <ConteudoEmProducao />}
          </section>
        ))}
      </div>
    </div>
  );
}
