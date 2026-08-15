/** Catálogo V1 — produto único, compra única. */
export const VOZ_PROTETORA = {
  id: "voz-protetora-v1",
  name: "VOZ PROTETORA V1",
  amount: 67,
  currency: "BRL",
  model: "compra única",
} as const;

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}