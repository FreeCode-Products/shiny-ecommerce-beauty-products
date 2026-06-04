import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

/**
 * A cookie-less Supabase client for *public* reads (e.g. the product
 * catalogue). Because it doesn't touch cookies, pages using it can still be
 * statically generated / ISR-cached. Returns null when not configured.
 */
export function createSupabasePublicClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
