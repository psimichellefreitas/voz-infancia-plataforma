import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, ShieldCheck, Square, Volume2, X } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { usePreviewSearch } from "@/lib/preview-mode";
import { FAIXAS_ETARIAS, type FaixaEtaria, type OrientationBlock } from "@/lib/voz-protetora/content";
import { separarFalas } from "@/lib/voz-protetora/falas";

const FAIXA_STORAGE_KEY = "voz-protetora:faixa-etaria";

/**
 * Blocos sempre visíveis, fora do acordeão: a ação concreta ("passo") e — quando a porta tiver —
 * a linha de escalada de segurança ("ajuda"). Não ficam escondidos atrás de um toque porque são
 * a parte que mais importa decidir rápido; o resto (contexto, o que evitar etc.) fica sob
 * demanda, para reduzir o tanto de texto sempre visível na tela (feedback da idealizadora,
 * 2026-09-16: a leitura estava pesada, "site de leitura" em vez de interativo).
 *
 * Apresentação aprovada em 2026-10-07 (protótipos em 08_TECH_E_PRODUTO_DIGITAL/propostas-visuais):
 * cartão cheio para o passo, "Quando buscar ajuda?" em camadas, falas em balões e botão Ouvir.
 * Só muda a forma de mostrar: nenhuma palavra do texto aprovado é alterada.
 */
const DESTAQUE_KEYS = ["passo", "ajuda"];
const CHAVES_DE_FALAS = ["o-que-dizer", "dizer"];

function readFaixaPreferida(): FaixaEtaria | null {
  try {
    const raw = window.localStorage.getItem(FAIXA_STORAGE_KEY);
    return raw === "0-6" || raw === "7-10" || raw === "11+" ? raw : null;
  } catch {
    return null;
  }
}

type Tom = "claro" | "escuro";

/** Troca **negrito** por <strong>, preservando o restante do texto. */
function renderInline(text: string, tom: Tom = "claro"): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className={tom === "escuro" ? "font-bold" : "font-semibold text-foreground"}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/** Um parágrafo pode misturar uma linha de rótulo (**Para X:**) com itens de lista ("- "). */
function renderParagraph(text: string, key: number, tom: Tom = "claro") {
  const lines = text.split("\n");
  const nodes: ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    nodes.push(
      <ul
        key={`ul-${nodes.length}`}
        className={`list-disc space-y-1 pl-5 ${tom === "escuro" ? "marker:text-voz-yellow" : "marker:text-accent"}`}
      >
        {bulletBuffer.map((line, i) => (
          <li key={i}>{renderInline(line, tom)}</li>
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
      nodes.push(<p key={`p-${nodes.length}`}>{renderInline(line, tom)}</p>);
    }
  }
  flushBullets();

  return (
    <div key={key} className="space-y-2">
      {nodes}
    </div>
  );
}

function renderBody(body: string, tom: Tom = "claro") {
  return (
    <div
      className={`mt-3 space-y-3 text-sm leading-relaxed ${tom === "escuro" ? "text-primary-foreground" : "text-foreground/85"}`}
    >
      {body.split("\n\n").map((para, i) => renderParagraph(para, i, tom))}
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

/** Tira emoji e símbolos do início do rótulo ("🚨 QUANDO BUSCAR AJUDA?" vira o texto). */
function rotuloSemEmoji(label: string) {
  return label.replace(/^[^\p{L}]+/u, "");
}

/** Texto puro de um bloco, sem marcações, para a leitura em voz alta. */
function textoPuro(body: string) {
  return body
    .replace(/\*\*/g, "")
    .split("\n")
    .map((linha) => linha.replace(/^- /, "").trim())
    .filter(Boolean)
    .join(". ")
    .replace(/\.\.+/g, ".")
    .replace(/([:;])\./g, "$1");
}

// ---------------------------------------------------------------------------
// Falas em balões
// ---------------------------------------------------------------------------

/**
 * Mostra o bloco "O que dizer?" com as falas em balões: azul para o que se diz à criança, verde-claro
 * para o que se diz a outra pessoa. Instruções e textos corridos aparecem como antes. Se o bloco
 * não tiver nenhuma fala entre aspas, é mostrado como texto comum.
 */
function renderFalas(body: string) {
  const elementos = separarFalas(body);
  if (!elementos) return renderBody(body);

  return (
    <div className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-foreground/85">
      {elementos.map((el, i) => {
        if (el.tipo === "rotulo") {
          return (
            <p
              key={i}
              className={`mt-2 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground first:mt-0 ${
                el.papel === "crianca" ? "self-end text-right" : "self-start"
              }`}
            >
              {el.texto}
            </p>
          );
        }
        if (el.tipo === "fala") {
          return (
            <div
              key={i}
              className={`flex max-w-[90%] flex-col gap-1 ${el.papel === "crianca" ? "self-end items-end" : "self-start items-start"}`}
            >
              <p
                className={`rounded-[18px] px-4 py-2.5 text-[15px] font-medium leading-snug ${
                  el.papel === "crianca"
                    ? "rounded-br-[5px] bg-primary text-primary-foreground"
                    : "rounded-bl-[5px] bg-accent/20 text-foreground"
                }`}
              >
                "{el.texto}"
              </p>
              {el.nota && <p className="px-1 text-xs italic text-muted-foreground">({el.nota})</p>}
            </div>
          );
        }
        return (
          <p key={i} className={`text-sm leading-relaxed ${el.item ? "pl-4 -indent-4" : ""}`}>
            {el.item && <span className="mr-2 text-accent">•</span>}
            {renderInline(el.texto)}
          </p>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// "Quando buscar ajuda?" em camadas
// ---------------------------------------------------------------------------

const FRASE_COTIDIANA = "Esta é uma situação cotidiana e, na maioria das vezes, não exige buscar ajuda.";
const INICIO_LINHA_FIXA = "Se houver relato da criança";

/**
 * Quando o parágrafo é "Procure orientação ... se A, se B, ou se C.", mostra A, B e C em lista,
 * com as mesmas palavras. Se o formato for outro, devolve `null` e o parágrafo fica como está.
 */
function separarGatilhos(texto: string): { introducao: string; itens: string[] } | null {
  if (!texto.startsWith("Procure orientação")) return null;
  const corte = texto.indexOf(" se ");
  if (corte < 0) return null;
  const introducao = texto.slice(0, corte + 3).trim();
  const resto = texto.slice(corte + 4).replace(/\.$/, "");
  const partes = resto.split(/,\s*(?:ou\s+)?se\s+/);
  if (partes.length < 2) return null;
  return { introducao: `${introducao}:`, itens: partes.map((p) => p.trim()) };
}

function BlocoAjuda({ label, body, interativo }: { label: string; body: string; interativo: boolean }) {
  const previewSearch = usePreviewSearch() as never;
  const paragrafos = body.split("\n\n");
  const indiceUrgente = paragrafos.findIndex((p) => p.startsWith(INICIO_LINHA_FIXA));

  // Sem a linha fixa de escalada, o formato é desconhecido: mostra como antes.
  if (indiceUrgente < 0) {
    return (
      <section className="rounded-[22px] border border-accent bg-accent/10 p-5 shadow-[var(--shadow-soft)] sm:p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-primary">{label}</h2>
        {renderBody(body)}
      </section>
    );
  }

  const antes = [...paragrafos.slice(0, indiceUrgente)];
  const urgente = paragrafos[indiceUrgente]!;
  const depois = paragrafos.slice(indiceUrgente + 1);

  let cotidiana: string | null = null;
  if (antes[0]?.startsWith(FRASE_COTIDIANA)) {
    cotidiana = FRASE_COTIDIANA;
    const resto = antes[0].slice(FRASE_COTIDIANA.length).trim();
    if (resto) antes[0] = resto;
    else antes.shift();
  }

  return (
    <section className="rounded-[24px] bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6">
      <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-primary">{label}</h2>

      <div className="mt-4 space-y-4">
        {cotidiana && (
          <div className="flex gap-3">
            <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-accent/15 text-sm text-accent">
              ✓
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                Situação cotidiana
              </p>
              <p className="mt-1 text-[15px] leading-relaxed text-foreground/85">{cotidiana}</p>
            </div>
          </div>
        )}

        {antes.length > 0 && (
          <div
            className={`flex gap-3 ${cotidiana ? "border-t border-border pt-4" : ""}`}
          >
            <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-voz-yellow/30 text-sm font-bold text-[#8A5F00] dark:text-voz-yellow">
              !
            </span>
            <div className="min-w-0 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                Procure orientação
              </p>
              {antes.map((paragrafo, i) => {
                const gatilhos = separarGatilhos(paragrafo);
                return gatilhos ? (
                  <div key={i}>
                    <p className="text-[15px] leading-relaxed text-foreground/85">
                      {gatilhos.introducao}
                    </p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-foreground/85 marker:text-accent">
                      {gatilhos.itens.map((item, j) => (
                        <li key={j}>
                          {item}
                          {j < gatilhos.itens.length - 1 ? ";" : "."}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  renderParagraph(paragrafo, i)
                );
              })}
            </div>
          </div>
        )}

        <div className="rounded-[18px] bg-[#F6E1DA] p-4 dark:bg-[#3A2A2E]">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8E3320] dark:text-[#F08B70]">
            Em caso de relato ou risco
          </p>
          <p className="mt-1.5 text-[15.5px] font-semibold leading-relaxed text-[#6D2615] dark:text-[#F4EDE0]">
            {urgente}
          </p>
          {interativo && (
            <Button
              asChild
              size="sm"
              className="mt-3 bg-[#B8472F] text-white hover:bg-[#9d3a25]"
            >
              <Link to="/voz-protetora/preciso-de-ajuda" search={previewSearch}>
                Preciso de ajuda
              </Link>
            </Button>
          )}
        </div>

        {depois.map((paragrafo, i) => (
          <p key={i} className="text-[13px] italic leading-relaxed text-muted-foreground">
            {paragrafo}
          </p>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Tratamento visual dos demais blocos (aprovado em 2026-10-07)
// Só muda a forma de mostrar: as palavras são as do texto aprovado. Quando o texto não tem o
// formato esperado, o bloco aparece como antes.
// ---------------------------------------------------------------------------

const ehLista = (paragrafo: string) => paragrafo.split("\n").every((l) => l.startsWith("- "));
const itensDaLista = (paragrafo: string) => paragrafo.split("\n").map((l) => l.slice(2));

/** "Evite": cada item vira um cartão rosado com um ×. */
function renderEvite(body: string) {
  return (
    <div className="mt-3 space-y-2">
      {body.split("\n\n").map((paragrafo, i) =>
        ehLista(paragrafo) ? (
          <div key={i} className="space-y-2">
            {itensDaLista(paragrafo).map((item, j) => (
              <div
                key={j}
                className="flex items-start gap-3 rounded-[14px] bg-[#FBEDE9] px-3 py-2.5 dark:bg-[#3A2A2E]"
              >
                <span className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#B8472F] text-white">
                  <X className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <p className="text-[15px] leading-snug text-[#5B2417] dark:text-[#F4EDE0]">
                  {renderInline(item)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div key={i} className="text-sm leading-relaxed text-foreground/85">
            {renderParagraph(paragrafo, i)}
          </div>
        ),
      )}
    </div>
  );
}

const LETRAS_VOZ: Record<string, string> = {
  V: "bg-primary text-primary-foreground",
  O: "bg-accent text-accent-foreground",
  Z: "bg-voz-yellow text-primary",
};

/** "Como agir?": o V · O · Z vira três linhas com a letra em destaque. */
function renderComoAgir(body: string) {
  const padrao = /^- \*\*([VOZ]) · ([^:*]+):\*\*\s*(.+)$/;
  const paragrafos = body.split("\n\n");
  const temVOZ = paragrafos.some((p) => p.split("\n").every((l) => padrao.test(l)));
  if (!temVOZ) return renderBody(body);

  return (
    <div className="mt-3 space-y-3">
      {paragrafos.map((paragrafo, i) => {
        const linhas = paragrafo.split("\n");
        if (!linhas.every((l) => padrao.test(l))) {
          return (
            <div key={i} className="text-sm leading-relaxed text-foreground/85">
              {renderParagraph(paragrafo, i)}
            </div>
          );
        }
        return (
          <div key={i}>
            {linhas.map((linha, j) => {
              const [, letra, nome, texto] = linha.match(padrao)!;
              return (
                <div
                  key={j}
                  className={`flex items-start gap-3 py-3 ${j > 0 ? "border-t border-border" : "pt-0"}`}
                >
                  <span
                    className={`grid h-[38px] w-[38px] shrink-0 place-items-center rounded-xl text-[17px] font-extrabold ${LETRAS_VOZ[letra!]}`}
                  >
                    {letra}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      {nome}
                    </p>
                    <p className="mt-0.5 text-[15px] leading-relaxed text-foreground/85">
                      {renderInline(texto![0]!.toUpperCase() + texto!.slice(1))}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/** "O que pode estar acontecendo?": o último parágrafo (o ponto central) ganha uma faixa. */
function renderOQuePode(body: string) {
  const paragrafos = body.split("\n\n");
  if (paragrafos.length < 2 || paragrafos.some(ehLista)) return renderBody(body);
  return (
    <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/85">
      {paragrafos.slice(0, -1).map((p, i) => renderParagraph(p, i))}
      <div className="rounded-r-2xl border-l-4 border-voz-yellow bg-voz-yellow/15 px-3.5 py-3 font-medium text-foreground">
        {renderParagraph(paragrafos[paragrafos.length - 1]!, 99)}
      </div>
    </div>
  );
}

/** "Olhar protetor": introdução, perguntas com ícone de olhar e conclusão em caixa. Sem marcar. */
function renderOlhar(body: string) {
  const paragrafos = body.split("\n\n");
  if (!paragrafos.some(ehLista)) return renderBody(body);

  let jaViuLista = false;
  return (
    <div className="mt-3 space-y-2">
      {paragrafos.map((paragrafo, i) => {
        if (ehLista(paragrafo)) {
          jaViuLista = true;
          return (
            <div key={i}>
              {itensDaLista(paragrafo).map((item, j) => (
                <div key={j} className="flex items-start gap-3 py-2">
                  <span className="mt-0.5 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Eye className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-[15px] leading-relaxed text-foreground/85">
                    {renderInline(item)}
                  </p>
                </div>
              ))}
            </div>
          );
        }
        if (!jaViuLista) {
          return (
            <p key={i} className="text-[15px] font-semibold leading-relaxed text-primary">
              {renderInline(paragrafo)}
            </p>
          );
        }
        return (
          <p
            key={i}
            className="rounded-2xl bg-primary/10 px-3.5 py-3 text-[15px] leading-relaxed text-foreground/90"
          >
            {renderInline(paragrafo)}
          </p>
        );
      })}
    </div>
  );
}

const INICIO_RESPONSABILIDADE = "A responsabilidade de proteger";

/** "O que essa situação ensina?": a frase sobre a responsabilidade do adulto ganha uma caixa. */
function renderEnsina(body: string) {
  const paragrafos = body.split("\n\n");
  if (!paragrafos.some((p) => p.startsWith(INICIO_RESPONSABILIDADE))) return renderBody(body);
  return (
    <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/85">
      {paragrafos.map((p, i) =>
        p.startsWith(INICIO_RESPONSABILIDADE) ? (
          <div
            key={i}
            className="flex items-start gap-3 rounded-[18px] bg-primary px-4 py-3.5 text-primary-foreground"
          >
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-voz-yellow" />
            <p className="text-[15px] font-semibold leading-snug">{renderInline(p, "escuro")}</p>
          </div>
        ) : (
          renderParagraph(p, i)
        ),
      )}
    </div>
  );
}

/** Escolhe o tratamento visual de cada bloco pela chave. */
function renderComTratamento(chave: string, body: string) {
  if (CHAVES_DE_FALAS.includes(chave)) return renderFalas(body);
  switch (chave) {
    case "evite":
      return renderEvite(body);
    case "como-agir":
      return renderComoAgir(body);
    case "o-que-pode":
      return renderOQuePode(body);
    case "olhar":
      return renderOlhar(body);
    case "ensina":
      return renderEnsina(body);
    default:
      return renderBody(body);
  }
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

function BotaoOuvir({ texto }: { texto: string }) {
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

    const trechos = emTrechos(texto);
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
  /**
   * false na demonstração da página de vendas: sem Ouvir e sem botões que levam à área do
   * produto (o visitante ainda não tem acesso a ela).
   */
  interativo?: boolean;
}

/**
 * Renderiza a estrutura oficial de orientação: "Meu próximo passo" e "Quando buscar ajuda?" (se a
 * porta tiver) ficam sempre visíveis, em destaque; os demais blocos ficam num acordeão — um
 * aberto por vez — para não exibir todo o texto da peça de uma vez.
 */
export function OrientationBody({
  blocks,
  variacaoPorIdade,
  variantBlockKey = "o-que-dizer",
  interativo = true,
}: OrientationBodyProps) {
  const buscaPreview = usePreviewSearch();
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

  // Ordem de leitura em voz alta: passo, ajuda e depois os demais blocos.
  const textoParaOuvir = [passo, ajuda, ...demaisBlocos]
    .filter((b): b is OrientationBlock => Boolean(b?.body))
    .map((b) => `${rotuloSemEmoji(b.label).toLowerCase()}. ${textoPuro(b.body!)}`)
    .join(" ");

  return (
    <div className="space-y-4">
      <div className="print:hidden space-y-4">
        {interativo && textoParaOuvir && (
          <div>
            <BotaoOuvir texto={textoParaOuvir} />
          </div>
        )}

        {passo && (
          <section className="relative overflow-hidden rounded-[24px] bg-primary p-5 text-primary-foreground shadow-[var(--shadow-soft)] sm:p-6">
            <div className="pointer-events-none absolute -right-14 -top-16 h-40 w-40 rounded-full bg-accent opacity-35" />
            <div className="relative">
              <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-voz-yellow">
                <span className="h-0.5 w-5 rounded-full bg-voz-yellow" />
                {rotuloSemEmoji(passo.label)}
              </h2>
              {passo.body ? (
                <div className="[&>div]:text-[17px] [&>div]:leading-relaxed">
                  {renderBody(passo.body, "escuro")}
                </div>
              ) : (
                <ConteudoEmProducao />
              )}
              {interativo && passo.body && (
                <Button asChild size="sm" className="mt-4 bg-voz-yellow text-primary hover:bg-voz-yellow/90">
                  <Link
                    to="/voz-protetora/meu-passo"
                    search={{ ...(buscaPreview ?? {}), texto: textoPuro(passo.body) } as never}
                  >
                    ➡️ Levar para Meu Passo de Proteção
                  </Link>
                </Button>
              )}
            </div>
          </section>
        )}

        {ajuda &&
          (ajuda.body ? (
            <BlocoAjuda label={ajuda.label} body={ajuda.body} interativo={interativo} />
          ) : (
            <section className="rounded-[22px] border border-accent bg-accent/10 p-5 shadow-[var(--shadow-soft)] sm:p-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-primary">
                {ajuda.label}
              </h2>
              <ConteudoEmProducao />
            </section>
          ))}

        {demaisBlocos.length > 0 && (
          <Accordion
            type="single"
            collapsible
            defaultValue={demaisBlocos[0]?.key}
            className="rounded-[22px] border border-border/60 bg-card px-5 shadow-[var(--shadow-soft)] sm:px-6"
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
                    {bodyExibido ? (
                      renderComTratamento(block.key, bodyExibido)
                    ) : (
                      <ConteudoEmProducao />
                    )}
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
