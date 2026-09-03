import { createFileRoute, redirect } from "@tanstack/react-router";

// A Bússola VOZ passou a ser uma seção da página única de Metodologia (Fase 2).
export const Route = createFileRoute("/bussola-voz")({
  beforeLoad: () => {
    throw redirect({ to: "/metodologia", hash: "bussola-voz" });
  },
});
