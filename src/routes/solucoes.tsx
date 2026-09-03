import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/voz/PageShell";
import { CONTATO_EMAIL } from "@/components/voz/nav";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Formações, palestras e materiais para levar a Cultura Protetiva da Infância para a prática — em escolas, instituições, equipes e comunidades.",
      },
      { property: "og:title", content: "Soluções — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Como a Voz Pela Infância ajuda a transformar conhecimento em ação protetiva.",
      },
    ],
  }),
  component: SolucoesPage,
});

const FORMATOS = [
  {
    nome: "Palestra",
    d: "Encontro único de sensibilização — abre a conversa sobre proteção no cotidiano.",
  },
  {
    nome: "Formação",
    d: "Encontro mais aprofundado, com foco em um dos pilares do Método dos 5C.",
  },
  {
    nome: "Formação continuada",
    d: "Percurso ao longo do tempo, retomando e aprofundando cada dimensão.",
  },
];

const PUBLICOS = ["Escolas", "Instituições", "Equipes e serviços", "Comunidades", "Grupos de famílias"];

const COMO_FUNCIONA = [
  "Conversa inicial para entender o contexto, o público e o tempo disponível.",
  "Proposta adaptada — tema, formato e abordagem.",
  "Realização do encontro.",
  "Material de apoio e sugestões de próximos passos.",
];

const NAO_PROMETE = [
  "não elimina o risco de violência",
  "não substitui protocolos institucionais nem a rede de proteção",
  "não torna ninguém automaticamente preparado — é um passo no desenvolvimento de capacidades",
];

function H2({ children, id }: { children: string; id?: string }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-2xl font-semibold text-primary sm:text-3xl">
      {children}
    </h2>
  );
}

function SolucoesPage() {
  return (
    <PageShell
      eyebrow="Soluções"
      title="Como a Voz pode ajudar"
      intro="Formas de levar a Cultura Protetiva da Infância para a prática — de encontros presenciais a materiais para o dia a dia."
    >
      <div className="space-y-16">
        {/* FORMAÇÕES E PALESTRAS */}
        <section>
          <span className="inline-block rounded-[6px] bg-secondary px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-primary">
            Disponível
          </span>
          <H2 id="formacoes">Formações e palestras</H2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Encontros conduzidos a partir do Método dos 5C da Proteção, para ampliar a capacidade
            protetiva dos adultos — perceber, se relacionar, saber, assumir responsabilidade e
            sustentar a proteção no cotidiano. O conteúdo é adaptado ao público e ao contexto, sem
            alarmismo.
          </p>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.08em] text-primary">
            Formatos
          </h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {FORMATOS.map((f) => (
              <article
                key={f.nome}
                className="rounded-[10px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <h4 className="text-base font-semibold text-primary">{f.nome}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </article>
            ))}
          </div>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.08em] text-primary">
            Para quem
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {PUBLICOS.map((p) => (
              <li
                key={p}
                className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-muted-foreground"
              >
                {p}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.08em] text-primary">
            Como funciona
          </h3>
          <ol className="mt-3 space-y-2">
            {COMO_FUNCIONA.map((step, i) => (
              <li
                key={step}
                className="flex gap-3 rounded-[10px] border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="font-display text-sm font-semibold text-accent">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.08em] text-primary">
            O que a formação não promete
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {NAO_PROMETE.map((n) => (
              <li key={n} className="flex gap-2">
                <span aria-hidden className="text-accent">
                  ·
                </span>
                {n}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button asChild variant="hero" size="lg">
              <a href="#solicitar">
                Solicitar uma formação
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* MATERIAIS E PRODUTOS */}
        <section className="border-t border-border pt-14">
          <span className="inline-block rounded-[6px] border border-border bg-card px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Em desenvolvimento
          </span>
          <H2>Materiais e produtos</H2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Materiais práticos e produtos para adultos aplicarem a proteção no cotidiano. Estão em
            desenvolvimento e serão apresentados aqui quando disponíveis.
          </p>
        </section>

        {/* SOLICITAR */}
        <section className="border-t border-border pt-14">
          <H2 id="solicitar">Solicitar uma formação</H2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Preencha os campos abaixo — o botão abre seu programa de e-mail com a mensagem pronta.
            Ou escreva direto para{" "}
            <a
              href={`mailto:${CONTATO_EMAIL}`}
              className="font-semibold text-primary hover:text-accent"
            >
              {CONTATO_EMAIL}
            </a>
            .
          </p>
          <div className="mt-6">
            <FormacaoRequest />
          </div>
        </section>
      </div>
    </PageShell>
  );
}

const FIELD_CLS =
  "w-full rounded-[8px] border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none";

function FormacaoRequest() {
  const [form, setForm] = useState({
    nome: "",
    instituicao: "",
    publico: "",
    formato: "Palestra",
    local: "",
    mensagem: "",
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Solicitação de formação${form.instituicao ? ` — ${form.instituicao}` : ""}`;
    const body = [
      `Nome: ${form.nome}`,
      `Instituição: ${form.instituicao}`,
      `Público: ${form.publico}`,
      `Formato: ${form.formato}`,
      `Cidade/Estado: ${form.local}`,
      "",
      form.mensagem,
    ].join("\n");
    window.location.href = `mailto:${CONTATO_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4" aria-label="Solicitar uma formação">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-foreground">Seu nome</span>
          <input
            className={`mt-1.5 ${FIELD_CLS}`}
            type="text"
            value={form.nome}
            onChange={(e) => set("nome", e.target.value)}
            autoComplete="name"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-foreground">Instituição</span>
          <input
            className={`mt-1.5 ${FIELD_CLS}`}
            type="text"
            value={form.instituicao}
            onChange={(e) => set("instituicao", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-foreground">Público</span>
          <input
            className={`mt-1.5 ${FIELD_CLS}`}
            type="text"
            placeholder="famílias, educadores, profissionais…"
            value={form.publico}
            onChange={(e) => set("publico", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-foreground">Formato</span>
          <select
            className={`mt-1.5 ${FIELD_CLS}`}
            value={form.formato}
            onChange={(e) => set("formato", e.target.value)}
          >
            <option>Palestra</option>
            <option>Formação</option>
            <option>Formação continuada</option>
            <option>Ainda não sei</option>
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-foreground">Cidade / Estado</span>
          <input
            className={`mt-1.5 ${FIELD_CLS}`}
            type="text"
            value={form.local}
            onChange={(e) => set("local", e.target.value)}
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-foreground">Mensagem</span>
        <textarea
          className={`mt-1.5 ${FIELD_CLS} min-h-[110px] resize-y`}
          value={form.mensagem}
          onChange={(e) => set("mensagem", e.target.value)}
          placeholder="Conte um pouco sobre o contexto e o que a instituição espera."
        />
      </label>
      <Button type="submit" variant="hero" size="lg">
        Abrir e-mail com a solicitação
      </Button>
    </form>
  );
}
