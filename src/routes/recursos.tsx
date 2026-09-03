import { createFileRoute, redirect } from "@tanstack/react-router";

// "Recursos" foi renomeado para "Conteúdos" na arquitetura aprovada (Fase 0).
export const Route = createFileRoute("/recursos")({
  beforeLoad: () => {
    throw redirect({ to: "/conteudos" });
  },
});
