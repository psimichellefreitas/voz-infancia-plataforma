import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { isPreviewUnlocked } from "@/lib/preview-mode";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    // Modo construção: só no preview/dev, nunca no site publicado.
    if (isPreviewUnlocked()) return { user: null };
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({ to: "/auth", search: { redirect: "/voz-protetora" } });
    }
    return { user: data.user };
  },
  component: () => <Outlet />,
});
