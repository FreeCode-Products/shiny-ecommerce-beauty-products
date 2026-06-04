# Saponé — Setup Guide (Login, Reviews & Payments)

The site **runs without any of this** — login, reviews and payments stay in a safe
"demo" state until you add keys. Follow these steps (all **free**) to switch them on.

Everything plugs in through one file: **`.env.local`** (copy it from `.env.example`).

```bash
cp .env.example .env.local
```

---

## 1. Supabase — database, login & reviews (free)

1. Go to **https://supabase.com** → sign in → **New project** (free tier). Pick a
   name + a database password, and a region near you.
2. When it's ready, open **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Paste both into `.env.local`.
4. Create the tables: open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and click **Run**.
5. (Recommended for testing) **Authentication → Sign In / Providers → Email**:
   turn **"Confirm email" OFF** so you can log in instantly without a confirmation
   email. (Leave it on for production.)

That's it — sign-up/login, the account page, and product reviews now work.

### Admin dashboard (`/admin`)
To manage orders at **/admin**, add two more values to `.env.local`:
- `NEXT_PUBLIC_ADMIN_EMAILS` — your account email (comma-separate several).
- `SUPABASE_SERVICE_ROLE_KEY` — **Project Settings → API Keys → `service_role`**
  secret. This is **server-only** and powerful (bypasses Row Level Security) —
  never commit it or expose it to the browser.

Then sign up/in with that email and open **/admin** (a link also appears on your
account page). You can view every order, change order status, and see per-product
sales. *(The product catalogue lives in `src/data/products.ts`; ask to make it
database-editable if you want full product CRUD.)*

---

## 2. Razorpay — payments (free **test mode**)

> Test mode never charges real money. Use Razorpay's
> [test cards](https://razorpay.com/docs/payments/payments/test-card-details/)
> (e.g. card `4111 1111 1111 1111`, any future expiry, any CVV).

1. Go to **https://razorpay.com** → sign up → make sure the dashboard is in
   **Test Mode** (toggle, top-left).
2. **Settings → API Keys → Generate Test Key**. Copy:
   - **Key Id** → `RAZORPAY_KEY_ID`
   - **Key Secret** → `RAZORPAY_KEY_SECRET`
3. Paste both into `.env.local`.

Now the cart's **Place order** opens the real Razorpay checkout (in test mode),
verifies the payment signature on the server, and saves the order to your
Supabase `orders` table.

> Checkout requires the shopper to be logged in (so the order can be saved).

---

## 3. Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Restart `npm run dev` after editing `.env.local` so the new values load.

---

## 4. Deploy free (Vercel)

1. Push to GitHub (already done).
2. Go to **https://vercel.com** → **Add New → Project** → import this repo.
3. Add the **same four env vars** from `.env.local` under
   **Settings → Environment Variables**.
4. **Deploy.** You'll get a free `*.vercel.app` URL.

> After deploying, add your Vercel URL under Supabase **Authentication → URL
> Configuration → Site URL / Redirect URLs** so email links point to the live site.

---

### Security notes
- `RAZORPAY_KEY_SECRET` is **server-only** — it's never sent to the browser.
- Order totals are **recomputed on the server** from the catalogue, so prices
  can't be tampered with from the client.
- Supabase **Row Level Security** is enabled: people can only read their own
  orders and only edit their own reviews.
