import { HeartHandshake, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLUMNS = [
  {
    title: "Institucional",
    links: ["Quem Somos", "Nossa História", "Nossa Missão", "Transparência", "Parcerias"],
  },
  {
    title: "Aplicativos",
    links: ["Todos os Aplicativos", "Aplicativos Gratuitos", "Aplicativos Premium", "Como Funciona"],
  },
  {
    title: "Ajuda",
    links: ["Perguntas Frequentes", "Fale Conosco", "Política de Privacidade", "Termos de Uso"],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <HeartHandshake className="h-6 w-6" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-base font-extrabold">VOZ</span>
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-accent">
                  Pela Infância
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/65">
              O maior portal brasileiro de conscientização, educação e tecnologias
              para proteção infantil.
            </p>
            <p className="mt-5 text-xs uppercase tracking-wider text-primary-foreground/55">
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
                  <li key={l}>
                    <a
                      href="#top"
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div id="contribuir">
            <h4 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-accent">
              <Heart className="h-4 w-4" /> Ajude a transformar mais histórias
            </h4>
            <p className="mt-5 text-sm leading-relaxed text-primary-foreground/70">
              Sua contribuição ajuda a levar informação, proteção e esperança para mais crianças.
            </p>
            <Button variant="hero" size="lg" className="mt-6">
              Quero Contribuir
            </Button>
          </div>
        </div>

        <div className="mt-14 border-t border-primary-foreground/15 pt-8 text-center text-xs text-primary-foreground/55">
          <p>© {new Date().getFullYear()} Voz Pela Infância — Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}