/**
 * Bônus do VOZ PROTETORA para imprimir (rascunhos aprovados em 2026-10-07; origem de cada texto em
 * 03_PRODUTOS/VOZ_PROTETORA/bonus/NOTAS_BONUS_RASCUNHO.md).
 *
 * Para acrescentar um bônus: incluir aqui (slug, título, descrição) e a folha correspondente em
 * `components/voz/produto/bonus/folhas.tsx`.
 */
export interface BonusItem {
  slug: string;
  titulo: string;
  descricao: string;
}

export const BONUS: BonusItem[] = [
  {
    slug: "minha-rede-de-apoio",
    titulo: "Minha rede de apoio",
    descricao:
      "Ficha para preencher com os adultos de confiança da criança e os serviços da sua cidade.",
  },
  {
    slug: "combinados-antes-de-outra-pessoa",
    titulo: "Combinados antes de a criança ficar com outra pessoa",
    descricao:
      "Lista para conferir com quem vai cuidar da criança: antes, durante e depois.",
  },
  {
    slug: "frases-que-protegem",
    titulo: "Frases que protegem",
    descricao: "Cartaz com frases para dizer à criança, para colar em casa.",
  },
];

export function findBonus(slug: string) {
  return BONUS.find((b) => b.slug === slug);
}

/**
 * Aviso de direitos autorais impresso em todos os bônus. PROPOSTA: texto e alcance de uso
 * (pessoal e familiar) aguardam a aprovação da idealizadora.
 */
export const AVISO_DIREITOS =
  "© 2026 Voz Pela Infância. Todos os direitos reservados. Material para uso pessoal e familiar. Não reproduza, venda ou distribua sem autorização.";
