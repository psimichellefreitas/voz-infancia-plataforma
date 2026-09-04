import { createFileRoute, redirect } from "@tanstack/react-router";

// "Seja Voz" passou a ser o CTA que aponta para a página Participe (Fase 5).
export const Route = createFileRoute("/seja-voz")({
  beforeLoad: () => {
    throw redirect({ to: "/participe" });
  },
});
