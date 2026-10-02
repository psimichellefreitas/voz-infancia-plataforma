/**
 * Catálogo V1 — compra única (decisão de 2026-09-28, PRD_VOZ_PROTETORA_V1.md §10-ter):
 * validar o produto com compra única e preço de entrada antes de migrar para assinatura
 * recorrente, quando o produto e o volume de conteúdo estiverem mais maduros.
 *
 * O código da assinatura recorrente (Preapproval) continua em `mercadopago.server.ts` e na
 * tabela `subscriptions`, sem uso por enquanto — não foi removido porque a migração de volta
 * para recorrência já está prevista.
 */
export const VOZ_PROTETORA = {
  id: "voz-protetora-v1",
  name: "VOZ PROTETORA V1",
  // PREÇO DE TESTE (2026-10-02): R$ 1 enquanto validamos a compra de ponta a ponta.
  // VOLTAR PARA 47 antes de divulgar o produto.
  amount: 1,
  currency: "BRL",
  model: "compra única",
} as const;

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
