/**
 * Catálogo V1 — assinatura anual recorrente (DOC_PRODUTO_VOZ_PROTETORA_V1.md §13).
 *
 * `recurrence` usa frequency_type "months" porque a API de Preapproval do Mercado Pago não
 * aceita "years" — 12 meses = 1 ano. Ver mercadopago.server.ts `createPreapproval`.
 *
 * IMPORTANTE: este valor e este fluxo ainda não foram testados contra o Mercado Pago com
 * credenciais reais (nenhum MERCADOPAGO_ACCESS_TOKEN disponível neste ambiente). Testar em
 * sandbox antes de expor o link de compra publicamente.
 */
export const VOZ_PROTETORA = {
  id: "voz-protetora-v1",
  name: "VOZ PROTETORA V1",
  amount: 97,
  currency: "BRL",
  model: "assinatura anual",
  recurrence: { frequency: 12, frequencyType: "months" } as const,
} as const;

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
