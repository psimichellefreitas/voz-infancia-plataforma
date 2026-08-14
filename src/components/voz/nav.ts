export interface NavItem {
  label: string;
  to: string;
}

/** Navegação oficial da V1. Adicione novos itens aqui. */
export const NAV: NavItem[] = [
  { label: "O Movimento", to: "/o-movimento" },
  { label: "Seja Voz", to: "/seja-voz" },
  { label: "Bússola Voz", to: "/bussola-voz" },
  { label: "Recursos", to: "/recursos" },
  { label: "Soluções", to: "/solucoes" },
];

export const FOOTER_LINKS: NavItem[] = [
  ...NAV,
  { label: "Contato", to: "/contato" },
  { label: "Apoie o Voz", to: "/apoie" },
  { label: "Política de Privacidade", to: "/politica-de-privacidade" },
  { label: "Termos de Uso", to: "/termos-de-uso" },
];

export const INSTAGRAM_HANDLE = "@somosvozpelainfancia";
export const INSTAGRAM_URL = "https://instagram.com/somosvozpelainfancia";
