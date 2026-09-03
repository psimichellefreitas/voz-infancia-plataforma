import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import { PageShell } from "@/components/voz/PageShell";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/components/voz/nav";

// TODO: confirmar o endereço de e-mail oficial antes de publicar.
const EMAIL = "contato@vozpelainfancia.org";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Fale com a Voz Pela Infância para formações, palestras, parcerias e convites institucionais.",
      },
      { property: "og:title", content: "Contato — Voz Pela Infância" },
      { property: "og:description", content: "Formações, palestras, parcerias e convites institucionais." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <PageShell
      eyebrow="Fale com o movimento"
      title="Contato"
      intro="Para formações, palestras, parcerias e convites institucionais, escolha o canal mais direto."
    >
      <div className="space-y-4">
        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center gap-4 rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
        >
          <Mail className="h-5 w-5 shrink-0 text-primary" />
          <span className="text-sm font-semibold text-primary">{EMAIL}</span>
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
        >
          <Instagram className="h-5 w-5 shrink-0 text-primary" />
          <span className="text-sm font-semibold text-primary">{INSTAGRAM_HANDLE}</span>
        </a>
      </div>

      <div className="mt-10 rounded-[12px] border border-border bg-secondary p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-primary">Solicitar uma formação ou palestra</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Para agilizar, inclua na mensagem: a instituição, o público (famílias, educadores,
          profissionais…), o número aproximado de pessoas, o tema de interesse, o formato desejado
          (encontro único, formação continuada, palestra) e a cidade/estado.
        </p>
      </div>

      <p className="mt-8 rounded-[10px] border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
        Este não é um canal de denúncia nem de emergência. Em situação de risco imediato a uma
        criança ou adolescente, acione o Conselho Tutelar da sua cidade, o Disque 100 ou a Polícia
        Militar (190).
      </p>
    </PageShell>
  );
}
