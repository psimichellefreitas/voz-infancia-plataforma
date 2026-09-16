import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import {
  ArrowRight,
  Ban,
  Check,
  ClipboardList,
  Ear,
  Eye,
  GraduationCap,
  HandHeart,
  Lock,
  Mail,
  RotateCcw,
  Search,
  Shield,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";
import { StickyMobileCta } from "@/components/voz/StickyMobileCta";
import { Reveal } from "@/components/voz/Reveal";
import { OrientationBody } from "@/components/voz/produto/OrientationBody";
import {
  ACONTECEU,
  VAI_ACONTECER,
  FORTALECER,
  MINHA_VOZ,
  findItem,
} from "@/lib/voz-protetora/content";
import { VOZ_PROTETORA, formatBRL } from "@/lib/product";
import { LINHA_SEGURANCA } from "@/components/voz/nav";
import logoSrc from "@/assets/logo-voz-pela-infancia.png";
import shotHome from "@/assets/voz-protetora-demo-home.jpg";
import shotLista from "@/assets/voz-protetora-demo-lista.jpg";
import shotOrientacao from "@/assets/voz-protetora-demo-orientacao.jpg";
import shotBusca from "@/assets/voz-protetora-demo-busca.jpg";

export const Route = createFileRoute("/solucoes_/voz-protetora")({
  head: () => ({
    meta: [
      { title: "Voz Protetora: Orientação prática para proteger a infância" },
      {
        name: "description",
        content:
          "Voz Protetora é uma ferramenta digital que ajuda adultos a saber o que dizer, como agir e como se preparar diante de situações reais da infância.",
      },
      { property: "og:title", content: "Voz Protetora: Voz Pela Infância" },
      {
        property: "og:description",
        content: "Orientação prática para adultos que querem proteger melhor a infância.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  // `modo=lp` é o modo landing page: mesma URL, mesma página e mesma oferta —
  // usado só quando o link vem de tráfego pago (anúncio), para não vazar esse
  // tráfego para o resto do site institucional (SiteHeader/SiteFooter
  // completos continuam no acesso orgânico via "Soluções").
  // (Não usar o nome "lp" como chave: alguns navegadores/extensões de
  // privacidade removem esse parâmetro por parecer marcador de rastreamento
  // de anúncio — testado e confirmado neste ambiente.)
  validateSearch: (search: Record<string, unknown>) => ({
    lp: search["modo"] === "lp" ? true : undefined,
  }),
  component: VozProtetoraPage,
});

/**
 * Todo o conteúdo real (situações, blocos de orientação, filosofia) vem de
 * `@/lib/voz-protetora/content` — a mesma fonte da área logada. A landing
 * nunca escreve orientação nova: só seleciona, entre as 60 já aprovadas,
 * quais aparecem como gancho, como demonstração completa e como amostra de
 * variedade (arquitetura combinada com a idealizadora).
 */

// Situação usada na demonstração completa (seção "Demonstração") e destacada
// entre os ganchos de identificação — a mesma situação nas duas seções cria
// o fio "situação real → orientação real" sem duplicar conteúdo.
const DEMO_ITEM = findItem(ACONTECEU, "nao-quer-abracar")!;

const HOOK_ITEMS = [
  { item: DEMO_ITEM, porta: "aconteceu" as const, destaque: true },
  { item: findItem(ACONTECEU, "medo-de-alguem")!, porta: "aconteceu" as const, destaque: false },
  {
    item: findItem(VAI_ACONTECER, "dormir-familiar")!,
    porta: "vai-acontecer" as const,
    destaque: false,
  },
  { item: findItem(FORTALECER, "respeitar-o-nao")!, porta: "fortalecer" as const, destaque: false },
];

// Amostra de variedade (idades/contextos diferentes, 3 por porta) — não é a
// lista completa. Comunica amplitude sem revelar as 60 peças fora da compra.
const VARIEDADE_ITEMS = [
  { item: findItem(ACONTECEU, "perguntou-partes-intimas")!, porta: "aconteceu" as const },
  { item: findItem(ACONTECEU, "contou-algo-preocupante")!, porta: "aconteceu" as const },
  { item: findItem(ACONTECEU, "voltou-diferente-de-passeio")!, porta: "aconteceu" as const },
  { item: findItem(VAI_ACONTECER, "primeiro-celular")!, porta: "vai-acontecer" as const },
  { item: findItem(VAI_ACONTECER, "nova-escola")!, porta: "vai-acontecer" as const },
  { item: findItem(VAI_ACONTECER, "casa-do-outro-genitor")!, porta: "vai-acontecer" as const },
  { item: findItem(FORTALECER, "corpo-e-sexualidade-sem-tabu")!, porta: "fortalecer" as const },
  { item: findItem(FORTALECER, "riscos-online")!, porta: "fortalecer" as const },
  { item: findItem(FORTALECER, "nomear-sentimentos")!, porta: "fortalecer" as const },
];

const TOTAL_ORIENTACOES = ACONTECEU.length + VAI_ACONTECER.length + FORTALECER.length;

const PORTA_INFO = {
  aconteceu: { label: "ACONTECEU", icon: Search, color: "text-voz-blue", bg: "bg-primary/5" },
  "vai-acontecer": {
    label: "VAI ACONTECER",
    icon: Shield,
    color: "text-voz-green",
    bg: "bg-accent/10",
  },
  fortalecer: {
    label: "QUERO FORTALECER",
    icon: Sprout,
    color: "text-voz-yellow",
    bg: "bg-voz-yellow/10",
  },
} as const;

const PORTAS = [
  {
    key: "aconteceu" as const,
    desc: "Algo aconteceu. Como devo agir?",
  },
  {
    key: "vai-acontecer" as const,
    desc: "A criança vai viver uma situação. Como posso me preparar?",
  },
  {
    key: "fortalecer" as const,
    desc: "Quero fortalecer a proteção. Por onde começo?",
  },
];

// Recursos reais além das orientações (home da área logada). "Favoritos" e
// filtro por faixa etária NÃO existem no produto hoje — não entram aqui.
const RECURSOS = [
  { icon: Search, label: "Busca por palavra-chave entre as 60 orientações" },
  { icon: ShieldCheck, label: "Minha Voz Protetora: a postura Ver·Ouvir·Zelar" },
  { icon: ClipboardList, label: "Minha Presença Protetiva: autoavaliação reflexiva" },
  { icon: ArrowRight, label: "Meu Passo de Proteção: transforma orientação em ação" },
  { icon: HandHeart, label: "Preciso de Ajuda: canais reais da rede de proteção" },
];

const PUBLICOS = ["Pais e mães", "Responsáveis", "Avós", "Padrinhos", "Familiares", "Cuidadores"];

const MINHA_VOZ_ICONS = { VER: Eye, OUVIR: Ear, ZELAR: ShieldCheck } as const;

// Capturas reais da área do assinante (ACESSO_ABERTO=true no ambiente de captura —
// nenhum dado fictício, nenhuma interface recriada). Ver nota de implementação.
const SCREENSHOTS = [
  {
    src: shotHome,
    legenda: "Início: as 3 portas e a busca",
    alt: "Tela inicial do Voz Protetora, com busca e as 3 portas de orientação",
  },
  {
    src: shotLista,
    legenda: "Lista de situações reais",
    alt: "Lista de situações da porta Aconteceu",
  },
  {
    src: shotOrientacao,
    legenda: "Uma orientação aberta, por completo",
    alt: "Orientação completa para 'A criança não quer abraçar um familiar'",
  },
  {
    src: shotBusca,
    legenda: "Busca por palavra-chave",
    alt: "Resultado da busca pela palavra 'medo'",
  },
];

const CONFIANCA_ITENS = [
  { icon: Lock, label: "Pagamento processado pelo Mercado Pago, sem armazenar cartão" },
  { icon: Mail, label: "Acesso por e-mail, sem senha para lembrar" },
  { icon: RotateCcw, label: "Cancele quando quiser" },
  { icon: ShieldCheck, label: "7 dias de garantia total (Código de Defesa do Consumidor)" },
];

// Seção obrigatória (DOC 02, §27; DOC_PRODUTO_VOZ_PROTETORA_V1.md §6, §12): toda peça de venda
// precisa declarar limites. Lista normalizada a partir do DOC_PRODUTO §6 ("O que ele NÃO é").
const LIMITES = [
  "Terapia ou diagnóstico",
  "Investigação ou denúncia",
  "Serviço de emergência",
  "Substituto de profissionais especializados",
  "Substituto da rede de proteção",
  "Curso obrigatório ou plataforma de acompanhamento diário",
  "Ferramenta para determinar se uma violência aconteceu",
  "Sistema para o adulto investigar ou interrogar a criança",
];

// Respostas fundamentadas na política real (checkout.tsx, minha-assinatura.tsx) — nada inventado.
const FAQ_ITEMS = [
  {
    q: "O que é o Voz Protetora?",
    a: "Uma ferramenta digital de orientação prática para adultos que participam da vida de uma criança ou adolescente. Não é curso, não é terapia, não é diagnóstico.",
  },
  {
    q: "Preciso ter conhecimento prévio sobre o assunto?",
    a: "Não. Você não precisa saber tudo sobre proteção. Escolhe a situação que está vivendo (ou para a qual quer se preparar) e recebe uma orientação organizada para aquele momento.",
  },
  {
    q: "Funciona pelo celular?",
    a: "Sim. O Voz Protetora foi construído para ser usado no celular, no momento em que a dúvida surge.",
  },
  {
    q: "Como funciona o acesso, depois de comprar?",
    a: "Depois da confirmação do pagamento, você recebe um e-mail com um link de acesso. Não é preciso criar ou lembrar senha.",
  },
  {
    q: "Como funciona o pagamento e existe recorrência?",
    a: `Assinatura anual de ${formatBRL(VOZ_PROTETORA.amount)}, com renovação automática, processada pelo Mercado Pago.`,
  },
  {
    q: "Como funciona o cancelamento?",
    a: "Nos primeiros 7 dias, cancelamento com reembolso integral, conforme o Código de Defesa do Consumidor. Depois disso, você pode cancelar quando quiser: o acesso continua até o fim do ciclo já pago.",
  },
  {
    q: "Posso usar depois que algo já aconteceu, ou só para me preparar antes?",
    a: "As duas coisas. A porta ACONTECEU orienta situações que já aconteceram; a porta VAI ACONTECER prepara você antes de uma situação; a porta QUERO FORTALECER ajuda a desenvolver atitudes protetivas no dia a dia, sem esperar uma situação específica.",
  },
  {
    q: "O Voz Protetora substitui um profissional ou a rede de proteção?",
    a: "Não. Ele não é terapia, diagnóstico, investigação ou serviço de emergência, e não substitui profissionais nem a rede de proteção. Quando uma situação exige isso, a orientação indica buscar ajuda.",
  },
];

function VozProtetoraPage() {
  const { lp } = useSearch({ from: "/solucoes_/voz-protetora" });

  return (
    <div className="min-h-screen bg-background">
      {lp ? <LandingBar /> : <SiteHeader />}

      <main className="pt-20">
        {/* A — HERO */}
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
                    Uma ferramenta digital de orientação prática para adultos que participam da vida
                    de uma criança ou adolescente e querem proteger melhor.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {["O que dizer.", "Como agir.", "Quando buscar ajuda."].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 text-sm font-semibold text-primary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#demonstracao"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground/80 underline-offset-2 hover:text-primary-foreground hover:underline"
                  >
                    Ver uma orientação real
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="w-full max-w-sm rounded-[12px] border border-primary-foreground/20 bg-primary-foreground/10 p-6 backdrop-blur-sm sm:p-8">
                  <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground/80">
                      Investimento
                    </p>
                    <p className="mt-2 text-5xl font-bold text-primary-foreground">
                      {formatBRL(VOZ_PROTETORA.amount)}
                    </p>
                    <p className="mt-1 text-sm text-primary-foreground/80">
                      Assinatura anual, renovação automática.
                    </p>
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="heroOutline" size="xl" className="w-full">
                      <Link to="/checkout">QUERO TER O VOZ PROTETORA</Link>
                    </Button>
                    <p className="mt-3 text-center text-xs text-primary-foreground/70">
                      Cancele quando quiser. 7 dias de garantia.
                    </p>
                    <Link
                      to="/auth"
                      search={{ redirect: undefined }}
                      className="mt-4 block text-center text-xs font-semibold text-primary-foreground/70 underline-offset-2 hover:text-primary-foreground hover:underline"
                    >
                      Já é assinante? Entrar
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* B — IDENTIFICAÇÃO + PROBLEMA (fundidas) */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                Você já viveu, ou vai viver, uma situação assim?
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {HOOK_ITEMS.map(({ item, porta, destaque }) => {
                const info = PORTA_INFO[porta];
                const cardClass = cn(
                  "flex items-start gap-3 rounded-[12px] border p-5 shadow-[var(--shadow-soft)] transition-colors",
                  destaque ? "border-accent bg-card" : "border-border bg-card",
                );
                const cardContent = (
                  <>
                    <div
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-[8px]",
                        info.bg,
                      )}
                    >
                      <info.icon className={cn("h-4 w-4", info.color)} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-snug text-foreground/90">
                        {item.emoji ? `${item.emoji} ` : ""}
                        {item.title}
                      </p>
                      {destaque && (
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-accent">
                          Veja a orientação completa
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </>
                );
                return destaque ? (
                  <a key={item.slug} href="#demonstracao" className={cardClass}>
                    {cardContent}
                  </a>
                ) : (
                  <div key={item.slug} className={cardClass}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
              Nem sempre sabemos exatamente o que fazer nessas horas. Isso não é falta de cuidado,
              é falta de orientação prática para o momento.
            </p>
          </Reveal>
        </section>

        {/* C — DEMONSTRAÇÃO REAL + MOMENTO DE CONEXÃO (fundidas) */}
        <section
          id="demonstracao"
          className="border-y border-border bg-secondary px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                  Veja uma orientação real, por dentro do Voz Protetora.
                </h2>
                <p className="mt-3 text-base text-muted-foreground">{DEMO_ITEM.title}</p>
              </div>
              <div className="mt-8">
                <OrientationBody blocks={DEMO_ITEM.blocks ?? []} />
              </div>
              <div className="mt-8 rounded-[12px] border border-border bg-card p-6 text-center sm:p-8">
                <p className="text-base font-semibold leading-relaxed text-primary">
                  Isso é o Voz Protetora funcionando. E essa foi só 1 das {TOTAL_ORIENTACOES}{" "}
                  orientações, para situações que já aconteceram, que vão acontecer, ou para
                  fortalecer sua proteção no dia a dia.
                </p>
                <Button asChild variant="hero" size="xl" className="mt-6">
                  <Link to="/checkout">
                    QUERO TER TODAS AS ORIENTAÇÕES
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* D — O QUE É + COMO FUNCIONA (fundidas) */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                Uma ferramenta de orientação prática, não uma lista de regras para memorizar.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Você não precisa procurar informação dispersa nem tentar lembrar uma série de
                regras. Escolhe a situação que está vivendo, ou para a qual quer se preparar, e
                recebe uma orientação organizada.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {PORTAS.map((porta) => {
                const info = PORTA_INFO[porta.key];
                return (
                  <div
                    key={porta.key}
                    className="rounded-[12px] border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
                  >
                    <div
                      className={cn("grid h-12 w-12 place-items-center rounded-[10px]", info.bg)}
                    >
                      <info.icon className={cn("h-6 w-6", info.color)} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-primary">{info.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {porta.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10">
              <p className="text-center text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Além das orientações, você também encontra
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {RECURSOS.map((recurso) => (
                  <div
                    key={recurso.label}
                    className="flex items-start gap-3 rounded-[10px] border border-border bg-card p-4"
                  >
                    <recurso.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm leading-snug text-foreground/85">{recurso.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* E — VARIEDADE DO CATÁLOGO (curadoria) */}
        <section className="border-y border-border bg-secondary px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                  Alguns exemplos do que você encontra
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                  Dentro do Voz Protetora você encontra {TOTAL_ORIENTACOES} orientações, divididas
                  em 3 portas. Estes são só alguns exemplos.
                </p>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {VARIEDADE_ITEMS.map(({ item, porta }) => {
                  const info = PORTA_INFO[porta];
                  return (
                    <div
                      key={item.slug}
                      className="flex items-start gap-3 rounded-[10px] border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
                    >
                      <div
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-[8px]",
                          info.bg,
                        )}
                      >
                        <info.icon className={cn("h-3.5 w-3.5", info.color)} />
                      </div>
                      <p className="text-sm leading-snug text-foreground/85">
                        {item.emoji ? `${item.emoji} ` : ""}
                        {item.title}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="hero" size="lg">
                  <Link to="/checkout">
                    QUERO ACESSO COMPLETO
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* F — POSICIONAMENTO (diferencial + "você não precisa saber tudo", fundidas) */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
              Você não precisa saber tudo sobre proteção.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
              Precisa ter orientação para agir melhor quando uma situação surgir. Crianças aprendem
              sobre limites, respeito e emoções, mas os adultos também precisam saber como
              responder quando elas comunicam algo. O Voz Protetora prepara você para assumir essa
              parte.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {MINHA_VOZ.map((item) => {
                const Icon = MINHA_VOZ_ICONS[item.title as keyof typeof MINHA_VOZ_ICONS];
                return (
                  <div
                    key={item.title}
                    className="rounded-[10px] border border-border bg-card p-5 text-center shadow-[var(--shadow-soft)]"
                  >
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-secondary">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-primary">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 rounded-[12px] border border-border bg-secondary p-6 sm:p-8">
              <p className="text-center text-base font-semibold leading-relaxed text-primary sm:text-lg">
                "VER para perceber. OUVIR para compreender. ZELAR para proteger. Uma Voz Protetora
                não é um adulto que sabe tudo, é um adulto disposto a isso."
              </p>
            </div>
          </Reveal>
        </section>

        {/* G — PARA QUEM É */}
        <section className="border-y border-border bg-secondary px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
                Para quem é o Voz Protetora
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {PUBLICOS.map((publico) => (
                  <span
                    key={publico}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/85"
                  >
                    <Users className="h-4 w-4 text-accent" />
                    {publico}
                  </span>
                ))}
              </div>
              <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-muted-foreground">
                Se uma criança faz parte da sua vida, sua postura também faz parte da proteção dela.
              </p>
            </Reveal>
          </div>
        </section>

        {/* H — AUTORIDADE */}
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary/10">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary">Michelle Freitas</h2>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Psicóloga · CRP 2334/17 · Natal/RN
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Atuou dentro da própria rede de proteção, no NASF (Núcleo de Apoio à Saúde da
                  Família) e, atualmente, no CREAS (Centro de Referência Especializado de
                  Assistência Social), além de atender em psicoterapia. Foi dessa vivência direta
                  com famílias e com a rede de proteção que nasceu, em 2026, o Voz Pela Infância,
                  e, dentro dele, o Voz Protetora.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  O Voz Protetora integra o ecossistema Voz Pela Infância e é construído a partir
                  dos princípios do Método dos 5C da Proteção.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* I — DEMONSTRAÇÃO VISUAL DO PRODUTO (capturas reais da área do assinante) */}
        <section className="border-y border-border bg-secondary px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
                Veja como é por dentro
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-base text-muted-foreground">
                Capturas reais da área do assinante: é isso que você vai encontrar quando entrar.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {SCREENSHOTS.map((shot) => (
                  <figure
                    key={shot.legenda}
                    className="overflow-hidden rounded-[14px] border border-border bg-card shadow-[var(--shadow-soft)]"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-secondary">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        loading="lazy"
                        width={960}
                        height={680}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <figcaption className="border-t border-border px-4 py-3 text-sm font-semibold text-foreground/80">
                      {shot.legenda}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* J — SINAIS DE CONFIANÇA */}
        <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {CONFIANCA_ITENS.map((sinal) => (
                <div
                  key={sinal.label}
                  className="flex items-start gap-3 rounded-[10px] border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
                >
                  <sinal.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-sm leading-snug text-foreground/85">{sinal.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* K — LIMITES (obrigatória — DOC 02 §27; DOC_PRODUTO §6, §12) */}
        <section className="border-y border-border bg-secondary px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-primary/10">
                  <Ban className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                  O que o Voz Protetora não é
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Para que a proteção seja de fato responsável, é preciso ser claro sobre os limites
                do produto. O Voz Protetora não é:
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {LIMITES.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[10px] border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
                  >
                    <Ban className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <p className="text-sm leading-snug text-foreground/85">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Ele também não substitui o Método dos 5C da Proteção, a Bússola VOZ ou o Mapa da
                Proteção (visão futura): utiliza os princípios desses elementos para orientar. Nas
                situações que exigem mais do que orientação, aciona a rede de proteção (ver aviso no
                rodapé).
              </p>
            </Reveal>
          </div>
        </section>

        {/* L — OFERTA */}
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
                {TOTAL_ORIENTACOES} orientações reais, a postura Ver·Ouvir·Zelar, busca, e os
                recursos de apoio à sua presença protetiva, tudo em um único lugar.
              </p>
              <p className="mt-6 text-5xl font-bold text-primary">
                {formatBRL(VOZ_PROTETORA.amount)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Assinatura anual, renovação automática.
              </p>
              <div className="mt-8">
                <Button asChild variant="hero" size="xl">
                  <Link to="/checkout">
                    QUERO TER O VOZ PROTETORA
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Pagamento processado pelo Mercado Pago. Acesso liberado após a confirmação. Cancele
                quando quiser. Nos primeiros 7 dias, com reembolso integral.
              </p>
            </div>
          </Reveal>
        </section>

        {/* M — FAQ */}
        <section className="border-t border-border bg-secondary px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
                Perguntas frequentes
              </h2>
              <div className="mt-8 rounded-[12px] border border-border bg-card px-5 sm:px-8">
                <Accordion type="single" collapsible>
                  {FAQ_ITEMS.map((faq, index) => (
                    <AccordionItem key={faq.q} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left text-sm font-semibold text-foreground/90 sm:text-base">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="hero" size="lg">
                  <Link to="/checkout">
                    QUERO COMEÇAR AGORA
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* N — FECHAMENTO EMOCIONAL */}
        <section className="bg-primary px-5 py-16 text-center text-primary-foreground sm:px-8 sm:py-20">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <Check className="mx-auto h-8 w-8 text-voz-yellow" />
              <p className="mt-5 text-2xl font-bold leading-snug sm:text-3xl">
                Toda infância precisa de proteção.
                <br />
                Todo adulto pode ser Voz.
              </p>
              <p className="mt-4 text-base text-primary-foreground/85">Comece preparando a sua.</p>
              <div className="mt-8">
                <Button asChild variant="heroOutline" size="xl">
                  <Link to="/checkout">
                    QUERO SER VOZ AGORA
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {lp ? <LandingFooter /> : <SiteFooter />}
      <StickyMobileCta />
    </div>
  );
}

/**
 * Barra mínima do modo landing page: só a logo (sem link — evita vazar o
 * tráfego pago de volta para a home) e sem menu institucional.
 */
function LandingBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center px-5 py-3 sm:px-8">
        <img
          src={logoSrc}
          alt="Voz Pela Infância"
          className="h-12 w-auto object-contain"
          width={696}
          height={359}
        />
      </div>
    </header>
  );
}

/**
 * Rodapé mínimo do modo landing page: mantém só o que é obrigatório (linha
 * de segurança do DOC 09, direitos autorais, Termos/Privacidade — exigidos
 * para a compra) e remove os links de saída do site institucional.
 */
function LandingFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="border-b border-border/70">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs leading-relaxed text-muted-foreground sm:px-8">
          {LINHA_SEGURANCA}
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-muted-foreground sm:px-8">
        <p>© {new Date().getFullYear()} Voz Pela Infância. Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <Link to="/termos-de-uso" className="hover:text-primary">
            Termos de Uso
          </Link>
          <Link to="/politica-de-privacidade" className="hover:text-primary">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}

// Local cn helper to avoid extra imports inside the same file
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
