# _parked — histórico

Esta pasta guardou, entre 2026-09-?? e 2026-09-15, o código do VOZ PROTETORA (produto, checkout,
pagamento, login, acesso) enquanto o site institucional era construído e o conteúdo do produto
era reescrito a partir da base congelada.

## Por que foi parqueado

O VOZ PROTETORA, o checkout e o fluxo de pagamento foram construídos **antes de a base
institucional ser congelada** e seu conteúdo não refletia os 10 documentos oficiais. O roadmap
aprovado colocava o VOZ PROTETORA **depois** do site institucional.

## Retomada — 2026-09-15

O Banco de Situações V1 (60 peças — 20 ACONTECEU, 20 VAI ACONTECER, 20 QUERO FORTALECER) foi
integralmente redigido a partir da base e aprovado item a item pela idealizadora
(`03_PRODUTOS/VOZ_PROTETORA/conteudo/`). O código voltou para `src/routes/` e
`src/components/voz/produto/`.

**Pendente após a retomada:**
- Portar o texto aprovado das 60 peças para `src/lib/voz-protetora/content.ts` (blocos com
  `body`, status `publicado`).
- `src/lib/product.ts` ainda modela **compra única** com `amount: 1` (valor de teste). A decisão
  aprovada é **assinatura anual R$97, recorrente (Mercado Pago Preapproval)** — isso exige trocar
  a integração de pagamento (hoje é `checkout/preferences`, pagamento único) e o schema do
  Supabase (`purchases`/`product_access` não modelam assinatura/renovação). Ver
  `PRD_VOZ_PROTETORA_V1.md`, §6 e §13.4 (pendência de cancelamento/reembolso) antes de mexer
  nisso.
