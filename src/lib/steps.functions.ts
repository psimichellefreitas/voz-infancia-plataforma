import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Passos de proteção do próprio comprador. Nenhum dado de criança é coletado. */
export const listMySteps = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("protection_steps")
      .select("id, step_text, done, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  });

export const addMyStep = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ text: z.string().trim().min(3).max(400) }).parse(data))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase
      .from("protection_steps")
      .insert({ user_id: context.userId, step_text: data.text });
    if (error) throw error;
    return { ok: true };
  });

export const toggleMyStep = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string().uuid(), done: z.boolean() }).parse(data))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase
      .from("protection_steps")
      .update({ done: data.done })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

export const deleteMyStep = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase.from("protection_steps").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });
