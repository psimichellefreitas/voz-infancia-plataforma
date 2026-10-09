import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { enviarSugestao } from "@/lib/sugestoes.functions";

/**
 * "Não achou o que procura?": aparece quando a busca não encontra nada. Só envia quem escolher
 * enviar; a mensagem não leva nome nem e-mail e não recebe resposta. Textos de aviso aprovados
 * em linha com o DOC 09 (sem dados que identifiquem a criança).
 */
export function SugerirTema({ busca }: { busca: string }) {
  const enviar = useServerFn(enviarSugestao);
  const [texto, setTexto] = useState(busca);
  const [estado, setEstado] = useState<"parado" | "enviando" | "enviado" | "erro">("parado");

  if (estado === "enviado") {
    return (
      <div className="rounded-[20px] border border-border/60 bg-card p-4 text-sm leading-relaxed text-foreground/85 shadow-[var(--shadow-soft)]">
        Recebemos a sua sugestão. Agradecemos por ajudar a melhorar o Voz Protetora.
      </div>
    );
  }

  async function handleEnviar(event: React.FormEvent) {
    event.preventDefault();
    setEstado("enviando");
    try {
      await enviar({ data: { busca: busca.trim(), mensagem: texto.trim() } });
      setEstado("enviado");
    } catch {
      setEstado("erro");
    }
  }

  return (
    <form
      onSubmit={handleEnviar}
      className="rounded-[20px] border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)]"
    >
      <h3 className="text-sm font-bold text-primary">Não achou o que procura?</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Conte o que você procura. Isso ajuda a decidir novas orientações.
      </p>
      <p className="mt-2 rounded-xl bg-secondary px-3 py-2 text-xs leading-relaxed text-muted-foreground">
        Não escreva nomes nem dados que identifiquem a criança. Esta mensagem não leva o seu nome
        nem o seu e-mail e não recebe resposta. Em situação de risco, use a aba Ajuda.
      </p>
      <Textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value.slice(0, 500))}
        placeholder="Descreva o assunto que você procura"
        rows={3}
        className="mt-3"
        aria-label="Assunto que você procura"
      />
      {estado === "erro" && (
        <p className="mt-2 text-xs text-destructive">
          Não foi possível enviar agora. Tente novamente em instantes.
        </p>
      )}
      <Button
        type="submit"
        variant="hero"
        size="sm"
        className="mt-3"
        disabled={estado === "enviando" || texto.trim().length < 5}
      >
        {estado === "enviando" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar sugestão"
        )}
      </Button>
    </form>
  );
}
