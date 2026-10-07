/**
 * Separa o bloco "O que dizer?" em elementos para o desenho de balões de fala.
 * Só lê o texto: nenhuma palavra é alterada nem acrescentada.
 *
 * Reconhece, linha a linha:
 * - rótulo sozinho:            **Para a criança:**
 * - rótulo com fala na linha:  **Para a pessoa:** "Ela pediu para parar."
 * - item só com fala:          - "Você não precisa abraçar se não quiser."
 * - item com observação:       - "Que segredo é esse?" (tom leve, para segredos comuns)
 * - item com destinatário:     - Para outros adultos: "Ela disse que não quer."
 * Qualquer outra linha (instrução, texto corrido) vira `texto` e aparece como antes.
 */
export type PapelFala = "crianca" | "outro";

export type ElementoFala =
  | { tipo: "rotulo"; texto: string; papel: PapelFala }
  | { tipo: "fala"; texto: string; nota?: string; papel: PapelFala }
  | { tipo: "texto"; texto: string; item: boolean };

const ASPAS_ABRE = `["“]`;
const ASPAS_FECHA = `["”]`;

const reRotuloSozinho = new RegExp(`^\\*\\*(.+?):?\\*\\*:?$`);
const reRotuloComFala = new RegExp(`^\\*\\*(.+?):?\\*\\*:?\\s+${ASPAS_ABRE}(.+)${ASPAS_FECHA}\\.?$`);
const reFala = new RegExp(`^${ASPAS_ABRE}(.+?)${ASPAS_FECHA}(?:\\s*\\((.+)\\))?\\.?$`);
const reParaComFala = new RegExp(`^(Para [^:"“]+):\\s*${ASPAS_ABRE}(.+)${ASPAS_FECHA}\\.?$`);

/**
 * Para quem a fala é dita, pelo começo do rótulo: "Para a criança..." é fala à criança; qualquer outro
 * "Para ..." (a pessoa, outros adultos, quem trouxe a informação) é fala a um adulto. Rótulos que
 * não começam com "Para" mantêm o papel anterior.
 */
function papelDoRotulo(rotulo: string | undefined, anterior: PapelFala = "crianca"): PapelFala {
  if (!rotulo) return anterior;
  if (/^Para (a )?crian[cç]a/i.test(rotulo) || /^À crian[cç]a/i.test(rotulo)) return "crianca";
  if (/^Para /i.test(rotulo)) return "outro";
  return anterior;
}

export function separarFalas(body: string): ElementoFala[] | null {
  const elementos: ElementoFala[] = [];
  let rotuloAtual: string | undefined;
  let papelAtual: PapelFala = "crianca";
  let achouFala = false;

  for (const bruta of body.split("\n")) {
    const linha = bruta.trim();
    if (!linha) {
      continue;
    }

    const eItem = linha.startsWith("- ");
    const conteudo = eItem ? linha.slice(2).trim() : linha;

    // "Evite dizer: ..." lista o que NÃO se deve dizer: nunca vira balão de fala.
    if (/^\*\*Evite/i.test(linha)) {
      elementos.push({ tipo: "texto", texto: conteudo, item: false });
      continue;
    }

    const rotuloComFala = linha.match(reRotuloComFala);
    if (rotuloComFala) {
      rotuloAtual = rotuloComFala[1]!;
      papelAtual = papelDoRotulo(rotuloAtual, papelAtual);
      const papel = papelAtual;
      elementos.push({ tipo: "rotulo", texto: rotuloAtual, papel });
      elementos.push({ tipo: "fala", texto: rotuloComFala[2]!, papel });
      achouFala = true;
      continue;
    }

    const rotuloSozinho = linha.match(reRotuloSozinho);
    if (rotuloSozinho) {
      rotuloAtual = rotuloSozinho[1]!;
      papelAtual = papelDoRotulo(rotuloAtual, papelAtual);
      elementos.push({ tipo: "rotulo", texto: rotuloAtual, papel: papelAtual });
      continue;
    }

    const paraComFala = conteudo.match(reParaComFala);
    if (paraComFala) {
      const papel = papelDoRotulo(paraComFala[1], papelAtual);
      papelAtual = papel;
      elementos.push({ tipo: "rotulo", texto: paraComFala[1]!, papel });
      elementos.push({ tipo: "fala", texto: paraComFala[2]!, papel });
      achouFala = true;
      continue;
    }

    const fala = conteudo.match(reFala);
    if (fala && eItem) {
      elementos.push({
        tipo: "fala",
        texto: fala[1]!,
        nota: fala[2],
        papel: papelAtual,
      });
      achouFala = true;
      continue;
    }

    elementos.push({ tipo: "texto", texto: conteudo, item: eItem });
  }

  return achouFala ? elementos : null;
}
