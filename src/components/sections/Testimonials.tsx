"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const reviews = [
  {
    quote:
      "The Midnight Charcoal bar completely changed my skin. My pores look smaller and it lasts forever.",
    name: "Amara O.",
    detail: "Verified buyer · Detox",
    accent: "#3a3f44",
  },
  {
    quote:
      "Lavender Dream is my nightly ritual now. The scent is real lavender — not that fake purple stuff.",
    name: "Priya S.",
    detail: "Verified buyer · Calm",
    accent: "#9a86c4",
  },
  {
    quote:
      "Citrus Zest wakes me up better than coffee. The whole bathroom smells like an orange grove.",
    name: "Marcus L.",
    detail: "Verified buyer · Energize",
    accent: "#f0a23a",
  },
  {
    quote:
      "Finally a soap that doesn't dry out my sensitive skin. The Oatmeal & Honey bar is pure comfort.",
    name: "Hana K.",
    detail: "Verified buyer · Nourish",
    accent: "#caa15f",
  },
  {
    quote:
      "Beautiful packaging, zero plastic, and the bars are gorgeous. I gift these constantly.",
    name: "Diego R.",
    detail: "Verified buyer · Gift set",
    accent: "#69b59a",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="overflow-hidden bg-foam py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-gold text-gold" />
            ))}
          </div>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl text-balance">
            4.9 stars from 2,000+ happy washers
          </h2>
        </Reveal>
      </div>

      {/* auto-scrolling review wall */}
      <div className="relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-foam to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-foam to-transparent" />
        <div className="flex">
          {[0, 1].map((dup) => (
            <ul
              key={dup}
              aria-hidden={dup === 1}
              className="flex shrink-0 animate-marquee-rev items-stretch gap-6 pr-6"
            >
              {reviews.map((r, i) => (
                <motion.li
                  key={i}
                  className="flex w-[340px] shrink-0 flex-col rounded-3xl border border-ink/10 bg-cream p-7"
                >
                  <Quote className="size-7" style={{ color: r.accent }} />
                  <p className="mt-4 flex-1 text-lg leading-relaxed text-ink">
                    “{r.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <span
                      className="grid size-10 place-items-center rounded-full font-display text-foam"
                      style={{ backgroundColor: r.accent }}
                    >
                      {r.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{r.name}</p>
                      <p className="text-xs text-ink-soft">{r.detail}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
