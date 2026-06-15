import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Heart,
  Brain,
  Stethoscope,
  Globe,
  Search,
  ArrowRight,
  Users,
  GraduationCap,
  Church,
  School,
  Sparkles,
  ChevronDown,
  BookOpen,
  FileText,
  ClipboardCheck,
  ScrollText,
  CalendarDays,
  HelpCircle,
  Gift,
  ListChecks,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/voz/Reveal";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";
import { toast } from "sonner";
import heroImg from "@/assets/hero.jpg";
import missionImg from "@/assets/mission.jpg";
import appEmotional from "@/assets/app-emotional.jpg";
import appDigital from "@/assets/app-digital.jpg";
import appCommunity from "@/assets/app-community.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Voz Pela Infância — Proteção e cuidado para cada criança" },
      {
        name: "description",
        content:
          "Toda criança merece um adulto que não se cale. Movimento que une tecnologia, educação, fé e conscientização para proteger crianças. Conteúdos gratuitos, aplicativos e trilhas.",
      },
      { property: "og:title", content: "Voz Pela Infância" },
      {
        property: "og:description",
        content: "A proteção começa onde o silêncio termina. Junte-se ao movimento.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Index,
});

const SECTION_LABEL =
  "inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground";

function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Crianças felizes correndo livres em um campo iluminado enquanto uma mão adulta as protege"
          width={1920}
          height={1080}
          className="h-[120%] w-full object-cover"
          style={{ transform: `translateY(${offset * 0.25}px)` }}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/35 to-primary/90" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-5 pb-20 pt-32 text-center sm:px-8">
        <span className="animate-fade-in rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
          Movimento de proteção à infância
        </span>
        <h1 className="mt-7 text-balance font-display text-4xl font-extrabold leading-[1.08] text-primary-foreground sm:text-5xl md:text-6xl">
          Toda criança merece um adulto que não se cale.
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-lg text-primary-foreground/85 sm:text-xl">
          A proteção começa onde o silêncio termina.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild variant="hero" size="xl">
            <a href="#movimento">🧡 Erga sua voz</a>
          </Button>
          <Button asChild variant="heroOutline" size="xl">
            <a href="#aplicativos">📱 Conheça nossos aplicativos</a>
          </Button>
        </div>
      </div>

      <a
        href="#missao"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-primary-foreground/70 transition-colors hover:text-accent"
        aria-label="Rolar para baixo"
      >
        <ChevronDown className="h-7 w-7 animate-bounce" />
      </a>
    </section>
  );
}

function Mission() {
  return (
    <section id="missao" className="bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 md:grid-cols-2">
        <Reveal>
          <span className={SECTION_LABEL}>
            <Sparkles className="h-3.5 w-3.5" /> Nossa Missão
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
            Proteger o que Deus planejou para a infância.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            A missão da proteção é impedir que a dor roube aquilo que Deus planejou
            para a infância.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Somos um movimento que une{" "}
            <span className="font-semibold text-foreground">tecnologia, educação, fé e conscientização</span>{" "}
            para fortalecer famílias e proteger crianças.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/20 blur-2xl" />
            <img
              src={missionImg}
              alt="Ilustração de uma família conectada sob a luz da proteção"
              width={1024}
              height={1024}
              loading="lazy"
              className="w-full rounded-[2rem] shadow-[var(--shadow-lift)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const PERSONAS = [
  { icon: Users, emoji: "👨", title: "Pai ou Mãe" },
  { icon: GraduationCap, emoji: "👩", title: "Educador" },
  { icon: Stethoscope, emoji: "👩‍⚕️", title: "Profissional da Rede" },
  { icon: Church, emoji: "⛪", title: "Igreja" },
  { icon: School, emoji: "🏫", title: "Escola" },
  { icon: Heart, emoji: "❤️", title: "Quero aprender" },
];

function WhoAreYou() {
  return (
    <section className="bg-beige py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={SECTION_LABEL}>Sua jornada</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-primary sm:text-4xl">
            Quem é você nessa missão?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Escolha sua jornada e encontre conteúdos preparados para sua realidade.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-3">
          {PERSONAS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <button className="group flex h-full w-full flex-col items-start gap-4 rounded-3xl border border-border bg-card p-6 text-left shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[var(--shadow-lift)] sm:p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <p.icon className="h-7 w-7" />
                </span>
                <span className="font-display text-lg font-bold text-primary sm:text-xl">
                  {p.title}
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent-foreground/0 transition-colors group-hover:text-accent">
                  Ver trilha <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const APPS = [
  { title: "Erga Sua Voz Pela Infância", summary: "O app central do movimento: denúncia consciente, formação e mobilização.", img: appCommunity },
  { title: "Meu Filho Protegido", summary: "Acompanhe o bem-estar do seu filho com orientações práticas e diárias.", img: appEmotional },
  { title: "Proteção Emocional", summary: "Ferramentas para fortalecer o vínculo afetivo e a saúde emocional.", img: appEmotional },
  { title: "Proteção Digital", summary: "Navegação segura, controle parental e educação digital saudável.", img: appDigital },
  { title: "Escola Segura", summary: "Protocolos e formação para ambientes escolares protetores.", img: appCommunity },
  { title: "Igreja Segura", summary: "Capacitação e diretrizes para o cuidado de crianças na comunidade de fé.", img: appCommunity },
  { title: "Profissionais da Proteção", summary: "Recursos técnicos para a rede de proteção à criança e ao adolescente.", img: appDigital },
];

function Apps() {
  return (
    <section id="aplicativos" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className={SECTION_LABEL}>
              <Smartphone className="h-3.5 w-3.5" /> Tecnologia que protege
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold text-primary sm:text-4xl">
              Aplicativos de Proteção
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Uma vitrine de soluções digitais criadas para cuidar de cada criança.
            </p>
          </div>
          <Button variant="navy" size="lg" className="shrink-0">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>

        <Reveal className="mt-12">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {APPS.map((app) => (
                <CarouselItem key={app.title} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={app.img}
                        alt={app.title}
                        width={800}
                        height={600}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-lg font-bold text-primary">{app.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {app.summary}
                      </p>
                      <Button variant="hero" size="default" className="mt-5 w-full">
                        Conhecer
                      </Button>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}

const LIBRARY = [
  { label: "Guias", icon: BookOpen },
  { label: "Cartilhas", icon: FileText },
  { label: "E-books", icon: ScrollText },
  { label: "Checklists", icon: ClipboardCheck },
  { label: "Materiais Gratuitos", icon: Gift },
  { label: "Materiais Premium", icon: Sparkles },
];

function Library() {
  return (
    <section id="biblioteca" className="bg-beige py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={SECTION_LABEL}>
            <BookOpen className="h-3.5 w-3.5" /> Conhecimento que cuida
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-primary sm:text-4xl">
            Biblioteca da Proteção
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Uma estante digital com materiais para informar, preparar e fortalecer.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card p-2 pl-5 shadow-[var(--shadow-soft)]">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <Input
            placeholder="Buscar guias, cartilhas, e-books..."
            className="border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          <Button variant="hero" size="default" className="shrink-0">
            Buscar
          </Button>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {LIBRARY.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 70}>
              <button className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[var(--shadow-lift)]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <cat.icon className="h-6 w-6" />
                </span>
                <span className="font-display text-base font-bold text-primary">{cat.label}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const SIGNS = [
  {
    icon: Heart,
    emoji: "❤️",
    title: "Sinais Emocionais",
    text: "Tristeza persistente, medo excessivo, mudanças bruscas de humor, baixa autoestima, ansiedade ou apego incomum a determinadas pessoas. Acolha sem julgar e observe o padrão.",
  },
  {
    icon: Brain,
    emoji: "🧠",
    title: "Sinais Comportamentais",
    text: "Isolamento, agressividade, regressão (voltar a comportamentos de fases anteriores), queda no rendimento escolar ou resistência em ficar com certas pessoas. Mudanças repentinas merecem atenção.",
  },
  {
    icon: Stethoscope,
    emoji: "🩺",
    title: "Sinais Físicos",
    text: "Alterações no sono e no apetite, queixas frequentes de dores sem causa aparente, cansaço excessivo ou descuido com a higiene. Sempre busque avaliação profissional adequada.",
  },
  {
    icon: Globe,
    emoji: "🌐",
    title: "Sinais Digitais",
    text: "Esconder a tela, contas secretas, mudança de humor após usar o celular, contato com desconhecidos ou uso noturno excessivo. O diálogo aberto é a melhor proteção digital.",
  },
];

function WarningSigns() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="text-center">
          <span className={SECTION_LABEL}>Atenção e cuidado</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-primary sm:text-4xl">
            Você conhece os sinais de alerta?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Conhecer é o primeiro passo para proteger. Clique para saber mais.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="space-y-4">
            {SIGNS.map((s) => (
              <AccordionItem
                key={s.title}
                value={s.title}
                className="overflow-hidden rounded-2xl border border-border bg-card px-6 shadow-[var(--shadow-soft)]"
              >
                <AccordionTrigger className="py-5 hover:no-underline">
                  <span className="flex items-center gap-4 text-left">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                      <s.icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-lg font-bold text-primary">{s.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-[3.75rem] text-base leading-relaxed text-muted-foreground">
                  {s.text}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

const PATHS = [
  { title: "Pais", progress: 35, lessons: "12 conteúdos" },
  { title: "Profissionais", progress: 60, lessons: "18 conteúdos" },
  { title: "Escolas", progress: 25, lessons: "10 conteúdos" },
  { title: "Igrejas", progress: 45, lessons: "14 conteúdos" },
];

function LearningPaths() {
  return (
    <section id="trilhas" className="bg-beige py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={SECTION_LABEL}>
            <GraduationCap className="h-3.5 w-3.5" /> Aprender para proteger
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-primary sm:text-4xl">
            Trilhas de Aprendizagem
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Caminhos guiados de formação para cada realidade.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {PATHS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="group rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-primary">{p.title}</h3>
                  <span className="text-sm font-medium text-muted-foreground">{p.lessons}</span>
                </div>
                <Progress value={p.progress} className="mt-5 h-3" />
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-accent">{p.progress}% concluído</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                    Começar trilha <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const TOOLS = [
  { title: "Manifesto Voz Pela Infância", icon: ScrollText },
  { title: "Plano Familiar", icon: Users },
  { title: "Plano de 7 dias", icon: CalendarDays },
  { title: "Quiz", icon: HelpCircle },
  { title: "Checklist", icon: ListChecks },
  { title: "Declaração de Compromisso", icon: FileText },
];

function Tools() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={SECTION_LABEL}>Mãos à obra</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-primary sm:text-4xl">
            Ferramentas de Proteção
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Recursos práticos para transformar consciência em ação.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t, i) => (
            <Reveal key={t.title} delay={i * 70}>
              <button className="group flex h-full w-full items-center gap-4 rounded-3xl border border-border bg-card p-6 text-left shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[var(--shadow-lift)]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <t.icon className="h-6 w-6" />
                </span>
                <span className="font-display text-base font-bold text-primary">{t.title}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinMovement() {
  return (
    <section id="movimento" className="bg-background pb-24 sm:pb-32">
      <Reveal className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-center shadow-[var(--shadow-lift)] sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
              Junte-se ao movimento
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-3xl font-extrabold leading-tight text-primary-foreground sm:text-4xl md:text-5xl">
              Milhares de pessoas estão decidindo proteger a infância.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-primary-foreground/80">
              Sua voz importa. Sua decisão pode mudar a história de uma criança.
            </p>
            <Button variant="hero" size="xl" className="mt-10">
              🧡 Eu decido erguer minha voz
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Preencha seu nome e email para continuar.");
      return;
    }
    toast.success("Inscrição recebida! Em breve você receberá nossos conteúdos. 🧡");
    setName("");
    setEmail("");
  };

  return (
    <section className="bg-beige py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <span className={SECTION_LABEL}>Conteúdos exclusivos</span>
        <h2 className="mt-5 font-display text-3xl font-extrabold text-primary sm:text-4xl">
          Receba conteúdos exclusivos sobre proteção infantil.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Materiais, orientações e novidades do movimento direto no seu email.
        </p>
        <form
          onSubmit={submit}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            aria-label="Nome"
            maxLength={80}
            className="h-12 rounded-full bg-card px-5 shadow-[var(--shadow-soft)]"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Seu email"
            aria-label="Email"
            maxLength={120}
            className="h-12 rounded-full bg-card px-5 shadow-[var(--shadow-soft)]"
          />
          <Button type="submit" variant="hero" size="lg" className="shrink-0">
            Quero receber
          </Button>
        </form>
      </Reveal>
    </section>
  );
}

function Index() {
  return (
    <div className="overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Mission />
        <WhoAreYou />
        <Apps />
        <Library />
        <WarningSigns />
        <LearningPaths />
        <Tools />
        <JoinMovement />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
