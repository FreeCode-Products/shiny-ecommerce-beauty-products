# Saponé — Handcrafted Botanical Soap 🧼

A world-class, fully **open-source & free-to-run** e-commerce app for an artisan
soap brand. Built with an interactive **3D hero**, buttery **smooth scrolling**,
**scroll-driven animations**, plus **login, reviews and real (test-mode) payments**.

> **Backend is opt-in.** The app builds & runs with zero config — login, reviews
> and payments stay in a safe "demo" state until you add free keys. See
> **[SETUP.md](SETUP.md)** to switch them on (takes ~5 minutes).

## ✨ Features

- **Interactive 3D hero** — floating soap bars & bubbles you can spin with your cursor (React Three Fiber + drei), with a self-contained procedural light studio (no external assets).
- **Smooth scrolling** powered by [Lenis](https://github.com/darkroomengineering/lenis).
- **Scroll animations** — Framer Motion reveals/parallax + a GSAP `ScrollTrigger` word-reveal story section + a sticky horizontal "how it's made" gallery.
- **Full storefront** — animated home page, filterable/sortable shop, dynamic product pages, slide-in cart drawer and a cart page.
- **Accounts & login** — email/password auth via Supabase, account page with order history.
- **Product reviews** — logged-in shoppers rate & review; ratings aggregate per product (Row Level Security enforced).
- **Razorpay checkout** — secure test-mode payments with **server-side** total recomputation and HMAC signature verification; orders saved to Postgres.
- **Persistent cart** via `localStorage`.
- **Responsive, accessible & SEO-ready** — semantic markup, metadata, reduced-motion support, keyboard-friendly controls.
- **100% free stack** — every dependency and service tier is free/open source.

## 🧱 Tech stack

| Concern | Tool |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) + TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| 3D | [three.js](https://threejs.org) · [@react-three/fiber](https://r3f.docs.pmnd.rs) · [@react-three/drei](https://github.com/pmndrs/drei) |
| Animation | [Framer Motion](https://www.framer.com/motion/) · [GSAP](https://gsap.com) |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Icons | [lucide-react](https://lucide.dev) |
| Auth + Database | [Supabase](https://supabase.com) (Postgres, Auth, RLS) — free tier |
| Payments | [Razorpay](https://razorpay.com) — free test mode |

## 🔐 Enabling login, reviews & payments

These are off by default so the app runs anywhere. To turn them on (all free),
follow **[SETUP.md](SETUP.md)** — copy `.env.example` → `.env.local`, create a
free Supabase project (run [`supabase/schema.sql`](supabase/schema.sql)), and add
free Razorpay **test** keys.

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## 📂 Project structure

```
src/
├─ app/
│  ├─ (routes)          # home, shop, product/[slug], cart, login, signup, account
│  └─ api/razorpay/     # order + verify route handlers
├─ components/
│  ├─ auth/             # AuthForm
│  ├─ sections/         # Hero, Marquee, Process, Story, Testimonials, …
│  ├─ three/            # SoapScene (R3F)
│  └─ ui/               # Button, Reveal, SoapVisual
├─ context/             # AuthContext, CartContext
├─ data/                # product catalogue
├─ lib/
│  ├─ supabase/         # browser + server clients, config
│  └─ razorpay/         # config + checkout script loader
└─ proxy.ts             # Supabase session refresh (Next 16 "middleware")
supabase/schema.sql     # tables + Row Level Security
```

## 🗺️ Roadmap

- Backend + database for products and orders
- Real payments (Stripe) and auth
- Product search and customer reviews

---

Made with care · Vegan · Cruelty-free · Plastic-free
