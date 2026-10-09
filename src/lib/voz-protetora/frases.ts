/**
 * Frases do dia (PROPOSTA da idealizadora, 2026-10-09). Todas são cópias fiéis de frases já
 * aprovadas nas orientações e nas telas do produto; nada foi escrito para esta lista. A "origem"
 * serve só para conferência. Para acrescentar frases, usar apenas texto já aprovado.
 *
 * A frase muda a cada dia (pela data do aparelho) e volta ao início quando a lista termina.
 */
export interface FraseDoDia {
  texto: string;
  origem: string;
}

export const FRASES_DO_DIA: FraseDoDia[] = [
  { texto: "Toda infância precisa de proteção. Todo adulto pode ser Voz.", origem: "Manifesto (DOC 01)" },
  { texto: "Nomear o medo já é proteção.", origem: "ACONTECEU: A criança diz que tem medo de alguém" },
  { texto: "Você não precisa saber tudo sobre proteção.", origem: "Página de vendas do Voz Protetora" },
  {
    texto: "Acolher o sentimento, mesmo sem resolver o problema na hora, já é proteção.",
    origem: "QUERO FORTALECER: Nomear e acolher sentimentos",
  },
  { texto: "A responsabilidade de proteger continua sendo do adulto.", origem: "ACONTECEU: Não quer abraçar" },
  {
    texto: "Uma Voz Protetora não é um adulto que sabe tudo, é um adulto disposto a isso.",
    origem: "Minha Voz Protetora",
  },
  { texto: "Pedir ajuda é uma força, não uma fraqueza.", origem: "QUERO FORTALECER: Ensinar a pedir ajuda" },
  { texto: "Você não precisa reunir provas.", origem: "ACONTECEU: A criança contou algo que me preocupou" },
  {
    texto: "Falar com naturalidade, com informação adequada à idade, é proteção, não exposição.",
    origem: "QUERO FORTALECER: Corpo e sexualidade sem tabu",
  },
  { texto: "Buscar orientação é, em si, um passo de proteção.", origem: "Preciso de ajuda" },
  { texto: "Carinho não se cobra.", origem: "ACONTECEU: Não quer abraçar (Meu próximo passo)" },
  {
    texto:
      "Independentemente da gravidade aparente, uma criança que conta precisa ser levada a sério, acolhida e protegida.",
    origem: "ACONTECEU: A criança contou que alguém ultrapassou seu limite",
  },
  { texto: "VER para perceber. OUVIR para compreender. ZELAR para proteger.", origem: "Minha Voz Protetora" },
  {
    texto: "A criança não precisa \"provar\" o desconforto para ser protegida.",
    origem: "ACONTECEU: A criança parece desconfortável perto de determinada pessoa",
  },
  {
    texto: "Acolhimento sem susto, sem interrogatório e sem promessa de segredo é o que mantém o canal aberto.",
    origem: "ACONTECEU: A criança contou algo que me preocupou",
  },
  {
    texto: "Hoje, reserve 10 minutos de atenção plena com a criança, sem celular, perguntando como ela está.",
    origem: "QUERO FORTALECER: Vínculo e presença (Meu passo de proteção)",
  },
  {
    texto: "Seu papel é observar o necessário para proteger e encaminhar, não conduzir uma investigação.",
    origem: "ACONTECEU: A criança contou que alguém ultrapassou seu limite",
  },
  {
    texto: "Ter uma rede de apoio não é sobre desconfiar de ninguém, é sobre ter opções.",
    origem: "QUERO FORTALECER: Rede de apoio da criança",
  },
  { texto: "A responsabilidade de agir é inteiramente do adulto.", origem: "ACONTECEU: A criança contou que alguém ultrapassou seu limite" },
  {
    texto: "Converse com a criança e monte, juntos, uma pequena lista de adultos de confiança fora de casa.",
    origem: "QUERO FORTALECER: Rede de apoio da criança (Meu passo de proteção)",
  },
  {
    texto: "Você não precisa ter certeza para procurar ajuda, e não precisa investigar ou resolver sozinho.",
    origem: "Preciso de ajuda",
  },
  {
    texto: "Informar sobre o corpo é responsabilidade do adulto, não exposição da criança.",
    origem: "ACONTECEU: A criança perguntou sobre partes íntimas",
  },
  {
    texto: "Na próxima vez que a criança disser \"não\" a um contato físico, pare na hora e agradeça por ela ter dito.",
    origem: "QUERO FORTALECER: Ensinar e respeitar o \"não\" (Meu passo de proteção)",
  },
  {
    texto: "A forma como o adulto recebe a primeira vez que a criança conta algo difícil determina se haverá uma segunda vez.",
    origem: "ACONTECEU: A criança contou algo que me preocupou",
  },
  {
    texto: "Reúna a família esta semana para construir ou revisar, juntos, os combinados de uso de telas.",
    origem: "QUERO FORTALECER: Acordos de telas (Meu passo de proteção)",
  },
  {
    texto: "Saber pedir ajuda é uma habilidade que se ensina, não algo que a criança simplesmente \"sabe fazer\" quando precisa.",
    origem: "QUERO FORTALECER: Ensinar a pedir ajuda",
  },
  {
    texto: "Identifique uma pequena responsabilidade nova que a criança pode assumir esta semana, com seu acompanhamento.",
    origem: "QUERO FORTALECER: Autonomia progressiva (Meu passo de proteção)",
  },
];

/** A frase de hoje, pela data do aparelho (muda à meia-noite local). */
export function fraseDeHoje(agora: Date = new Date()): FraseDoDia {
  const dias = Math.floor(
    (Date.UTC(agora.getFullYear(), agora.getMonth(), agora.getDate()) - Date.UTC(2026, 0, 1)) /
      86_400_000,
  );
  const indice = ((dias % FRASES_DO_DIA.length) + FRASES_DO_DIA.length) % FRASES_DO_DIA.length;
  return FRASES_DO_DIA[indice]!;
}

/** "Bom dia", "Boa tarde" ou "Boa noite", pela hora do aparelho. */
export function saudacaoDaHora(agora: Date = new Date()): string {
  const hora = agora.getHours();
  if (hora >= 5 && hora < 12) return "Bom dia";
  if (hora >= 12 && hora < 18) return "Boa tarde";
  return "Boa noite";
}
