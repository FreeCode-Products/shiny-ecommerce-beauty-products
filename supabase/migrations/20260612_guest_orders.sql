-- Allow guest checkout: orders no longer require a Supabase account.
-- user_id is kept for linking orders when a user IS logged in, but
-- is now nullable so anonymous / Razorpay-only purchases can be saved.
alter table public.orders alter column user_id drop not null;
