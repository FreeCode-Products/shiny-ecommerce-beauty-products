-- ============================================================================
--  Saponé — Supabase schema
--  Run this in your Supabase project: Dashboard → SQL Editor → paste → Run.
--  The product catalogue lives in code (src/data/products.ts), so reviews and
--  orders reference products by their `slug`.
-- ============================================================================

-- ---------------------------------------------------------------------------
--  Reviews
-- ---------------------------------------------------------------------------
create table if not exists public.reviews (
  id           uuid primary key default gen_random_uuid(),
  product_slug text not null,
  user_id      uuid not null references auth.users (id) on delete cascade,
  author_name  text not null,
  rating       int  not null check (rating between 1 and 5),
  body         text not null check (char_length(body) between 1 and 2000),
  created_at   timestamptz not null default now()
);

create index if not exists reviews_product_slug_idx on public.reviews (product_slug);

-- One review per user per product.
create unique index if not exists reviews_user_product_uniq
  on public.reviews (user_id, product_slug);

alter table public.reviews enable row level security;

drop policy if exists "Reviews are viewable by everyone" on public.reviews;
create policy "Reviews are viewable by everyone"
  on public.reviews for select using (true);

drop policy if exists "Users can insert their own review" on public.reviews;
create policy "Users can insert their own review"
  on public.reviews for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update their own review" on public.reviews;
create policy "Users can update their own review"
  on public.reviews for update using (auth.uid() = user_id);

drop policy if exists "Users can delete their own review" on public.reviews;
create policy "Users can delete their own review"
  on public.reviews for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
--  Orders
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users (id) on delete cascade,
  items              jsonb not null,
  subtotal           numeric not null,
  shipping           numeric not null default 0,
  total              numeric not null,
  currency           text not null default 'INR',
  status             text not null default 'created',  -- created | paid | failed
  razorpay_order_id  text,
  razorpay_payment_id text,
  created_at         timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);

alter table public.orders enable row level security;

drop policy if exists "Users can view their own orders" on public.orders;
create policy "Users can view their own orders"
  on public.orders for select using (auth.uid() = user_id);

drop policy if exists "Users can insert their own orders" on public.orders;
create policy "Users can insert their own orders"
  on public.orders for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update their own orders" on public.orders;
create policy "Users can update their own orders"
  on public.orders for update using (auth.uid() = user_id);
