-- Assinatura recorrente (Mercado Pago Preapproval) — VOZ PROTETORA V1.
-- Ver DOC_PRODUTO_VOZ_PROTETORA_V1.md §13 e PRD_VOZ_PROTETORA_V1.md §6/§9.
--
-- `purchases` continua servindo de histórico de cobranças (uma linha por cobrança —
-- autorização inicial + cada renovação). Esta tabela nova guarda o ESTADO da assinatura em si.
-- `product_access` deixa de ser a fonte de verdade do acesso ao VOZ PROTETORA: o acesso passa a
-- ser calculado ao vivo a partir de `subscriptions` (ver access.functions.ts) — assim "acesso até
-- o fim do ciclo pago" (DOC_PRODUTO §13.4) não depende de um job agendado para "virar a chave" no
-- momento exato.

CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID NOT NULL REFERENCES public.buyers(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  mp_preapproval_id TEXT,
  -- pending | authorized | payment_failed | cancelled
  status TEXT NOT NULL DEFAULT 'pending',
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'BRL',
  -- Ciclo pago vigente. Acesso é válido enquanto now() < current_period_end,
  -- independentemente de já ter sido cancelada (DOC_PRODUTO §13.4, item 2).
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  -- Janela de tolerância de 5 dias quando a cobrança da renovação falha (§13.4, item 4).
  payment_retry_until TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (buyer_id, product_id)
);

CREATE UNIQUE INDEX subscriptions_mp_preapproval_id_key
  ON public.subscriptions (mp_preapproval_id)
  WHERE mp_preapproval_id IS NOT NULL;

CREATE INDEX subscriptions_buyer_id_idx ON public.subscriptions (buyer_id);

GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buyers can view their own subscription"
ON public.subscriptions FOR SELECT TO authenticated
USING (buyer_id IN (
  SELECT b.id FROM public.buyers b
  WHERE lower(b.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
));

-- Reaproveita public.set_updated_at(), criada na migração de 2026-08-15.
CREATE TRIGGER subscriptions_set_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
