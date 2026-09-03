# _parked — código estacionado (fora de rota)

Estas rotas e componentes **não são registrados pelo roteador** (o TanStack Router
só varre `src/routes/`). Ficam aqui preservados, sem estar acessíveis no site.

## Por quê

O VOZ PROTETORA, o checkout e o fluxo de pagamento foram construídos **antes de a
base institucional ser congelada** e seu conteúdo não reflete os 10 documentos
oficiais. Além disso, o roadmap aprovado coloca o VOZ PROTETORA **depois** do site
institucional. Ver a decisão 2 do "Plano do Site V1".

## O que está aqui

- `routes/solucoes_.voz-protetora.tsx` — landing page do produto
- `routes/_authenticated/` — área logada do produto (11 telas)
- `routes/checkout.tsx`, `routes/pagamento.*.tsx`, `routes/acesso.tsx`, `routes/auth.tsx`
- `routes/api/public/webhooks/mercadopago.ts` — webhook de pagamento
- `routes/apoie.tsx` — página de apoio (sem fluxo de doação nesta fase)
- `components/produto/` — componentes usados apenas pelo produto

## Como retomar

Na fase VOZ PROTETORA, o conteúdo será **reescrito a partir da base** e aprovado
item a item. O código volta para `src/routes/` / `src/components/voz/` conforme a
necessidade. Libs relacionadas continuam em `src/lib/` (`checkout.functions`,
`mercadopago.server`, `product`, `access*`, `preview-mode`).

**Antes de qualquer retomada:** corrigir `src/lib/product.ts` (`amount: 1`, valor de teste).
