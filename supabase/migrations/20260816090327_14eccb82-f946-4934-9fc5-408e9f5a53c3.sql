CREATE TABLE public.protection_steps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  step_text TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.protection_steps TO authenticated;
GRANT ALL ON public.protection_steps TO service_role;
ALTER TABLE public.protection_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own protection steps" ON public.protection_steps FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX protection_steps_user_idx ON public.protection_steps (user_id, created_at DESC);