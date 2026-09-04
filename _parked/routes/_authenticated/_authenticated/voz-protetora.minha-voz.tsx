import { createFileRoute } from "@tanstack/react-router";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { MINHA_VOZ } from "@/lib/voz-protetora/content";

export const Route = createFileRoute("/_authenticated/voz-protetora/minha-voz")({
  head: () => ({
    meta: [
      { title: "Minha Voz Protetora — Voz Protetora" },
      { name: "description", content: "Conheça a postura de uma Voz Protetora." },
      { property: "og:title", content: "Minha Voz Protetora" },
      { property: "og:description", content: "Conheça a postura de uma Voz Protetora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MinhaVozPage,
});

function MinhaVozPage() {
  return (
    <ProdutoShell
      eyebrow="🛡️ Minha Voz Protetora"
      title="Conheça a postura de uma Voz Protetora."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      <ol className="space-y-3">
        {MINHA_VOZ.map((item, index) => (
          <li
            key={item.title}
            className="rounded-[12px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {index + 1}
              </span>
              <h2 className="text-base font-bold uppercase tracking-[0.1em] text-primary">
                {item.title}
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ol>

      <blockquote className="mt-8 rounded-[12px] border-l-4 border-accent bg-card p-6 text-sm leading-relaxed text-foreground/90 sm:text-base">
        “Uma Voz Protetora não é um adulto que sabe tudo. É um adulto disposto a olhar, escutar,
        aprender e agir para fortalecer a proteção da infância.”
      </blockquote>
    </ProdutoShell>
  );
}
