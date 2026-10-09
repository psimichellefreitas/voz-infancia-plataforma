import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";

import { getMyProductAccess } from "@/lib/access.functions";
import { usePreviewUnlocked } from "@/lib/preview-mode";
import { fraseDeHoje, saudacaoDaHora } from "@/lib/voz-protetora/frases";

/** Primeiro nome de quem comprou, com a inicial maiúscula. Vazio se não houver. */
function usePrimeiroNome(): string {
  const fetchAccess = useServerFn(getMyProductAccess);
  const previewUnlocked = usePreviewUnlocked();
  const { data } = useQuery({
    queryKey: ["voz-protetora-access"],
    queryFn: () => fetchAccess({ data: undefined }),
    staleTime: 60_000,
    enabled: !previewUnlocked,
    retry: false,
  });
  const nome = data && "name" in data && typeof data.name === "string" ? data.name : "";
  const primeiro = nome.trim().split(/\s+/)[0] ?? "";
  if (!primeiro) return "";
  return primeiro.charAt(0).toUpperCase() + primeiro.slice(1).toLowerCase();
}

/**
 * Saudação pela hora do aparelho, com o primeiro nome quando existe: "Bom dia, Michelle".
 * Calculada no navegador, para valer a hora de quem está usando.
 */
export function Saudacao({ className }: { className?: string }) {
  const nome = usePrimeiroNome();
  const [saudacao, setSaudacao] = useState("");

  useEffect(() => {
    setSaudacao(saudacaoDaHora());
  }, []);

  if (!saudacao) return <span className="block h-4" />;
  return (
    <p
      className={
        className ??
        "flex items-center gap-2 text-[13px] font-bold tracking-wide text-voz-yellow"
      }
    >
      <span className="h-0.5 w-6 rounded-full bg-voz-yellow" />
      {nome ? `${saudacao}, ${nome}` : saudacao}
    </p>
  );
}

/** Uma frase de proteção por dia, tirada de textos já aprovados. */
export function FraseDoDia() {
  const [frase, setFrase] = useState<string | null>(null);

  useEffect(() => {
    setFrase(fraseDeHoje().texto);
  }, []);

  if (!frase) return null;
  return (
    <section className="rounded-[22px] bg-card p-5 shadow-[var(--shadow-soft)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Frase do dia</p>
      <p className="mt-2 font-display text-[1.2rem] font-semibold leading-snug text-primary">
        “{frase}”
      </p>
    </section>
  );
}
