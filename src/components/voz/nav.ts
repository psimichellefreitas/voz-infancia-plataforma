import type { LucideIcon } from "lucide-react";
import {
  Home,
  Megaphone,
  BookOpen,
  ShieldCheck,
  HeartHandshake,
  Wrench,
  ShoppingBag,
  CalendarDays,
  Building2,
  Mail,
} from "lucide-react";

export interface NavChild {
  label: string;
  to: string;
}

export interface NavItem {
  label: string;
  to?: string;
  icon?: LucideIcon;
  children?: NavChild[];
}

/**
 * Central navigation map for the whole portal.
 * Add new sections/links here and they appear in the header automatically.
 */
export const NAV: NavItem[] = [
  { label: "Home", to: "/", icon: Home },
  { label: "Movimento", to: "/movimento", icon: Megaphone },
  {
    label: "Biblioteca",
    to: "/biblioteca",
    icon: BookOpen,
    children: [
      { label: "Artigos", to: "/artigos" },
      { label: "Guias", to: "/guias" },
      { label: "Vídeos", to: "/videos" },
      { label: "Podcasts", to: "/podcasts" },
    ],
  },
  {
    label: "Proteções",
    icon: ShieldCheck,
    children: [
      { label: "Proteção Emocional", to: "/protecao-emocional" },
      { label: "Proteção Sexual", to: "/protecao-sexual" },
      { label: "Proteção Digital", to: "/protecao-digital" },
      { label: "Proteção Social", to: "/protecao-social" },
    ],
  },
  {
    label: "Para Você",
    icon: HeartHandshake,
    children: [
      { label: "Pais", to: "/pais" },
      { label: "Profissionais", to: "/profissionais" },
      { label: "Escolas", to: "/escolas" },
      { label: "Igrejas", to: "/igrejas" },
    ],
  },
  { label: "Ferramentas", to: "/ferramentas", icon: Wrench },
  { label: "Produtos", to: "/produtos", icon: ShoppingBag },
  { label: "Eventos", to: "/eventos", icon: CalendarDays },
  { label: "Quem Somos", to: "/quem-somos", icon: Building2 },
  { label: "Contato", to: "/contato", icon: Mail },
];