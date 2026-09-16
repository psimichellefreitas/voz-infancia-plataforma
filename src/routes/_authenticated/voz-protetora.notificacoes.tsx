import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, BellOff } from "lucide-react";

import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { usePreviewSearch } from "@/lib/preview-mode";
import { useNotificacoes } from "@/lib/voz-protetora/notificacoes";

export const Route = createFileRoute("/_authenticated/voz-protetora/notificacoes")({
  head: () => ({
    meta: [
      { title: "Notificações: Voz Protetora" },
      { name: "description", content: "Novidades e atualizações do Voz Protetora." },
      { property: "og:title", content: "Notificações: Voz Protetora" },
      { property: "og:description", content: "Novidades e atualizações do Voz Protetora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotificacoesPage,
});

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function NotificacoesPage() {
  const previewSearch = usePreviewSearch();
  const { lista, lidas, ativas, hidratado, marcarTodasLidas, alternarAtivas } =
    useNotificacoes();

  useEffect(() => {
    if (hidratado) marcarTodasLidas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidratado]);

  return (
    <ProdutoShell
      eyebrow="🔔 Notificações"
      title="Novidades do Voz Protetora"
      intro="Avisos sobre novos conteúdos, atualizações e a sua assinatura. Frequência baixa, sem cobrança de uso: você pode desativar quando quiser."
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      <button
        onClick={() => alternarAtivas(!ativas)}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/80 hover:border-accent"
      >
        {ativas ? <Bell className="h-4 w-4 text-primary" /> : <BellOff className="h-4 w-4" />}
        {ativas ? "Notificações ativas" : "Notificações desativadas"}
      </button>

      {lista.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma notificação por aqui ainda.</p>
      ) : (
        <ol className="space-y-3">
          {lista.map((item) => {
            const jaLida = !hidratado || lidas.includes(item.id);
            return (
              <li
                key={item.id}
                className="rounded-[12px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-sm font-bold text-primary">{item.titulo}</h2>
                  {!jaLida && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="Novo" />
                  )}
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {formatarData(item.data)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">{item.corpo}</p>
                {item.link && (
                  <Link
                    to={item.link.to as never}
                    search={previewSearch as never}
                    className="mt-3 inline-flex text-sm font-semibold text-primary underline"
                  >
                    {item.link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </ProdutoShell>
  );
}
