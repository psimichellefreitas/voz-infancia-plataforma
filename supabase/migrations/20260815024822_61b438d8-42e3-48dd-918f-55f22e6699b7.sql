CREATE TABLE public.buyers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID NOT NULL REFERENCES public.buyers(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  payment_provider TEXT NOT NULL DEFAULT 'mercadopago',
  payment_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'initiated',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX purchases_provider_payment_id_key
  ON public.purchases (payment_provider, payment_id)
  WHERE payment_id IS NOT NULL;

CREATE INDEX purchases_buyer_id_idx ON public.purchases (buyer_id);

CREATE TABLE public.product_access (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID NOT NULL REFERENCES public.buyers(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  access_status TEXT NOT NULL DEFAULT 'inactive',
  granted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (buyer_id, product_id)
);

GRANT SELECT ON public.buyers TO authenticated;
GRANT ALL ON public.buyers TO service_role;
GRANT SELECT ON public.purchases TO authenticated;
GRANT ALL ON public.purchases TO service_role;
GRANT SELECT ON public.product_access TO authenticated;
GRANT ALL ON public.product_access TO service_role;

ALTER TABLE public.buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_access ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.current_buyer_id()
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.id
  FROM public.buyers b
  WHERE lower(b.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  LIMIT 1
$$;

CREATE POLICY "Buyers can view their own record"
ON public.buyers FOR SELECT TO authenticated
USING (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

CREATE POLICY "Buyers can view their own purchases"
ON public.purchases FOR SELECT TO authenticated
USING (buyer_id = public.current_buyer_id());

CREATE POLICY "Buyers can view their own access"
ON public.product_access FOR SELECT TO authenticated
USING (buyer_id = public.current_buyer_id());

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER purchases_set_updated_at
BEFORE UPDATE ON public.purchases
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();