/**
 * Centralised Supabase env access. The app is designed to build and run even
 * when these are absent — auth/reviews/orders simply fall back to a friendly
 * "not configured" state until you add the keys (see SETUP.md).
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
