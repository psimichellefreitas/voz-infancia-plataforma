import { createFileRoute, redirect } from "@tanstack/react-router";

/** Endereços antigos /voz-protetora/... seguem para /app/voz-protetora/... (links e favoritos). */
export const Route = createFileRoute("/voz-protetora/$")({
  beforeLoad: ({ params, location }) => {
    const resto = (params as { _splat?: string })._splat ?? "";
    throw redirect({
      to: `/app/voz-protetora/${resto}` as never,
      search: location.search as never,
    });
  },
});
