export interface NavItem {
  label: string;
  to: string;
}

/** Navegação principal aprovada (V1 do site institucional). */
export const NAV: NavItem[] = [
  { label: "O Movimento", to: "/o-movimento" },
  { label: "Metodologia", to: "/metodologia" },
  { label: "Conteúdos", to: "/conteudos" },
  { label: "Soluções", to: "/solucoes" },
  { label: "Participe", to: "/participe" },
];

/** Coluna "Navegar" do rodapé — espelha a navegação principal. */
export const FOOTER_NAV: NavItem[] = NAV;

/** Coluna "Institucional" do rodapé. */
export const FOOTER_INSTITUTIONAL: NavItem[] = [
  { label: "Contato", to: "/contato" },
  { label: "Política de Privacidade", to: "/politica-de-privacidade" },
  { label: "Termos de Uso", to: "/termos-de-uso" },
  { label: "Acessibilidade", to: "/acessibilidade" },
];

export const INSTAGRAM_HANDLE = "@somosvozpelainfancia";
export const INSTAGRAM_URL = "https://instagram.com/somosvozpelainfancia";

// TODO: confirmar o endereço de e-mail oficial antes de publicar.
export const CONTATO_EMAIL = "contato@vozpelainfancia.org";

/** Sistema Verbal oficial (DOC 02, §11). Uso pontual, na função de cada elemento. */
export const DESCRITOR = "Movimento em Defesa da Infância";
export const ASSINATURA = "Educar. Prevenir. Proteger.";
export const CTA = "Seja Voz";
export const MANIFESTO = "Toda infância precisa de proteção. Todo adulto pode ser Voz.";

/**
 * Linha de segurança obrigatória no rodapé (DOC 09).
 * PENDENTE: confirmar os canais a citar com a idealizadora.
 */
export const LINHA_SEGURANCA =
  "A Voz Pela Infância educa e mobiliza; não substitui a rede de proteção nem serviços especializados. Em situação de risco imediato a uma criança ou adolescente, acione o Conselho Tutelar, o Disque 100 ou a Polícia Militar (190).";
