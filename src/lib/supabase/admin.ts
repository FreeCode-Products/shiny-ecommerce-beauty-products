import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./config";

/**
 * Service-role Supabase client — **server only**. Bypasses Row Level Security
 * so an admin can read/manage every order. Never import this into client code.
 */
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const isAdminDbConfigured = Boolean(SUPABASE_URL && SERVICE_ROLE_KEY);

export function createSupabaseAdminClient(): SupabaseClient | null {
  if (!isAdminDbConfigured) return null;
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
