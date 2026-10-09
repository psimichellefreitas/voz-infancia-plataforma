import { ACONTECEU, FORTALECER, VAI_ACONTECER } from "./content";
import { buscar, type FonteBusca, type ResultadoBusca } from "./busca";

/** Busca nas 60 orientações do VOZ PROTETORA (o conteúdo já vem no aplicativo, sem servidor). */
const FONTES: FonteBusca[] = [
  { porta: "aconteceu", portaLabel: "ACONTECEU", base: "/app/voz-protetora/aconteceu", items: ACONTECEU },
  {
    porta: "vai-acontecer",
    portaLabel: "VAI ACONTECER",
    base: "/app/voz-protetora/vai-acontecer",
    items: VAI_ACONTECER,
  },
  {
    porta: "fortalecer",
    portaLabel: "QUERO FORTALECER",
    base: "/app/voz-protetora/fortalecer",
    items: FORTALECER,
  },
];

export type { ResultadoBusca };

export function buscarOrientacoes(consulta: string): ResultadoBusca[] {
  return buscar(FONTES, consulta);
}
