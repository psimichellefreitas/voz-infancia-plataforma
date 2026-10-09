/**
 * Busca nas orientações do VOZ PROTETORA.
 *
 * Entende cada palavra da pergunta separadamente (sem exigir a frase inteira), ignora acentos,
 * maiúsculas e palavras de ligação ("com", "que", "meu"), aceita variações da mesma palavra
 * ("dormir", "dormiu", "dormindo") e alguns sinônimos do dia a dia. Só lê os textos aprovados:
 * não cria conteúdo.
 */
export interface ItemBusca {
  slug: string;
  emoji?: string;
  title: string;
  grupo?: string;
  blocks?: { label?: string; body?: string }[];
  variacaoPorIdade?: Partial<Record<string, string>>;
}

export interface FonteBusca {
  porta: "aconteceu" | "vai-acontecer" | "fortalecer";
  portaLabel: string;
  base: string;
  items: ItemBusca[];
}

export interface ResultadoBusca {
  porta: FonteBusca["porta"];
  portaLabel: string;
  to: string;
  slug: string;
  emoji?: string;
  title: string;
  grupo?: string;
  /** Trecho do texto em que a palavra apareceu (só quando não está no título). */
  trecho?: string;
  /** true quando nem todas as palavras foram encontradas (resultado aproximado). */
  parcial?: boolean;
}

export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const PALAVRAS_DE_LIGACAO = new Set(
  (
    "a o as os um uma uns umas de da do das dos em na no nas nos com sem por para pra pro que e ou se ao aos " +
    "meu minha meus minhas seu sua seus suas ele ela eles elas eu voce me te lhe mais muito muita muitos " +
    "esta esse essa isso isto tem ter foi ser estar quando como qual quais porque ja so mas ate sobre " +
    "estou esta estao fui vai vou vamos quero queria preciso pode posso devo deve fazer faz " +
    "nele nela neles nelas dele dela deles delas aquele aquela este disso nisso aqui la"
  ).split(" "),
);

/** Palavras que aparecem em quase todo texto: só entram na busca se forem as únicas digitadas. */
const PALAVRAS_GERAIS = new Set([
  "crianca",
  "criancas",
  "filho",
  "filha",
  "filhos",
  "filhas",
  "menino",
  "menina",
  "adulto",
  "adultos",
]);

const SUFIXOS = [
  "amentos", "imentos", "amento", "imento", "acoes", "acao", "mente", "adores", "adora", "ador",
  "ando", "endo", "indo", "ados", "adas", "idos", "idas", "ado", "ada", "ido", "ida", "inho", "inha",
  "ou", "eu", "iu", "am", "em", "ar", "er", "ir", "as", "es", "os", "s", "a", "e", "o", "i",
];

/** Raiz simples de uma palavra: tira terminações comuns (até duas vezes), mantendo ao menos 4 letras. */
export function raiz(palavra: string): string {
  let atual = palavra;
  for (let passo = 0; passo < 2; passo++) {
    const sufixo = SUFIXOS.find((s) => atual.endsWith(s) && atual.length - s.length >= 4);
    if (!sufixo) break;
    atual = atual.slice(0, atual.length - sufixo.length);
  }
  return atual;
}

/** Sinônimos do dia a dia, em raízes. Só ajudam a achar; não aparecem para a pessoa. */
const SINONIMOS: Record<string, string[]> = {
  medo: ["receio", "temor", "assust", "panico", "pavor"],
  segredo: ["surpresa", "esconder", "guardar"],
  celular: ["telefone", "smartphone", "tablet", "aparelho"],
  internet: ["online", "rede", "jogar", "jogo", "aplicativo"],
  escola: ["colegio", "creche", "professor", "aula"],
  baba: ["cuidador", "cuidadora"],
  cuidador: ["baba"],
  beijo: ["beijar", "beijinho", "cumprimentar", "carinho"],
  abraco: ["abracar", "cumprimentar", "carinho"],
  tocar: ["toque", "contato", "pegar"],
  toque: ["tocar", "contato"],
  brincadeira: ["brincar", "jogo"],
  sexual: ["sexualidade", "intimas", "intima", "corpo"],
  corpo: ["intimas", "banho", "roupa"],
  bater: ["agressao", "violencia", "machucar"],
  violencia: ["agressao", "machucar", "abuso"],
  abuso: ["violencia", "machucar", "limite"],
  choro: ["chorar", "chora"],
  chorar: ["choro", "chora"],
  triste: ["tristeza", "sentimento"],
  tristeza: ["triste", "sentimento"],
  vergonha: ["constrang", "envergonh"],
  ameaca: ["ameacar", "chantagem", "medo"],
  mentira: ["mentir", "verdade"],
  mudanca: ["mudou", "diferente", "comportamento"],
  comportamento: ["mudanca", "mudou", "diferente", "reacao"],
  dormir: ["pernoite", "madrugada", "noite"],
  viagem: ["passeio", "excursao", "acampamento"],
  passeio: ["viagem", "excursao"],
  avo: ["familiar", "parente"],
  tio: ["familiar", "parente"],
  padrasto: ["familiar", "adulto", "cuidador"],
  pornografia: ["sexual", "conteudo", "inadequado"],
  video: ["conteudo", "tela", "internet"],
  foto: ["imagem", "compartilh", "online"],
  mensagem: ["conversa", "online", "chat"],
  estranho: ["desconhecido", "pessoa"],
  sozinho: ["sozinha", "ficar"],
  bate: ["agressao", "violencia", "machucar"],
  batem: ["agressao", "violencia", "machucar"],
  bateu: ["agressao", "violencia", "machucar"],
  apanha: ["agressao", "violencia", "machucar"],
  bullying: ["pressao", "colega", "zomb", "humilh", "exclu"],
  amigo: ["colega", "grupo", "pressao"],
};

function sinonimosDe(r: string): string[] {
  const direto = SINONIMOS[r];
  const comPrefixo = Object.entries(SINONIMOS)
    .filter(([chave]) => chave !== r && (chave.startsWith(r) || r.startsWith(chave)) && r.length >= 4)
    .flatMap(([, valores]) => valores);
  return [...(direto ?? []), ...comPrefixo];
}

interface ConsultaPalavra {
  /** Raízes aceitas para esta palavra (a própria e os sinônimos). */
  alternativas: string[];
}

export function prepararConsulta(consulta: string): ConsultaPalavra[] {
  const todas = normalizar(consulta).split(" ").filter((p) => p.length >= 2);
  let uteis = todas.filter((p) => !PALAVRAS_DE_LIGACAO.has(p) && !PALAVRAS_GERAIS.has(p));
  if (uteis.length === 0) uteis = todas.filter((p) => !PALAVRAS_DE_LIGACAO.has(p));
  if (uteis.length === 0) uteis = todas;

  return uteis.map((palavra) => {
    const r = raiz(palavra);
    const alternativas = new Set<string>([r, palavra.length >= 4 ? palavra : r]);
    for (const s of [...sinonimosDe(palavra), ...sinonimosDe(r)]) alternativas.add(raiz(s));
    return { alternativas: [...alternativas].filter((a) => a.length >= 2) };
  });
}

function casaComTexto(alternativas: string[], palavrasDoTexto: string[]): boolean {
  return alternativas.some((alt) => palavrasDoTexto.some((p) => p.startsWith(alt)));
}

function limparTrecho(texto: string): string {
  return texto
    .replace(/\*\*/g, "")
    .replace(/(^|\n)- /g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function recortar(textoBruto: string, alternativas: string[][]): string | undefined {
  const texto = limparTrecho(textoBruto);
  const frases = texto.split(/(?<=[.!?:])\s+/);
  for (const frase of frases) {
    const palavras = normalizar(frase).split(" ");
    if (alternativas.some((alts) => casaComTexto(alts, palavras))) {
      return frase.length > 150 ? frase.slice(0, 147).trimEnd() + "..." : frase;
    }
  }
  return undefined;
}

const PESO_TITULO = 6;
const PESO_GRUPO = 4;
const PESO_TEXTO = 1;

export function buscar(fontes: FonteBusca[], consulta: string, limite = 12): ResultadoBusca[] {
  if (normalizar(consulta).length < 2) return [];
  const palavras = prepararConsulta(consulta);
  if (palavras.length === 0) return [];

  interface Candidato {
    resultado: ResultadoBusca;
    pontos: number;
    achadas: number;
  }
  const candidatos: Candidato[] = [];

  for (const fonte of fontes) {
    for (const item of fonte.items) {
      const titulo = normalizar(item.title).split(" ");
      const grupo = normalizar(item.grupo ?? "").split(" ");
      // A linha fixa de escalada ("Se houver relato da criança...") está em quase todas as
      // orientações; deixá-la de fora evita resultados repetidos para "violência", "risco" etc.
      const semLinhaFixa = (texto: string) =>
        texto
          .split("\n\n")
          .filter((paragrafo) => !paragrafo.startsWith("Se houver relato da criança"))
          .join("\n\n");
      const textos = [
        ...(item.blocks?.map((b) => semLinhaFixa(b.body ?? "")) ?? []),
        ...Object.values(item.variacaoPorIdade ?? {}).map((v) => v ?? ""),
      ];
      const palavrasDoTexto = normalizar(textos.join(" ")).split(" ");

      let pontos = 0;
      let achadas = 0;
      const foraDoTitulo: string[][] = [];

      for (const { alternativas } of palavras) {
        let peso = 0;
        if (casaComTexto(alternativas, titulo)) peso = PESO_TITULO;
        else if (casaComTexto(alternativas, grupo)) peso = PESO_GRUPO;
        else if (casaComTexto(alternativas, palavrasDoTexto)) {
          peso = PESO_TEXTO;
          foraDoTitulo.push(alternativas);
        }
        if (peso > 0) {
          achadas++;
          pontos += peso;
        }
      }
      if (achadas === 0) continue;

      candidatos.push({
        pontos,
        achadas,
        resultado: {
          porta: fonte.porta,
          portaLabel: fonte.portaLabel,
          to: `${fonte.base}/${item.slug}`,
          slug: item.slug,
          emoji: item.emoji,
          title: item.title,
          grupo: item.grupo,
          trecho:
            foraDoTitulo.length > 0
              ? recortar(textos.join(" "), foraDoTitulo)
              : undefined,
        },
      });
    }
  }

  const todas = candidatos.filter((c) => c.achadas === palavras.length);
  const escolhidos = todas.length > 0 ? todas : candidatos;
  const parcial = todas.length === 0;

  return escolhidos
    .sort((a, b) => b.achadas - a.achadas || b.pontos - a.pontos)
    .slice(0, limite)
    .map((c) => ({ ...c.resultado, parcial }));
}
