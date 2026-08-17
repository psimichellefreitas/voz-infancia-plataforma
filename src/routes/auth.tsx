import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/voz/SiteHeader";
import { SiteFooter } from "@/components/voz/SiteFooter";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Voz Pela Infância" },
      {
        name: "description",
        content:
          "Entre com o e-mail utilizado na compra para acessar o Voz Protetora.",
      },
      { property: "og:title", content: "Entrar — Voz Pela Infância" },
      {
        property: "og:description",
        content: "Acesse sua área do Voz Protetora com o e-mail da compra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    redirect:
      typeof search["redirect"] === "string" && search["redirect"].startsWith("/")
        ? search["redirect"]
        : undefined,
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = useSearch({ from: "/auth" });
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    // O link do e-mail sempre passa por /acesso, que espera a sessão ser criada
    // antes de entrar na área protegida.
    const target = `${window.location.origin}/acesso`;
    void redirect;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: target },
    });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível enviar o link de acesso. Tente novamente.");
      return;
    }
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <section className="mx-auto max-w-md px-5 py-16 sm:px-8 sm:py-20">
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">Entrar</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Use o mesmo e-mail que você informou na compra. Enviaremos um link de acesso.
          </p>

          {sent ? (
            <div className="mt-8 rounded-[12px] border border-border bg-secondary p-6">
              <Mail className="h-6 w-6 text-primary" />
              <p className="mt-3 text-sm font-semibold text-primary">Link enviado.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Verifique sua caixa de entrada e abra o link para acessar o Voz Protetora.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-[12px] border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <Label htmlFor="auth-email">E-mail</Label>
              <Input
                id="auth-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
                placeholder="seu@email.com"
              />
              <Button type="submit" variant="hero" size="xl" className="mt-6 w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    ENVIANDO...
                  </>
                ) : (
                  "RECEBER LINK DE ACESSO"
                )}
              </Button>
            </form>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}