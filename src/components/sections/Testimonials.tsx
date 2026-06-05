"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const reviews = [
  {
    quote:
      "The Midnight Detox bar completely changed my skin. My pores look clearer and the tea tree scent is so fresh.",
    name: "Amara O.",
    detail: "Verified buyer · Detox",
    accent: "#3a3f44",
  },
  {
    quote:
      "Dew Ritual is the only face wash that doesn't leave my sensitive skin feeling tight. So gentle and calming.",
    name: "Priya S.",
    detail: "Verified buyer · Calm",
    accent: "#8975b3",
  },
  {
    quote:
      "Solar Bloom wakes me up better than coffee — the lemongrass and lemon scent is unreal in the morning.",
    name: "Marcus L.",
    detail: "Verified buyer · Energize",
    accent: "#ecc94b",
  },
  {
    quote:
      "Coco Crème lathers like a dream and smells like a tropical holiday. My skin feels soft for hours after.",
    name: "Hana K.",
    detail: "Verified buyer · Nourish",
    accent: "#c2a062",
  },
  {
    quote:
      "Beautiful packaging, zero plastic, and Rose Reverie is gorgeous. I gift these handcrafted bars constantly.",
    name: "Diego R.",
    detail: "Verified buyer · Gift",
    accent: "#e6a0a8",
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
                  className="flex w-72 shrink-0 flex-col rounded-3xl border border-ink/10 bg-cream p-6 sm:w-[340px] sm:p-7"
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
