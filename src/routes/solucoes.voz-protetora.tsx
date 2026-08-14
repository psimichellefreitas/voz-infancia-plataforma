import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Eye,
  Heart,
  HelpCircle,
  MessageCircle,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Sprout,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";
import { Reveal } from "@/components/voz/Reveal";

export const Route = createFileRoute("/solucoes/voz-protetora")({
  head: () => ({
    meta: [
      { title: "Voz Protetora — Orientação prática para proteger a infância" },
      {
        name: "description",
        content:
          "Voz Protetora é uma ferramenta digital que ajuda adultos a saber o que dizer, como agir e como se preparar diante de situações reais da infância.",
      },
      { property: "og:title", content: "Voz Protetora — Voz Pela Infância" },
      {
        property: "og:description",
        content:
          "Orientação prática para adultos que querem proteger melhor a infância.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VozProtetoraPage,
});

const ACONTECEU_EXEMPLOS = [
  "A criança não quer abraçar um familiar.",
  "A criança não quer beijar alguém.",
  "A criança diz que tem medo de alguém.",
  "A criança contou algo que me preocupou.",
  "A criança pediu para eu não contar algo.",
  "A criança mudou de comportamento.",
  "A criança não quer ir a determinado lugar.",
  "A criança viu algo inadequado na internet.",
  "A criança perguntou sobre partes íntimas.",
  "A criança contou que alguém ultrapassou seu limite.",
  "Um adulto pediu para a criança guardar um segredo.",
  "A criança parece desconfortável perto de determinada pessoa.",
  "A criança está recebendo mensagens de alguém e algo me preocupa.",
  "A criança está sendo pressionada a fazer algo que não quer.",
];

const VAI_ACONTECER_EXEMPLOS = [
  "A criança vai à piscina.",
  "A criança vai à praia.",
  "A criança vai dormir na casa de um familiar.",
  "A criança vai passar o dia na casa de um amigo.",
  "A criança vai ficar sob os cuidados de outra pessoa.",
  "A criança vai a uma festa.",
  "A criança vai participar de uma atividade esportiva.",
  "A criança vai participar de uma excursão ou viagem escolar.",
  "A criança vai participar de uma atividade religiosa.",
  "A criança vai utilizar um ambiente digital.",
  "A criança vai jogar online.",
];

const QUERO_FORTALECER = [
  { t: "COMUNICAÇÃO", d: "Quero fortalecer a abertura para conversar." },
  { t: "LIMITES", d: "Quero ensinar respeito aos limites." },
  { t: "SEGURANÇA EMOCIONAL", d: "Quero que a criança saiba que pode falar comigo." },
  { t: "CORPO E PRIVACIDADE", d: "Quero ensinar respeito ao corpo e à privacidade." },
  { t: "PEDIR AJUDA", d: "Quero ensinar a criança a procurar ajuda." },
  { t: "AUTONOMIA", d: "Quero fortalecer autonomia com segurança." },
  { t: "SEGURANÇA DIGITAL", d: "Quero preparar a criança para o ambiente digital." },
  { t: "RELAÇÕES RESPEITOSAS", d: "Quero fortalecer relações baseadas em respeito." },
];

const ORIENTACAO_ETAPAS = [
  { n: "01", t: "O QUE PODE ESTAR ACONTECENDO?", d: "Contextualização breve, sem diagnóstico e sem alarmismo." },
  { n: "02", t: "O QUE DIZER?", d: "Frases que o adulto pode utilizar." },
  { n: "03", t: "COMO AGIR?", d: "Passos objetivos." },
  { n: "04", t: "EVITE", d: "Atitudes que podem dificultar a proteção." },
  { n: "05", t: "OLHAR PROTETOR", d: "O que observar e contextualizar." },
  { n: "06", t: "QUANDO BUSCAR AJUDA?", d: "Quando a situação exige orientação adicional ou acionamento da rede adequada." },
  { n: "07", t: "O QUE ESSA SITUAÇÃO ENSINA?", d: "O princípio protetivo daquela situação." },
  { n: "08", t: "MEU PRÓXIMO PASSO", d: "Uma ação concreta que o adulto pode realizar." },
];

const VAI_ACONTECER_ETAPAS = [
  { t: "ANTES", d: "O que preciso saber, conversar, combinar ou verificar?" },
  { t: "DURANTE", d: "O que preciso observar?" },
  { t: "ENSINE A CRIANÇA", d: "Que conhecimentos e habilidades podem aumentar sua segurança?" },
  { t: "DEPOIS", d: "Como manter espaço para conversa?" },
  { t: "EVITE", d: "Atitudes que podem reduzir a proteção." },
  { t: "QUANDO BUSCAR AJUDA", d: "Quando a situação exigir." },
  { t: "MEU PRÓXIMO PASSO", d: "Uma ação antes da situação acontecer." },
];

const MINHA_VOZ = [
  { t: "OLHAR", d: "Perceber.", icon: Eye },
  { t: "ESCUTAR", d: "Criar espaço para a criança falar.", icon: MessageCircle },
  { t: "ACOLHER", d: "Receber sem julgamento.", icon: Heart },
  { t: "ORIENTAR", d: "Ensinar caminhos seguros.", icon: HelpCircle },
  { t: "AGIR", d: "Fortalecer a proteção quando necessário.", icon: ShieldCheck },
];

const PRESENCA_CHECK = [
  "A criança sabe que pode conversar comigo?",
  "Eu respeito quando ela diz não?",
  "Sei ouvir antes de julgar?",
  "Estou atento aos sinais de desconforto?",
  "Converso sobre limites de forma natural?",
  "A criança sabe que não precisa guardar segredos que a machucam?",
];

function VozProtetoraPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-20">
        {/* HERO COMERCIAL */}
        <section className="relative overflow-hidden border-b border-border bg-primary px-5 py-16 sm:px-8 sm:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-voz-yellow blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-voz-green blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground backdrop-blur-sm">
                    <Shield className="h-4 w-4" />
                    VOZ PROTETORA
                  </div>
                  <h1 className="mt-5 text-[2rem] font-bold leading-tight text-primary-foreground sm:text-4xl lg:text-5xl">
                    Quando você não souber como agir, saiba onde buscar orientação.
                  </h1>
                  <p className="mt-5 text-lg leading-relaxed text-primary-foreground/85">
                    Uma ferramenta digital de orientação prática para adultos que querem proteger
                    melhor a infância.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {["O que dizer.", "Como agir.", "Como se preparar."].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 text-sm font-semibold text-primary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-full max-w-sm rounded-[12px] border border-primary-foreground/20 bg-primary-foreground/10 p-6 backdrop-blur-sm sm:p-8">
                  <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground/80">
                      Investimento
                    </p>
                    <p className="mt-2 text-5xl font-bold text-primary-foreground">R$ 67,00</p>
                    <p className="mt-1 text-sm text-primary-foreground/80">Compra única.</p>
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="heroOutline" size="xl" className="w-full">
                      <Link to="#comprar">QUERO TER O VOZ PROTETORA</Link>
                    </Button>
                    <p className="mt-3 text-center text-xs text-primary-foreground/70">
                      Integração com checkout em breve.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* O PROBLEMA */}
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              Nem sempre sabemos o que dizer.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>Nem sempre sabemos como agir.</p>
              <p>E muitas vezes só pensamos em proteção depois que alguma situação acontece.</p>
            </div>
            <div className="mt-8 rounded-[12px] border border-border bg-secondary p-6 sm:p-8">
              <p className="text-base font-semibold leading-relaxed text-primary">
                O Voz Protetora foi criado para ajudar o adulto a transformar dúvidas do cotidiano
                em atitudes concretas de proteção.
              </p>
            </div>
          </Reveal>
        </section>

        {/* O QUE VOCÊ ENCONTRA */}
        <section className="border-y border-border bg-secondary px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                  Como posso ajudar você hoje?
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                  Três portas para orientação prática no dia a dia.
                </p>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {[
                  {
                    icon: Search,
                    title: "ACONTECEU",
                    desc: "Algo aconteceu. Como devo agir?",
                    color: "text-voz-blue",
                    bg: "bg-primary/5",
                  },
                  {
                    icon: Shield,
                    title: "VAI ACONTECER",
                    desc: "A criança vai viver uma situação. Como posso me preparar?",
                    color: "text-voz-green",
                    bg: "bg-accent/10",
                  },
                  {
                    icon: Sprout,
                    title: "QUERO FORTALECER",
                    desc: "Quero fortalecer a proteção. Por onde começo?",
                    color: "text-voz-yellow",
                    bg: "bg-voz-yellow/10",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[12px] border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
                  >
                    <div
                      className={cn(
                        "grid h-12 w-12 place-items-center rounded-[10px]",
                        card.bg,
                      )}
                    >
                      <card.icon className={cn("h-6 w-6", card.color)} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-primary">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ACONTECEU */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-primary/10">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">ACONTECEU</h2>
            </div>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Quando uma situação já aconteceu e você não sabe como responder.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ACONTECEU_EXEMPLOS.map((ex) => (
                <div
                  key={ex}
                  className="flex items-start gap-3 rounded-[10px] border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
                >
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-sm leading-snug text-foreground/85">{ex}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm font-semibold text-muted-foreground">
              Entre outras situações do cotidiano.
            </p>
          </Reveal>
        </section>

        {/* COMO FUNCIONA UMA ORIENTAÇÃO */}
        <section className="border-y border-border bg-secondary px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
                Como funciona uma orientação
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-base text-muted-foreground">
                Cada orientação segue uma estrutura clara para ajudar o adulto a transformar
                informação em ação.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {ORIENTACAO_ETAPAS.map((etapa) => (
                  <div
                    key={etapa.n}
                    className="rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                      {etapa.n}
                    </span>
                    <h3 className="mt-2 text-sm font-bold leading-snug text-primary">
                      {etapa.t}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {etapa.d}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* VAI ACONTECER */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-accent/10">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">VAI ACONTECER</h2>
            </div>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A prevenção também acontece antes da situação.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {VAI_ACONTECER_EXEMPLOS.map((ex) => (
                <div
                  key={ex}
                  className="flex items-start gap-3 rounded-[10px] border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-sm leading-snug text-foreground/85">{ex}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {VAI_ACONTECER_ETAPAS.map((etapa) => (
                <div
                  key={etapa.t}
                  className="rounded-[10px] border border-border bg-secondary p-5"
                >
                  <h3 className="text-sm font-bold text-primary">{etapa.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{etapa.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* QUERO FORTALECER */}
        <section className="border-y border-border bg-primary px-5 py-16 text-primary-foreground sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-bold sm:text-3xl">QUERO FORTALECER</h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-primary-foreground/85">
                Você não precisa esperar uma situação preocupante para fortalecer a proteção.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {QUERO_FORTALECER.map((item) => (
                  <div
                    key={item.t}
                    className="rounded-[10px] border border-primary-foreground/15 bg-primary-foreground/10 p-5"
                  >
                    <Sparkles className="h-5 w-5 text-voz-yellow" />
                    <h3 className="mt-3 text-sm font-bold">{item.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                      {item.d}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* MINHA VOZ PROTETORA */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">MINHA VOZ PROTETORA</h2>
            <p className="mt-3 text-base text-muted-foreground">
              Uma experiência inicial curta para refletir sobre a postura protetiva.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {MINHA_VOZ.map((item) => (
                <div
                  key={item.t}
                  className="rounded-[10px] border border-border bg-card p-5 text-center shadow-[var(--shadow-soft)]"
                >
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-secondary">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-primary">{item.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-[12px] border border-border bg-secondary p-6 sm:p-8">
              <p className="text-center text-base font-semibold leading-relaxed text-primary sm:text-lg">
                “Uma Voz Protetora não é um adulto que sabe tudo. É um adulto disposto a olhar,
                escutar, aprender e agir para fortalecer a proteção da infância.”
              </p>
            </div>
          </Reveal>
        </section>

        {/* MINHA PRESENÇA PROTETIVA */}
        <section className="border-y border-border bg-secondary px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                MINHA PRESENÇA PROTETIVA
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                Um check-up simples e reflexivo para perceber onde você pode fortalecer sua
                presença protetiva.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {PRESENCA_CHECK.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[10px] border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm leading-snug text-foreground/85">{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA FINAL */}
        <section id="comprar" className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <Reveal>
            <div className="rounded-[16px] border border-border bg-card p-8 shadow-[var(--shadow-lift)] sm:p-12">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-primary sm:text-3xl">
                Quero ter o Voz Protetora
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Uma ferramenta para ajudar você a saber o que dizer, como agir e como se preparar.
              </p>
              <p className="mt-6 text-5xl font-bold text-primary">R$ 67,00</p>
              <p className="mt-1 text-sm text-muted-foreground">Compra única.</p>
              <div className="mt-8">
                <Button asChild variant="hero" size="xl">
                  <Link to="/contato">
                    QUERO TER O VOZ PROTETORA
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                O checkout será integrado em breve. Enquanto isso, fale com o movimento.
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

// Local cn helper to avoid extra imports inside the same file
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
