import { createFileRoute, redirect } from "@tanstack/react-router";

/** Endereço antigo da tela "Meus produtos". Agora é a abertura do app, em /app. */
export const Route = createFileRoute("/meus-produtos")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/app", search: location.search as never });
  },
});
