import { useCallback, useEffect, useState } from "react";
import { NOTIFICACOES, type NotificationItem } from "./content";

const LIDAS_KEY = "voz-protetora:notificacoes-lidas";
const ATIVAS_KEY = "voz-protetora:notificacoes-ativas";

export const NOTIFICACOES_ORDENADAS: NotificationItem[] = [...NOTIFICACOES].sort((a, b) =>
  b.data.localeCompare(a.data),
);

function lerLidas(): string[] {
  try {
    const raw = window.localStorage.getItem(LIDAS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function lerAtivas(): boolean {
  try {
    const raw = window.localStorage.getItem(ATIVAS_KEY);
    return raw === null ? true : raw === "true";
  } catch {
    return true;
  }
}

/**
 * Estado da Central de Notificações — 100% local ao dispositivo (localStorage), sem tabela
 * nova no Supabase: é sobre o uso do adulto no produto, não sobre a criança, e o V1 não precisa
 * de sincronizar entre aparelhos para cumprir DOC_PRODUTO §10.4. `ativas: false` (o usuário pode
 * desativar) zera o indicador de não lidas — a lista continua acessível, só para de "avisar".
 */
export function useNotificacoes() {
  const [lidas, setLidas] = useState<string[]>([]);
  const [ativas, setAtivas] = useState(true);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    setLidas(lerLidas());
    setAtivas(lerAtivas());
    setHidratado(true);
  }, []);

  const marcarTodasLidas = useCallback(() => {
    const todosIds = NOTIFICACOES_ORDENADAS.map((n) => n.id);
    setLidas(todosIds);
    try {
      window.localStorage.setItem(LIDAS_KEY, JSON.stringify(todosIds));
    } catch {
      // não persiste — a peça continua funcionando nesta visita
    }
  }, []);

  const alternarAtivas = useCallback((valor: boolean) => {
    setAtivas(valor);
    try {
      window.localStorage.setItem(ATIVAS_KEY, String(valor));
    } catch {
      // não persiste — a peça continua funcionando nesta visita
    }
  }, []);

  const naoLidas =
    hidratado && ativas
      ? NOTIFICACOES_ORDENADAS.filter((n) => !lidas.includes(n.id)).length
      : 0;

  return {
    lista: NOTIFICACOES_ORDENADAS,
    lidas,
    naoLidas,
    ativas,
    hidratado,
    marcarTodasLidas,
    alternarAtivas,
  };
}
