# Saponé — Handcrafted Botanical Soap 🧼

A world-class, fully **open-source & free-to-run** e-commerce front end for an artisan
soap brand. Built with an interactive **3D hero**, buttery **smooth scrolling**, and
**scroll-driven animations** throughout.

> This repository currently contains the **front end** (storefront UI + client-side
> cart). A backend / payments layer can be added later.

## ✨ Features

- **Interactive 3D hero** — floating soap bars & bubbles you can spin with your cursor (React Three Fiber + drei), with a self-contained procedural light studio (no external assets).
- **Smooth scrolling** powered by [Lenis](https://github.com/darkroomengineering/lenis).
- **Scroll animations** — Framer Motion reveals/parallax + a GSAP `ScrollTrigger` word-reveal story section + a sticky horizontal "how it's made" gallery.
- **Full storefront** — animated home page, filterable/sortable shop, dynamic product pages, slide-in cart drawer and a cart/checkout flow (demo).
- **Persistent cart** via `localStorage`.
- **Responsive, accessible & SEO-ready** — semantic markup, metadata, reduced-motion support, keyboard-friendly controls.
- **100% free stack** — every dependency is open source.

## 🧱 Tech stack

| Concern | Tool |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) + TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| 3D | [three.js](https://threejs.org) · [@react-three/fiber](https://r3f.docs.pmnd.rs) · [@react-three/drei](https://github.com/pmndrs/drei) |
| Animation | [Framer Motion](https://www.framer.com/motion/) · [GSAP](https://gsap.com) |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Icons | [lucide-react](https://lucide.dev) |

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
├─ app/                 # routes (home, shop, product/[slug], cart)
├─ components/
│  ├─ sections/         # Hero, Marquee, Process, Story, Testimonials, …
│  ├─ three/            # SoapScene (R3F)
│  └─ ui/               # Button, Reveal, SoapVisual
├─ context/             # CartContext (client-side cart + localStorage)
├─ data/                # product catalogue
└─ lib/                 # helpers (cn, formatPrice)
```

## 🗺️ Roadmap

- Backend + database for products and orders
- Real payments (Stripe) and auth
- Product search and customer reviews

---

Made with care · Vegan · Cruelty-free · Plastic-free
