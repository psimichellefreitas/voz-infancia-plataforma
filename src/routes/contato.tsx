import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import { PageShell } from "@/components/voz/PageShell";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/components/voz/nav";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Fale com o Voz Pela Infância para parcerias, formações, palestras e convites institucionais.",
      },
      { property: "og:title", content: "Contato — Voz Pela Infância" },
      { property: "og:description", content: "Parcerias, formações e convites institucionais." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Fale com o movimento"
      title="Contato"
      intro="Para parcerias, formações e convites, escolha o canal mais direto."
    >
      <div className="space-y-4">
        <a
          href="mailto:contato@vozpelainfancia.org"
          className="flex items-center gap-4 rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
        >
          <Mail className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-primary">contato@vozpelainfancia.org</span>
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
        >
          <Instagram className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-primary">{INSTAGRAM_HANDLE}</span>
        </a>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Em situações de risco imediato a uma criança, acione o Conselho Tutelar da sua cidade ou
        ligue 100.
      </p>
    </PageShell>
  ),
});
