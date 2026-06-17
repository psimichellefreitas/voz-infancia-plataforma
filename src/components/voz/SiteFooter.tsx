import { Link } from "@tanstack/react-router";
import {
  HeartHandshake,
  Heart,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Portal",
    links: [
      { label: "Movimento", to: "/movimento" },
      { label: "Biblioteca", to: "/biblioteca" },
      { label: "Ferramentas", to: "/ferramentas" },
      { label: "Produtos", to: "/produtos" },
      { label: "Eventos", to: "/eventos" },
    ],
  },
  {
    title: "Proteções",
    links: [
      { label: "Proteção Emocional", to: "/protecao-emocional" },
      { label: "Proteção Sexual", to: "/protecao-sexual" },
      { label: "Proteção Digital", to: "/protecao-digital" },
      { label: "Proteção Social", to: "/protecao-social" },
    ],
  },
  {
    title: "Para Você",
    links: [
      { label: "Pais", to: "/pais" },
      { label: "Profissionais", to: "/profissionais" },
      { label: "Escolas", to: "/escolas" },
      { label: "Igrejas", to: "/igrejas" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Quem Somos", to: "/quem-somos" },
      { label: "Manifesto", to: "/manifesto" },
      { label: "Contato", to: "/contato" },
    ],
  },
];

const SOCIAL = [
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
  { label: "WhatsApp", icon: MessageCircle, href: "https://whatsapp.com" },
];

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <HeartHandshake className="h-6 w-6" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-base font-extrabold">VOZ</span>
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-accent">
                  Pela Infância
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/65">
              O maior portal brasileiro de conscientização, educação e tecnologias para proteção
              infantil. Um movimento nacional por cada criança.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <p className="mt-6 text-xs uppercase tracking-wider text-primary-foreground/55">
              Uma iniciativa do
            </p>
            <p className="mt-1 font-display text-sm font-bold text-primary-foreground/90">
              Instituto Iluminar
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 px-8 py-10 text-center">
          <h4 className="flex items-center justify-center gap-2 font-display text-lg font-bold text-primary-foreground">
            <Heart className="h-5 w-5 text-accent" /> Ajude a transformar mais histórias
          </h4>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/70">
            Sua contribuição ajuda a levar informação, proteção e esperança para mais crianças em
            todo o Brasil.
          </p>
          <Button asChild variant="hero" size="lg" className="mt-6">
            <Link to="/movimento">Quero Contribuir</Link>
          </Button>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-8 text-xs text-primary-foreground/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Voz Pela Infância — Todos os direitos reservados.</p>
          <div className="flex items-center gap-5">
            <Link to="/contato" className="transition-colors hover:text-accent">
              Política de Privacidade
            </Link>
            <Link to="/contato" className="transition-colors hover:text-accent">
              Termos de Uso
            </Link>
            <span>Instituto Iluminar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}