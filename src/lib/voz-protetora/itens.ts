/**
 * Separa um parágrafo escrito como lista corrida ("A; b; c.") em itens para mostrar em lista.
 * Só lê o texto: nenhuma palavra é alterada. O ponto e vírgula no fim de cada item e o ponto no
 * último são mantidos; só a primeira letra de cada item passa a ser maiúscula.
 *
 * Os cortes só acontecem em ";" fora de parênteses e fora de aspas.
 */
export interface ListaCorrida {
  /** Frase de abertura antes da lista, como "O que você pode fazer:". */
  introducao?: string;
  itens: string[];
}

function cortarEmPontoEVirgula(texto: string): string[] {
  const partes: string[] = [];
  let atual = "";
  let profundidade = 0;
  let dentroDeAspas = false;

  for (const caractere of texto) {
    if (caractere === '"') dentroDeAspas = !dentroDeAspas;
    else if (caractere === "(") profundidade++;
    else if (caractere === ")") profundidade = Math.max(0, profundidade - 1);

    atual += caractere;
    if (caractere === ";" && profundidade === 0 && !dentroDeAspas) {
      partes.push(atual.trim());
      atual = "";
    }
  }
  if (atual.trim()) partes.push(atual.trim());
  return partes;
}

function capitalizar(texto: string): string {
  return /^\p{L}/u.test(texto) ? texto[0]!.toUpperCase() + texto.slice(1) : texto;
}

/** Devolve `null` se o parágrafo não for uma lista corrida (menos de dois itens). */
export function separarItens(paragrafo: string): ListaCorrida | null {
  if (paragrafo.includes("\n")) return null;
  const partes = cortarEmPontoEVirgula(paragrafo);
  if (partes.length < 2) return null;

  let introducao: string | undefined;
  const primeira = partes[0]!;
  const abertura = primeira.match(/^([^:"“()]{3,60}:)\s+(.+)$/);
  if (abertura) {
    introducao = abertura[1]!;
    partes[0] = abertura[2]!;
  }

  return { introducao, itens: partes.map(capitalizar) };
}
