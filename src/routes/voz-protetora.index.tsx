import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Endereço antigo do produto. O app agora fica em /app (separado do site público); este
 * redirecionamento mantém funcionando links e favoritos antigos.
 */
export const Route = createFileRoute("/voz-protetora/")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/app/voz-protetora", search: location.search as never });
  },
});
