DROP POLICY "Buyers can view their own purchases" ON public.purchases;
DROP POLICY "Buyers can view their own access" ON public.product_access;
DROP FUNCTION IF EXISTS public.current_buyer_id();

CREATE POLICY "Buyers can view their own purchases"
ON public.purchases FOR SELECT TO authenticated
USING (buyer_id IN (
  SELECT b.id FROM public.buyers b
  WHERE lower(b.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
));

CREATE POLICY "Buyers can view their own access"
ON public.product_access FOR SELECT TO authenticated
USING (buyer_id IN (
  SELECT b.id FROM public.buyers b
  WHERE lower(b.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
));

REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM anon, authenticated;