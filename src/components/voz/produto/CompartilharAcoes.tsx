import { Download, MessageCircle } from "lucide-react";

interface CompartilharAcoesProps {
  titulo: string;
}

/**
 * Duas ações de saída da peça: compartilhar o link por WhatsApp (útil quando quem recebe
 * também é assinante, ou como lembrete para a própria pessoa) e baixar/imprimir a peça em PDF
 * (usa a folha de estilo de impressão de OrientationBody, que expande todos os blocos).
 */
export function CompartilharAcoes({ titulo }: CompartilharAcoesProps) {
  function compartilharWhatsApp() {
    const url = window.location.href;
    const texto = `Vi essa orientação no Voz Protetora: "${titulo}"\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank", "noopener,noreferrer");
  }

  function baixarPdf() {
    window.print();
  }

  return (
    <div className="print:hidden mt-6 flex flex-wrap gap-2">
      <button
        onClick={compartilharWhatsApp}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/80 hover:border-accent"
      >
        <MessageCircle className="h-4 w-4 text-accent" />
        Compartilhar no WhatsApp
      </button>
      <button
        onClick={baixarPdf}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/80 hover:border-accent"
      >
        <Download className="h-4 w-4 text-accent" />
        Baixar em PDF
      </button>
    </div>
  );
}
