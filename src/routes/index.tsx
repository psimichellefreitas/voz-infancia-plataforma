import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart,
  Stethoscope,
  ArrowRight,
  Users,
  GraduationCap,
  Church,
  School,
  BookOpen,
  Smartphone,
  Megaphone,
  ShieldCheck,
  Lock,
  Building2,
  HeartHandshake,
  Play,
  AlertTriangle,
  Wrench,
  Newspaper,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Mail,
  Stethoscope as StethoscopeIcon,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/voz/Reveal";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";
import { toast } from "sonner";
import heroImg from "@/assets/hero.jpg";
import videoPoster from "@/assets/video-poster.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Feather, Sparkles, CheckCircle2 } from "lucide-react";
import aboutFamily from "@/assets/about-family.jpg";
import manifestoHands from "@/assets/manifesto-hands.jpg";

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

const SHELL = "mx-auto max-w-[1400px] px-5 sm:px-8";

/* ----------------------------- HERO ----------------------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Criança feliz olhando para a luz dourada do pôr do sol em um campo aberto"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className={`relative z-10 ${SHELL} grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:py-28`}>
        <Reveal>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            O maior portal brasileiro de conscientização, educação e tecnologias
            para proteção infantil.
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-primary sm:text-5xl lg:text-6xl">
            Toda criança merece um adulto{" "}
            <span className="text-accent">que não se cale.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-foreground/75">
            Informação, educação e ferramentas para proteger crianças e transformar
            realidades.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="hero" size="lg">
              <a href="#movimento">Erga sua voz</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#aplicativos">Conheça os aplicativos</a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150} className="hidden lg:block">
          <div className="ml-auto max-w-md">
            <div className="overflow-hidden rounded-3xl bg-primary shadow-[var(--shadow-lift)]">
              <div className="relative aspect-[4/3]">
                <img
                  src={videoPoster}
                  alt="Mãe abraçando carinhosamente a filha sorridente em casa"
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/30" />
                <div className="absolute left-5 top-5 text-primary-foreground">
                  <p className="font-display text-sm font-bold">Assista ao vídeo</p>
                  <p className="text-xs text-primary-foreground/80">e entenda nossa missão</p>
                </div>
                <button
                  aria-label="Assistir vídeo"
                  className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-primary-foreground/70 text-primary-foreground backdrop-blur-sm transition-transform hover:scale-110"
                >
                  <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)]">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <HeartHandshake className="h-6 w-6" />
              </span>
              <p className="text-sm leading-snug text-muted-foreground">
                A missão da proteção é impedir que a dor roube aquilo que Deus planejou
                para a infância.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------- PERSONA BAR -------------------------- */
const PERSONAS = [
  { icon: Users, title: "Sou Pai ou Mãe" },
  { icon: GraduationCap, title: "Sou Educador" },
  { icon: Stethoscope, title: "Sou Profissional" },
  { icon: Church, title: "Sou Igreja" },
  { icon: School, title: "Sou Escola" },
  { icon: Smartphone, title: "Conheça nossos Aplicativos" },
];

function PersonaBar() {
  return (
    <section className="relative z-20 bg-background">
      <div className={`${SHELL} -mt-6 sm:-mt-12`}>
        <Reveal className="rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-lift)] sm:p-6">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {PERSONAS.map((p) => (
              <button
                key={p.title}
                className="group flex flex-col items-center gap-3 rounded-2xl px-3 py-5 text-center transition-colors hover:bg-beige"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/12 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <p.icon className="h-6 w-6" />
                </span>
                <span className="text-xs font-bold leading-tight text-primary sm:text-sm">
                  {p.title}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------- APPS + MOVEMENT CARD --------------------- */
const APPS = [
  { title: "Erga Sua Voz Pela Infância", summary: "Jornada gratuita de conscientização e compromisso.", icon: Megaphone, color: "bg-accent/15 text-accent" },
  { title: "Meu Filho Protegido", summary: "Guia completo para pais protegerem seus filhos.", icon: ShieldCheck, color: "bg-violet-500/15 text-violet-600" },
  { title: "Proteção Digital", summary: "Ensine seus filhos a se protegerem no mundo digital.", icon: Lock, color: "bg-emerald-500/15 text-emerald-600" },
  { title: "Escola Segura", summary: "Recursos para construir ambientes escolares seguros.", icon: Building2, color: "bg-sky-500/15 text-sky-600" },
  { title: "Proteção Emocional", summary: "Recursos para fortalecer a saúde emocional das crianças.", icon: Heart, color: "bg-rose-500/15 text-rose-600" },
];

const STATS = [
  { icon: Users, value: "+250 mil", label: "pessoas impactadas" },
  { icon: School, value: "+900", label: "escolas parceiras" },
  { icon: GraduationCap, value: "+1.200", label: "profissionais capacitados" },
];

function Apps() {
  return (
    <section id="aplicativos" className="bg-background py-16 sm:py-24">
      <div className={SHELL}>
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <Reveal className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-primary sm:text-3xl">
                Aplicativos
              </h2>
              <a
                href="#aplicativos"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
              >
                Ver todos <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>

            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
              {APPS.map((app, i) => (
                <Reveal key={app.title} delay={i * 70}>
                  <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                    <span className={`grid h-12 w-12 place-items-center rounded-xl ${app.color}`}>
                      <app.icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-display text-sm font-bold leading-tight text-primary">
                      {app.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {app.summary}
                    </p>
                    <button className="mt-4 w-full rounded-full border border-border py-2 text-xs font-semibold text-primary transition-colors group-hover:border-accent group-hover:text-accent">
                      Acessar
                    </button>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div id="movimento" className="flex h-full flex-col rounded-3xl bg-primary p-7 text-primary-foreground shadow-[var(--shadow-lift)]">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
                Junte-se ao Movimento
              </h3>
              <div className="mt-6 space-y-5">
                {STATS.map((s) => (
                  <div key={s.label} className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-foreground/10 text-accent">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-xl font-extrabold leading-none">{s.value}</p>
                      <p className="text-xs text-primary-foreground/70">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-7 font-display text-base font-bold leading-snug">
                Todos unidos pela proteção da infância.
              </p>
              <Button variant="hero" size="lg" className="mt-5 w-full">
                Faça parte
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- HIGHLIGHT SECTIONS ---------------------- */
const HIGHLIGHTS = [
  { id: "biblioteca", icon: BookOpen, title: "Biblioteca Digital", text: "E-books, guias, cartilhas e materiais gratuitos para você baixar." },
  { id: "trilhas", icon: GraduationCap, title: "Cursos e Formações", text: "Cursos online para pais, profissionais, escolas e igrejas." },
  { id: "sinais", icon: AlertTriangle, title: "Sinais de Alerta", text: "Aprenda a identificar sinais de abuso e violência infantil." },
  { id: "ferramentas", icon: Wrench, title: "Ferramentas Práticas", text: "Checklists, planos, quizzes e recursos para o dia a dia." },
  { id: "blog", icon: Newspaper, title: "Blog e Artigos", text: "Conteúdos atualizados sobre proteção, educação e infância." },
];

function Highlights() {
  return (
    <section className="bg-background pb-4">
      <div className={`${SHELL} grid gap-4 sm:grid-cols-2 lg:grid-cols-5`}>
        {HIGHLIGHTS.map((h, i) => (
          <Reveal key={h.id} delay={i * 70}>
            <a
              href={`#${h.id}`}
              className="group relative flex h-full min-h-44 flex-col justify-end overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl transition-opacity group-hover:opacity-100" />
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-primary-foreground/10 text-accent">
                <h.icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-4 font-display text-base font-bold uppercase tracking-wide">
                {h.title}
              </h3>
              <p className="relative mt-2 text-xs leading-relaxed text-primary-foreground/70">
                {h.text}
              </p>
              <span className="relative mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                Explorar <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------- SPECIFIC CONTENT ------------------------ */
const AREAS = [
  { icon: Users, color: "text-accent", title: "Área dos Pais", text: "Dicas, conteúdos e ferramentas para proteger seus filhos." },
  { icon: Stethoscope, color: "text-violet-600", title: "Área dos Profissionais", text: "Materiais, protocolos e formações para quem atua na proteção." },
  { icon: Building2, color: "text-sky-600", title: "Área das Escolas", text: "Projetos, palestras e materiais para construir escolas seguras." },
  { icon: Church, color: "text-emerald-600", title: "Área das Igrejas", text: "Orientações e recursos para ministérios infantis seguros." },
  { icon: HeartHandshake, color: "text-rose-600", title: "Comunidade", text: "Faça parte da rede de pessoas que erguem a voz." },
];

function Areas() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className={SHELL}>
        <Reveal className="text-center">
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-primary sm:text-3xl">
            Conteúdos específicos para você
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {AREAS.map((a, i) => (
            <Reveal key={a.title} delay={i * 70}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                <a.icon className={`h-8 w-8 ${a.color}`} />
                <h3 className="mt-4 font-display text-base font-bold text-primary">{a.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{a.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                  Acessar <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------- PROTECTION MAP -------------------------- */
const MAP_STEPS = [
  { icon: Users, label: "Pai/Mãe" },
  { icon: GraduationCap, label: "Educador" },
  { icon: Church, label: "Pastor" },
  { icon: StethoscopeIcon, label: "Psicólogo" },
  { icon: ShieldCheck, label: "Conselheiro Tutelar" },
  { icon: UserRound, label: "Assistente Social" },
  { icon: HeartHandshake, label: "Outros" },
];

function ProtectionMap() {
  return (
    <section className="bg-primary py-16 text-primary-foreground sm:py-20">
      <div className={`${SHELL} grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]`}>
        <Reveal>
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide sm:text-3xl">
            Mapa da Proteção
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
            Cada pessoa tem um papel importante na proteção da infância.
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
            Responda algumas perguntas e receba sua trilha personalizada de conteúdos
            e ferramentas.
          </p>
          <Button variant="hero" size="lg" className="mt-7">
            Começar agora
          </Button>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-wrap items-start justify-center gap-x-2 gap-y-8 sm:justify-between">
            {MAP_STEPS.map((s) => (
              <div key={s.label} className="flex w-20 flex-col items-center gap-3 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-primary-foreground/25 text-accent transition-colors hover:border-accent">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="text-[0.7rem] font-semibold leading-tight text-primary-foreground/80">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------- NEWSLETTER --------------------------- */
const SOCIALS = [Instagram, Facebook, Youtube, MessageCircle];

function Newsletter() {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Informe seu e-mail para continuar.");
      return;
    }
    toast.success("Inscrição recebida! Em breve você receberá nossos conteúdos. 🧡");
    setEmail("");
  };

  return (
    <section className="bg-beige py-12">
      <div className={`${SHELL} flex flex-col items-center justify-between gap-8 lg:flex-row`}>
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
            <Mail className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-primary">
              Receba conteúdos e novidades
            </h2>
            <p className="text-sm text-muted-foreground">
              Inscreva-se e receba materiais exclusivos, dicas e novidades sobre proteção infantil.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="flex w-full max-w-sm items-center gap-2">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Seu melhor e-mail"
            aria-label="E-mail"
            maxLength={120}
            className="h-11 rounded-full bg-card px-5 shadow-[var(--shadow-soft)]"
          />
          <Button type="submit" variant="hero" size="lg" className="shrink-0">
            Inscrever
          </Button>
        </form>

        <div className="flex flex-col items-center gap-3 lg:items-end">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Siga nossas redes
          </span>
          <div className="flex gap-2">
            {SOCIALS.map((Icon, i) => (
              <a
                key={i}
                href="https://instagram.com/michellefreitaspsi"
                target="_blank"
                rel="noreferrer"
                aria-label="Rede social"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-primary transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- O QUE É VOZ PELA INFÂNCIA -------------------- */
const MANIFESTO = [
  "Acreditamos que proteger uma criança é proteger o futuro.",
  "Acreditamos que famílias fortalecidas transformam gerações.",
  "Acreditamos que conhecimento gera prevenção.",
  "Acreditamos que o silêncio nunca deve vencer a verdade.",
  "Acreditamos que toda criança merece crescer em segurança, dignidade e amor.",
];

const COMMITMENT = [
  "Manter meu olhar atento à proteção das crianças ao meu redor.",
  "Buscar conhecimento para reconhecer sinais e agir com consciência.",
  "Fortalecer vínculos de confiança e escuta com as crianças.",
  "Nunca silenciar diante de algo que possa feri-las.",
  "Compartilhar essa missão e inspirar outras pessoas a protegê-las.",
];

function AboutSection() {
  return (
    <section id="missao" className="relative overflow-hidden bg-background py-20 sm:py-28">
      {/* soft beige + blue ambient details */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-beige blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-32 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

      <div className={`relative ${SHELL}`}>
        {/* Heading */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Heart className="h-3.5 w-3.5 fill-current" /> Nossa missão
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-primary sm:text-4xl lg:text-5xl">
            O que é Voz Pela Infância?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/75">
            Voz Pela Infância é um movimento de conscientização, educação e mobilização
            social que acredita que toda criança merece crescer protegida, amada e
            respeitada.
          </p>
        </Reveal>

        {/* Main text + image */}
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-foreground/75">
              <p>
                Todos os dias, milhares de crianças dependem do olhar atento de um adulto
                para serem protegidas.
              </p>
              <p>
                Muitas vezes, os sinais são silenciosos. As dores não são ditas. Os pedidos
                de ajuda acontecem através de comportamentos, emoções e mudanças que passam
                despercebidas.
              </p>
              <p className="font-semibold text-primary">
                O Voz Pela Infância nasceu para transformar informação em proteção.
              </p>
              <p>
                Nossa missão é despertar famílias, profissionais, escolas, igrejas e toda a
                sociedade para que estejam preparados para reconhecer sinais, fortalecer
                vínculos e agir de forma consciente na proteção da infância.
              </p>
              <p>
                Porque proteger uma criança não é responsabilidade de um único profissional.
                É uma missão compartilhada por todos nós.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
              <img
                src={aboutFamily}
                alt="Família feliz com pais e crianças sorrindo e brincando juntos ao ar livre"
                width={1280}
                height={832}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Highlight box */}
        <Reveal className="mt-16">
          <div className="mx-auto max-w-4xl rounded-3xl border border-sky-500/20 bg-sky-500/10 px-8 py-12 text-center">
            <p className="font-display text-2xl font-extrabold leading-snug text-primary sm:text-3xl">
              “Toda criança merece um adulto que não se cale.”
            </p>
          </div>
        </Reveal>

        {/* Institutional video */}
        <Reveal className="mt-16">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="font-display text-xl font-extrabold text-primary sm:text-2xl">
              Assista e descubra por que esta missão importa.
            </h3>
            <div className="group relative mt-7 overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
              <img
                src={videoPoster}
                alt="Capa do vídeo institucional Voz Pela Infância"
                width={1280}
                height={720}
                loading="lazy"
                className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/40" />
              <button
                aria-label="Assistir apresentação"
                className="absolute inset-0 grid place-items-center"
              >
                <span className="grid h-20 w-20 place-items-center rounded-full bg-background/95 text-accent shadow-[var(--shadow-lift)] transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-8 w-8 translate-x-0.5 fill-current" />
                </span>
              </button>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-background/90 px-5 py-2 text-sm font-bold text-primary backdrop-blur-sm">
                ▶ Assistir apresentação
              </span>
            </div>
          </div>
        </Reveal>

        {/* Manifesto */}
        <Reveal className="mt-20">
          <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-[var(--shadow-lift)] sm:p-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-foreground/10 text-accent">
                <Feather className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-extrabold sm:text-3xl">
                Manifesto Voz Pela Infância
              </h3>
              <p className="mt-5 text-base font-semibold text-primary-foreground/90">
                Acreditamos que proteger uma criança é proteger o futuro.
              </p>
              <ul className="mt-5 space-y-3">
                {MANIFESTO.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-primary-foreground/80">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-display text-lg font-bold leading-snug">
                Por isso, escolhemos erguer nossa voz. Porque uma infância protegida
                floresce para toda a vida.
              </p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="hero" size="lg" className="mt-8">
                    <Heart className="fill-current" /> Eu decido erguer minha voz
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl text-primary">
                      Declaração de Compromisso
                    </DialogTitle>
                    <DialogDescription>
                      Ao erguer minha voz pela infância, eu me comprometo a:
                    </DialogDescription>
                  </DialogHeader>
                  <ul className="mt-2 space-y-4">
                    {COMMITMENT.map((line) => (
                      <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 rounded-2xl bg-beige px-5 py-4 text-center font-display text-base font-bold text-primary">
                    Eu sou uma voz pela infância. 🧡
                  </p>
                  <Button
                    variant="hero"
                    size="lg"
                    className="mt-4 w-full"
                    onClick={() =>
                      toast.success("Obrigado por erguer sua voz pela infância! 🧡")
                    }
                  >
                    Assumo este compromisso
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="overflow-hidden rounded-3xl">
              <img
                src={manifestoHands}
                alt="Mãos cuidando de uma pequena muda verde, símbolo de proteção e esperança"
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* Closing question + CTA */}
        <Reveal className="mt-20">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card px-8 py-12 text-center shadow-[var(--shadow-soft)]">
            <p className="font-display text-2xl font-extrabold leading-snug text-primary sm:text-3xl">
              Se uma criança precisasse da sua voz hoje, você saberia como protegê-la?
            </p>
            <Button asChild variant="hero" size="xl" className="mt-8">
              <a href="#missao-quem">
                Quero aprender a proteger <ArrowRight />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <PersonaBar />
        <AboutSection />
        <Apps />
        <Highlights />
        <Areas />
        <ProtectionMap />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
