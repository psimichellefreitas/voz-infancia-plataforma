/**
 * Conteúdo estrutural do VOZ PROTETORA V1.
 *
 * Fonte da verdade do texto: `03_PRODUTOS/VOZ_PROTETORA/conteudo/` (um .md por peça,
 * com ficha de rastreabilidade — status, fontes, revisão, aprovação). Este arquivo é gerado
 * a partir daquele conteúdo aprovado; não editar o texto diretamente aqui sem atualizar
 * também o .md de origem.
 *
 * Banco de Situações V1: 60/60 peças aprovadas pela idealizadora em 2026-09-14/15.
 */

export type ContentStatus = "pendente" | "publicado";

export interface OrientationBlock {
  key: string;
  label: string;
  body?: string;
}

/** Faixas etárias para adaptar a fala sugerida (Opção A — só o bloco "O que dizer?"). */
export type FaixaEtaria = "0-6" | "7-10" | "11+";

export const FAIXAS_ETARIAS: { value: FaixaEtaria; label: string }[] = [
  { value: "0-6", label: "Pequena (até 6 anos)" },
  { value: "7-10", label: "Média (7 a 10 anos)" },
  { value: "11+", label: "Grande (11+ anos)" },
];

export interface ContentItem {
  slug: string;
  emoji?: string;
  title: string;
  /** Grupo-filtro de navegação (PRD §1.4). Não altera a lista, só organiza. */
  grupo?: string;
  status: ContentStatus;
  blocks?: OrientationBlock[];
  /**
   * Variações por faixa etária de um bloco específico da orientação — "O que dizer?" em
   * ACONTECEU, "Ensine a criança" em VAI ACONTECER, "O que posso dizer?" em QUERO FORTALECER
   * (Opção A). Só nas peças já revisadas; faixas ausentes usam o texto genérico do bloco
   * (fallback), nunca ficam sem conteúdo.
   */
  variacaoPorIdade?: Partial<Record<FaixaEtaria, string>>;
}

/**
 * Central de Notificações (DOC_PRODUTO §10.4 — DECISÃO APROVADA no V1). Lista versionada no
 * código, não um CMS: cada atualização real do produto ganha uma entrada aqui. Canal V1: só
 * in-app (push/e-mail ficam como PROPOSTA futura, exigem infraestrutura ainda não configurada).
 * Cadência baixa e sem urgência artificial (DOC 09 §5/§15) — só entra aqui o que for novidade
 * real (novo conteúdo, atualização, aviso de assinatura), nunca para gerar engajamento.
 */
export interface NotificationItem {
  id: string;
  data: string;
  titulo: string;
  corpo: string;
  link?: { to: string; label: string };
}

export interface SearchResult {
  porta: "aconteceu" | "vai-acontecer" | "fortalecer";
  portaLabel: string;
  to: string;
  slug: string;
  emoji?: string;
  title: string;
  grupo?: string;
}

/** Estrutura oficial da orientação em ACONTECEU. */
export const ACONTECEU_STRUCTURE: OrientationBlock[] = [
  {
    key: "o-que-pode",
    label: "👀 O QUE PODE ESTAR ACONTECENDO?"
  },
  {
    key: "o-que-dizer",
    label: "💬 O QUE DIZER?"
  },
  {
    key: "como-agir",
    label: "🛡️ COMO AGIR?"
  },
  {
    key: "evite",
    label: "🚫 EVITE"
  },
  {
    key: "olhar",
    label: "👁️ OLHAR PROTETOR"
  },
  {
    key: "ajuda",
    label: "🚨 QUANDO BUSCAR AJUDA?"
  },
  {
    key: "ensina",
    label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?"
  },
  {
    key: "passo",
    label: "➡️ MEU PRÓXIMO PASSO"
  }
];

/** Estrutura oficial da orientação em VAI ACONTECER. */
export const VAI_ACONTECER_STRUCTURE: OrientationBlock[] = [
  {
    key: "antes",
    label: "ANTES"
  },
  {
    key: "durante",
    label: "DURANTE"
  },
  {
    key: "ensine",
    label: "ENSINE A CRIANÇA"
  },
  {
    key: "depois",
    label: "DEPOIS"
  },
  {
    key: "evite",
    label: "EVITE"
  },
  {
    key: "ajuda",
    label: "QUANDO BUSCAR AJUDA"
  },
  {
    key: "passo",
    label: "MEU PRÓXIMO PASSO"
  }
];

/** Estrutura oficial da orientação em QUERO FORTALECER. */
export const FORTALECER_STRUCTURE: OrientationBlock[] = [
  {
    key: "importa",
    label: "POR QUE ISSO IMPORTA?"
  },
  {
    key: "dizer",
    label: "💬 O QUE POSSO DIZER?"
  },
  {
    key: "ensinar",
    label: "🧠 O QUE POSSO ENSINAR?"
  },
  {
    key: "praticar",
    label: "🛡️ O QUE POSSO PRATICAR?"
  },
  {
    key: "evite",
    label: "🚫 EVITE"
  },
  {
    key: "passo",
    label: "➡️ MEU PASSO DE PROTEÇÃO"
  }
];

export const ACONTECEU: ContentItem[] = [
  {
    slug: "nao-quer-abracar",
    title: "A criança não quer abraçar um familiar.",
    grupo: "A criança recuou de alguém ou de um lugar",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Não querer abraçar um familiar (avô, avó, tio, primo) é comum e quase sempre diz respeito ao momento da criança: timidez, cansaço, pouca convivência com a pessoa ou simplesmente não querer contato físico naquela hora.\n\nO abraço recusado é uma comunicação legítima sobre o próprio corpo e, isoladamente, não indica que algo aconteceu. O ponto central é a resposta do adulto: é ela que ensina à criança se o \"não\" dela tem valor." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança:**\n- \"Você não precisa abraçar se não quiser. Prefere acenar ou mandar um tchau?\"\n- \"Quem decide sobre o seu corpo é você.\"\n\n**Para a outra pessoa, se precisar:**\n- \"Hoje ela não quer abraço. Vamos de aceno.\"\n- \"Em casa, deixamos que ela escolha como cumprimentar.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** perceba que a criança demonstrou desconforto com o contato físico, sem transformar isso em suspeita.\n- **O · Ouvir:** pergunte se ela prefere outra forma de cumprimentar. Não exija explicação.\n- **Z · Zelar:** respeite o limite na hora, ofereça alternativas e sustente essa escolha diante dos outros adultos." },
      { key: "evite", label: "🚫 EVITE", body: "- Usar culpa, chantagem ou obrigar demonstrações de carinho (\"o titio vai ficar magoado\", \"abraça, senão...\").\n- Envergonhar a criança ou tratar a recusa como falta de educação.\n- Condicionar presente, elogio ou passeio a um abraço.\n- Colocar a criança no colo de outra pessoa sem que ela queira." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "Observe o conjunto, ao longo do tempo:\n\n- A recusa é geral ou dirigida a uma pessoa específica?\n- Vem acompanhada de medo, choro ou tentativa de se afastar?\n- A criança evita ficar sozinha com alguém?\n\nRecusar abraço é comum. A recusa repetida e dirigida a uma pessoa específica, com desconforto claro, pede atenção maior, sem conclusão antecipada." },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Esta é uma situação cotidiana e, na maioria das vezes, não exige buscar ajuda. Procure orientação de um profissional (psicólogo, pediatra) ou da rede de proteção se o desconforto com uma pessoa for intenso e repetido, se a criança demonstrar medo ou disser que não quer ficar com alguém, ou se houver outros sinais que, em conjunto, preocupem.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção.\n\nVocê não precisa ter certeza para pedir orientação, nem investigar ou interrogar a criança." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Respeitar o \"não\" da criança em um gesto pequeno, como um abraço, é como ela aprende, antes de qualquer risco, que o corpo dela tem limites e que os adultos os levam a sério. Essa experiência amplia o repertório da criança para recusar e para contar situações mais sérias.\n\nA responsabilidade de proteger continua sendo do adulto. O que a criança desenvolve é a própria voz." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Ofereça à criança outras formas de demonstrar afeto (aceno, mandar beijo de longe, sentar ao lado) e deixe claro, para ela e para a família, que carinho não se cobra." },
    ],
    variacaoPorIdade: {
      "0-6": "Para a criança:\n- \"Você não precisa abraçar. Pode dar tchauzinho.\"\n- \"Seu corpo é seu.\"\n\nPara a outra pessoa, se precisar:\n- \"Ela não quer abraço agora. Vamos de tchau.\"",
      "7-10": "Para a criança:\n- \"Você não precisa abraçar se não quiser. Pode acenar ou mandar um tchau.\"\n- \"Quem decide sobre o seu corpo é você.\"\n\nPara a outra pessoa, se precisar:\n- \"Ela prefere não abraçar agora. Um aceno tá bom?\"",
      "11+": "Para a criança:\n- \"Você não deve demonstrar afeto por obrigação, nem para evitar constrangimento de alguém. Escolher é seu direito.\"\n- \"Isso vale para qualquer pessoa, mesmo alguém querido pela família.\"\n\nPara a outra pessoa, se precisar:\n- \"Ela decidiu não abraçar agora. A gente respeita.\"",
    },
  },
  {
    slug: "nao-quer-beijar",
    title: "A criança não quer beijar alguém.",
    grupo: "A criança recuou de alguém ou de um lugar",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Não querer beijar alguém (um parente, um conhecido, um amigo da família) é comum e, na maioria das vezes, não indica nada além de uma preferência da criança naquele momento. Ela pode estar tímida, cansada, com pouca convivência com a pessoa ou simplesmente sem vontade daquele tipo de contato.\n\nRecusar um beijo é uma forma legítima de a criança comunicar algo sobre o próprio corpo. Isoladamente, não é sinal de que algo aconteceu. O que mais importa é a resposta do adulto: é ela que ensina à criança se o \"não\" dela tem valor." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança:**\n- \"Tudo bem não querer dar beijo. Você prefere acenar ou dar um abraço?\"\n- \"O seu corpo é seu. Você escolhe como quer cumprimentar.\"\n\n**Para a outra pessoa, se precisar:**\n- \"Hoje ela não quer dar beijo. Podemos combinar um aceno.\"\n- \"Temos ensinado que a forma de cumprimentar é escolha dela.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** perceba que a criança demonstrou desconforto com uma forma de contato físico, sem transformar isso em suspeita.\n- **O · Ouvir:** pergunte, de forma simples, se ela prefere cumprimentar de outro jeito. Não exija que ela explique o porquê.\n- **Z · Zelar:** respeite o limite na hora, ofereça alternativas (aceno, aperto de mão, abraço quando ela quiser) e sustente essa escolha diante dos outros adultos." },
      { key: "evite", label: "🚫 EVITE", body: "- Usar culpa, chantagem ou obrigar demonstrações de carinho (\"dá só um beijinho\", \"a vovó vai ficar triste\").\n- Envergonhar a criança, chamá-la de mal-educada ou rir da recusa.\n- Sentir que precisa justificar a criança para os outros adultos.\n- Oferecer recompensa em troca do beijo." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "Observe o conjunto, ao longo do tempo, não um episódio isolado:\n\n- A recusa é com todas as pessoas ou apenas com uma?\n- Vem acompanhada de medo, choro, vontade de se afastar ou mudança de comportamento perto daquela pessoa?\n- A criança evita ficar sozinha com alguém?\n\nUm beijo recusado é rotina. A recusa repetida, dirigida a uma pessoa e acompanhada de desconforto evidente, merece observação mais atenta, sem que isso represente uma conclusão." },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Esta é uma situação cotidiana e, na maioria das vezes, não exige buscar ajuda. Procure orientação de um profissional (psicólogo, pediatra) ou da rede de proteção se o desconforto com uma pessoa for intenso e repetido, se a criança demonstrar medo ou disser que não quer ficar com alguém, ou se houver outros sinais que, em conjunto, preocupem.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção.\n\nVocê não precisa ter certeza para pedir orientação, nem investigar ou interrogar a criança." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Respeitar o \"não\" da criança em algo pequeno, como um beijo, é como ela aprende, antes de qualquer risco, que o corpo dela tem limites e que esses limites são levados a sério pelos adultos. Uma criança que pode recusar um beijo constrói repertório para recusar outras coisas e para contar quando algo mais sério acontece.\n\nA responsabilidade de proteger continua sendo do adulto. O que a criança desenvolve é a própria voz." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Combine com a criança uma forma de cumprimentar que ela aceite e mostre, na prática, que o carinho pode ser oferecido sem obrigação." },
    ],
    variacaoPorIdade: {
      "0-6": "Para a criança:\n- \"Você não precisa dar beijo. Pode dar tchau com a mãozinha.\"\n- \"Seu corpo é seu.\"\n\nPara a outra pessoa, se precisar:\n- \"Ela não quer beijo hoje. Vamos de tchauzinho.\"",
      "7-10": "Para a criança:\n- \"Tudo bem não querer dar beijo. Você pode escolher outro jeito de cumprimentar.\"\n- \"Seu corpo é seu, você decide sobre ele.\"\n\nPara a outra pessoa, se precisar:\n- \"Ela prefere não dar beijo agora. Um aceno tá bom?\"",
      "11+": "Para a criança:\n- \"Você não é obrigada a demonstrar afeto do jeito que alguém espera. Escolher como cumprimentar é seu direito.\"\n- \"Se sentir pressão para fazer algo com o corpo que não quer, pode recusar, comigo ou com qualquer pessoa.\"\n\nPara a outra pessoa, se precisar:\n- \"Ela decidiu não dar beijo hoje. A gente respeita a escolha dela.\"",
    },
  },
  {
    slug: "medo-de-alguem",
    title: "A criança diz que tem medo de alguém.",
    grupo: "A criança recuou de alguém ou de um lugar",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Quando a criança diz que tem medo de alguém, isso merece ser levado a sério, mesmo que o motivo ainda não esteja claro. O medo pode ter muitas origens: uma experiência ruim, algo que ela viu ou ouviu, o jeito da pessoa (voz alta, brincadeiras invasivas), uma fase do desenvolvimento ou uma situação que a assustou de verdade.\n\nDizer \"não é nada\", \"deixa de bobagem\" ou manter a convivência como se nada fosse ensina à criança que o que ela sente não conta. Nomear o medo já é proteção." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança:**\n- \"Obrigada por me contar. Pode falar mais sobre isso, se quiser.\"\n- \"Você não precisa ficar perto de quem lhe dá medo. Eu vou cuidar disso.\"\n- \"O que essa pessoa faz que deixa você com medo?\" (uma pergunta aberta, sem insistir)\n\n**Evite dizer:** \"Que isso, ele gosta de você\", \"não seja mal-educada com quem te ama\"." },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** registre o que a criança disse, com as palavras dela; observe quando e perto de quem o medo aparece.\n- **O · Ouvir:** dê espaço para ela contar no próprio ritmo. Faça no máximo uma ou duas perguntas abertas. Não repita perguntas, não sugira respostas, não pressione.\n- **Z · Zelar:** reduza a exposição da criança a essa pessoa, sobretudo sem outro adulto de confiança por perto, enquanto você compreende melhor. Procure orientação." },
      { key: "evite", label: "🚫 EVITE", body: "- Usar culpa ou minimizar (\"é frescura\", \"está exagerando\"), rir ou repreender pela fala.\n- Obrigar a criança a abraçar, beijar ou ficar sozinha com a pessoa.\n- Interrogar a criança, confrontar a pessoa ou expor o assunto na frente dela.\n- Prometer segredo (\"não conto para ninguém\")." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- O medo é de uma pessoa específica ou de várias?\n- Aparece sempre nas mesmas situações (na casa de alguém, na hora do banho, quando fica a sós)?\n- Vem acompanhado de mudança no sono, no humor, no comportamento, ou de falas sobre o corpo?\n\nMedo pontual é parte do desenvolvimento. Medo persistente, dirigido a uma pessoa e acompanhado de outras mudanças é um sinal a levar a um profissional, sem que você precise descobrir sozinho o que houve." },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Procure orientação de um psicólogo, do pediatra ou da rede de proteção se o medo for persistente, dirigido a uma pessoa específica, ou vier acompanhado de outras mudanças de comportamento.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção.\n\nVocê não precisa ter provas para buscar orientação." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Quando o adulto escuta o medo sem minimizar e age para reduzir o desconforto, a criança aprende que falar o que sente muda alguma coisa. Essa é a base para que ela conte situações mais sérias no futuro.\n\nA responsabilidade de compreender e agir é do adulto, não da criança." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Diga à criança, com palavras simples, que você acreditou nela e que vai cuidar para que ela não fique sozinha com quem lhe dá medo." },
    ],
    variacaoPorIdade: {
      "0-6": "Para a criança:\n- \"Você não gosta dele? Tá bem, você não precisa ficar perto.\"\n- \"Eu vou cuidar de você.\"\n- \"Ele faz alguma coisa que te assusta?\" (com calma, sem insistir)",
      "7-10": "Para a criança:\n- \"Obrigada por me contar isso. Você não vai precisar ficar perto dessa pessoa.\"\n- \"O que ela faz que te dá medo?\"\n- \"Você fez certo em falar comigo.\"",
      "11+": "Para a criança:\n- \"Obrigada por confiar em mim com isso. Vou levar isso a sério.\"\n- \"Pode me contar o que essa pessoa faz que te incomoda ou assusta?\"\n- \"Você não precisa resolver isso sozinha, eu vou cuidar.\"",
    },
  },
  {
    slug: "contou-algo-preocupante",
    title: "A criança contou algo que me preocupou.",
    grupo: "A criança contou ou perguntou algo",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "A criança trouxe a você algo que acendeu um alerta: sobre uma pessoa, um lugar, uma brincadeira, algo que viu, ouviu ou viveu. Nem tudo que preocupa é violência: às vezes é um mal-entendido, uma fantasia ou algo que ela não soube explicar.\n\nAinda assim, o fato de ela ter contado é importante e não deve ser minimizado. Neste momento, o seu papel não é descobrir o que aconteceu, e sim acolher, garantir que ela está segura e buscar orientação." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança:**\n- \"Que bom que você me contou. Você fez a coisa certa.\"\n- \"Você não fez nada de errado.\"\n- \"Eu vou cuidar disso com você. Você não precisa resolver sozinha.\"\n\n**Evite dizer:** \"Tem certeza?\", \"Por que não contou antes?\", \"Isso não pode ter acontecido\"." },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** mantenha a calma, mesmo assustado. Depois, em particular, anote o que a criança disse, com as palavras dela, e quando.\n- **O · Ouvir:** deixe a criança falar no ritmo dela. Não faça perguntas de detalhe, não repita perguntas, não sugira respostas. Escute mais do que pergunte.\n- **Z · Zelar:** assegure que a criança está protegida agora (longe da pessoa ou do contexto que preocupa) e procure orientação de um profissional ou da rede de proteção para os próximos passos." },
      { key: "evite", label: "🚫 EVITE", body: "- Prometer segredo ou pedir que ela \"não conte para mais ninguém\".\n- Interrogar, pressionar por detalhes ou pedir que ela repita a história várias vezes.\n- Confrontar ou avisar a pessoa citada.\n- Reagir com raiva ou pânico na frente da criança: ela pode se calar para proteger você.\n- Duvidar em voz alta ou afirmar que ela entendeu errado." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- A criança está segura neste momento? Há uma pessoa ou situação de que precisa ser afastada já?\n- O que ela contou se repete, aparece em brincadeiras, desenhos, no sono?\n- Houve mudança recente de comportamento, humor ou apetite?\n\nVocê não precisa reunir provas. Precisa observar o suficiente para agir com responsabilidade e levar a informação a quem tem competência para avaliar." },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Sempre que o que a criança contou envolver possível violência, ameaça, contato de teor sexual, agressão, ou deixar você em dúvida sobre a segurança dela: procure orientação profissional ou da rede de proteção. Não é preciso ter certeza.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "A forma como o adulto recebe a primeira vez que a criança conta algo difícil determina se haverá uma segunda vez. Acolhimento sem susto, sem interrogatório e sem promessa de segredo é o que mantém o canal aberto. A investigação é de profissionais; o acolhimento e o encaminhamento são do adulto próximo." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Garanta que a criança não fique exposta à pessoa ou ao contexto que preocupa e procure hoje um profissional ou serviço da rede para orientar os próximos passos." },
    ],
    variacaoPorIdade: {
      "0-6": "Para a criança:\n- \"Você fez muito bem em me contar.\"\n- \"Isso não foi culpa sua.\"\n- \"Eu vou cuidar de você.\"",
      "7-10": "Para a criança:\n- \"Você fez a coisa certa em me contar.\"\n- \"Isso não é culpa sua, nem um pouco.\"\n- \"Eu vou cuidar disso, você não precisa se preocupar sozinha.\"",
      "11+": "Para a criança ou adolescente:\n- \"Obrigada por confiar em mim com isso. Você fez a coisa certa.\"\n- \"Nada disso é culpa sua.\"\n- \"Vamos resolver isso juntos, você não está sozinha nessa.\"",
    },
  },
  {
    slug: "pediu-para-nao-contar",
    title: "A criança pediu para eu não contar algo.",
    grupo: "A criança contou ou perguntou algo",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Um pedido de segredo pode ser inofensivo (uma surpresa, uma travessura) ou pode ser a forma como a criança testa se é seguro falar. Crianças em situação de violência muitas vezes são orientadas ou ameaçadas a \"não contar\".\n\nPor isso, um pedido de sigilo sobre algo que mexe com o bem-estar da criança merece atenção, sem dramatizar, mas sem ignorar." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança:**\n- \"Eu guardo segredo de surpresa e de brincadeira. Mas, se for algo que te machuca ou te deixa com medo, eu preciso cuidar disso, e vou fazer isso com cuidado.\"\n- \"Você fez bem em me contar. Você não vai se meter em encrenca por isso.\"\n- \"Ninguém pode pedir para você esconder uma coisa que te faz mal.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** perceba a diferença entre \"segredo de surpresa\" (tem hora para acabar, não machuca ninguém) e \"segredo que pesa\" (envolve medo, culpa, um adulto pedindo silêncio).\n- **O · Ouvir:** acolha o que ela quiser dizer, sem forçar. Não negocie (\"me conta que eu prometo não fazer nada\").\n- **Z · Zelar:** diga, com calma, que você não pode prometer segredo sobre algo que a prejudica, e que vai buscar ajuda para cuidar disso. Procure orientação." },
      { key: "evite", label: "🚫 EVITE", body: "- Prometer segredo para \"ganhar a confiança\" e conseguir que ela conte.\n- Usar culpa ou chantagem (\"se você me ama, você conta\").\n- Interrogar ou insistir se ela travar.\n- Tratar como assunto encerrado só porque ela pediu sigilo." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- O pedido de segredo veio acompanhado de medo, choro, vergonha?\n- Alguém, em especial um adulto ou adolescente mais velho, pediu que ela guardasse algo?\n- Há mudança de comportamento associada?\n\n\"Não conta para a mamãe que eu te dei doce\" é diferente de \"não conta o que aconteceu quando a gente ficou sozinho\"." },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Se o segredo envolver um adulto pedindo silêncio, ameaça, medo, contato físico ou de teor sexual, ou qualquer coisa que afete a segurança da criança: procure orientação profissional ou da rede de proteção.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Quando a criança aprende que existem segredos que ela nunca é obrigada a guardar, e que contar não traz punição, ela fica menos vulnerável a quem usa o sigilo como ferramenta. Cabe ao adulto sustentar essa regra, não à criança decidir sozinha o que pode contar." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Ensine à criança, com um exemplo concreto, a diferença entre \"segredo de surpresa\" e \"segredo que machuca\", e diga que o segundo tipo ela pode sempre te contar." },
    ],
    variacaoPorIdade: {
      "0-6": "Para a criança:\n- \"Eu guardo segredo de festa surpresa. Mas coisa que te machuca ou assusta, eu preciso saber.\"\n- \"Você não vai ficar de castigo por me contar.\"\n- \"Ninguém pode pedir para você esconder de mim o que te faz mal.\"",
      "7-10": "Para a criança:\n- \"Segredo de surpresa eu guardo. Mas se for algo que te machuca ou te dá medo, eu preciso cuidar disso.\"\n- \"Você fez bem em me contar. Você não vai se meter em problema nenhum.\"\n- \"Ninguém pode pedir para você esconder de mim o que te deixa desconfortável.\"",
      "11+": "Para a criança ou adolescente:\n- \"Eu respeito surpresa e privacidade. Mas segredo que envolve algo que te machuca, ameaça ou assusta, eu preciso saber.\"\n- \"Contar não te coloca em problema nenhum, pelo contrário.\"\n- \"Ninguém tem o direito de te pedir sigilo sobre algo que te faz mal, nem alguém de confiança.\"",
    },
  },
  {
    slug: "nao-quer-ir-a-lugar",
    title: "A criança não quer ir a determinado lugar.",
    grupo: "A criança recuou de alguém ou de um lugar",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "A recusa em ir a um lugar (a casa de um parente, a escola, uma atividade, um espaço religioso) pode ter causas muito variadas: tédio, cansaço, conflito com um colega, medo de errar, excesso de estímulo, saudade de casa ou desconforto com alguém que está lá.\n\nNa maioria das vezes não se trata de algo grave. Ainda assim, a recusa é uma informação, e vale compreender o que está por trás antes de simplesmente insistir." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança:**\n- \"Você não quer ir a esse lugar. Me conta o que acontece lá que você não gosta?\"\n- \"Tem alguém aí que deixa você desconfortável?\"\n- \"Podemos pensar juntos em como resolver isso.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** observe se a recusa é nova ou antiga, se é para um lugar só ou para vários, e o que mudou por volta do início dela.\n- **O · Ouvir:** pergunte de forma aberta o que a incomoda, sem sugerir a resposta. Aceite \"não sei\" como resposta possível.\n- **Z · Zelar:** leve a recusa a sério. Se não for possível compreender de imediato, evite obrigar; ajuste a ida (acompanhar, encurtar, adiar) enquanto conversa." },
      { key: "evite", label: "🚫 EVITE", body: "- Usar culpa ou chantagem (\"todo mundo vai achar você chata\", \"então você não ganha o passeio\").\n- Forçar a ida sem nenhuma conversa.\n- Concluir de imediato que há algo grave, ou que \"é só manha\".\n- Perguntar o motivo na frente de outras pessoas." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- A recusa é para um lugar específico ou generalizada?\n- Começou depois de algum episódio ou mudança?\n- Vem acompanhada de choro, dor de barriga, alteração no sono, ou de evitar uma pessoa que está nesse lugar?\n\nNão querer ir a um lugar é comum. A recusa firme, repentina, ligada a uma pessoa ou acompanhada de sintomas físicos e mudança de comportamento merece atenção e conversa com um profissional." },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Procure orientação (psicólogo, escola, pediatra, rede de proteção) se a recusa for intensa, persistente, surgir de repente sem explicação, ou estiver ligada a uma pessoa específica.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Quando a criança percebe que a recusa dela abre uma conversa, em vez de uma punição, ela aprende que pode sinalizar desconforto e ser levada a sério. Cabe ao adulto investigar o contexto e decidir; não à criança resolver sozinha." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Antes da próxima ida, reserve um momento a sós com a criança para perguntar, sem pressa, o que torna aquele lugar difícil para ela." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Você não quer ir lá? Me conta por quê?\"\n- \"Tem alguém lá que você não gosta?\"\n- \"A gente vai pensar num jeito.\"",
      "7-10": "- \"Você não quer ir a esse lugar. Pode me contar o que não gosta lá?\"\n- \"Tem alguém lá que te deixa desconfortável?\"\n- \"Vamos pensar juntos em como resolver.\"",
      "11+": "- \"Percebi que você não quer ir. O que está pesando nessa ida?\"\n- \"Tem alguém ou alguma situação lá que te incomoda?\"\n- \"Podemos ajustar o plano juntos, você não precisa ir se algo estiver errado.\"",
    },
  },
  {
    slug: "viu-algo-inadequado",
    title: "A criança viu algo inadequado na internet.",
    grupo: "Aconteceu no ambiente digital",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "A internet expõe crianças a conteúdos não feitos para elas: cenas de violência, sustos, sexualidade, discurso de ódio ou material perturbador que aparece sem que a criança tenha procurado. Isso pode acontecer em vídeos, jogos, redes sociais ou anúncios.\n\nNa maioria das vezes, é exposição acidental, mas o efeito sobre a criança (medo, confusão, comportamento novo) merece atenção, independentemente de como aconteceu." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "- \"O que você viu? Pode me contar, eu não vou brigar.\"\n- \"Isso não era para você ver. Não é culpa sua.\"\n- \"Como isso apareceu? Você estava procurando, ou apareceu sozinho?\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** identifique o tipo de conteúdo, o aplicativo ou site, e se foi um episódio único ou repetido.\n- **O · Ouvir:** pergunte como ela se sentiu e o que entendeu, sem pedir para descrever o conteúdo em detalhes.\n- **Z · Zelar:** ajuste as configurações de segurança e supervisão do dispositivo, e converse sobre o que fazer quando algo assim aparecer de novo." },
      { key: "evite", label: "🚫 EVITE", body: "- Culpar a criança ou proibir o uso de telas como punição.\n- Reagir com pânico diante dela.\n- Minimizar (\"não foi nada\") sem entender o que ela viu.\n- Deixar de revisar as configurações do aparelho." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- O acesso foi acidental (anúncio, vídeo sugerido) ou por busca ativa?\n- Isso se repete no mesmo aplicativo ou dispositivo?\n- A criança demonstrou medo, dificuldade para dormir, ou passou a repetir o que viu?" },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Procure orientação de um profissional se a criança ficou muito afetada ou se o acesso a conteúdo inadequado se repete apesar dos ajustes.\n\nSe o conteúdo envolveu abuso sexual infantil ou foi enviado por alguém com intenção de aliciar a criança, ou se houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Supervisionar o ambiente digital é responsabilidade do adulto, assim como cuidar de qualquer outro espaço que a criança frequenta. Quando o adulto reage com calma e ajusta o ambiente, a criança aprende que pode contar o que vê on-line sem medo de punição." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Revise hoje as configurações de segurança e supervisão dos aplicativos e dispositivos que a criança usa." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"O que você viu na tela? Pode me contar, eu não vou ficar bravo.\"\n- \"Isso não era para criança ver. Você não fez nada errado.\"\n- \"Apareceu sozinho, ou alguém mostrou?\"",
      "7-10": "- \"O que você viu? Pode me contar, eu não vou brigar.\"\n- \"Isso não era para você ver. Não é culpa sua.\"\n- \"Como isso apareceu? Você estava procurando ou apareceu sozinho?\"",
      "11+": "- \"Quero entender o que você viu, pode me contar sem medo de bronca.\"\n- \"Esse tipo de conteúdo não é feito para sua idade. Isso não é culpa sua.\"\n- \"Como você chegou nisso? Apareceu sozinho, alguém mandou, ou você procurou por curiosidade? Todas as respostas estão certas.\"",
    },
  },
  {
    slug: "perguntou-partes-intimas",
    title: "A criança perguntou sobre partes íntimas.",
    grupo: "A criança contou ou perguntou algo",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Perguntas sobre o corpo, partes íntimas, diferenças entre meninos e meninas ou de onde vêm os bebês fazem parte do desenvolvimento e da curiosidade saudável. Na maioria das vezes, a pergunta é só isso: curiosidade.\n\nResponder com naturalidade, usando nomes corretos e informação adequada à idade, é parte da educação protetiva, e abre caminho para que a criança fale também quando algo estiver errado." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança:**\n- Responda de forma simples, verdadeira e adequada à idade, usando os nomes corretos das partes do corpo.\n- \"Essa é uma boa pergunta. Você pode me perguntar essas coisas sempre.\"\n- \"Essas partes são íntimas: ninguém deve tocar, pedir para ver ou mostrar para você, só um cuidado de saúde ou higiene, com a sua permissão.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** observe o contexto da pergunta: é curiosidade espontânea, ou veio junto de um comentário, de uma cena específica, de algo que ela viu?\n- **O · Ouvir:** pergunte, com tranquilidade, o que a fez pensar nisso (\"O que te deixou curiosa sobre isso?\"). Sem interrogar.\n- **Z · Zelar:** responda à pergunta e aproveite para reforçar as noções de privacidade, consentimento e a quem pedir ajuda." },
      { key: "evite", label: "🚫 EVITE", body: "- Repreender, envergonhar ou desconversar (\"isso não se pergunta\", \"você é nova demais para isso\").\n- Responder com mais informação do que a idade pede.\n- Ignorar a pergunta e não retomar depois.\n- Assumir automaticamente que a pergunta indica que algo aconteceu." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- A pergunta veio com vocabulário ou detalhes incompatíveis com a idade?\n- Veio acompanhada de comportamento sexualizado, ansiedade, ou de menção a uma pessoa específica?\n- A criança repetiu a pergunta de forma insistente ou aflita?\n\nCuriosidade é esperada. Conhecimento sexual específico demais para a idade, com carga de angústia, é um sinal a observar e levar a um profissional." },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Procure orientação de um psicólogo ou pediatra se a pergunta vier acompanhada de conhecimento sexual inadequado para a idade, comportamento sexualizado, angústia, ou referência a algo que alguém fez.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Uma criança que pode perguntar sobre o próprio corpo sem ser repreendida aprende que esse assunto não é proibido, e é essa abertura que permite que ela conte se alguém ultrapassar um limite. Informar sobre o corpo é responsabilidade do adulto, não exposição da criança." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Responda à pergunta com naturalidade e nomes corretos, e combine com a criança a quem ela pode recorrer se alguém mexer com as partes íntimas dela." },
    ],
    variacaoPorIdade: {
      "0-6": "- Responda com nomes simples e corretos, sem enrolação.\n- \"Boa pergunta! Você pode me perguntar isso sempre que quiser.\"\n- \"Essas partes são só suas. Ninguém deve tocar nelas, só quem cuida de você no banho ou no médico, com você sabendo.\"",
      "7-10": "- Responda com clareza, usando os nomes corretos das partes do corpo.\n- \"Essa é uma boa pergunta. Pode me perguntar sempre.\"\n- \"Essas partes são íntimas: ninguém deve tocar ou pedir para ver, exceto num cuidado de saúde, com sua permissão.\"",
      "11+": "- Responda com informação real e direta, sem constrangimento.\n- \"Você pode me perguntar qualquer coisa sobre isso, sem vergonha.\"\n- \"Seu corpo é seu. Ninguém, nem um adulto de confiança, tem o direito de tocar ou pedir para ver suas partes íntimas fora de um cuidado de saúde necessário e com seu consentimento.\"",
    },
  },
  {
    slug: "alguem-ultrapassou-limite",
    title: "A criança contou que alguém ultrapassou seu limite.",
    grupo: "A criança contou ou perguntou algo",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "A criança relatou que alguém fez algo que a incomodou, assustou ou machucou: pode ter sido um toque, uma brincadeira invasiva, uma exposição, uma fala, uma pressão. \"Ultrapassar o limite\" abrange desde um contato inadequado até uma situação de violência.\n\nIndependentemente da gravidade aparente, uma criança que conta precisa ser levada a sério, acolhida e protegida. Avaliar o que exatamente aconteceu é tarefa de profissionais." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança:**\n- \"Você fez muito bem em me contar. Isso não foi culpa sua.\"\n- \"Ninguém tem o direito de fazer isso com você.\"\n- \"Eu vou procurar ajuda para cuidar disso. Você não vai ficar sozinha com essa pessoa.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** mantenha a calma. Depois, em particular, registre o que a criança disse, com as palavras dela, e a data.\n- **O · Ouvir:** deixe a criança contar o que quiser, uma vez. Não peça detalhes, não repita perguntas, não peça que ela mostre ou reencene.\n- **Z · Zelar:** afaste imediatamente a criança do contato com a pessoa citada e procure sem demora orientação da rede de proteção ou de um profissional. Não resolva sozinho." },
      { key: "evite", label: "🚫 EVITE", body: "- Prometer segredo.\n- Interrogar, confrontar a pessoa citada ou avisá-la.\n- Culpar a criança (\"por que você foi lá?\", \"por que não falou na hora?\").\n- Reagir com pânico ou raiva visível: a criança pode recuar para proteger você.\n- Adiar a busca de ajuda para \"ter mais certeza\"." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- A criança está segura agora? A pessoa tem acesso a ela?\n- Há sinais físicos, mudança abrupta de comportamento, medo, regressões?\n- O relato se repete de forma consistente?\n\nSeu papel é observar o necessário para proteger e encaminhar, não conduzir uma investigação." },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Sempre. Um relato de que alguém ultrapassou o limite da criança justifica procurar a rede de proteção ou um profissional.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, como contato de teor sexual, agressão ou ameaça, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Quando a criança vê que contar levou o adulto a agir (protegendo, acreditando, buscando ajuda), ela aprende que vale a pena falar. Quando o adulto minimiza ou hesita, ensina o contrário. A responsabilidade de agir é inteiramente do adulto." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Assegure que a criança não terá contato com a pessoa citada e procure hoje o serviço da rede de proteção ou um profissional para orientar os próximos passos." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Você fez muito bem em me contar. Isso não foi culpa sua.\"\n- \"Ninguém pode fazer isso com você.\"\n- \"Eu vou cuidar disso. Você não vai ficar perto dessa pessoa.\"",
      "7-10": "- \"Você fez muito bem em me contar. Isso não foi culpa sua.\"\n- \"Ninguém tem o direito de fazer isso com você.\"\n- \"Eu vou cuidar disso. Você não vai ficar sozinha com essa pessoa.\"",
      "11+": "- \"Você fez a coisa certa em me contar. Isso não é culpa sua, de forma alguma.\"\n- \"Ninguém tem o direito de ultrapassar seus limites, seja quem for.\"\n- \"Vou buscar ajuda para resolver isso. Você não vai ficar exposta a essa pessoa.\"",
    },
  },
  {
    slug: "adulto-pediu-segredo",
    title: "Um adulto pediu para a criança guardar um segredo.",
    grupo: "Algo me chamou atenção no comportamento de um adulto",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Um adulto pedir que a criança guarde segredo pode ser algo inofensivo, como uma surpresa de aniversário ou um presente. Mas pedir sigilo a uma criança também é uma tática comum usada por quem quer manter uma situação de violência escondida.\n\nA diferença central: o segredo tem prazo para acabar e não beneficia só quem pediu, ou é indefinido e vem acompanhado de instrução para esconder especificamente de você?" },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança:**\n- \"Que segredo é esse? Pode me contar, eu também gosto de surpresa.\" (tom leve, para segredos comuns)\n- \"Ninguém deve pedir para você esconder de mim algo que te deixa desconfortável ou com medo.\"\n- \"Você não vai se meter em problema nenhum se me contar.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** identifique quem pediu o segredo, o contexto (uma festa, uma brincadeira, uma situação a sós) e como a criança reagiu ao contar.\n- **O · Ouvir:** pergunte sobre o segredo com naturalidade, sem alarme na voz; isso facilita que a criança conte.\n- **Z · Zelar:** avalie o conteúdo do segredo antes de decidir os próximos passos. Se envolver contato físico, estar a sós, ou instrução para esconder de você, procure orientação imediatamente." },
      { key: "evite", label: "🚫 EVITE", body: "- Repreender a criança por ter um segredo.\n- Confrontar diretamente o adulto que pediu o segredo antes de entender a situação.\n- Prometer que \"não vai fazer nada\" apenas para ela contar.\n- Descartar o pedido de segredo só porque a pessoa é próxima ou de confiança da família." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- O segredo é sobre um presente ou uma surpresa, ou sobre algo que aconteceu quando estavam a sós?\n- A criança ficou ansiosa, com medo, ou aliviada ao contar?\n- Essa pessoa costuma buscar momentos a sós com a criança?" },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Se o segredo envolver contato físico, situação a sós, ameaça, ou qualquer instrução para esconder algo especificamente de você, procure ajuda imediatamente e acione a rede de proteção.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Ensinar à criança que existe um tipo de segredo que nenhum adulto deveria pedir para ela guardar é uma das proteções mais diretas contra o aliciamento. Cabe ao adulto próximo sustentar essa regra com firmeza, mesmo quando quem pediu o segredo é alguém querido pela família." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Converse com a criança sobre a diferença entre segredo de surpresa e segredo que nenhum adulto deveria pedir, usando o que ela contou como exemplo." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Que segredo é esse? Você pode me contar.\"\n- \"Ninguém pode pedir para você esconder de mim o que te assusta.\"\n- \"Você não vai ficar de castigo por me contar.\"",
      "7-10": "- \"Que segredo é esse? Pode me contar, eu também gosto de surpresa.\"\n- \"Ninguém deve pedir para você esconder de mim algo que te deixa desconfortável.\"\n- \"Você não vai se meter em problema nenhum se me contar.\"",
      "11+": "- \"Pode me contar sobre esse segredo, sem julgamento.\"\n- \"Nenhum adulto tem o direito de te pedir para esconder de mim algo que te incomoda ou assusta.\"\n- \"Contar não vai te trazer problema nenhum, mesmo que pareça complicado.\"",
    },
  },
  {
    slug: "desconforto-perto-de-pessoa",
    title: "A criança parece desconfortável perto de determinada pessoa.",
    grupo: "A criança recuou de alguém ou de um lugar",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Aqui a informação parte da sua observação, não de algo que a criança disse. Desconforto perto de uma pessoa específica (ficar em silêncio, retrair-se, procurar você, mudar de humor, tentar sair da sala) pode ter explicações diversas: pouca convivência, o jeito da pessoa, uma bronca recente ou um desconforto mais sério.\n\nUm episódio isolado não define nada. Um padrão que se repete merece a sua atenção." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança (em outro momento, a sós, sem apontar a pessoa):**\n- \"Notei que você fica mais quieta quando fulano está por perto. Quer me contar como se sente com ele?\"\n- \"Você pode falar comigo sobre qualquer pessoa, mesmo alguém que a gente conhece bem.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** observe em que situações o desconforto aparece, com que frequência, e o que costuma acontecer antes e depois. Diferencie o que você viu do que você supõe.\n- **O · Ouvir:** crie uma oportunidade tranquila de conversa, longe da pessoa. Faça perguntas abertas, uma vez. Não induza, não repita, não pressione.\n- **Z · Zelar:** enquanto observa, evite deixar a criança sozinha com essa pessoa. Não é acusação, é cautela enquanto você compreende melhor." },
      { key: "evite", label: "🚫 EVITE", body: "- Confrontar ou acusar a pessoa com base na sua impressão.\n- Interrogar a criança, repetir perguntas ou insistir para ela \"confirmar\" algo.\n- Comentar suas suspeitas na frente da criança ou de terceiros.\n- Ignorar o padrão por receio de \"criar caso\" na família." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- O desconforto é só com essa pessoa?\n- Aumenta em situações específicas (quando ficam a sós, na hora de dormir, no banho)?\n- Vem acompanhado de regressões, medos novos, alterações de sono e humor, ou de falas sobre o corpo?\n\nDesconforto pontual não prova nada. Um padrão consistente, ligado a uma pessoa e a certas situações, é motivo para buscar orientação profissional, não para investigar por conta própria." },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Procure orientação de um psicólogo ou da rede de proteção se o desconforto for consistente, ligado a uma pessoa e a situações específicas, ou acompanhado de outras mudanças de comportamento.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção.\n\nNão espere ter certeza." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Levar a sério o que você observa, mesmo sem a criança ter dito nada, e ajustar a rotina para protegê-la é responsabilidade do adulto. A criança não precisa \"provar\" o desconforto para ser protegida." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Reorganize a rotina para que a criança não fique sozinha com essa pessoa e defina para si um período de observação atenta, anotando o que perceber." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Notei que você fica quietinha perto dele(a). Como você se sente?\"\n- \"Você pode me contar qualquer coisa, mesmo sobre gente que a gente conhece.\"",
      "7-10": "- \"Notei que você fica mais quieta perto dele(a). Quer me contar como se sente?\"\n- \"Você pode falar comigo sobre qualquer pessoa, mesmo alguém próximo da família.\"",
      "11+": "- \"Percebi uma mudança em você perto dele(a). Como você se sente nessa companhia?\"\n- \"Pode falar comigo sobre qualquer pessoa, mesmo que seja alguém importante para a família: isso não muda nada entre nós.\"",
    },
  },
  {
    slug: "mensagens-preocupantes",
    title: "A criança está recebendo mensagens de alguém e algo me preocupa.",
    grupo: "Aconteceu no ambiente digital",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Mensagens de colegas, familiares ou conhecidos fazem parte da vida digital da criança. O que preocupa é o conteúdo, o tom ou quem está mandando: pedidos de segredo, elogios excessivos, pedidos de fotos, insistência para conversar em particular, ou uma diferença grande de idade entre quem manda e a criança são sinais de alerta, especialmente quando aparecem combinados." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "- \"Percebi que você tem conversado bastante com [pessoa]. Como você conhece essa pessoa?\"\n- \"Posso ver as mensagens com você? Não é para te vigiar, é para te ajudar a entender se está tudo bem.\"\n- \"Se alguém te pedir para manter segredo ou te deixar desconfortável, você pode me mostrar sempre.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** observe o conteúdo das mensagens com a criança, notando pedidos de sigilo, fotos, encontros ou linguagem sexualizada.\n- **O · Ouvir:** pergunte como a criança conhece essa pessoa e como se sente na conversa, sem julgá-la pelo que já respondeu.\n- **Z · Zelar:** interrompa o contato se houver qualquer sinal de risco, preserve as mensagens como registro e procure orientação ou a rede de proteção." },
      { key: "evite", label: "🚫 EVITE", body: "- Revistar o celular às escondidas, sem conversar com a criança depois.\n- Culpar a criança por ter conversado com a pessoa.\n- Confrontar diretamente quem está mandando as mensagens antes de buscar orientação.\n- Apagar as mensagens antes de registrar ou mostrar a um profissional." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- Quem é essa pessoa? Há grande diferença de idade ou ela é desconhecida da família?\n- As mensagens pedem segredo, fotos, encontro presencial, ou têm conteúdo sexual?\n- A criança ficou na defensiva, escondeu o celular, ou mudou de comportamento?" },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Se houver pedido de fotos íntimas, de segredo, de encontro presencial, ou linguagem sexual vinda de um adulto ou desconhecido, procure ajuda imediatamente e acione a rede de proteção: isso pode configurar aliciamento.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Acompanhar a vida digital da criança com diálogo, não com vigilância às escondidas, ensina que o ambiente on-line também é um lugar onde ela pode contar o que a incomoda. A responsabilidade de identificar o risco é do adulto." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Converse com a criança hoje sobre quem é essa pessoa e peça para ver as mensagens juntos." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Quem é essa pessoa que manda mensagem para você?\"\n- \"Posso ver junto com você? Só para te ajudar.\"\n- \"Se alguém pedir segredo ou te incomodar, me mostra sempre.\"",
      "7-10": "- \"Notei que você tem conversado com essa pessoa. Como você a conhece?\"\n- \"Posso ver as mensagens com você? Não é para te vigiar, é para te ajudar.\"\n- \"Se alguém pedir segredo ou te deixar desconfortável, pode me mostrar sempre.\"",
      "11+": "- \"Percebi que você tem trocado bastante mensagem com essa pessoa. Como se conheceram?\"\n- \"Posso ver a conversa junto com você? Não é fiscalização, é cuidado, você decide o quanto mostra.\"\n- \"Se alguém pedir sigilo, insistir ou te deixar desconfortável, pode contar comigo sem julgamento.\"",
    },
  },
  {
    slug: "pressao-para-fazer-algo",
    title: "A criança está sendo pressionada a fazer algo que não quer.",
    grupo: "A criança está sob pressão",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Pressão para fazer algo que não quer pode vir de colegas, irmãos ou adultos, e envolver desde uma brincadeira de que ela não gosta até uma situação mais séria. \"Pressão\" costuma incluir insistência, chantagem emocional, ameaça de exclusão ou promessas: sinais de que a vontade da criança está sendo ignorada." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "- \"Você não é obrigada a fazer nada que não quer, mesmo que insistam.\"\n- \"Quem está te pedindo isso? O que eles dizem quando você fala não?\"\n- \"Vamos pensar juntos em como você pode dizer não da próxima vez.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** identifique quem está pressionando, o que está sendo pedido, e há quanto tempo isso acontece.\n- **O · Ouvir:** dê espaço para a criança contar como a pressão acontece e como ela se sente, sem minimizar.\n- **Z · Zelar:** apoie a recusa da criança, intervenha diretamente se necessário (conversando com a outra criança, a família ou a escola) e avalie a gravidade do que está sendo pedido." },
      { key: "evite", label: "🚫 EVITE", body: "- Dizer que ela deveria \"aprender a lidar sozinha\" ou \"não ser tão sensível\".\n- Minimizar por ser \"coisa de criança\" sem avaliar o conteúdo da pressão.\n- Expor a criança forçando um confronto direto com quem pressiona.\n- Ignorar se a pressão envolver contato físico ou conteúdo sexual." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- O que está sendo pedido é apropriado para a idade, ou envolve contato físico, exposição, ou algo que fere um limite dela?\n- Quem pressiona tem alguma forma de poder sobre a criança (idade maior, posição, ameaça)?\n- A criança demonstra medo de recusar, ou já cedeu antes?" },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Procure orientação se a pressão for persistente, envolver ameaça, ou vier de alguém com poder sobre a criança.\n\nSe envolver contato físico, conteúdo sexual, ou qualquer forma de coerção mais grave, ou se houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Quando o adulto apoia a recusa da criança e intervém na relação de pressão, ela aprende que dizer não tem respaldo, e que não precisa ceder para manter um vínculo ou evitar conflito." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Converse com a criança sobre quem está pressionando e o que exatamente está sendo pedido, e decida com ela um próximo passo, inclusive conversar com a outra parte, se necessário." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Você não precisa fazer o que não quer, mesmo se alguém pedir muito.\"\n- \"Quem te pediu isso? O que ele fala quando você diz não?\"\n- \"Vamos pensar num jeito de você dizer não.\"",
      "7-10": "- \"Você não é obrigada a fazer nada que não quer, mesmo que insistam.\"\n- \"Quem está te pedindo isso? O que dizem quando você recusa?\"\n- \"Vamos pensar juntos em como dizer não da próxima vez.\"",
      "11+": "- \"Ninguém tem o direito de te pressionar a fazer algo que você não quer.\"\n- \"Quem está insistindo, e como reage quando você recusa?\"\n- \"Vamos pensar em formas de você recusar com firmeza, sem se sentir culpada.\"",
    },
  },
  {
    slug: "nao-quer-ficar-sozinha-com-alguem",
    title: "A criança não quer mais ficar sozinha com uma pessoa específica.",
    grupo: "A criança recuou de alguém ou de um lugar",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Duas coisas chamam a atenção nesta situação: houve uma **mudança** (\"não quer mais\") e ela é **dirigida a uma pessoa** e ao momento de ficar a sós.\n\nIsso não confirma que algo aconteceu: pode haver outras explicações, como um susto, uma bronca ou uma brincadeira que assustou. Mas é uma recusa que deve ser respeitada de imediato e compreendida com calma, porque ficar a sós com alguém é justamente a situação em que a proteção do adulto faz mais falta." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança:**\n- \"Você não precisa ficar sozinha com essa pessoa. A partir de agora, eu cuido disso.\"\n- \"Obrigada por me deixar saber. Quer me contar o que mudou?\"\n- \"Aconteceu alguma coisa quando vocês ficaram sozinhos?\" (uma pergunta aberta, sem insistir)" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** registre desde quando mudou, com quais palavras ou atitudes a criança demonstrou isso, e o que aconteceu por volta dessa mudança.\n- **O · Ouvir:** dê espaço, no ritmo da criança. No máximo uma ou duas perguntas abertas. Não repita, não sugira o que pode ter sido, não pressione, não prometa segredo.\n- **Z · Zelar:** atenda à recusa imediatamente, não deixe a criança a sós com essa pessoa. Procure orientação profissional ou da rede antes de decidir os próximos passos." },
      { key: "evite", label: "🚫 EVITE", body: "- Obrigar a criança a ficar com a pessoa \"para não fazer feio\".\n- Confrontar a pessoa ou avisá-la de que a criança \"está estranha com ela\".\n- Interrogar, repetir perguntas ou pedir que a criança conte de novo para outra pessoa.\n- Prometer que \"fica entre nós\"." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- A mudança foi repentina? Coincide com algum evento, viagem ou período de convivência?\n- Aparecem também medo, choro ao mencionar a pessoa, pesadelos, regressões, alterações de sono e apetite, ou falas e brincadeiras sobre o corpo?\n- A criança evita apenas ficar a sós, ou também a presença da pessoa em geral?\n\nUma recusa nova, dirigida a uma pessoa e ao momento de ficar a sós, é um sinal que merece orientação profissional, mesmo sem nenhuma outra evidência." },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Recomenda-se procurar orientação de um psicólogo ou da rede de proteção sempre que houver essa combinação (mudança recente, recusa dirigida a uma pessoa e situação de ficar a sós), ainda que a criança não tenha relatado nada.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Quando a criança percebe que basta sinalizar \"não quero mais\" para o adulto agir, sem cobrança de explicação, ela aprende que tem controle sobre o próprio corpo e sobre com quem fica. Essa experiência a torna mais capaz de recusar e de contar." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Assegure à criança, com palavras simples, que ela não vai mais ficar sozinha com essa pessoa, e cumpra isso já no próximo encontro, enquanto você busca orientação." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Você não vai ficar sozinha com ele(a). Eu cuido disso.\"\n- \"Obrigada por me contar. Mudou alguma coisa?\"\n- \"Aconteceu alguma coisa quando vocês ficaram juntos?\" (com calma, sem insistir)",
      "7-10": "- \"Você não precisa ficar sozinha com essa pessoa. A partir de agora, eu cuido disso.\"\n- \"Obrigada por me contar. Quer falar sobre o que mudou?\"\n- \"Aconteceu alguma coisa quando vocês ficaram sozinhos?\"",
      "11+": "- \"Sua recusa já basta, você não vai ficar sozinha com essa pessoa, sem precisar explicar tudo.\"\n- \"Obrigada por confiar isso a mim. Se quiser, pode me contar o que motivou essa mudança.\"\n- \"Se algo aconteceu quando estavam sozinhos, pode me contar no seu tempo, eu vou te apoiar.\"",
    },
  },
  {
    slug: "adulto-insiste-contato-fisico",
    title: "Um adulto insiste em contato físico (cócegas, colo, beijo) mesmo a criança demonstrando que não quer.",
    grupo: "Algo me chamou atenção no comportamento de um adulto",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Um adulto que continua com cócegas, colo, beijos ou outro contato físico mesmo depois de a criança pedir para parar, se afastar ou demonstrar desconforto está desrespeitando um limite dela, independentemente da intenção.\n\nMuitas vezes isso é tratado como \"brincadeira\" ou \"jeito de amar\", mas o efeito sobre a criança é o mesmo: ela aprende que o próprio \"não\" pode ser ignorado." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a pessoa:** \"Ela pediu para parar. Vamos respeitar quando ela diz não.\"\n\n**Para a criança:** \"Você tem o direito de pedir para parar, e eu vou te apoiar nisso.\"\n\n**Se for preciso repetir:** \"Aqui, quando uma criança diz 'para', a gente para, mesmo brincando.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** observe se é um episódio isolado (a pessoa para ao perceber) ou um padrão de insistência mesmo diante da recusa.\n- **O · Ouvir:** pergunte à criança, depois, como ela se sentiu, sem induzir a resposta.\n- **Z · Zelar:** intervenha na hora, interrompendo o contato, e converse com o adulto sobre respeitar o limite da criança daqui para frente." },
      { key: "evite", label: "🚫 EVITE", body: "- Tratar a insistência como brincadeira inofensiva ou \"jeito da pessoa\".\n- Constranger a criança por reclamar (\"para de frescura\", \"é só brincadeira\").\n- Deixar para conversar \"depois\" e não intervir no momento.\n- Justificar a insistência pelo vínculo ou proximidade da pessoa com a família." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- A pessoa muda o comportamento quando você intervém, ou insiste mesmo assim?\n- Isso já aconteceu mais de uma vez, com essa ou outras crianças?\n- A criança passou a evitar essa pessoa ou situações que envolvem contato físico com ela?" },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Se a insistência for repetida mesmo após você intervir, se a pessoa buscar contato físico a sós com a criança, ou se a criança demonstrar medo crescente dessa pessoa, procure orientação profissional ou da rede de proteção.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Intervir na hora, mesmo com alguém querido pela família, ensina à criança que o limite dela vale mais do que o incômodo social de interromper a situação. É esse tipo de intervenção pequena e constante que constrói a confiança de que o adulto está atento e vai agir." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Da próxima vez que presenciar essa situação, intervenha imediatamente e converse com a pessoa, a sós, sobre respeitar quando a criança diz não." },
    ],
    variacaoPorIdade: {
      "0-6": "Para a pessoa: \"Ela não quer mais. Vamos parar.\"\nPara a criança: \"Você pode falar 'para' sempre que não gostar, e eu vou te ajudar.\"",
      "7-10": "Para a pessoa: \"Ela pediu para parar. Vamos respeitar.\"\nPara a criança: \"Você tem o direito de pedir para parar, e eu vou te apoiar.\"",
      "11+": "Para a pessoa: \"Ela disse que não quer. Isso precisa ser respeitado, sem exceção.\"\nPara a criança: \"Seu limite vale, mesmo com adultos ou pessoas queridas da família. Eu vou te apoiar sempre que você marcar esse limite.\"",
    },
  },
  {
    slug: "fala-ou-brincadeira-sexual",
    title: "A criança repetiu uma fala, brincadeira ou desenho de conteúdo sexual.",
    grupo: "A criança contou ou perguntou algo",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Comportamentos com conteúdo sexual em crianças têm várias explicações possíveis: curiosidade, imitação de algo que viram (na televisão, na internet, entre adultos), exploração comum do próprio corpo, ou, em parte dos casos, contato com material ou situações inadequadas.\n\nUm episódio isolado, sem carga de angústia, não significa violência. O que orienta a leitura é a idade, a frequência, o conteúdo e o contexto." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança, sem repreender:**\n- \"Onde você viu ou aprendeu isso?\" (uma pergunta, com tranquilidade)\n- \"Tem coisas que são de adulto e não são para criança. Se alguém te mostrou, você pode me contar.\"\n- \"Você não está de castigo por causa disso.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** observe o que exatamente aconteceu (a fala, o desenho, a brincadeira), com que frequência, em que situações, e se há aflição associada. Diferencie curiosidade de repetição insistente.\n- **O · Ouvir:** pergunte, uma vez, de onde veio, de forma acolhedora. Não interrogue nem peça para repetir ou demonstrar.\n- **Z · Zelar:** reduza o acesso da criança a conteúdo inadequado, reforce as noções de privacidade e procure orientação de um profissional se o comportamento persistir ou preocupar." },
      { key: "evite", label: "🚫 EVITE", body: "- Punir, envergonhar ou reagir com choque.\n- Pedir para a criança repetir ou mostrar o que fez para outra pessoa.\n- Assumir de imediato que houve abuso, ou descartar a hipótese sem observar.\n- Comentar o episódio com familiares como se fosse anedota." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- O conteúdo é compatível com o que a criança poderia ter visto por acaso, ou é específico demais para a idade?\n- Vem acompanhado de angústia, culpa, segredo, ou menção a uma pessoa?\n- É pontual, ou repetitivo e difícil de interromper?\n- Direciona-se a outras crianças de forma insistente?" },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Procure orientação de um psicólogo infantil se o comportamento for persistente, envolver conhecimento sexual inadequado para a idade, vier com angústia, ou se dirigir a outras crianças.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Tratar o assunto com calma, em vez de castigo, mantém a criança disposta a contar de onde veio aquilo. É essa informação que ajuda o adulto e os profissionais a entenderem se foi curiosidade ou exposição indevida. Interpretar o comportamento é tarefa de profissionais; observar e acolher é do adulto." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Converse com a criança, sem repreensão, para saber onde ela viu aquilo, e revise o acesso dela a telas e conteúdos naquele ambiente." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Onde você viu isso?\" (com calma)\n- \"Isso é coisa de gente grande, não é para criança. Se alguém te mostrou, pode me contar.\"\n- \"Você não está de castigo.\"",
      "7-10": "- \"Onde você viu ou aprendeu isso?\"\n- \"Tem coisas que são de adulto e não são para criança. Se alguém te mostrou, pode me contar.\"\n- \"Você não está de castigo por causa disso.\"",
      "11+": "- \"De onde veio isso? Pode me contar sem se preocupar com bronca.\"\n- \"Esse tipo de conteúdo é de adulto. Se alguém te mostrou ou incentivou, isso é importante eu saber.\"\n- \"Você não fez nada de errado, e não vai ser punido por isso.\"",
    },
  },
  {
    slug: "viu-conteudo-sexual",
    title: "A criança contou que viu imagens ou vídeos de conteúdo sexual.",
    grupo: "A criança contou ou perguntou algo",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Crianças podem se deparar com conteúdo sexual de várias formas: um vídeo que apareceu sozinho, um anúncio, algo que outra criança mostrou, um adulto que exibiu, ou uma busca por curiosidade. Ver esse tipo de conteúdo pode assustar, confundir ou despertar perguntas.\n\nO fato de a criança ter contado é positivo: mostra que ela confia em você. O foco agora é acolher, entender como ela teve acesso e proteger." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para a criança:**\n- \"Você fez bem em me contar. Isso é coisa de adulto e não era para você ver.\"\n- \"Você não fez nada de errado.\"\n- \"Como você viu isso? Alguém te mostrou ou apareceu sozinho?\" (com calma, sem interrogar)" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** entenda o essencial: onde, em que aparelho, se alguém mostrou, se foi uma vez ou mais. Registre com as palavras da criança.\n- **O · Ouvir:** deixe a criança dizer como se sentiu. Responda às dúvidas dela de forma simples e adequada à idade. Não peça descrições do conteúdo.\n- **Z · Zelar:** interrompa o acesso (configurações, supervisão, conversa com quem mais convive com ela) e, se outra pessoa mostrou o conteúdo, sobretudo um adulto ou adolescente, procure orientação da rede de proteção." },
      { key: "evite", label: "🚫 EVITE", body: "- Culpar ou punir a criança pelo que viu.\n- Pedir para ela mostrar ou descrever o conteúdo em detalhes.\n- Reagir com pânico, o que aumenta o susto dela.\n- Encerrar o assunto sem verificar como o acesso aconteceu." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- Foi acesso acidental (algo que apareceu) ou alguém mostrou de propósito?\n- Quem estava presente? Foi uma vez ou vem acontecendo?\n- A criança demonstrou medo, vergonha, dificuldade para dormir, ou passou a repetir o que viu?\n- Houve pedido de segredo por parte de quem mostrou?" },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Procure orientação de um profissional se a criança ficou muito afetada, se o acesso se repete, ou se passou a apresentar comportamento sexualizado.\n\nSe alguém mostrou o conteúdo à criança, em especial um adulto ou adolescente, ou pediu segredo, procure ajuda imediatamente e acione a rede de proteção. Situações que envolvem imagens íntimas de crianças também exigem acionamento imediato." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Quando a criança conta que viu algo perturbador e é acolhida em vez de punida, ela aprende que pode recorrer ao adulto diante do que a assusta no mundo digital. Filtrar conteúdo, supervisionar o acesso e conversar são responsabilidades do adulto: a criança não é responsável por evitar sozinha o que aparece na tela." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Descubra, com calma, como a criança teve acesso ao conteúdo e ajuste hoje a supervisão e as configurações do aparelho que ela usa." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Você fez bem em me contar. Isso é coisa de gente grande.\"\n- \"Você não fez nada errado.\"\n- \"Apareceu sozinho ou alguém te mostrou?\" (com calma)",
      "7-10": "- \"Você fez bem em me contar. Isso é coisa de adulto, não era para você ver.\"\n- \"Você não fez nada de errado.\"\n- \"Como isso apareceu? Sozinho ou alguém te mostrou?\"",
      "11+": "- \"Agradeço por ter me contado. Esse tipo de conteúdo não é apropriado para sua idade.\"\n- \"Você não fez nada de errado ao ver isso.\"\n- \"Pode me contar como aconteceu? Apareceu sozinho, você procurou, ou alguém te mostrou? Qualquer resposta está tudo bem.\"",
    },
  },
  {
    slug: "voltou-diferente-de-passeio",
    title: "A criança voltou de um passeio ou visita muito diferente do habitual.",
    grupo: "A criança mudou",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Uma criança pode voltar de um passeio cansada, irritada, sonolenta ou simplesmente \"diferente\" por muitos motivos: rotina quebrada, excesso de estímulo, um desentendimento com outra criança, sono atrasado, ou algo que a incomodou no ambiente ou com alguma pessoa.\n\nUma mudança pontual e isolada, na maioria das vezes, se resolve com descanso e conversa. O que pede atenção é quando a mudança é intensa, persiste por dias, ou se repete depois de idas ao mesmo lugar ou com a mesma pessoa." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "- \"Como foi o passeio? Me conta o que vocês fizeram.\"\n- \"Teve alguma coisa que você não gostou ou que te incomodou?\"\n- \"Você pode me contar qualquer coisa, mesmo que ache que não é importante.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** observe o que mudou (humor, sono, apetite, fala, comportamento) e desde quando.\n- **O · Ouvir:** converse em um momento tranquilo, sem cobrar um relato completo do passeio. Perguntas abertas, sem insistir se ela não quiser falar agora.\n- **Z · Zelar:** dê tempo e espaço para a criança se reorganizar, e observe se a mudança persiste ou se repete em novas idas ao mesmo lugar ou com a mesma pessoa." },
      { key: "evite", label: "🚫 EVITE", body: "- Pressionar por um relato completo do passeio de uma vez.\n- Minimizar (\"já passou\", \"não foi nada\") sem observar.\n- Interrogar sobre pessoas específicas de forma direta.\n- Concluir de imediato que houve algo grave." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- A mudança é passageira (desaparece em um ou dois dias) ou persiste?\n- Repete-se depois de idas ao mesmo lugar ou com a mesma pessoa?\n- Vem com medo, recusa de voltar àquele lugar, ou mudança na forma de falar sobre alguém de lá?" },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Procure orientação de um profissional se a mudança for intensa, persistir por mais de alguns dias, ou se repetir associada ao mesmo contexto ou pessoa.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Observar mudanças sem alarme, mas sem naturalizar o que se repete, é o equilíbrio que protege: nem toda mudança exige investigação, mas toda mudança merece ser notada pelo adulto." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Reserve um momento tranquilo, sem pressa, para perguntar à criança como foi o passeio, e observe se a mudança se repete na próxima vez." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Como foi o passeio? Me conta o que vocês fizeram.\"\n- \"Teve alguma coisa que você não gostou?\"\n- \"Pode me contar qualquer coisinha.\"",
      "7-10": "- \"Como foi o passeio? Conta o que vocês fizeram.\"\n- \"Teve alguma coisa que você não gostou ou te incomodou?\"\n- \"Pode me contar qualquer coisa, mesmo que pareça sem importância.\"",
      "11+": "- \"Como foi? Me conta como foi o passeio, sem pressa.\"\n- \"Teve algo que te incomodou ou que ficou te martelando a cabeça?\"\n- \"Pode me contar qualquer coisa, mesmo que ache bobagem ou que 'não é nada'.\"",
    },
  },
  {
    slug: "terceiro-relatou-preocupacao",
    title: "Outra pessoa me contou algo preocupante sobre a criança.",
    grupo: "Outra pessoa me trouxe uma preocupação",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Um professor, um familiar, um amigo ou vizinho pode trazer a você uma observação ou preocupação sobre a criança: algo que ela disse, fez, ou um comportamento notado por outra pessoa.\n\nReceber essa informação de terceiros pode gerar defensividade ou negação, mas o mais protetivo é acolher o relato como um ponto de partida para observar, não como uma acusação a ser rebatida." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "**Para quem trouxe a informação:**\n- \"Obrigada por me contar. Pode me dar mais detalhes do que você observou?\"\n\n**Para a criança, depois, sem citar a fonte:**\n- \"Eu queria conversar com você sobre uma coisa. Quer me contar como você está?\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** registre o que foi relatado, por quem, quando e em que contexto, sem distorcer nem minimizar a informação.\n- **O · Ouvir:** converse com a criança em um momento tranquilo, com perguntas abertas, sem mencionar diretamente a fonte se isso puder expô-la ou constrangê-la.\n- **Z · Zelar:** avalie a gravidade do que foi relatado e busque orientação profissional se necessário, independentemente de a criança confirmar o relato na conversa." },
      { key: "evite", label: "🚫 EVITE", body: "- Descartar a informação só porque veio de outra pessoa ou porque a criança nega.\n- Expor quem trouxe a preocupação para a criança ou para a família.\n- Confrontar a criança de forma acusatória.\n- Achar que precisa \"provar\" o relato antes de buscar orientação." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- Quem relatou tem contato direto e frequente com a criança (escola, família, cuidador)?\n- O relato é específico (uma fala, um comportamento observado) ou uma impressão geral?\n- Combina com algo que você mesmo já notou?" },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Sempre que o relato de terceiro envolver suspeita de violência, negligência ou risco, procure orientação profissional ou da rede de proteção, mesmo que a criança negue ou minimize ao ser perguntada.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "A proteção é responsabilidade compartilhada: levar a sério a observação de outro adulto, sem descartá-la por desconforto ou lealdade, é parte de cuidar em rede. Investigar e concluir cabe aos profissionais; acolher a informação e buscar orientação cabe a você." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Registre o que foi relatado, com data e detalhes, e procure orientação profissional para avaliar os próximos passos, mesmo que a conversa com a criança não confirme nada de imediato." },
    ],
    variacaoPorIdade: {
      "0-6": "Para quem trouxe a informação: \"Obrigada por me contar. O que você viu?\"\nPara a criança: \"Quero conversar com você. Como você está?\"",
      "7-10": "Para quem trouxe a informação: \"Obrigada por me contar. Pode me dar mais detalhes?\"\nPara a criança: \"Eu queria conversar com você sobre uma coisa. Quer me contar como está?\"",
      "11+": "Para quem trouxe a informação: \"Agradeço por trazer isso a mim. Pode detalhar o que observou?\"\nPara o adolescente: \"Quero conversar sobre algo, sem rodeios. Como você está, de verdade?\"",
    },
  },
  {
    slug: "regressao-medos-comportamentos",
    title: "A criança voltou a ter medos ou comportamentos de quando era menor.",
    grupo: "A criança mudou",
    status: "publicado",
    blocks: [
      { key: "o-que-pode", label: "👀 O QUE PODE ESTAR ACONTECENDO?", body: "Regressões (voltar a molhar a cama, pedir colo com mais frequência, chupar dedo, ter medo do escuro que já não tinha) são comuns em momentos de mudança ou estresse: uma mudança de casa, a chegada de um irmão, o início na escola, uma perda, um conflito familiar.\n\nIsoladamente, não indicam violência. São sinais de que algo está exigindo mais da criança emocionalmente, e o caminho é entender o quê." },
      { key: "o-que-dizer", label: "💬 O QUE DIZER?", body: "- \"Percebi que você está [comportamento]. Está tudo bem?\"\n- \"Mudou alguma coisa ultimamente que te deixou mais preocupada?\"\n- \"Pode ficar mais perto de mim enquanto isso passa.\"" },
      { key: "como-agir", label: "🛡️ COMO AGIR?", body: "- **V · Ver:** liste o que voltou a acontecer e desde quando; pense no que mudou na vida da criança nesse período.\n- **O · Ouvir:** ofereça mais proximidade e espaço para ela falar, sem obrigar. Regressão costuma pedir colo, não interrogatório.\n- **Z · Zelar:** mantenha a rotina e o acolhimento; se não houver uma causa conhecida ou a regressão for intensa, procure orientação profissional." },
      { key: "evite", label: "🚫 EVITE", body: "- Envergonhar ou repreender (\"você já passou dessa fase\", \"para de agir feito bebê\").\n- Comparar a criança com outras ou com \"como ela era antes\".\n- Ignorar, na expectativa de que passe sozinho.\n- Assumir de imediato que há uma causa grave." },
      { key: "olhar", label: "👁️ OLHAR PROTETOR", body: "- Há uma explicação conhecida (mudança de rotina, perda, novo irmão)?\n- A regressão veio junto de medo de uma pessoa específica, recusa de contato físico, ou fala sobre o corpo?\n- Está se intensificando com o tempo, em vez de diminuir?" },
      { key: "ajuda", label: "🚨 QUANDO BUSCAR AJUDA?", body: "Procure orientação de um psicólogo se a regressão for intensa, persistir por semanas, não tiver causa aparente, ou vier acompanhada de medo de uma pessoa específica.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "ensina", label: "🌱 O QUE ESSA SITUAÇÃO ENSINA?", body: "Regressão é linguagem emocional, não birra. Acolher em vez de cobrar \"idade\" ajuda a criança a atravessar o que está sentindo, e mantém aberto o canal para ela contar, se houver algo mais por trás." },
      { key: "passo", label: "➡️ MEU PRÓXIMO PASSO", body: "Identifique o que mudou na rotina da criança nas últimas semanas e ofereça mais presença e colo enquanto observa se a regressão diminui." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Percebi essa mudança em você. Tudo bem?\"\n- \"Mudou alguma coisa que te deixou preocupada?\"\n- \"Pode ficar mais perto de mim.\"",
      "7-10": "- \"Percebi essa mudança em você. Está tudo bem?\"\n- \"Mudou alguma coisa ultimamente que te preocupou?\"\n- \"Pode ficar mais perto de mim enquanto isso passa.\"",
      "11+": "- \"Notei uma mudança em você. Quero entender o que está acontecendo.\"\n- \"Teve alguma mudança recente que te afetou?\"\n- \"Estou aqui, você não precisa passar por isso sozinho(a).\"",
    },
  },
];

export const VAI_ACONTECER: ContentItem[] = [
  {
    slug: "piscina",
    emoji: "🏊",
    title: "A criança vai à piscina.",
    grupo: "Água e lazer ao ar livre",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "O que você pode fazer: verificar se haverá supervisão constante de um adulto responsável (mesmo havendo salva-vidas, isso não substitui o acompanhamento de um adulto de confiança); combinar regras simples com a criança (avisar antes de entrar na água, ficar na área rasa se ainda não souber nadar bem); apresentar a criança a quem vai supervisioná-la, se for outra pessoa; considerar a idade e a habilidade de nadar da criança para calibrar o nível de proximidade necessário." },
      { key: "durante", label: "DURANTE", body: "O que observar: se a supervisão combinada está de fato acontecendo; os momentos de troca de roupa e o uso do vestiário, ambientes menos visíveis; a interação da criança com outros adultos e crianças no espaço." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que ela pode pedir ajuda em voz alta sempre que precisar; que ninguém, além de quem cuida dela habitualmente, deve ajudá-la a trocar de roupa ou tomar banho sem necessidade; a diferença entre uma brincadeira na água (jogar água, mergulhar) e algo que a incomoda, e que ela pode dizer \"para\" a qualquer momento, mesmo brincando." },
      { key: "depois", label: "DEPOIS", body: "Pergunte como foi o passeio, sem interrogatório: \"Do que você mais gostou? Teve alguma coisa que você não gostou?\" Mantenha espaço aberto para ela comentar qualquer coisa nos dias seguintes." },
      { key: "evite", label: "EVITE", body: "Deixar a criança trocar de roupa ou tomar banho com um adulto ou adolescente que não seja de sua confiança direta; presumir que, por ser um local conhecido (condomínio, clube), a supervisão acontece automaticamente; deixar de combinar regras achando que \"ela já sabe\"." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se, depois do passeio, a criança demonstrar recusa em voltar ao local, mudança de comportamento relacionada à água ou ao vestiário, ou mencionar algo que a incomodou com uma pessoa específica.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Combine com a criança, antes de ir, quem vai supervisioná-la e o que ela pode fazer se algo a incomodar." },
    ],
    variacaoPorIdade: {
      "0-6": "Que pode gritar bem alto se precisar de ajuda; que só quem cuida dela pode ajudar no banho ou na troca de roupa; que brincar na água é gostoso, mas se não gostar de algo, pode dizer \"não\" e parar.",
      "7-10": "Que pode pedir ajuda em voz alta sempre que precisar; que só o adulto que cuida dela deve ajudar na troca de roupa ou no banho; a diferença entre uma brincadeira na água e algo que a incomoda, e que pode dizer \"para\" mesmo brincando.",
      "11+": "Que pedir ajuda em público não é vergonha; que ninguém, fora quem ela escolhe, deve ajudá-la a trocar de roupa; que ela decide o limite entre brincadeira e desconforto, e pode encerrar isso quando quiser.",
    },
  },
  {
    slug: "praia",
    emoji: "🏖️",
    title: "A criança vai à praia.",
    grupo: "Água e lazer ao ar livre",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Combine um ponto de referência claro para o caso de a criança se afastar; apresente-a às pessoas que estarão no grupo; converse sobre nunca se afastar sem avisar; se houver banheiro ou chuveiro compartilhado, combine quem vai acompanhá-la." },
      { key: "durante", label: "DURANTE", body: "Observe a supervisão constante na água: a praia costuma ter correntes e é menos previsível que a piscina; fique atento a adultos desconhecidos que se aproximam repetidamente da criança; observe as idas ao banheiro ou trocador." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "A avisar sempre antes de entrar na água ou se afastar; que pode recusar ajuda de estranhos para trocar de roupa ou passar protetor solar em áreas íntimas; a reconhecer o ponto de referência combinado, caso se perca." },
      { key: "depois", label: "DEPOIS", body: "Converse sobre o dia, valorizando o que ela quiser compartilhar; observe se demonstra desconforto ao mencionar alguém do passeio." },
      { key: "evite", label: "EVITE", body: "Deixar a criança sozinha por longos períodos por considerar a praia \"cheia e segura\"; permitir que estranhos apliquem protetor solar ou ajudem a trocar de roupa; ignorar sinais de cansaço ou desconforto por atribuí-los apenas ao ambiente." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança relatar ter se sentido incomodada por alguém no passeio, ou se recusar a repetir o passeio sem explicação clara.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Defina com a criança, antes de sair, o ponto de referência e a pessoa responsável por ela na praia." },
    ],
    variacaoPorIdade: {
      "0-6": "A pedir ajuda alto se se perder; que só quem cuida dela troca a roupinha ou passa protetor solar; a reconhecer um ponto (a barraca, o guarda-sol) para voltar.",
      "7-10": "A avisar antes de entrar na água ou se afastar; que pode recusar ajuda de estranhos para trocar de roupa ou passar protetor solar; a reconhecer o ponto de referência combinado.",
      "11+": "A avisar antes de se afastar; que pode recusar ajuda de qualquer estranho para passar protetor solar ou trocar de roupa, o corpo dela é dela; a usar o ponto de referência combinado se precisar se orientar.",
    },
  },
  {
    slug: "dormir-familiar",
    emoji: "🏠",
    title: "A criança vai dormir na casa de um familiar.",
    grupo: "Na casa de outras pessoas",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Converse com a criança sobre a casa, quem vai estar lá e o que fazer se algo a incomodar; combine um sinal ou uma forma de ela pedir para voltar para casa, mesmo à noite, sem constrangimento; converse com o familiar sobre limites (banho, troca de roupa, quem dorme onde)." },
      { key: "durante", label: "DURANTE", body: "Se possível, ligue ou mande mensagem em algum momento; preste atenção em como a criança fala sobre a experiência ao ser buscada ou ao telefone." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que ela pode ligar para você a qualquer hora, mesmo de madrugada, sem se meter em problema; que decide sobre o próprio corpo mesmo na casa de parentes queridos (banho, troca de roupa, cama compartilhada); a quem procurar na casa se precisar de algo." },
      { key: "depois", label: "DEPOIS", body: "Pergunte como foi, com perguntas abertas: \"Como foi dormir lá? Teve alguma coisa diferente do que você esperava?\" Observe se há relutância em repetir a experiência." },
      { key: "evite", label: "EVITE", body: "Presumir que \"é da família, então é seguro\" e pular a conversa prévia; obrigar a criança a dormir fora se ela demonstrar forte resistência sem motivo conhecido; ignorar mudança de comportamento após a visita." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança relatar desconforto com alguém da casa, recusar firmemente repetir a visita, ou apresentar mudança de comportamento depois de dormir fora.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Combine com a criança, antes da próxima vez, um sinal simples para pedir para voltar para casa se precisar." },
    ],
    variacaoPorIdade: {
      "0-6": "Que pode ligar para você de noite se precisar, sem medo; que ninguém deve dar banho ou trocar a roupa dela sem ela querer, mesmo parente; a quem chamar na casa se precisar.",
      "7-10": "Que pode ligar a qualquer hora, sem se meter em problema; que decide sobre o próprio corpo mesmo na casa de parentes (banho, troca de roupa, cama); a quem procurar na casa se precisar.",
      "11+": "Que ligar de madrugada, se precisar, nunca é exagero; que o corpo dela é dela mesmo na casa de parentes queridos; a identificar a quem recorrer na casa se algo não estiver certo.",
    },
  },
  {
    slug: "casa-de-amigo",
    emoji: "🏡",
    title: "A criança vai passar o dia na casa de um amigo.",
    grupo: "Na casa de outras pessoas",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Conheça, mesmo que brevemente, quem estará em casa durante a visita (pais, irmãos mais velhos, outros adultos); combine horário de busca e um contato direto; converse com a criança sobre o que fazer se algo não estiver confortável." },
      { key: "durante", label: "DURANTE", body: "Esteja disponível por telefone; se possível, faça contato no meio do período, sobretudo em visitas mais longas." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "A avisar se alguém pedir para ela fazer algo que não quer, mesmo um amigo ou um adulto da casa; que pode pedir para ser buscada antes do combinado, sem precisar justificar em detalhes." },
      { key: "depois", label: "DEPOIS", body: "Pergunte sobre o dia com curiosidade genuína, não como interrogatório; observe se ela evita falar sobre algum momento específico." },
      { key: "evite", label: "EVITE", body: "Deixar de perguntar quem estará presente na casa; insistir para que ela fique até o fim combinado se demonstrar forte desejo de voltar antes; tratar o pedido de \"buscar mais cedo\" como frescura." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança relatar algo desconfortável ocorrido na casa, ou se recusar a voltar lá sem explicação clara.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Troque contato com o adulto responsável pela casa antes da próxima visita e combine um horário para checar como está indo." },
    ],
    variacaoPorIdade: {
      "0-6": "A contar se alguém pedir para ela fazer algo que não quer; que pode pedir para ser buscada mais cedo, sem precisar explicar tudo.",
      "7-10": "A avisar se alguém pedir para ela fazer algo que não quer, mesmo um amigo ou um adulto da casa; que pode pedir para ser buscada antes do combinado, sem detalhar o motivo.",
      "11+": "A reconhecer quando um pedido, mesmo de um amigo ou de um adulto da casa, ultrapassa o que ela quer fazer; que pedir para ser buscada antes não precisa de justificativa.",
    },
  },
  {
    slug: "cuidados-de-outra-pessoa",
    emoji: "👵",
    title: "A criança vai ficar sob os cuidados de outra pessoa.",
    grupo: "Na casa de outras pessoas",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Escolha essa pessoa com critério, mesmo que seja alguém de confiança da família; converse com a criança sobre quem vai cuidar dela e por quanto tempo; combine regras básicas de rotina e limites com quem vai cuidar." },
      { key: "durante", label: "DURANTE", body: "Esteja disponível por contato; se for a primeira vez, considere checar em algum momento." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que os limites do corpo dela valem com qualquer cuidador, mesmo alguém querido pela família; que pode recusar banho, troca de roupa ou colo se não quiser, e que isso deve ser respeitado; a quem ligar se precisar de ajuda." },
      { key: "depois", label: "DEPOIS", body: "Pergunte como foi ficar com essa pessoa, com perguntas abertas e sem pressa; observe a reação da criança ao ver ou mencionar o cuidador depois." },
      { key: "evite", label: "EVITE", body: "Deixar de conversar sobre os limites do corpo por considerar \"desnecessário, é gente da família\"; ignorar relutância da criança em ficar novamente com a mesma pessoa; usar frases como \"obedece direitinho\" sem qualificar o que isso significa sobre o corpo dela." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança demonstrar medo, recusa firme de ficar novamente com essa pessoa, ou mudança de comportamento associada aos períodos de cuidado.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Converse com a criança sobre o que ela pode fazer se um cuidador pedir algo que ela não quer, antes da próxima vez que ficar aos cuidados de alguém." },
    ],
    variacaoPorIdade: {
      "0-6": "Que o corpo dela é dela mesmo com esse cuidador; que pode dizer não a banho, colo ou troca de roupa; a quem chamar se precisar.",
      "7-10": "Que os limites do corpo dela valem com qualquer cuidador, mesmo alguém querido pela família; que pode recusar banho, colo ou troca de roupa; a quem ligar se precisar de ajuda.",
      "11+": "Que o direito ao próprio corpo não muda por quem é o cuidador, nem por quanto tempo de confiança existe; a identificar a quem recorrer se algo não estiver certo.",
    },
  },
  {
    slug: "festa",
    emoji: "🎂",
    title: "A criança vai a uma festa.",
    grupo: "Atividades e eventos coletivos",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Verifique quem estará responsável pela supervisão das crianças no evento; converse com a criança sobre com quem ela pode ficar se precisar de algo (o anfitrião, você, outro adulto de confiança); combine um horário e uma forma de contato." },
      { key: "durante", label: "DURANTE", body: "Observe se há supervisão de adultos em áreas menos visíveis (banheiro, quartos, quintal); fique atento a jogos ou brincadeiras entre crianças de idades muito diferentes." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que pode procurar um adulto de confiança presente na festa se precisar; que brincadeiras envolvendo tirar roupa, desafios de conteúdo íntimo ou isolamento com alguém não são obrigatórias, mesmo que \"todo mundo esteja fazendo\"; a avisar se um adulto ou uma criança mais velha propuser ficar sozinha em um cômodo fechado." },
      { key: "depois", label: "DEPOIS", body: "Pergunte sobre a festa com interesse genuíno; observe se ela evita falar de algum momento ou de alguma pessoa específica." },
      { key: "evite", label: "EVITE", body: "Deixar de perguntar sobre a supervisão do evento; ignorar brincadeiras entre crianças com grande diferença de idade; pressionar a criança a participar de brincadeiras que a deixam visivelmente desconfortável." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança relatar uma brincadeira ou situação que a incomodou, envolvendo contato físico ou isolamento com alguém.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Antes da próxima festa, combine com a criança um adulto de confiança a quem ela pode recorrer no local." },
    ],
    variacaoPorIdade: {
      "0-6": "A procurar um adulto que ela confia se precisar de algo; que não precisa fazer uma brincadeira de que não gosta, mesmo que os outros façam.",
      "7-10": "Que pode procurar um adulto de confiança presente na festa se precisar; que brincadeiras envolvendo tirar roupa ou ficar sozinha com alguém em um cômodo fechado não são obrigatórias, mesmo que \"todo mundo\" esteja fazendo.",
      "11+": "A identificar um adulto de confiança na festa; que ceder à pressão do grupo em brincadeiras que envolvem o corpo ou isolamento não é o preço de pertencer; a avisar se alguém propuser ficar a sós num cômodo fechado.",
    },
  },
  {
    slug: "atividade-esportiva",
    emoji: "⚽",
    title: "A criança vai participar de uma atividade esportiva.",
    grupo: "Atividades e eventos coletivos",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Conheça o treinador ou responsável pela atividade e a política do local sobre supervisão em vestiários; converse com a criança sobre o que é contato físico esperado no esporte (por exemplo, auxiliar a postura) e o que não é; combine que ela pode contar qualquer coisa sobre o treino, mesmo elogios que a deixem sem graça." },
      { key: "durante", label: "DURANTE", body: "Observe a dinâmica entre o treinador ou instrutor e as crianças, sobretudo tratamento diferenciado a uma criança específica; preste atenção aos horários e à forma como ocorrem trocas de roupa e banho." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que nenhum toque de \"correção\" deve doer, durar mais do que o necessário ou ocorrer em partes íntimas; que pode recusar ficar a sós com o treinador fora do horário e do local combinados; a avisar sobre qualquer atenção especial, presentes ou mensagens fora do contexto do treino." },
      { key: "depois", label: "DEPOIS", body: "Pergunte sobre o treino com interesse real, não só sobre desempenho; observe mudanças de motivação, humor ou disposição para ir." },
      { key: "evite", label: "EVITE", body: "Tratar o treinador com autoridade inquestionável só por ser profissional; ignorar comentários da criança sobre \"atenção especial\" de um adulto; incentivar a criança a \"aguentar\" desconforto físico para não desagradar o treinador." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança relatar toques inadequados, atenção excessiva de um adulto, ou desmotivação repentina e inexplicada para a atividade.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Converse com a criança sobre a diferença entre um toque de treino e um toque que incomoda, antes do próximo treino." },
    ],
    variacaoPorIdade: {
      "0-6": "Que um toque de treino não deve doer nem demorar; a contar se alguém quiser ficar sozinho com ela fora do treino.",
      "7-10": "Que nenhum toque de correção deve doer, durar mais do que o necessário ou ocorrer em partes íntimas; que pode recusar ficar a sós com o treinador fora do horário e do local combinados.",
      "11+": "A distinguir um toque técnico necessário de um toque que incomoda; que atenção especial, presentes ou mensagens fora do treino merecem ser contados, mesmo que pareçam gentileza.",
    },
  },
  {
    slug: "excursao-escolar",
    emoji: "🚌",
    title: "A criança vai participar de uma excursão ou viagem escolar.",
    grupo: "Atividades e eventos coletivos",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Informe-se sobre a proporção de adultos por criança, a divisão de quartos ou tendas e os contatos de emergência; converse com a criança sobre como pedir ajuda a um responsável da viagem e como entrar em contato com você; combine um horário de contato, se possível." },
      { key: "durante", label: "DURANTE", body: "Mantenha contato conforme combinado, sem exagerar a ponto de atrapalhar a experiência da criança; se surgirem dúvidas, contate a escola diretamente." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que pode procurar qualquer adulto responsável da viagem, mesmo que não seja o professor dela; que a divisão de quartos ou camas deve respeitar sua idade e conforto, e que pode pedir mudança se algo a incomodar; que pode ligar para você a qualquer momento." },
      { key: "depois", label: "DEPOIS", body: "Pergunte sobre a viagem com calma, em várias conversas curtas em vez de uma só longa; observe se há assuntos que ela evita." },
      { key: "evite", label: "EVITE", body: "Deixar de perguntar sobre a supervisão e a divisão de quartos antes de autorizar a viagem; minimizar o desconforto da criança com a ideia de dividir quarto com alguém específico; presumir que, por ser atividade escolar, a supervisão é automaticamente adequada." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança relatar desconforto com a divisão de quartos, com um adulto responsável, ou qualquer situação ocorrida durante a viagem.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Pergunte à escola, antes da viagem, sobre a proporção de adultos por criança e a divisão dos quartos." },
    ],
    variacaoPorIdade: {
      "0-6": "A procurar qualquer adulto da viagem, não só o professor dela; que pode ligar para você quando quiser.",
      "7-10": "Que pode procurar qualquer adulto responsável da viagem, mesmo que não seja o professor dela; que a divisão de quartos deve respeitar seu conforto, podendo pedir mudança; que pode ligar a qualquer momento.",
      "11+": "A reconhecer que qualquer adulto responsável da viagem pode ser procurado, não só quem ela já conhece; que tem o direito de pedir mudança de quarto se algo a incomodar, sem se sentir \"difícil\" por isso.",
    },
  },
  {
    slug: "atividade-religiosa",
    emoji: "🛐",
    title: "A criança vai participar de uma atividade religiosa.",
    grupo: "Atividades e eventos coletivos",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Conheça os responsáveis pela atividade e a proporção de adultos por criança; converse com a criança sobre poder procurar você ou outro adulto de confiança se algo a incomodar, inclusive em relação a uma figura de autoridade religiosa; pergunte sobre a rotina da atividade (horários, locais, se há momentos a sós com adultos)." },
      { key: "durante", label: "DURANTE", body: "Observe, quando possível, a dinâmica entre líderes ou voluntários e as crianças; fique atento a qualquer atenção individual excessiva a uma criança específica." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que nenhuma figura de autoridade, inclusive religiosa, tem permissão para tocar seu corpo de forma que a incomode, pedir segredo ou ficar a sós com ela fora do combinado; que pode questionar e contar, mesmo sobre alguém muito respeitado pela família ou pela comunidade." },
      { key: "depois", label: "DEPOIS", body: "Pergunte sobre a atividade com interesse genuíno; esteja atenta a mudanças de disposição para participar." },
      { key: "evite", label: "EVITE", body: "Tratar qualquer questionamento sobre a atividade como desrespeito à fé ou à instituição; presumir proteção automática por se tratar de ambiente religioso; desconsiderar o relato da criança por reverência à autoridade da pessoa envolvida." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança relatar desconforto, toque inadequado ou pedido de segredo por parte de qualquer pessoa da atividade.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Converse com a criança sobre o direito de dizer não e de contar, mesmo sobre uma pessoa muito respeitada, antes da próxima atividade." },
    ],
    variacaoPorIdade: {
      "0-6": "Que ninguém, nem alguém que \"todo mundo respeita\", pode tocar o corpo dela de um jeito que a incomode; a contar para você qualquer coisa.",
      "7-10": "Que nenhuma figura de autoridade, inclusive religiosa, tem permissão para tocar seu corpo de forma que a incomode, pedir segredo ou ficar a sós com ela fora do combinado; que pode questionar e contar, mesmo sobre alguém muito respeitado.",
      "11+": "Que respeito e autoridade não dão a ninguém o direito de ultrapassar seu limite corporal ou pedir sigilo; a questionar e relatar, mesmo quando isso envolve alguém central na comunidade.",
    },
  },
  {
    slug: "acampamento",
    emoji: "⛺",
    title: "A criança vai participar de um acampamento.",
    grupo: "Atividades e eventos coletivos",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Verifique a proporção de adultos por criança, as políticas de supervisão (banho, dormitórios, atividades noturnas) e os contatos de emergência; converse com a criança sobre como contatar um responsável do acampamento e você; combine, se possível, horários de contato durante o período." },
      { key: "durante", label: "DURANTE", body: "Mantenha contato conforme combinado; se perceber qualquer sinal de alerta na comunicação da criança (tom de voz, silêncio incomum), entre em contato direto com a organização." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que pode recusar atividades que a deixem desconfortável, mesmo em nome da \"dinâmica de grupo\"; que os limites do corpo dela valem no acampamento como em qualquer lugar; a quem procurar entre os monitores se precisar de ajuda." },
      { key: "depois", label: "DEPOIS", body: "Reserve tempo para ouvir sobre a experiência em várias conversas, não só uma; observe mudanças de comportamento, sono ou humor após o retorno." },
      { key: "evite", label: "EVITE", body: "Autorizar sem confirmar a proporção de adultos por criança e as políticas de supervisão; menosprezar o desejo da criança de voltar mais cedo; presumir que, por outras crianças passarem pela mesma experiência sem problema, o desconforto relatado não é válido." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança relatar qualquer situação de desconforto, constrangimento ou contato inadequado durante o acampamento, ou apresentar mudança significativa de comportamento ao voltar.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Antes do próximo acampamento, confirme com a organização a proporção de adultos por criança e as regras de supervisão em banho e dormitórios." },
    ],
    variacaoPorIdade: {
      "0-6": "Que pode dizer não a uma brincadeira de que não gosta, mesmo se o grupo estiver fazendo; a quem chamar entre os monitores.",
      "7-10": "Que pode recusar atividades que a deixem desconfortável, mesmo em nome da \"dinâmica de grupo\"; que os limites do corpo dela valem lá como em qualquer lugar; a quem procurar entre os monitores.",
      "11+": "Que a pressão do grupo não é motivo suficiente para ceder num limite do corpo; a identificar, entre os monitores, a quem recorrer se precisar de ajuda.",
    },
  },
  {
    slug: "ambiente-digital",
    emoji: "📱",
    title: "A criança vai começar a utilizar um ambiente digital.",
    grupo: "Vida digital",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Configure controles parentais e restrições de idade adequados à plataforma; converse com a criança sobre o que é apropriado compartilhar (nunca dados pessoais, endereço, escola ou fotos íntimas); combine horários e locais de uso, de preferência em espaços comuns da casa, não isolada no quarto." },
      { key: "durante", label: "DURANTE", body: "Acompanhe, sobretudo no início, o que a criança acessa e com quem interage; mantenha os dispositivos em locais visíveis da casa." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que nem tudo que vê on-line é verdade ou seguro; que pode fechar, sair ou bloquear qualquer conteúdo ou pessoa que a deixe desconfortável, sem medo de ser repreendida; que deve avisar você se alguém pedir fotos, dados pessoais ou propor encontro." },
      { key: "depois", label: "DEPOIS", body: "Converse periodicamente sobre o que ela tem visto e com quem tem conversado, com curiosidade genuína, não fiscalização; revise juntos as configurações de privacidade de tempos em tempos." },
      { key: "evite", label: "EVITE", body: "Dar acesso livre e sem supervisão logo no início; punir a criança por ter visto algo inadequado, o que a leva a esconder da próxima vez; presumir que \"ela sabe se cuidar\" só porque já sabe usar o aparelho." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança demonstrar sigilo incomum sobre o uso do dispositivo, receber contato insistente de estranhos, ou relatar algo que a incomodou on-line.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Configure hoje os controles parentais adequados à idade da criança e combine com ela os horários e locais de uso." },
    ],
    variacaoPorIdade: {
      "0-6": "Que nem tudo que vê é de verdade; que pode fechar ou sair de algo que não gosta, sem medo de bronca.",
      "7-10": "Que nem tudo que vê on-line é verdade ou seguro; que pode fechar, sair ou bloquear qualquer conteúdo ou pessoa que a deixe desconfortável, sem medo de ser repreendida; que deve avisar você se alguém pedir fotos, dados pessoais ou propor encontro.",
      "11+": "A questionar a veracidade do que vê on-line; que bloquear e sair de uma conversa é sempre uma opção válida; a reconhecer e reportar pedidos de foto, dados pessoais ou encontro.",
    },
  },
  {
    slug: "jogar-online",
    emoji: "🎮",
    title: "A criança vai jogar online.",
    grupo: "Vida digital",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Verifique se o jogo permite contato com desconhecidos (chat de texto ou voz) e ajuste as configurações de privacidade; converse sobre não aceitar pedidos de amizade de desconhecidos nem combinar \"jogar em particular\" com alguém que só conhece on-line; combine o tempo de uso." },
      { key: "durante", label: "DURANTE", body: "Preste atenção a quem a criança está jogando (amigos conhecidos ou desconhecidos); fique atento a conversas por voz ou chat quando possível." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que colegas de jogo on-line nem sempre são quem dizem ser; que nunca deve compartilhar fotos, endereço, escola ou dados pessoais com quem conheceu no jogo; que pode contar se alguém pedir segredo, fotos, ou insistir em conversar fora do jogo." },
      { key: "depois", label: "DEPOIS", body: "Pergunte com quem ela jogou e sobre o que conversaram; observe se ela menciona, com frequência crescente, alguém que \"só conheceu jogando\"." },
      { key: "evite", label: "EVITE", body: "Permitir chat de voz ou texto com desconhecidos sem supervisão; tratar amizades on-line como \"não são de verdade\" (o que afasta a criança de contar), ou, no sentido oposto, equipará-las sem nenhum cuidado a amizades presenciais." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se um desconhecido pedir fotos, dados pessoais, encontro presencial, ou insistir em sigilo.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Revise hoje as configurações de chat e contato com desconhecidos nos jogos que a criança usa." },
    ],
    variacaoPorIdade: {
      "0-6": "Que quem joga com ela pode não ser quem diz ser; a nunca falar onde mora ou o nome da escola.",
      "7-10": "Que colegas de jogo on-line nem sempre são quem dizem ser; que nunca deve compartilhar fotos, endereço, escola ou dados pessoais com quem conheceu no jogo; que pode contar se alguém pedir segredo ou insistir em conversar fora do jogo.",
      "11+": "A reconhecer que uma identidade on-line pode ser falsa; a nunca compartilhar dados pessoais ou imagens com contatos só de jogo; a identificar sinais de manipulação (pedido de segredo, insistência, propostas fora do contexto do jogo).",
    },
  },
  {
    slug: "nova-escola",
    emoji: "🏫",
    title: "A criança vai começar em uma nova escola ou creche.",
    grupo: "Novos vínculos e cuidadores",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Visite a escola antes, conhecendo o ambiente e, quando possível, os profissionais que terão contato direto com a criança; pergunte sobre as políticas de supervisão (banheiro, troca de roupa, sesta, portões); converse com a criança sobre a mudança de forma tranquila, sem prometer que \"vai ser fácil\" se ela demonstrar insegurança." },
      { key: "durante", label: "DURANTE", body: "Acompanhe a adaptação nas primeiras semanas, com atenção redobrada a mudanças de humor, sono ou apetite; mantenha comunicação aberta com a escola." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que pode procurar qualquer adulto da escola apresentado como responsável por ela; que os limites do corpo dela valem na escola, inclusive na hora do banho ou da troca de roupa, quando aplicável; que pode contar a você qualquer coisa que aconteça lá, mesmo que pareça pequena." },
      { key: "depois", label: "DEPOIS", body: "Pergunte sobre o dia com perguntas específicas (\"quem sentou perto de você?\", \"o que vocês fizeram na hora do lanche?\") em vez de só \"como foi a escola?\"; observe sinais de desconforto ao mencionar algum adulto ou colega específico." },
      { key: "evite", label: "EVITE", body: "Matricular sem conhecer a política de supervisão do local; minimizar o choro ou a resistência inicial como \"manha\", deixando de observar se há algo além da adaptação comum; deixar de perguntar sobre a rotina específica de cuidados (banho, troca, sesta) em creches." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança demonstrar recusa persistente e intensa em ir à escola, mudança abrupta de comportamento, ou mencionar desconforto com uma pessoa específica da instituição.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Converse com a escola sobre as políticas de supervisão e apresente a criança ao ambiente novo antes do primeiro dia." },
    ],
    variacaoPorIdade: {
      "0-6": "A procurar um adulto da escola que use crachá, se precisar; que o corpo dela é dela também na escola.",
      "7-10": "Que pode procurar qualquer adulto da escola apresentado como responsável por ela; que os limites do corpo dela valem na escola, inclusive na hora do banho ou da troca de roupa, quando aplicável; que pode contar a você qualquer coisa, mesmo que pareça pequena.",
      "11+": "A identificar a quem recorrer na escola além do professor de referência; que os limites do corpo dela não mudam por estar num ambiente novo; a relatar qualquer desconforto, mesmo que pareça sem importância no início.",
    },
  },
  {
    slug: "novo-cuidador",
    emoji: "🧑‍🍼",
    title: "A criança vai passar a ficar regularmente com um novo cuidador ou babá.",
    grupo: "Novos vínculos e cuidadores",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Verifique referências da pessoa com cuidado, mesmo que tenha vindo indicada por alguém de confiança; converse com a criança sobre quem é essa pessoa e o que ela pode esperar da rotina; combine com o cuidador as regras da casa sobre limites do corpo, banho e troca de roupa." },
      { key: "durante", label: "DURANTE", body: "Nas primeiras semanas, considere estar por perto ou fazer visitas sem aviso prévio, se possível; observe a interação entre a criança e o cuidador." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que os limites do corpo dela valem com esse cuidador como com qualquer outra pessoa; que pode recusar banho, colo ou troca de roupa se não quiser, e que isso deve ser respeitado; que pode ligar ou contar para você qualquer coisa sobre o tempo com essa pessoa." },
      { key: "depois", label: "DEPOIS", body: "Pergunte sobre o dia com perguntas abertas e específicas; observe a reação da criança ao ver o cuidador chegar (alívio, entusiasmo, retraimento)." },
      { key: "evite", label: "EVITE", body: "Contratar ou aceitar o cuidador sem verificar referências; deixar de combinar regras claras sobre limites do corpo por considerar \"óbvio\"; ignorar sinais de que a criança fica retraída ou resistente perto dessa pessoa." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança demonstrar medo, recusa ou mudança de comportamento associada à presença desse cuidador.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Converse com a criança, nas primeiras semanas, sobre como estão sendo os momentos com o novo cuidador, com perguntas específicas." },
    ],
    variacaoPorIdade: {
      "0-6": "Que o corpo dela é dela mesmo com essa pessoa nova; que pode dizer não a banho ou colo.",
      "7-10": "Que os limites do corpo dela valem com esse cuidador como com qualquer outra pessoa; que pode recusar banho, colo ou troca de roupa se não quiser, e que isso deve ser respeitado; que pode ligar ou contar para você qualquer coisa sobre o tempo com essa pessoa.",
      "11+": "Que a confiança da família num cuidador não retira o direito dela sobre o próprio corpo; a manter você informado sobre como está a convivência, mesmo sem nenhum incidente.",
    },
  },
  {
    slug: "primeiro-celular",
    emoji: "📲",
    title: "A criança vai ganhar o primeiro celular.",
    grupo: "Vida digital",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Defina, junto com a criança, regras de uso (horários, aplicativos permitidos, com quem pode conversar); instale controles parentais adequados à idade; converse sobre o celular ser uma responsabilidade compartilhada, e não ainda um espaço totalmente privado." },
      { key: "durante", label: "DURANTE", body: "Nas primeiras semanas, acompanhe de perto o uso e esteja disponível para dúvidas." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que pode e deve mostrar mensagens ou situações que a deixem desconfortável, sem medo de perder o aparelho por isso; que não deve aceitar contatos de desconhecidos nem compartilhar sua localização com qualquer pessoa; a configuração básica de bloqueio e denúncia de contatos." },
      { key: "depois", label: "DEPOIS", body: "Converse regularmente sobre o uso do celular, sem transformar isso em vigilância constante; ajuste as regras conforme a criança demonstra responsabilidade." },
      { key: "evite", label: "EVITE", body: "Entregar o aparelho sem nenhuma regra combinada; ameaçar tomar o celular como punição por ela ter contado algo desconfortável; presumir que a supervisão inicial é dispensável só porque \"hoje em dia todo mundo tem\"." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança receber contato insistente de desconhecidos, pedidos de fotos, ou relatar qualquer situação de constrangimento pelo celular.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Combine com a criança, antes de entregar o celular, as três regras principais de uso e o que fazer se algo a incomodar." },
    ],
    variacaoPorIdade: {
      "7-10": "Que pode mostrar mensagens ou situações que a deixem desconfortável, sem medo de perder o aparelho por isso; que não deve aceitar contatos de desconhecidos nem compartilhar sua localização com qualquer pessoa.",
      "11+": "Que mostrar algo desconfortável não é \"entregar\" o próprio celular, é se proteger; a reconhecer e recusar contatos desconhecidos e pedidos de localização; a usar o bloqueio e a denúncia quando necessário.",
    },
  },
  {
    slug: "ir-sozinha",
    emoji: "🚶",
    title: "A criança vai começar a ir sozinha a algum lugar (escola, padaria, casa de amigo).",
    grupo: "Mais autonomia",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Avalie, com critério e sem comparar com outras crianças, se ela está pronta para o trajeto (idade, distância, riscos do caminho); percorra o trajeto junto algumas vezes antes; combine um horário esperado de chegada e uma forma de avisar caso algo mude." },
      { key: "durante", label: "DURANTE", body: "Combine que ela avise ao sair e ao chegar; nos primeiros trajetos, considere observar de longe ou pedir que outro adulto confirme a chegada." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "A reconhecer adultos e locais de referência no caminho (uma loja conhecida, um vizinho) para pedir ajuda se precisar; que não deve aceitar carona, doces ou convites de estranhos, mesmo que pareçam gentis; a manter distância e recusar se alguém insistir em conversa ou se aproximar de forma que a incomode." },
      { key: "depois", label: "DEPOIS", body: "Pergunte como foi o trajeto, sem transformar em interrogatório; reconheça a autonomia conquistada, reforçando que ela pode sempre contar o que aconteceu no caminho." },
      { key: "evite", label: "EVITE", body: "Autorizar o trajeto sozinha sem antes percorrê-lo junto; ignorar o desconforto da criança com o trajeto por pressa ou comparação com outras crianças da mesma idade; deixar de combinar um plano para o que fazer diante de algo inesperado." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança relatar ter sido abordada, seguida ou incomodada por alguém no trajeto.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Percorra o trajeto junto com a criança pelo menos uma vez, apontando os locais e pessoas de referência para pedir ajuda." },
    ],
    variacaoPorIdade: {
      "7-10": "A reconhecer adultos e locais de referência no caminho (uma loja conhecida, um vizinho) para pedir ajuda se precisar; que não deve aceitar carona, doces ou convites de estranhos, mesmo que pareçam gentis; a manter distância e recusar se alguém insistir em conversa.",
      "11+": "A mapear pontos de apoio confiáveis no trajeto; que a gentileza de um estranho não obriga reciprocidade nem aproximação; a recusar e se afastar de qualquer insistência.",
    },
  },
  {
    slug: "ficar-em-casa-sem-adulto",
    emoji: "🏚️",
    title: "A criança vai ficar em casa sem a presença de um adulto.",
    grupo: "Mais autonomia",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Avalie a maturidade da criança para o tempo e as tarefas previstas, sem comparar com outras crianças; combine regras claras (não abrir a porta para desconhecidos, o que fazer em emergências, contatos de confiança); deixe números de emergência e de vizinhos de confiança visíveis e acessíveis." },
      { key: "durante", label: "DURANTE", body: "Esteja disponível por telefone durante todo o período; combine um horário para ela avisar que está tudo bem." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "A nunca abrir a porta para quem ela não conhece ou não é esperado, mesmo que a pessoa diga ser \"amigo dos pais\"; a quem ligar em caso de emergência ou desconforto; que pode ligar para você a qualquer momento, mesmo sem motivo grave." },
      { key: "depois", label: "DEPOIS", body: "Pergunte como foi ficar sozinha, valorizando o que ela conseguiu fazer; ajuste as regras e o tempo sozinha conforme a experiência." },
      { key: "evite", label: "EVITE", body: "Deixar a criança sozinha por período maior do que ela está pronta para lidar; deixar de combinar o que fazer diante de imprevistos (campainha, barulhos, mal-estar); minimizar o medo que ela relatar sobre ficar sozinha." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança relatar medo intenso, uma situação de risco durante o período sozinha, ou contato de alguém desconhecido tentando entrar em casa.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Combine com a criança, antes da próxima vez, o que fazer se alguém tocar a campainha ou ligar, e deixe os contatos de emergência visíveis." },
    ],
    variacaoPorIdade: {
      "7-10": "A nunca abrir a porta para quem ela não conhece ou não é esperado, mesmo que a pessoa diga ser \"amigo dos pais\"; a quem ligar em caso de emergência; que pode ligar para você a qualquer momento, mesmo sem motivo grave.",
      "11+": "A avaliar com cautela qualquer pedido de acesso à casa, mesmo de quem parece confiável; a ter memorizados os contatos de emergência; que ligar para você não precisa de um motivo \"grande o suficiente\".",
    },
  },
  {
    slug: "consulta-medica",
    emoji: "🩺",
    title: "A criança vai a uma consulta médica ou exame.",
    grupo: "Saúde",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Explique à criança, de forma adequada à idade, o que vai acontecer na consulta ou exame; combine que você (ou outro adulto de confiança) estará presente durante o exame físico, sempre que possível; converse sobre a diferença entre um exame médico necessário e qualquer outro tipo de toque." },
      { key: "durante", label: "DURANTE", body: "Permaneça na sala durante exames físicos sempre que a política do local permitir; observe se o profissional explica o que está fazendo e busca o consentimento adequado à idade da criança." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que exames em partes íntimas só devem acontecer com um adulto de confiança presente e com explicação do que e por que está sendo feito; que pode dizer se algo dói ou incomoda além do esperado; que pode pedir para parar ou perguntar por que algo está sendo feito." },
      { key: "depois", label: "DEPOIS", body: "Pergunte como ela se sentiu durante a consulta; reforce que ela fez bem em passar por isso e que pode sempre contar como se sentiu." },
      { key: "evite", label: "EVITE", body: "Deixar a criança sozinha com o profissional durante exames em partes íntimas sem necessidade; repreender a criança por chorar, reclamar ou resistir ao exame; tratar qualquer desconforto dela como \"coisa de médico\" sem perguntar mais." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança relatar desconforto com o profissional, um exame que pareceu não ter explicação ou necessidade, ou qualquer contato que a deixou confusa ou assustada.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Antes da próxima consulta, explique à criança o que vai acontecer e combine que você estará por perto durante o exame." },
    ],
    variacaoPorIdade: {
      "0-6": "Que exame em partes íntimas só acontece com você do lado e explicando o que é; que pode dizer se doer.",
      "7-10": "Que exames em partes íntimas só devem acontecer com um adulto de confiança presente e com explicação do que e por que está sendo feito; que pode dizer se algo incomoda; que pode pedir para parar.",
      "11+": "Que ela tem direito a entender e questionar qualquer procedimento; a recusar a continuidade de um exame que a incomode além do esperado, e a pedir explicação antes de prosseguir.",
    },
  },
  {
    slug: "novo-adulto-na-rotina",
    emoji: "👣",
    title: "A criança vai passar a conviver com um novo adulto na rotina da família.",
    grupo: "Novos vínculos e cuidadores",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Apresente a pessoa à criança de forma gradual, sem pressa de criar vínculo forçado; converse com a criança sobre a mudança, ouvindo como ela se sente sobre isso; deixe claro para o novo adulto, desde o início, qual será o seu papel: nos primeiros tempos, não é o de decidir sobre disciplina ou sobre os limites do corpo da criança." },
      { key: "durante", label: "DURANTE", body: "Observe a interação entre a criança e o novo adulto, especialmente em momentos a sós; mantenha os canais de conversa abertos com a criança sobre como está se sentindo com a mudança." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que ela não é obrigada a chamar essa pessoa de \"pai\" ou \"mãe\", nem a demonstrar afeto que não sente; que os limites do corpo dela continuam valendo, e que pode recusar banho, colo ou outro contato físico com essa pessoa; que pode contar a você qualquer coisa sobre a convivência, mesmo que ache que isso vai incomodar alguém." },
      { key: "depois", label: "DEPOIS", body: "Reserve momentos a sós com a criança, mantendo o vínculo de vocês visivelmente firme durante a transição; pergunte, sem pressão, como ela está se sentindo com a nova rotina." },
      { key: "evite", label: "EVITE", body: "Forçar demonstrações de afeto ou convivência antes que a criança esteja pronta; deixar o novo adulto a sós com a criança com muita frequência antes de vínculo e confiança estarem estabelecidos; atribuir o desconforto da criança a \"ciúme\" ou \"resistência à mudança\" sem observar mais." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança demonstrar medo, recusa de ficar a sós com essa pessoa, ou mudança de comportamento associada à presença dela.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Converse com a criança, reservadamente, sobre como ela está se sentindo com a nova pessoa na rotina, sem pressioná-la a responder \"bem\"." },
    ],
    variacaoPorIdade: {
      "0-6": "Que não precisa chamar essa pessoa de \"mãe\" ou \"pai\" se não quiser; que o corpo dela continua sendo dela.",
      "7-10": "Que ela não é obrigada a chamar essa pessoa de \"pai\" ou \"mãe\", nem a demonstrar afeto que não sente; que os limites do corpo dela continuam valendo; que pode contar a você qualquer coisa sobre a convivência.",
      "11+": "Que a velocidade e a forma do vínculo com essa pessoa são dela, não uma obrigação social; que seus limites corporais não mudam por essa nova convivência; a manter você informado sem medo de \"estragar\" a relação familiar.",
    },
  },
  {
    slug: "casa-do-outro-genitor",
    emoji: "🔄",
    title: "A criança vai passar temporadas na casa do outro genitor.",
    grupo: "Na casa de outras pessoas",
    status: "publicado",
    blocks: [
      { key: "antes", label: "ANTES", body: "Mantenha, na medida do possível, comunicação cordial e direta com o outro genitor sobre rotina, saúde e regras da criança; converse com a criança sobre a transição de forma tranquila, sem críticas ao outro genitor na frente dela; combine uma forma de contato durante o período (chamada, mensagem)." },
      { key: "durante", label: "DURANTE", body: "Mantenha o contato combinado sem transformá-lo em interrogatório sobre o outro lar; esteja disponível se a criança quiser falar." },
      { key: "ensine", label: "ENSINE A CRIANÇA", body: "Que ela pode gostar dos dois lares e amar os dois adultos, sem que isso seja disputa; que os limites do corpo dela valem nas duas casas, com qualquer pessoa que more ou visite; que pode contar a qualquer um dos dois adultos se algo a incomodar em qualquer um dos lares." },
      { key: "depois", label: "DEPOIS", body: "Receba a criança com acolhimento, sem interrogar sobre o outro lar; dê espaço para ela contar no próprio tempo como foi a temporada." },
      { key: "evite", label: "EVITE", body: "Usar a criança como mensageira de conflitos entre os adultos; fazer comentários negativos sobre o outro genitor ou sobre pessoas do outro lar na frente dela; tratar qualquer desconforto da criança automaticamente como \"manipulação do outro lado\", ou, no sentido oposto, ignorá-lo por constrangimento." },
      { key: "ajuda", label: "QUANDO BUSCAR AJUDA", body: "Se a criança relatar desconforto, medo ou algo preocupante relacionado ao outro lar ou a uma nova pessoa presente nele, ou demonstrar forte resistência a ir sem explicação.\n\nSe houver relato da criança, ou uma situação concreta de violência ou de risco, procure ajuda imediatamente e acione a rede de proteção, independentemente de qual lar esteja envolvido." },
      { key: "passo", label: "MEU PRÓXIMO PASSO", body: "Combine com a criança uma forma simples de contato durante a próxima temporada e reforce que ela pode falar com você sobre qualquer coisa, em qualquer um dos lares." },
    ],
    variacaoPorIdade: {
      "0-6": "Que pode gostar dos dois lugares sem escolher um; que o corpo dela é dela nas duas casas.",
      "7-10": "Que ela pode gostar dos dois lares e amar os dois adultos, sem que isso seja disputa; que os limites do corpo dela valem nas duas casas, com qualquer pessoa que more ou visite; que pode contar a qualquer um dos dois adultos se algo a incomodar.",
      "11+": "Que amar os dois lares não é traição a nenhum deles; que seus limites corporais são os mesmos em qualquer casa e com qualquer pessoa que ali esteja; a se sentir livre para relatar desconforto a qualquer um dos responsáveis.",
    },
  },
];

export const FORTALECER: ContentItem[] = [
  {
    slug: "abrir-espaco-conversar",
    emoji: "💬",
    title: "Abrir espaço para conversar",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Uma criança só conta o que está sentindo ou vivendo se sentir, na prática e não só de palavras, que pode falar sem ser julgada, interrompida ou repreendida. Abrir espaço para conversar não é uma conversa única e solene sobre \"assuntos sérios\": é uma postura construída no dia a dia, em momentos pequenos e repetidos." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Pode me contar qualquer coisa. Eu vou te escutar.\"\n- \"Eu não vou brigar por você ter me contado isso.\"\n- \"O que você está sentindo hoje?\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que sentimentos difíceis (medo, raiva, vergonha, confusão) também podem ser ditos em voz alta; que perguntas não têm limite de assunto; que contar algo não é \"dedurar\" nem trair ninguém." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Reserve um momento regular, sem tela, só para conversar sobre o dia; escute mais do que fale nesses momentos; responda com calma mesmo quando o que ouvir for difícil: a sua reação de hoje decide se ela vai contar de novo amanhã." },
      { key: "evite", label: "🚫 EVITE", body: "Interromper, corrigir ou minimizar o que a criança está contando; reagir com choque, riso ou irritação diante de uma revelação; deixar a conversa acontecer só quando \"dá tempo\" ou \"tem assunto grave\"." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Escolha um momento fixo desta semana (o caminho da escola, a hora do banho, antes de dormir) para conversar com a criança sem pressa e sem tela por perto." },
    ],
    variacaoPorIdade: {
      "0-6": "Para a criança:\n- \"Pode me contar tudo. Eu escuto você.\"\n- \"Eu não vou brigar por você ter me contado.\"\n- \"Como você está se sentindo agora?\"",
      "7-10": "Para a criança:\n- \"Pode me contar qualquer coisa. Eu vou te escutar.\"\n- \"Eu não vou brigar por você ter me contado isso.\"\n- \"O que você está sentindo hoje?\"",
      "11+": "Para a criança ou adolescente:\n- \"Pode falar comigo sobre qualquer assunto, mesmo os difíceis. Eu vou escutar antes de reagir.\"\n- \"Contar não vai te trazer problema, mesmo que eu precise de um tempo para processar o que ouvi.\"\n- \"Como você está, de verdade?\"",
    },
  },
  {
    slug: "corpo-e-sexualidade-sem-tabu",
    emoji: "🗣️",
    title: "Falar sobre corpo e sexualidade sem tabu (adequado à idade)",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Quando o corpo e a sexualidade são tratados como tabu, a criança aprende que o assunto é proibido, e é justamente esse silêncio que dificulta que ela reconheça e conte uma violação de limite. Falar com naturalidade, com informação adequada à idade, é proteção, não exposição." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Seu corpo é seu, e você pode fazer perguntas sobre ele sempre que quiser.\"\n- Use os nomes corretos das partes do corpo, sem apelidos que soem como segredo.\n- \"Existem partes do corpo que são íntimas, e cuidar delas com respeito faz parte de crescer.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que curiosidade sobre o corpo é normal e saudável; a diferença entre informação adequada à idade e conteúdo que não é para crianças; que ela pode vir até você com qualquer dúvida, sem vergonha." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Responda às perguntas sobre o corpo com calma e informação real, do tamanho que a idade pede; use livros ou materiais adequados à idade quando precisar de apoio; normalize o assunto no cotidiano, sem torná-lo excepcional." },
      { key: "evite", label: "🚫 EVITE", body: "Repreender, desconversar ou rir de perguntas sobre o corpo; usar apelidos que soam como se o assunto fosse proibido ou sujo; dar informação demais ou de menos para a idade da criança." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Na próxima vez que a criança fizer uma pergunta sobre o corpo, responda com naturalidade e nomes corretos, sem adiar." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Seu corpo é seu. Pode me perguntar qualquer coisa sobre ele.\"\n- Use os nomes certos das partes do corpo, sem enrolação.\n- \"Tem partes do corpo que são só suas.\"",
      "7-10": "- \"Seu corpo é seu, e você pode fazer perguntas sobre ele sempre que quiser.\"\n- Use os nomes corretos das partes do corpo, sem apelidos que soem como segredo.\n- \"Existem partes do corpo que são íntimas, e cuidar delas com respeito faz parte de crescer.\"",
      "11+": "- \"Seu corpo é seu, pode me perguntar sobre sexualidade sem vergonha; prefiro que a informação venha de mim.\"\n- Use informação real e nomes corretos, sem rodeios.\n- \"Intimidade e privacidade sobre o corpo são direitos seus, inclusive diante da família.\"",
    },
  },
  {
    slug: "respeitar-o-nao",
    emoji: "✋",
    title: "Ensinar e respeitar o 'não'",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Uma criança que aprende, desde pequena, que o \"não\" dela é respeitado em coisas simples (um abraço, uma cócega, uma brincadeira) desenvolve mais repertório para recusar o que a incomoda e para reconhecer quando um limite maior é ultrapassado." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Você não precisa fazer isso se não quiser.\"\n- \"Obrigada por me dizer não. Isso é importante.\"\n- Para outros adultos: \"Ela disse que não quer. Vamos respeitar.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que \"não\" é uma palavra completa, que não precisa de justificativa; que o direito de dizer não vale com qualquer pessoa, inclusive adultos e familiares queridos; que dizer não a um adulto não é falta de respeito." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Pare imediatamente quando a criança disser \"não\" ou \"para\", mesmo em brincadeira; peça consentimento antes de contatos físicos (cócegas, colo, beijo); sustente o \"não\" dela diante de outros adultos, mesmo sob pressão social." },
      { key: "evite", label: "🚫 EVITE", body: "Insistir ou \"convencer\" depois que ela já disse não; ridicularizar ou punir a recusa; ensinar a obedecer sem questionar como valor absoluto." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Na próxima vez que a criança disser \"não\" a um contato físico, pare na hora e agradeça por ela ter dito." },
    ],
    variacaoPorIdade: {
      "0-6": "Para a criança:\n- \"Você não precisa fazer isso se não quiser.\"\n- \"Que bom que você me disse não.\"\n\nPara outros adultos: \"Ela não quer. Vamos respeitar.\"",
      "7-10": "Para a criança:\n- \"Você não precisa fazer isso se não quiser.\"\n- \"Obrigada por me dizer não. Isso é importante.\"\n\nPara outros adultos: \"Ela disse que não quer. Vamos respeitar.\"",
      "11+": "Para a criança ou adolescente:\n- \"Você não deve ceder só para evitar o desconforto de outra pessoa, seu não vale.\"\n- \"Dizer não, mesmo para mim, nunca vai te trazer problema.\"\n\nPara outros adultos: \"Ela decidiu que não. Isso encerra o assunto.\"",
    },
  },
  {
    slug: "regras-e-rotinas-seguras",
    emoji: "📋",
    title: "Combinar regras e rotinas seguras",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Regras claras e combinadas com a criança, não apenas impostas, dão a ela previsibilidade e um vocabulário para reconhecer quando algo foge do combinado. Rotinas seguras não são rigidez: são estrutura que sustenta a proteção no dia a dia." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Aqui em casa, a gente combina assim: ...\"\n- \"Se alguma coisa fugir do combinado, você pode me contar, mesmo que pareça bobagem.\"\n- \"Vamos pensar juntos em como isso pode funcionar para você?\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que regras existem para proteger, não para controlar; que ela pode ajudar a pensar nas regras, o que aumenta o compromisso dela com elas; a reconhecer quando uma situação foge do combinado (alguém pede para mudar o plano sem avisar, por exemplo)." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Envolva a criança na construção de algumas regras, de acordo com a idade; explique o porquê das regras, não só o \"porque eu disse\"; revise as regras conforme a criança cresce, mantendo-as coerentes." },
      { key: "evite", label: "🚫 EVITE", body: "Impor regras sem explicação nem espaço para perguntas; mudar as regras de forma imprevisível, sem avisar; usar as regras como punição em vez de proteção." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Escolha uma rotina da casa (chegada da escola, hora de dormir, uso de telas) e converse com a criança sobre como ela entende essa regra hoje." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Aqui em casa, a gente combina assim: ...\"\n- \"Se alguma coisa diferente acontecer, você pode me contar.\"",
      "7-10": "- \"Aqui em casa, a gente combina assim: ...\"\n- \"Se alguma coisa fugir do combinado, você pode me contar, mesmo que pareça bobagem.\"\n- \"Vamos pensar juntos em como isso pode funcionar para você?\"",
      "11+": "- \"Essas regras existem para te proteger, não para te controlar, posso explicar o porquê de cada uma.\"\n- \"Se algo sair do combinado, quero saber, mesmo que pareça pequeno.\"\n- \"Podemos revisar essas regras juntos conforme você cresce.\"",
    },
  },
  {
    slug: "vinculo-e-presenca",
    emoji: "🤗",
    title: "Vínculo e presença protetiva",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "A presença protetiva não é vigilância constante: é a certeza que a criança tem de que existe um adulto disponível, atento e confiável na vida dela. É esse vínculo que faz a diferença entre uma criança que se cala diante de uma situação difícil e uma que busca ajuda." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Eu estou aqui para você, sempre que precisar.\"\n- \"Você é importante para mim, não só quando está tudo bem.\"\n- \"Pode contar comigo mesmo quando eu estiver ocupada, eu paro para te ouvir.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que presença não é sobre estar fisicamente perto o tempo todo, mas sobre estar disponível quando importa; que ela pode buscar você mesmo em um dia corrido; que vínculo se constrói em pequenos momentos repetidos, não só em ocasiões especiais." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Reserve momentos de atenção plena, mesmo curtos, sem distrações; note e comente mudanças de humor da criança, mostrando que você observa; esteja disponível emocionalmente, não só fisicamente, nos momentos difíceis dela." },
      { key: "evite", label: "🚫 EVITE", body: "Prometer disponibilidade e não cumprir repetidamente; minimizar a importância de um momento para a criança porque, para você, parece pequeno; confundir presença física constante com vínculo: supervisão sem conexão emocional protege menos." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Hoje, reserve 10 minutos de atenção plena com a criança, sem celular, perguntando como ela está." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Eu estou aqui para você.\"\n- \"Você é importante para mim todos os dias.\"\n- \"Se eu estiver ocupada, me chama, eu paro para te ouvir.\"",
      "7-10": "- \"Eu estou aqui para você, sempre que precisar.\"\n- \"Você é importante para mim, não só quando está tudo bem.\"\n- \"Pode contar comigo mesmo quando eu estiver ocupada, eu paro para te ouvir.\"",
      "11+": "- \"Você pode contar comigo, mesmo numa fase de mais atrito entre a gente.\"\n- \"Meu carinho por você não depende de você estar bem ou se comportar como eu espero.\"\n- \"Se eu parecer ocupada, ainda assim me procure, eu reorganizo o tempo.\"",
    },
  },
  {
    slug: "nomear-sentimentos",
    emoji: "💗",
    title: "Nomear e acolher sentimentos",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Uma criança que sabe nomear o que sente (medo, raiva, vergonha, tristeza) tem mais ferramentas para identificar quando uma situação a incomoda e para comunicar isso a um adulto. Acolher o sentimento, mesmo sem resolver o problema na hora, já é proteção." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Parece que isso te deixou com raiva, triste ou com medo. Quer me contar?\"\n- \"Está tudo bem sentir isso.\"\n- \"Eu também sinto medo e vergonha às vezes. Isso não é fraqueza.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Nomes para os sentimentos, adequados à idade; que todo sentimento é válido, mesmo os desconfortáveis; que sentir algo difícil não é o mesmo que agir mal por causa dele." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Nomeie os próprios sentimentos na frente da criança, servindo de exemplo; valide o que ela sente antes de tentar resolver ou explicar; evite corrigir o sentimento dela (\"não precisa ficar triste por isso\")." },
      { key: "evite", label: "🚫 EVITE", body: "Dizer \"não é nada\", \"para de chorar\" ou \"isso não é motivo para sentir isso\"; ridicularizar sentimentos por considerá-los exagerados; exigir que ela \"supere rápido\" um sentimento difícil." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Na próxima vez que a criança demonstrar um sentimento forte, nomeie o que você observa e pergunte se ela quer conversar sobre isso." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Você tá com raiva? Ou triste? Ou com medo?\"\n- \"Pode sentir isso, tá tudo bem.\"\n- \"Eu também sinto medo, às vezes.\"",
      "7-10": "- \"Parece que isso te deixou com raiva, triste ou com medo. Quer me contar?\"\n- \"Está tudo bem sentir isso.\"\n- \"Eu também sinto medo e vergonha às vezes. Isso não é fraqueza.\"",
      "11+": "- \"O que você está sentindo com isso? Dá para colocar em palavras?\"\n- \"Todo sentimento é válido, mesmo os incômodos.\"\n- \"Eu também sinto medo e vergonha. Não é fraqueza, é sinal de que sou humana.\"",
    },
  },
  {
    slug: "nomes-partes-do-corpo",
    emoji: "🩲",
    title: "Nomes corretos das partes do corpo",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Crianças que conhecem os nomes corretos das partes do corpo, incluindo as íntimas, têm mais capacidade de comunicar com clareza se algo aconteceu, e isso facilita que adultos e profissionais entendam o relato sem ambiguidade. Apelidos podem, sem querer, reforçar a ideia de que essas partes são um segredo." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- Use os nomes anatômicos corretos desde cedo, com a mesma naturalidade usada para \"braço\" ou \"joelho\".\n- \"Essa parte se chama [nome correto]. Ela é sua e é íntima.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Os nomes corretos das partes do corpo, de forma gradual e adequada à idade; que não há problema em usar essas palavras quando necessário; a diferença entre conversar sobre o corpo com você e falar sobre isso em outros contextos." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Use os termos corretos em momentos cotidianos (banho, troca de roupa, consultas médicas); corrija com naturalidade, sem constrangimento, se a criança usar um apelido; converse com outros cuidadores para manter a mesma linguagem." },
      { key: "evite", label: "🚫 EVITE", body: "Usar apenas apelidos infantilizados para as partes íntimas; demonstrar constrangimento ao nomear essas partes, o que ensina à criança que o assunto é vergonhoso; evitar o tema até que \"ela pergunte\"." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Na próxima oportunidade natural (banho, troca de roupa), use os nomes corretos das partes íntimas com a criança." },
    ],
    variacaoPorIdade: {
      "0-6": "- Use os nomes anatômicos corretos, com a mesma naturalidade de \"braço\" ou \"joelho\".\n- \"Essa parte se chama [nome correto]. É sua.\"",
      "7-10": "- Use os nomes anatômicos corretos desde cedo, com a mesma naturalidade usada para \"braço\" ou \"joelho\".\n- \"Essa parte se chama [nome correto]. Ela é sua e é íntima.\"",
      "11+": "- Use os nomes anatômicos corretos e informação real sobre o corpo, sem constrangimento.\n- \"Saber o nome certo das suas partes íntimas é parte de conhecer e cuidar do seu próprio corpo.\"",
    },
  },
  {
    slug: "privacidade-cotidiana",
    emoji: "🚪",
    title: "Privacidade: banho, troca de roupa, quarto",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Ensinar privacidade no cotidiano (bater na porta, permitir que a criança troque de roupa sozinha quando apropriado à idade, respeitar o momento do banho) constrói, na prática, a noção de que o corpo dela tem um espaço só seu, que os outros devem respeitar." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Vou bater na porta antes de entrar, e você também pode fazer isso comigo.\"\n- \"Esse é o seu momento de privacidade. Estou aqui perto se precisar.\"\n- \"Você pode pedir privacidade sempre que quiser, mesmo com pessoas da família.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que privacidade é um direito dela, não uma regra arbitrária; a diferença entre momentos que ainda pedem ajuda de um adulto (bebês, crianças muito pequenas) e momentos que ela já pode fazer sozinha, conforme a idade; que ela pode pedir privacidade e que isso deve ser respeitado." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Bata na porta antes de entrar no quarto ou banheiro da criança; ajuste gradualmente a supervisão no banho e na troca de roupa conforme a idade e a autonomia dela; respeite quando ela pedir para fechar a porta ou ter um momento sozinha." },
      { key: "evite", label: "🚫 EVITE", body: "Entrar sem avisar em momentos de privacidade da criança; expor o corpo dela desnecessariamente diante de outras pessoas (trocar roupa na sala com visitas, por exemplo); ridicularizar o pedido de privacidade como \"frescura\"." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Combine com a criança um sinal simples para pedir privacidade em casa, e comece a respeitá-lo a partir de hoje." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Vou bater na porta antes de entrar.\"\n- \"Esse é seu momento sozinha. Eu fico por perto.\"",
      "7-10": "- \"Vou bater na porta antes de entrar, e você também pode fazer isso comigo.\"\n- \"Esse é o seu momento de privacidade. Estou aqui perto se precisar.\"\n- \"Você pode pedir privacidade sempre que quiser, mesmo com pessoas da família.\"",
      "11+": "- \"Sua privacidade é um direito, não um favor, vale para o quarto, o banho e as suas coisas.\"\n- \"Pode pedir espaço sempre que precisar, inclusive comigo, sem precisar se justificar.\"",
    },
  },
  {
    slug: "toques-seguros",
    emoji: "🙅",
    title: "Toques seguros e não seguros",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Ensinar a diferença entre toques seguros e não seguros dá à criança um critério prático para reconhecer quando algo está errado, não porque alguém disse que é ruim, mas porque ela mesma sentiu desconforto, dor, ou percebeu segredo envolvido." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Um toque seguro não machuca, não é escondido, e você pode dizer não a ele.\"\n- \"Se um toque te deixar confusa, com medo, ou pedirem para você não contar, isso não é seguro: me conte.\"\n- \"Seu corpo te avisa quando algo não está certo. Preste atenção nisso.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que toques seguros são aqueles que ela permite, que não machucam e não envolvem segredo; que toques não seguros podem vir de qualquer pessoa, inclusive alguém conhecido ou querido; que ela pode dizer não a qualquer toque, mesmo de um adulto." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Converse sobre exemplos concretos e adequados à idade (aperto de mão, abraço combinado, versus toques em partes íntimas); reforce que ela pode recusar qualquer toque, mesmo de parentes; pratique frases que ela pode usar para recusar (\"Para, eu não gosto disso\")." },
      { key: "evite", label: "🚫 EVITE", body: "Tratar o tema de forma assustadora ou como aviso único; deixar de reforçar que a maioria dos toques do dia a dia é segura, para não gerar medo generalizado; adiar esse ensino por considerar \"ela é muito pequena\": a linguagem se adapta à idade, o conteúdo não espera." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Converse com a criança, usando exemplos do dia a dia, sobre o que diferencia um toque seguro de um que não é." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Um toque bom não machuca e você pode dizer não.\"\n- \"Se um toque te assustar ou pedirem segredo, me conta.\"\n- \"Seu corpo avisa quando algo não está certo.\"",
      "7-10": "- \"Um toque seguro não machuca, não é escondido, e você pode dizer não a ele.\"\n- \"Se um toque te deixar confusa, com medo, ou pedirem para você não contar, isso não é seguro, me conte.\"\n- \"Seu corpo te avisa quando algo não está certo. Preste atenção nisso.\"",
      "11+": "- \"Um toque seguro nunca vem com pedido de sigilo, nem ignora um não.\"\n- \"Confusão, medo ou desconforto físico são sinais válidos, mesmo sem saber explicar por quê, me conte.\"\n- \"Confie no que seu corpo sinaliza, mesmo sobre pessoas de confiança.\"",
    },
  },
  {
    slug: "ensinar-a-pedir-ajuda",
    emoji: "🆘",
    title: "Ensinar a criança a pedir ajuda",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Saber pedir ajuda é uma habilidade que se ensina, não algo que a criança simplesmente \"sabe fazer\" quando precisa. Uma criança preparada para pedir ajuda tem mais chances de buscar um adulto diante de qualquer situação difícil, inclusive as mais graves." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Pedir ajuda é uma força, não uma fraqueza.\"\n- \"Se algo te incomodar, você pode procurar a mim, [outro adulto de confiança] ou [outra pessoa combinada].\"\n- \"Não existe motivo pequeno demais para pedir ajuda.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que pedir ajuda não é \"dar trabalho\" para ninguém; a quem ela pode recorrer em diferentes lugares (casa, escola, na rua); frases simples que pode usar para pedir ajuda a um adulto em uma emergência." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Ensaie com a criança situações práticas de pedir ajuda (perguntar a um funcionário uniformizado, discar um número de emergência); elogie sempre que ela pedir ajuda, mesmo para coisas pequenas; mostre, com exemplos, que você também pede ajuda quando precisa." },
      { key: "evite", label: "🚫 EVITE", body: "Repreender ou se irritar quando a criança pede ajuda para algo que você considera \"bobo\": isso ensina a não pedir da próxima vez; valorizar \"resolver sozinho\" como sempre a atitude mais correta; deixar de apresentar pessoas de confiança em diferentes ambientes da vida dela." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Converse com a criança sobre pelo menos três pessoas ou lugares aos quais ela pode recorrer se precisar de ajuda e você não estiver por perto." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Pedir ajuda é coisa de gente forte.\"\n- \"Se algo te incomodar, procura a mim ou [outro adulto combinado].\"\n- \"Nenhum motivo é pequeno demais para pedir ajuda.\"",
      "7-10": "- \"Pedir ajuda é uma força, não uma fraqueza.\"\n- \"Se algo te incomodar, você pode procurar a mim, [outro adulto de confiança] ou [outra pessoa combinada].\"\n- \"Não existe motivo pequeno demais para pedir ajuda.\"",
      "11+": "- \"Pedir ajuda não é fracasso, é uma habilidade que vale a vida toda.\"\n- \"Tenha mais de uma pessoa de confiança para recorrer, além de mim: [nomes combinados].\"\n- \"Nunca minimize o que sente só porque parece 'não ser tão grave'.\"",
    },
  },
  {
    slug: "rede-de-apoio",
    emoji: "👥",
    title: "Rede de apoio da criança",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Quanto mais adultos de confiança a criança reconhece na própria vida, menos dependente ela fica de uma única pessoa para se sentir segura, e maior a chance de que, se algo acontecer com alguém próximo a você, ela ainda tenha a quem recorrer." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Além de mim, você pode confiar em [nomes de pessoas combinadas].\"\n- \"Se um dia você não conseguir falar comigo, para quem você acha que poderia ir?\"\n- \"Ter mais de uma pessoa de confiança é bom, não significa que você confia menos em mim.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "A identificar, entre os adultos que já conhece, dois ou três em quem confia; que essa rede pode incluir familiares, professores, vizinhos ou pais de amigos; que ter uma rede de apoio não é sobre desconfiar de ninguém, é sobre ter opções." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Construa, junto com a criança, uma pequena lista de adultos de confiança, mesmo que informal; apresente-a formalmente a esses adultos, deixando claro o papel deles; revise essa rede de tempos em tempos, conforme a vida da criança muda." },
      { key: "evite", label: "🚫 EVITE", body: "Deixar que a criança dependa de um único adulto como sua única referência de proteção; incluir na rede pessoas que você mesma não conhece bem ou não confia plenamente; construir essa lista sem consultar a própria criança sobre em quem ela confia." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Converse com a criança e monte, juntos, uma pequena lista de adultos de confiança fora de casa." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Além de mim, você pode confiar em [nomes combinados].\"\n- \"Se um dia não conseguir falar comigo, para quem você iria?\"",
      "7-10": "- \"Além de mim, você pode confiar em [nomes de pessoas combinadas].\"\n- \"Se um dia você não conseguir falar comigo, para quem você acha que poderia ir?\"\n- \"Ter mais de uma pessoa de confiança é bom, não significa que você confia menos em mim.\"",
      "11+": "- \"Construir sua própria rede de confiança, além de mim, é parte de crescer, não uma traição.\"\n- \"Se por algum motivo eu não for a primeira pessoa que você procura, quero saber quem seria, para eu ter certeza de que você não fica sem apoio.\"",
    },
  },
  {
    slug: "autonomia-progressiva",
    emoji: "🧭",
    title: "Autonomia progressiva com segurança",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Autonomia e proteção não são opostas: uma criança que ganha independência de forma gradual e acompanhada desenvolve mais confiança em si mesma e mais critério para reconhecer situações de risco, em vez de menos." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Vamos experimentar você fazer isso sozinha, e eu fico por perto.\"\n- \"Você está pronta para mais essa responsabilidade. Vamos combinar como vai funcionar?\"\n- \"Se algo der errado, você pode voltar e me contar, sem problema.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que autonomia se conquista aos poucos, com prática e confiança mútua; que pedir ajuda no meio do caminho não é fracasso da autonomia; a avaliar, com o apoio de um adulto, se está pronta para um novo passo." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Amplie a autonomia em pequenos passos, avaliando como a criança lida com cada novo nível; esteja disponível durante a transição, sem assumir o controle de volta ao primeiro sinal de dificuldade; celebre os avanços, sem punir os tropeços." },
      { key: "evite", label: "🚫 EVITE", body: "Empurrar autonomia antes que a criança esteja pronta, por comparação com outras crianças; tirar autonomias já conquistadas como punição por erros não relacionados; superproteger a ponto de não permitir nenhuma experiência independente." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Identifique uma pequena responsabilidade nova que a criança pode assumir esta semana, com seu acompanhamento." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Vamos tentar você fazer isso sozinha, e eu fico bem perto.\"\n- \"Se der errado, você pode me contar, sem problema.\"",
      "7-10": "- \"Vamos experimentar você fazer isso sozinha, e eu fico por perto.\"\n- \"Você está pronta para mais essa responsabilidade. Vamos combinar como vai funcionar?\"\n- \"Se algo der errado, você pode voltar e me contar, sem problema.\"",
      "11+": "- \"Confio em você para essa responsabilidade: vamos combinar os limites juntos, não impor de cima para baixo.\"\n- \"Autonomia não significa que você está por sua conta: se precisar recuar ou pedir ajuda, isso não é fracasso.\"",
    },
  },
  {
    slug: "riscos-online",
    emoji: "⚠️",
    title: "Riscos online e aliciamento",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Crianças e adolescentes são alvo frequente de tentativas de aliciamento on-line, que costumam seguir um padrão reconhecível: aproximação, elogios excessivos, pedido de segredo, isolamento da família, e progressão para pedidos cada vez mais íntimos. Reconhecer esse padrão é proteção." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Quem só existe on-line pode não ser quem diz ser.\"\n- \"Se alguém pedir para você manter segredo de mim, isso é um sinal de alerta: me conte.\"\n- \"Ninguém deve te pedir fotos suas, mesmo alguém que parece legal.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Os sinais comuns de aliciamento: elogios exagerados, pedidos de segredo, insistência em conversar em privado, pedido de fotos ou de encontro; que aliciadores frequentemente se passam por pessoas mais jovens ou fingem interesses em comum; que ela nunca é culpada se cair em uma dessas armadilhas." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Converse regularmente sobre as pessoas com quem ela interage on-line; revise juntos as configurações de privacidade das redes e aplicativos que usa; mantenha um ambiente em que ela sinta segurança para mostrar conversas estranhas sem medo de punição." },
      { key: "evite", label: "🚫 EVITE", body: "Culpar a criança se ela for alvo de uma tentativa de aliciamento; proibir o uso de tecnologia como única resposta, sem ensinar a reconhecer os riscos; ignorar sinais como sigilo súbito, novos \"amigos\" on-line, ou presentes recebidos sem explicação clara." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Converse com a criança sobre os sinais de alerta de aliciamento on-line, usando exemplos concretos e adequados à idade." },
    ],
    variacaoPorIdade: {
      "7-10": "- \"Quem só existe on-line pode não ser quem diz ser.\"\n- \"Se alguém pedir para você manter segredo de mim, isso é um sinal de alerta, me conte.\"\n- \"Ninguém deve te pedir fotos suas, mesmo alguém que parece legal.\"",
      "11+": "- \"Uma identidade on-line pode ser totalmente inventada, desconfie mesmo de quem parece 'perfeito' demais.\"\n- \"Pedido de sigilo, insistência ou pressão para se encontrar pessoalmente são sinais de alerta, não de que você é 'especial' para alguém.\"\n- \"Ninguém tem o direito de te pedir fotos íntimas, seja quem for.\"",
    },
  },
  {
    slug: "acordos-de-telas",
    emoji: "📱",
    title: "Acordos de uso de telas em família",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Acordos claros e construídos junto com a criança sobre o uso de telas criam previsibilidade e abrem espaço de diálogo, muito mais eficazes para a proteção do que proibições unilaterais, que tendem a levar ao uso escondido." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Vamos combinar juntos como vai funcionar o uso de telas aqui em casa.\"\n- \"Esses combinados valem para todo mundo da família, não só para você.\"\n- \"Se algo no combinado não estiver funcionando, podemos revisar.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que acordos existem para equilibrar uso saudável e segurança, não para controlar por controlar; a importância de pausas, horários de sono protegidos e espaços livres de tela; que ela pode participar da construção das regras." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Construa os acordos com a participação da criança, adequados à idade; aplique as mesmas regras de uso consciente para os adultos da casa; revise os acordos periodicamente, conforme a idade e a confiança mudam." },
      { key: "evite", label: "🚫 EVITE", body: "Impor regras de tela sem diálogo nem explicação; ter regras rígidas para a criança e nenhuma para os adultos da casa; usar o acesso a telas como moeda de punição ou recompensa de forma desproporcional." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Reúna a família esta semana para construir ou revisar, juntos, os combinados de uso de telas." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"A gente vai combinar juntos o uso de tela aqui em casa.\"\n- \"Essas regras valem para todo mundo, não só para você.\"",
      "7-10": "- \"Vamos combinar juntos como vai funcionar o uso de telas aqui em casa.\"\n- \"Esses combinados valem para todo mundo da família, não só para você.\"\n- \"Se algo no combinado não estiver funcionando, podemos revisar.\"",
      "11+": "- \"Quero construir esse acordo de telas com você, não só impor um limite.\"\n- \"As regras valem para toda a família, inclusive para mim.\"\n- \"Podemos revisar o acordo conforme você demonstra responsabilidade.\"",
    },
  },
  {
    slug: "o-que-compartilhar-online",
    emoji: "📸",
    title: "O que compartilhar (e o que não) na internet",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Crianças e adolescentes nem sempre percebem o alcance e a permanência do que compartilham on-line. Ensinar critérios claros sobre o que é seguro compartilhar ajuda a prevenir exposição, constrangimento e uso indevido de informações e imagens." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Uma vez publicado, pode ser impossível apagar de verdade: pense antes de postar.\"\n- \"Nunca envie fotos suas sem roupa ou de partes íntimas para ninguém, mesmo um namorado ou amigo.\"\n- \"Se alguém pedir uma foto assim, ou compartilhar uma sua sem permissão, me conte: você não vai se meter em problema.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "O que nunca deve ser compartilhado (endereço, escola, localização em tempo real, fotos íntimas); que compartilhar uma imagem de outra pessoa sem consentimento também causa dano; que ela pode e deve contar se alguém pedir ou compartilhar conteúdo íntimo dela." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Revise juntos as configurações de privacidade das redes que ela usa; converse sobre situações hipotéticas para discutir decisões de compartilhamento, sem expor ninguém real; mantenha um canal de confiança para que ela conte sem medo, mesmo se já tiver compartilhado algo de que se arrependeu." },
      { key: "evite", label: "🚫 EVITE", body: "Reagir com pânico ou punição severa se ela já tiver compartilhado algo inadequado: isso a afasta de contar da próxima vez; abordar o tema só uma vez, como um aviso único; tratar o compartilhamento de imagens de terceiros como \"sem importância\"." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Converse com a criança sobre o que ela já compartilha on-line e reforce, juntos, o que nunca deve ser compartilhado." },
    ],
    variacaoPorIdade: {
      "7-10": "- \"Uma vez publicado, pode ser impossível apagar de verdade, pense antes de postar.\"\n- \"Nunca envie fotos suas sem roupa ou de partes íntimas para ninguém.\"\n- \"Se alguém pedir uma foto assim, ou compartilhar uma sua sem permissão, me conte, você não vai se meter em problema.\"",
      "11+": "- \"O que você publica pode circular fora do seu controle, mesmo com privacidade configurada, pense antes de postar.\"\n- \"Nunca envie fotos íntimas para ninguém, nem mesmo um namorado ou alguém de confiança: não é sobre confiar, é sobre o que sai do seu controle depois.\"\n- \"Se alguém pedir, pressionar, ou compartilhar uma imagem sua sem permissão, me conte: a responsabilidade é de quem pediu ou compartilhou, não sua.\"",
    },
  },
  {
    slug: "respeito-e-consentimento",
    emoji: "🤝",
    title: "Respeito e consentimento no dia a dia",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Consentimento não é um conceito só para adultos: praticado no cotidiano, em pequenas escolhas, ensina à criança que sua vontade sobre o próprio corpo e seus limites tem peso, e que ela também deve respeitar a vontade dos outros." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Posso te dar um abraço?\"\n- \"Você quer participar dessa brincadeira, ou prefere não?\"\n- \"Assim como você decide sobre seu corpo, os colegas decidem sobre o deles.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que pedir permissão antes de tocar, pegar algo ou entrar em um espaço é parte do respeito; que consentimento pode ser retirado a qualquer momento, mesmo no meio de uma brincadeira; que respeitar o limite do outro é tão importante quanto ter o próprio respeitado." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Modele o pedido de consentimento nas suas próprias interações com a criança; nomeie situações do dia a dia em que o consentimento aparece (emprestar um brinquedo, escolher uma brincadeira); reforce, com elogio, quando a criança pede permissão ou respeita um \"não\" de outra criança." },
      { key: "evite", label: "🚫 EVITE", body: "Forçar a criança a compartilhar, abraçar ou interagir fisicamente contra a vontade dela, mesmo em nome da educação; ignorar quando ela desrespeita o limite de outra criança; tratar consentimento como assunto \"só de adulto\", sem trazê-lo para o cotidiano infantil." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Nas próximas interações do dia, pratique pedir consentimento à criança antes de um toque ou de mexer em algo dela, como exemplo." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Posso te dar um abraço?\"\n- \"Você quer brincar disso, ou não?\"\n- \"Do jeito que você decide sobre seu corpo, seus amigos decidem sobre o deles.\"",
      "7-10": "- \"Posso te dar um abraço?\"\n- \"Você quer participar dessa brincadeira, ou prefere não?\"\n- \"Assim como você decide sobre seu corpo, os colegas decidem sobre o deles.\"",
      "11+": "- \"Vou perguntar antes de te tocar, mesmo com afeto, e espero o mesmo dos seus amigos e futuros parceiros.\"\n- \"Consentimento vale em qualquer relação, incluindo as afetivas e românticas, desde já.\"\n- \"O direito de decidir sobre o próprio corpo é mútuo: seu e de qualquer outra pessoa.\"",
    },
  },
  {
    slug: "pressao-de-grupo",
    emoji: "👫",
    title: "Pressão de grupo e amizades",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Crianças e adolescentes frequentemente cedem a pedidos que não querem atender por medo de perder uma amizade ou de serem excluídos do grupo. Fortalecer a capacidade de recusar, mesmo sob essa pressão, é proteção para o presente e para o futuro." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Um amigo de verdade aceita um não.\"\n- \"Você pode dizer não a algo e continuar sendo amiga da pessoa.\"\n- \"O que você faria se um amigo pedisse para você fazer algo que não quer?\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que ceder à pressão não é o preço da amizade; frases prontas para recusar sem crise (\"não curto isso\", \"prefiro não\"); que ela pode se afastar de uma situação de grupo a qualquer momento, mesmo sem explicar o motivo." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Converse sobre exemplos concretos e adequados à idade de pressão de grupo (experimentar algo proibido, participar de uma brincadeira que exclui alguém, manter segredo de um grupo); pratique, em conversa, respostas para recusar sem constrangimento; valorize decisões da criança de se afastar de situações desconfortáveis, mesmo que isso gere conflito social." },
      { key: "evite", label: "🚫 EVITE", body: "Pressionar a criança a \"se enturmar a qualquer custo\"; minimizar a importância das amizades na vida dela, o que pode afastá-la de conversar sobre isso; culpá-la por ter cedido a uma pressão no passado." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Converse com a criança sobre uma situação hipotética de pressão de grupo e pratique juntos uma frase de recusa." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Um amigo de verdade aceita quando você diz não.\"\n- \"Você pode dizer não e continuar amiga da pessoa.\"",
      "7-10": "- \"Um amigo de verdade aceita um não.\"\n- \"Você pode dizer não a algo e continuar sendo amiga da pessoa.\"\n- \"O que você faria se um amigo pedisse para você fazer algo que não quer?\"",
      "11+": "- \"Quem te pressiona repetidamente não está sendo seu amigo, está testando seus limites.\"\n- \"Dizer não a um grupo é mais difícil, mas o direito de recusar não desaparece por ser 'todo mundo'.\"\n- \"Como você reagiria se um amigo, ou um grupo, insistisse em algo que te incomoda?\"",
    },
  },
  {
    slug: "segredos-e-surpresas",
    emoji: "🤫",
    title: "Segredos e surpresas",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Ensinar a diferença entre segredo e surpresa dá à criança um critério concreto para identificar quando um pedido de sigilo é seguro (uma festa surpresa) ou não (algo que a machuca e que um adulto pediu para esconder)." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Surpresa é algo bom que vai ser revelado em breve, como um presente. Segredo que machuca nunca deveria ser pedido a você.\"\n- \"Se alguém pedir para você esconder algo de mim para sempre, isso não é surpresa, pode me contar.\"\n- \"Nenhum adulto deveria pedir para você guardar segredo sobre o próprio corpo.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "A diferença prática: surpresa tem prazo curto e deixa todo mundo feliz quando é revelada; segredo que preocupa, envolve desconforto ou é sobre o corpo nunca deve ser mantido; que contar um \"segredo que machuca\" não é quebrar promessa, é se proteger." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Use exemplos concretos do cotidiano para diferenciar os dois tipos; reforce sempre que ela contar algo que estava \"em segredo\", agradecendo em vez de repreender; converse com outros adultos da família sobre não pedir segredos à criança." },
      { key: "evite", label: "🚫 EVITE", body: "Pedir você mesma que a criança guarde segredos de outros adultos da família, mesmo por brincadeira, o que confunde o conceito; punir a criança por \"estragar uma surpresa\" contada sem querer; ignorar quando ela mencionar um segredo pedido por alguém." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Explique à criança, com um exemplo real e um exemplo hipotético, a diferença entre segredo e surpresa." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Surpresa é coisa boa, como um presente. Segredo que machuca ninguém deveria te pedir.\"\n- \"Se alguém pedir para esconder de mim para sempre, isso não é surpresa, me conta.\"",
      "7-10": "- \"Surpresa é algo bom que vai ser revelado em breve, como um presente. Segredo que machuca nunca deveria ser pedido a você.\"\n- \"Se alguém pedir para você esconder algo de mim para sempre, isso não é surpresa, pode me contar.\"\n- \"Nenhum adulto deveria pedir para você guardar segredo sobre o próprio corpo.\"",
      "11+": "- \"Existe diferença entre surpresa (temporária, boa, com prazo) e segredo (permanente, pesado, pedido para te calar): reconheça qual é qual.\"\n- \"Ninguém, nem alguém de confiança, tem o direito de te pedir sigilo permanente sobre algo que te incomoda ou envolve seu corpo.\"",
    },
  },
  {
    slug: "so-brincadeira",
    emoji: "🃏",
    title: "Quando 'é só brincadeira' deixa de ser",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "A frase \"é só brincadeira\" costuma ser usada para minimizar um desconforto real da criança, em cócegas insistentes, apelidos, empurrões ou brincadeiras de conteúdo sexual. Reconhecer esse limite protege a criança de normalizar situações que a incomodam." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Brincadeira é quando todo mundo está se divertindo. Se alguém não está gostando, não é mais brincadeira.\"\n- \"Você pode dizer 'chega' mesmo estando brincando, e a pessoa deve parar.\"\n- \"Se uma brincadeira te deixar sem graça ou incomodada, vale a pena me contar.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "Que a intenção de quem brinca não anula o efeito sobre quem sofre a brincadeira; sinais de que uma brincadeira passou do limite (choro, silêncio, tentativa de fugir, raiva); que ela pode parar uma brincadeira a qualquer momento, mesmo que tenha topado no início." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Intervenha quando perceber que uma brincadeira já não é divertida para todos os envolvidos; valide o desconforto da criança em vez de dizer \"não foi nada\"; ensine, pelo exemplo, a parar imediatamente quando alguém pede." },
      { key: "evite", label: "🚫 EVITE", body: "Dizer \"para de exagero, é só brincadeira\" quando a criança demonstra desconforto real; permitir brincadeiras com conteúdo sexual ou humilhante entre crianças \"porque são crianças\"; ignorar padrões de brincadeira que sempre incomodam a mesma criança." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Da próxima vez que presenciar uma brincadeira, observe se todos os envolvidos realmente estão gostando, e intervenha se não estiverem." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Brincadeira é quando todo mundo está gostando. Se alguém não gosta, já não é mais brincadeira.\"\n- \"Você pode dizer 'chega' e a pessoa deve parar.\"",
      "7-10": "- \"Brincadeira é quando todo mundo está se divertindo. Se alguém não está gostando, não é mais brincadeira.\"\n- \"Você pode dizer 'chega' mesmo estando brincando, e a pessoa deve parar.\"\n- \"Se uma brincadeira te deixar sem graça ou incomodada, vale a pena me contar.\"",
      "11+": "- \"'Só brincadeira' não anula o efeito real em quem está incomodado: se alguém pede para parar, encerra ali.\"\n- \"Você pode marcar esse limite mesmo em grupo, mesmo correndo o risco de parecer 'sem graça'.\"\n- \"Se uma brincadeira deixou de ser divertida para você, isso já é motivo suficiente para contar, sem precisar provar nada.\"",
    },
  },
  {
    slug: "postura-do-adulto",
    emoji: "🛡️",
    title: "Autoproteção sem responsabilizar a criança",
    status: "publicado",
    blocks: [
      { key: "importa", label: "POR QUE ISSO IMPORTA?", body: "Ensinar a criança a se proteger não pode significar transferir para ela a responsabilidade pela própria segurança. A proteção é sempre do adulto; o que se ensina à criança é participação, não responsabilidade final." },
      { key: "dizer", label: "💬 O QUE POSSO DIZER?", body: "- \"Você pode aprender a reconhecer o que te deixa desconfortável, mas proteger você é meu trabalho.\"\n- \"Se algo acontecer, a culpa nunca é sua, mesmo que você não tenha dito não a tempo.\"\n- \"Eu sou responsável por cuidar de você. Você não precisa dar conta disso sozinha.\"" },
      { key: "ensinar", label: "🧠 O QUE POSSO ENSINAR?", body: "A diferença entre \"aprender a reconhecer e comunicar\" e \"ser responsável por evitar\": a primeira é dela, a segunda é sua; que ela nunca vai ser culpada por algo que um adulto fez; que participar da própria proteção (falar, recusar, contar) não a torna responsável pelo resultado." },
      { key: "praticar", label: "🛡️ O QUE POSSO PRATICAR?", body: "Revise a própria linguagem, evitando frases como \"você tem que se cuidar\" sem deixar claro que você também cuida dela; assuma, nas suas palavras e ações, a responsabilidade pela segurança da criança; evite cobrar da criança que ela \"devia ter percebido\" algo, mesmo diante de uma situação que já aconteceu." },
      { key: "evite", label: "🚫 EVITE", body: "Transferir para a criança a expectativa de prever ou impedir sozinha uma situação de risco; usar frases que soem como culpa (\"por que você não me contou antes?\", \"você devia ter dito não\"); ensinar autoproteção como se fosse suficiente, sem manter sua própria vigilância e presença." },
      { key: "passo", label: "➡️ MEU PASSO DE PROTEÇÃO", body: "Revise, nesta semana, como você fala sobre proteção com a criança, e ajuste qualquer frase que coloque nela a responsabilidade que é sua." },
    ],
    variacaoPorIdade: {
      "0-6": "- \"Você pode aprender o que te deixa desconfortável, mas cuidar de você é meu trabalho.\"\n- \"Se algo acontecer, a culpa nunca é sua.\"\n- \"Eu cuido de você. Você não precisa resolver isso sozinha.\"",
      "7-10": "- \"Você pode aprender a reconhecer o que te deixa desconfortável, mas proteger você é meu trabalho.\"\n- \"Se algo acontecer, a culpa nunca é sua, mesmo que você não tenha dito não a tempo.\"\n- \"Eu sou responsável por cuidar de você. Você não precisa dar conta disso sozinha.\"",
      "11+": "- \"Reconhecer seus próprios limites é uma habilidade que você está construindo, mas a responsabilidade pela sua proteção continua sendo minha, não sua.\"\n- \"Se algo acontecer, a culpa nunca é sua, mesmo que você tenha reagido diferente do que 'deveria', ou demorado para dizer não.\"\n- \"Você não precisa se proteger sozinha. Esse é o meu papel, e eu levo isso a sério.\"",
    },
  },
];


export const MINHA_VOZ = [
  { title: "VER", body: "Perceber o que está acontecendo." },
  { title: "OUVIR", body: "Compreender o que a criança está comunicando." },
  { title: "ZELAR", body: "Assumir responsabilidade pela proteção e buscar a resposta adequada." },
];

/**
 * Reflexão de presença protetiva, organizada pela Bússola VOZ (Ver · Ouvir · Zelar — DOC 08).
 * Não é teste nem gera diagnóstico ou pontuação — só devolve, ao final, os pontos que a
 * pessoa mesma marcou como "às vezes" ou "ainda não" (DOC_PRODUTO §10.3).
 */
export const PRESENCA_GRUPOS: { grupo: "VER" | "OUVIR" | "ZELAR"; perguntas: string[] }[] = [
  {
    grupo: "VER",
    perguntas: [
      "Eu percebo quando algo muda no comportamento da criança?",
      "Sei diferenciar uma mudança pontual de um padrão que se repete?",
      "Observo com quem e em quais situações a criança fica mais à vontade ou mais retraída?",
    ],
  },
  {
    grupo: "OUVIR",
    perguntas: [
      "A criança sabe que pode conversar comigo sobre qualquer coisa, mesmo algo difícil?",
      "Eu respeito quando ela diz não, mesmo em coisas pequenas?",
      "Consigo escutar sem pressionar, sem interrogar e sem repetir a mesma pergunta?",
    ],
  },
  {
    grupo: "ZELAR",
    perguntas: [
      "Converso sobre limites e segurança no dia a dia, não só depois que algo acontece?",
      "Ensino a criança a pedir ajuda e sei a quem recorrer, dentro e fora de casa?",
      "Sei onde buscar orientação quando eu mesmo não sei o que fazer?",
      "Minha forma de agir costuma aumentar a sensação de segurança da criança, ou o medo?",
    ],
  },
];

export const NOTIFICACOES: NotificationItem[] = [
  {
    id: "faixa-etaria",
    data: "2026-09-16",
    titulo: "Fala adaptada por faixa etária",
    corpo:
      "Em Aconteceu, Vai Acontecer e Quero Fortalecer, você já pode ajustar a fala sugerida pela idade da criança: pequena, média ou grande.",
    link: { to: "/voz-protetora/aconteceu", label: "Ver Aconteceu" },
  },
  {
    id: "tres-paginas-de-apoio",
    data: "2026-09-16",
    titulo: "Preciso de Ajuda, Minha Presença e Meu Passo atualizados",
    corpo:
      "As três páginas de apoio agora têm conteúdo completo: canais de ajuda reais, reflexão de presença protetiva pela Bússola VOZ, e registro pessoal do seu passo de proteção.",
    link: { to: "/voz-protetora/preciso-de-ajuda", label: "Ver Preciso de Ajuda" },
  },
  {
    id: "busca",
    data: "2026-09-15",
    titulo: "Busca no conteúdo",
    corpo: "Agora você pode buscar por palavra-chave em todas as orientações do produto.",
    link: { to: "/voz-protetora/busca", label: "Usar a busca" },
  },
  {
    id: "banco-completo",
    data: "2026-09-14",
    titulo: "Banco de Situações completo",
    corpo:
      "As 60 orientações do Voz Protetora já estão disponíveis: 20 em Aconteceu, 20 em Vai Acontecer e 20 em Quero Fortalecer.",
    link: { to: "/voz-protetora", label: "Explorar o produto" },
  },
];

export const AJUDA_CONTEUDO: { tema: string; oQueFazer: string }[] = [
  {
    tema: "Possível violência",
    oQueFazer:
      "Garanta primeiro a segurança da criança. Não confronte quem você suspeita nem investigue por conta própria. Procure o Conselho Tutelar da sua cidade ou ligue 100 (Disque Direitos Humanos) para orientação e encaminhamento.",
  },
  {
    tema: "Revelação da criança",
    oQueFazer:
      "Acolha sem interrogar: \"Você fez bem em me contar. Eu vou cuidar disso.\" Não prometa segredo. Registre o que ela disse, com as palavras dela, e procure orientação profissional ou o Conselho Tutelar ainda hoje.",
  },
  {
    tema: "Ameaça",
    oQueFazer:
      "Se a ameaça envolver risco imediato à integridade da criança, ligue 190 (Polícia Militar) agora. Fora de risco imediato, registre boletim de ocorrência e procure o Conselho Tutelar ou a delegacia especializada da sua região.",
  },
  {
    tema: "Risco imediato",
    oQueFazer:
      "Priorize a segurança agora: afaste a criança do risco e ligue 190 (Polícia) ou 192 (SAMU), conforme a situação. Não espere ter certeza de tudo antes de agir.",
  },
  {
    tema: "Coerção",
    oQueFazer:
      "Interrompa a situação e assegure à criança que ela não é obrigada a ceder a ninguém. Procure orientação com um psicólogo, a escola ou o Conselho Tutelar para entender os próximos passos.",
  },
  {
    tema: "Suspeita de abuso",
    oQueFazer:
      "Não investigue nem confronte sozinho. Acolha a criança, garanta que ela esteja segura, e leve a suspeita ao Conselho Tutelar, à delegacia especializada (DPCA) ou ligue 100. Um profissional qualificado avalia o que aconteceu.",
  },
  {
    tema: "Situações envolvendo imagens íntimas",
    oQueFazer:
      "Não compartilhe, reenvie ou visualize o conteúdo além do necessário para denunciar. Preserve como prova, sem republicar. Denuncie pelo Disque 100, na Polícia (190) ou em safernet.org.br. Busque apoio psicológico para a criança.",
  },
  {
    tema: "Não sei se devo procurar ajuda",
    oQueFazer:
      "Você não precisa ter certeza para buscar orientação: essa é justamente a função da rede de proteção. Ligue 100 ou procure o Conselho Tutelar para conversar sobre a situação, mesmo que ainda esteja em dúvida.",
  },
];

/** Canais nacionais de proteção — informação verificada em 2026-09-16 (DOC 09 §9). */
export const CANAIS_NACIONAIS: { nome: string; contato: string; quando: string }[] = [
  {
    nome: "Risco imediato à vida",
    contato: "190 (Polícia) · 192 (SAMU)",
    quando: "Emergência agora, não espere.",
  },
  {
    nome: "Disque 100",
    contato: "100, ligação gratuita, 24h",
    quando: "Denúncia e orientação sobre violência contra crianças e adolescentes.",
  },
  {
    nome: "Conselho Tutelar",
    contato: "Busque o da sua cidade",
    quando: "Porta de entrada da rede de proteção para violação de direitos da criança.",
  },
  {
    nome: "CREAS",
    contato: "Centro de Referência Especializado de Assistência Social da sua cidade",
    quando: "Acompanhamento de famílias e situações de violação de direitos.",
  },
  {
    nome: "CVV",
    contato: "188, 24h, também por chat em cvv.org.br",
    quando: "Apoio emocional e escuta, para você ou para a família.",
  },
  {
    nome: "SaferNet Brasil",
    contato: "safernet.org.br",
    quando: "Denúncia de conteúdo envolvendo crianças e adolescentes na internet.",
  },
];

export const CANAIS_VERIFICADO_EM = "2026-09-16";

export const AVISO_LEGAL =
  "O Voz Protetora é uma ferramenta educativa e orientativa. Não substitui atendimento profissional, avaliação especializada ou os serviços da rede de proteção.";

export function findItem(list: ContentItem[], slug: string) {
  return list.find((item) => item.slug === slug);
}

// ---------------------------------------------------------------------------
// Busca — pesquisa nas 60 peças aprovadas (título, tema e texto da orientação).
// Tudo client-side: o conteúdo já vem no bundle, não precisa de backend.
// ---------------------------------------------------------------------------

const SEARCH_SOURCES: {
  porta: SearchResult["porta"];
  portaLabel: string;
  base: string;
  items: ContentItem[];
}[] = [
  { porta: "aconteceu", portaLabel: "ACONTECEU", base: "/voz-protetora/aconteceu", items: ACONTECEU },
  {
    porta: "vai-acontecer",
    portaLabel: "VAI ACONTECER",
    base: "/voz-protetora/vai-acontecer",
    items: VAI_ACONTECER,
  },
  {
    porta: "fortalecer",
    portaLabel: "QUERO FORTALECER",
    base: "/voz-protetora/fortalecer",
    items: FORTALECER,
  },
];

function normalizeSearch(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Busca por substring, sem distinguir maiúsculas/acentos, no título, no grupo e no texto
 * de cada bloco de orientação. Resultados com o termo no título vêm primeiro.
 */
export function searchContent(query: string): SearchResult[] {
  const q = normalizeSearch(query.trim());
  if (q.length < 2) return [];

  const results: SearchResult[] = [];
  for (const source of SEARCH_SOURCES) {
    for (const item of source.items) {
      const titleMatch = normalizeSearch(item.title).includes(q);
      const haystack = normalizeSearch(
        [item.title, item.grupo ?? "", ...(item.blocks?.map((b) => b.body ?? "") ?? [])].join(
          " ",
        ),
      );
      if (titleMatch || haystack.includes(q)) {
        results.push({
          porta: source.porta,
          portaLabel: source.portaLabel,
          to: `${source.base}/${item.slug}`,
          slug: item.slug,
          emoji: item.emoji,
          title: item.title,
          grupo: item.grupo,
          _titleMatch: titleMatch,
        } as SearchResult & { _titleMatch: boolean });
      }
    }
  }

  return (results as (SearchResult & { _titleMatch: boolean })[])
    .sort((a, b) => Number(b._titleMatch) - Number(a._titleMatch))
    .map(({ _titleMatch, ...rest }) => rest);
}
