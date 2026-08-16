/**
 * Conteúdo estrutural do VOZ PROTETORA V1.
 *
 * IMPORTANTE: os textos de orientação de cada situação/tema ainda NÃO foram
 * produzidos. Cada item nasce com `status: "pendente"` e as páginas de
 * orientação renderizam a estrutura oficial com marcação interna de
 * "conteúdo a preencher". Nada de texto fictício apresentado como final.
 */

export type ContentStatus = "pendente" | "publicado";

export interface OrientationBlock {
  key: string;
  label: string;
  body?: string;
}

export interface ContentItem {
  slug: string;
  emoji?: string;
  title: string;
  status: ContentStatus;
  blocks?: OrientationBlock[];
}

/** Estrutura oficial da orientação em ACONTECEU. */
export const ACONTECEU_STRUCTURE: OrientationBlock[] = [
  { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?" },
  { key: "o-que-dizer", label: "💬 O QUE DIZER?" },
  { key: "como-agir", label: "🛡️ COMO AGIR?" },
  { key: "evite", label: "🚫 EVITE" },
  { key: "olhar", label: "👁️ OLHAR PROTETOR" },
  { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?" },
  { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?" },
  { key: "passo", label: "➡️ MEU PRÓXIMO PASSO" },
];

/** Estrutura oficial da orientação em VAI ACONTECER. */
export const VAI_ACONTECER_STRUCTURE: OrientationBlock[] = [
  { key: "antes", label: "ANTES" },
  { key: "durante", label: "DURANTE" },
  { key: "ensine", label: "ENSINE A CRIANÇA" },
  { key: "depois", label: "DEPOIS" },
  { key: "evite", label: "EVITE" },
  { key: "ajuda", label: "QUANDO BUSCAR AJUDA" },
  { key: "passo", label: "MEU PRÓXIMO PASSO" },
];

/** Estrutura oficial da orientação em QUERO FORTALECER. */
export const FORTALECER_STRUCTURE: OrientationBlock[] = [
  { key: "importa", label: "POR QUE ISSO IMPORTA?" },
  { key: "dizer", label: "💬 O QUE POSSO DIZER?" },
  { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?" },
  { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?" },
  { key: "evite", label: "🚫 EVITE" },
  { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO" },
];

export const ACONTECEU: ContentItem[] = [
  { slug: "nao-quer-abracar", title: "A criança não quer abraçar um familiar.", status: "pendente" },
  { slug: "nao-quer-beijar", title: "A criança não quer beijar alguém.", status: "pendente" },
  { slug: "medo-de-alguem", title: "A criança diz que tem medo de alguém.", status: "pendente" },
  { slug: "contou-algo-preocupante", title: "A criança contou algo que me preocupou.", status: "pendente" },
  { slug: "pediu-para-nao-contar", title: "A criança pediu para eu não contar algo.", status: "pendente" },
  { slug: "mudou-comportamento", title: "A criança mudou de comportamento.", status: "pendente" },
  { slug: "nao-quer-ir-a-lugar", title: "A criança não quer ir a determinado lugar.", status: "pendente" },
  { slug: "viu-algo-inadequado", title: "A criança viu algo inadequado na internet.", status: "pendente" },
  { slug: "perguntou-partes-intimas", title: "A criança perguntou sobre partes íntimas.", status: "pendente" },
  { slug: "alguem-ultrapassou-limite", title: "A criança contou que alguém ultrapassou seu limite.", status: "pendente" },
  { slug: "adulto-pediu-segredo", title: "Um adulto pediu para a criança guardar um segredo.", status: "pendente" },
  { slug: "desconforto-perto-de-pessoa", title: "A criança parece desconfortável perto de determinada pessoa.", status: "pendente" },
  { slug: "nao-sei-interpretar", title: "A criança fez algo que não sei como interpretar.", status: "pendente" },
  { slug: "mensagens-preocupantes", title: "A criança está recebendo mensagens de alguém e algo me preocupa.", status: "pendente" },
  { slug: "pressao-para-fazer-algo", title: "A criança está sendo pressionada a fazer algo que não quer.", status: "pendente" },
];

export const VAI_ACONTECER: ContentItem[] = [
  { slug: "piscina", emoji: "🏊", title: "A criança vai à piscina.", status: "pendente" },
  { slug: "praia", emoji: "🏖️", title: "A criança vai à praia.", status: "pendente" },
  { slug: "dormir-familiar", emoji: "🏠", title: "A criança vai dormir na casa de um familiar.", status: "pendente" },
  { slug: "casa-de-amigo", emoji: "🏡", title: "A criança vai passar o dia na casa de um amigo.", status: "pendente" },
  { slug: "cuidados-de-outra-pessoa", emoji: "👵", title: "A criança vai ficar sob os cuidados de outra pessoa.", status: "pendente" },
  { slug: "festa", emoji: "🎂", title: "A criança vai a uma festa.", status: "pendente" },
  { slug: "atividade-esportiva", emoji: "⚽", title: "A criança vai participar de uma atividade esportiva.", status: "pendente" },
  { slug: "excursao-escolar", emoji: "🚌", title: "A criança vai participar de uma excursão ou viagem escolar.", status: "pendente" },
  { slug: "atividade-religiosa", emoji: "🛐", title: "A criança vai participar de uma atividade religiosa.", status: "pendente" },
  { slug: "acampamento", emoji: "⛺", title: "A criança vai participar de um acampamento.", status: "pendente" },
  { slug: "ambiente-digital", emoji: "📱", title: "A criança vai começar a utilizar um ambiente digital.", status: "pendente" },
  { slug: "jogar-online", emoji: "🎮", title: "A criança vai jogar online.", status: "pendente" },
];

export const FORTALECER: ContentItem[] = [
  { slug: "comunicacao", emoji: "💬", title: "Comunicação", status: "pendente" },
  { slug: "limites", emoji: "🧍", title: "Limites", status: "pendente" },
  { slug: "seguranca-emocional", emoji: "❤️", title: "Segurança emocional", status: "pendente" },
  { slug: "corpo-e-privacidade", emoji: "🧍‍♀️", title: "Corpo e privacidade", status: "pendente" },
  { slug: "pedir-ajuda", emoji: "🆘", title: "Pedir ajuda", status: "pendente" },
  { slug: "autonomia", emoji: "🧠", title: "Autonomia", status: "pendente" },
  { slug: "seguranca-digital", emoji: "📱", title: "Segurança digital", status: "pendente" },
  { slug: "relacoes-respeitosas", emoji: "🤝", title: "Relações respeitosas", status: "pendente" },
];

export const MINHA_VOZ = [
  { title: "OLHAR", body: "Perceber." },
  { title: "ESCUTAR", body: "Criar espaço para a criança falar." },
  { title: "ACOLHER", body: "Receber sem julgamento." },
  { title: "ORIENTAR", body: "Ensinar caminhos seguros." },
  { title: "AGIR", body: "Fortalecer a proteção quando necessário." },
];

export const PRESENCA_PERGUNTAS = [
  "A criança sabe que pode conversar comigo?",
  "Eu respeito quando ela diz não?",
  "Sei ouvir sem pressionar?",
  "Converso sobre situações difíceis?",
  "Ensino como pedir ajuda?",
  "Conheço os riscos do ambiente digital?",
  "Sei onde buscar ajuda quando necessário?",
  "Minha forma de agir aumenta segurança ou medo?",
];

export const AJUDA_TEMAS = [
  "Possível violência",
  "Revelação da criança",
  "Ameaça",
  "Risco imediato",
  "Coerção",
  "Suspeita de abuso",
  "Situações envolvendo imagens íntimas",
  "Não sei se devo procurar ajuda",
];

export const AVISO_LEGAL =
  "O Voz Protetora é uma ferramenta educativa e orientativa. Não substitui atendimento profissional, avaliação especializada ou os serviços da rede de proteção.";

export function findItem(list: ContentItem[], slug: string) {
  return list.find((item) => item.slug === slug);
}