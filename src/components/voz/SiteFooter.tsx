import { HeartHandshake, Instagram, Facebook, Youtube, Mail } from "lucide-react";

const LINKS = ["Quem Somos", "Aplicativos", "Biblioteca", "Cursos", "Contato"];

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-foreground/10 text-accent">
                <HeartHandshake className="h-6 w-6" />
              </span>
              <span className="font-display text-lg font-extrabold">Voz Pela Infância</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Uma iniciativa desenvolvida pelo Instituto Iluminar — Tecnologias de
              Proteção à Infância. Unindo tecnologia, educação, fé e conscientização
              para proteger cada criança.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Facebook, Youtube, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="https://instagram.com/michellefreitaspsi"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground/80 transition-all hover:bg-accent hover:text-accent-foreground"
                  aria-label="Rede social"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
              Navegação
            </h4>
            <ul className="mt-5 space-y-3">
              {LINKS.map((l) => (
                <li key={l}>
                  <a
                    href="#top"
                    className="text-sm text-primary-foreground/75 transition-colors hover:text-accent"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
              Conecte-se
            </h4>
            <p className="mt-5 text-sm text-primary-foreground/75">
              Acompanhe o movimento no Instagram:
            </p>
            <a
              href="https://instagram.com/michellefreitaspsi"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-display text-base font-semibold text-primary-foreground transition-colors hover:text-accent"
            >
              <Instagram className="h-4 w-4" />
              @michellefreitaspsi
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/15 pt-8 text-center text-xs text-primary-foreground/55 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Voz Pela Infância · Instituto Iluminar.</p>
          <p>A proteção começa onde o silêncio termina.</p>
        </div>
      </div>
    </footer>
  );
}