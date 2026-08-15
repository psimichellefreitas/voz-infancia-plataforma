/** Catálogo V1 — produto único, compra única. */
export const VOZ_PROTETORA = {
  id: "voz-protetora-v1",
  name: "VOZ PROTETORA V1",
  // TEMPORÁRIO: valor de teste. Voltar para 67 depois dos testes de fluxo.
  amount: 1,
  currency: "BRL",
  model: "compra única",
} as const;

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}