import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Compass, Loader2, Lock, Search, Shield, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";
import { getMyProductAccess } from "@/lib/access.functions";

export const Route = createFileRoute("/_authenticated/voz-protetora")({
  head: () => ({
    meta: [
      { title: "Voz Protetora — Minha área" },
      {
        name: "description",
        content: "Área do Voz Protetora: orientação prática para proteger a infância.",
      },
      { property: "og:title", content: "Voz Protetora — Minha área" },
      { property: "og:description", content: "Sua área de orientação prática." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AreaVozProtetora,
});

const PORTAS = [
  { icon: Search, t: "ACONTECEU", d: "Algo aconteceu. Como devo agir?" },
  { icon: Shield, t: "VAI ACONTECER", d: "A criança vai viver uma situação. Como me preparar?" },
  { icon: Sprout, t: "QUERO FORTALECER", d: "Quero fortalecer a proteção. Por onde começo?" },
];

function AreaVozProtetora() {
  const fetchAccess = useServerFn(getMyProductAccess);
  const { data, isPending } = useQuery({
    queryKey: ["voz-protetora-access"],
    queryFn: () => fetchAccess({ data: undefined }),
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          {isPending ? (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Verificando seu acesso...
            </div>
          ) : data?.hasAccess ? (
            <>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                <Compass className="h-4 w-4" />
                Voz Protetora
              </div>
              <h1 className="mt-5 text-2xl font-bold text-primary sm:text-3xl">
                Como posso ajudar você hoje?
              </h1>
              <p className="mt-3 text-base text-muted-foreground">
                Escolha uma porta de entrada para receber orientação prática.
              </p>
              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {PORTAS.map((porta) => (
                  <div
                    key={porta.t}
                    className="rounded-[12px] border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-[10px] bg-primary/5">
                      <porta.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="mt-5 text-lg font-bold text-primary">{porta.t}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{porta.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-10 text-sm text-muted-foreground">
                Conteúdos completos de cada porta serão publicados nesta área.
              </p>
            </>
          ) : (
            <div className="mx-auto max-w-xl rounded-[12px] border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <h1 className="mt-5 text-2xl font-bold text-primary">Acesso ainda não liberado</h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Não encontramos uma compra confirmada para {data?.email ?? "este e-mail"}. Se você
                acabou de pagar, aguarde alguns instantes. Se usou outro e-mail, entre com ele.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button asChild variant="hero" size="xl">
                  <Link to="/checkout">QUERO TER O VOZ PROTETORA</Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/contato">FALAR COM O MOVIMENTO</Link>
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}