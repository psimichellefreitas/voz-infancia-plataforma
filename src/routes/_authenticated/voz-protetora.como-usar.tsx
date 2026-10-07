import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { reabrirBoasVindas } from "@/components/voz/produto/BoasVindas";
import { ProdutoShell } from "@/components/voz/produto/ProdutoShell";
import { usePreviewSearch } from "@/lib/preview-mode";

export const Route = createFileRoute("/_authenticated/voz-protetora/como-usar")({
  head: () => ({
    meta: [
      { title: "Como usar o app: Voz Protetora" },
      { name: "description", content: "Como usar o Voz Protetora, passo a passo." },
      { property: "og:title", content: "Como usar o app: Voz Protetora" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ComoUsarPage,
});

// Textos aprovados pela idealizadora em 2026-10-07 (TEXTOS_BOAS_VINDAS_E_INSTALACAO_RASCUNHO.md,
// item C). O item 5 usa a versão sem telefones, conforme o padrão de redação: os contatos ficam
// só na página Preciso de ajuda.
const ITENS = [
  {
    titulo: "Escolher a situação",
    texto:
      "Use a busca ou uma das três portas. A busca procura por palavras como \"medo\", \"celular\" ou \"segredo\".",
  },
  {
    titulo: "Ler a orientação",
    texto:
      "Todas seguem a mesma ordem. \"Meu próximo passo\" vem primeiro, com uma ação concreta. \"Quando buscar ajuda?\" mostra quando a situação pede apoio da rede de proteção. Os demais blocos abrem ao toque.",
  },
  {
    titulo: "Ajustar pela idade",
    texto:
      "Em algumas orientações, é possível escolher a faixa etária para ver a fala mais adequada. A escolha fica só neste aparelho.",
  },
  {
    titulo: "Compartilhar ou imprimir",
    texto:
      "Cada orientação pode ser enviada por WhatsApp a outro adulto ou salva em PDF para imprimir.",
  },
  {
    titulo: "Quando a orientação não basta",
    texto: "Toque em Ajuda, na barra de baixo, e siga o caminho indicado.",
  },
  {
    titulo: "Suas anotações ficam com você",
    texto:
      "O que você escreve em \"Meu Passo de Proteção\" e \"Minha Presença Protetiva\" é guardado apenas neste aparelho. Se trocar de celular, essas anotações não acompanham a troca. Não escreva nomes nem dados que identifiquem uma criança.",
  },
] as const;

function ComoUsarPage() {
  const navigate = useNavigate();
  const previewSearch = usePreviewSearch() as never;

  return (
    <ProdutoShell
      title="Como usar o app"
      backTo={{ to: "/voz-protetora", label: "Voltar ao início" }}
    >
      <ol className="space-y-3">
        {ITENS.map((item, i) => (
          <li
            key={item.titulo}
            className="flex gap-4 rounded-[20px] border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)]"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {i + 1}
            </span>
            <div className="min-w-0">
              <h2 className="text-[15px] font-bold text-primary">{item.titulo}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.texto}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reabrirBoasVindas();
            navigate({ to: "/voz-protetora", search: previewSearch });
          }}
        >
          Rever boas-vindas
        </Button>
      </div>
    </ProdutoShell>
  );
}
