import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { isPreviewUnlocked } from "@/lib/preview-mode";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  // App instalável (PWA): o manifesto só é anunciado dentro da área de quem comprou, para o site
  // institucional não oferecer instalação a quem está só visitando.
  head: () => ({
    meta: [
      { name: "theme-color", content: "#173F73" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Voz Pela Infância" },
    ],
    links: [
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  beforeLoad: async ({ location }) => {
    // Modo construção: só no preview/dev, nunca no site publicado.
    if (isPreviewUnlocked()) return { user: null };
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      // Volta para a página que a pessoa tentou abrir (ex.: /admin), não só para o produto.
      const destino = location.pathname.startsWith("/") ? location.pathname : "/voz-protetora";
      throw redirect({ to: "/auth", search: { redirect: destino } });
    }
    return { user: data.user };
  },
  component: () => <Outlet />,
});
