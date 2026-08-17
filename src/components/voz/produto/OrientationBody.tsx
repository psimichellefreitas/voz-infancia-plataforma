import type { OrientationBlock } from "@/lib/voz-protetora/content";

/**
 * Renderiza a estrutura oficial de orientação.
 * Blocos sem `body` ficam explicitamente marcados como conteúdo em produção —
 * nunca exibimos texto fictício como se fosse definitivo.
 */
export function OrientationBody({ blocks }: { blocks: OrientationBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <section
          key={block.key}
          className="rounded-[12px] border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6"
        >
          <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-primary">
            {block.label}
          </h2>
          {block.body ? (
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
              {block.body}
            </p>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Conteúdo em produção. Esta orientação será publicada nesta área assim que o texto
              oficial for revisado.
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
