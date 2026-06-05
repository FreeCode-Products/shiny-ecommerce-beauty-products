"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";
import { Reveal } from "@/components/ui/Reveal";

export function Categories() {
  return (
    <section id="collections" className="bg-foam py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-clay">
            Find your match
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl text-balance">
            Shop by how you want to feel
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <Link
                href={`/shop?category=${cat.key}`}
                className="group relative flex h-52 flex-col justify-end overflow-hidden rounded-3xl p-6 text-foam sm:h-64 lg:h-72"
                style={{ backgroundColor: cat.accent }}
              >
                <div
                  className="absolute -right-10 -top-10 size-44 rounded-full opacity-30 blur-2xl transition-transform duration-700 group-hover:scale-150"
                  style={{ background: "rgba(255,255,255,0.6)" }}
                />
                <span className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-foam/20 backdrop-blur transition-transform duration-500 group-hover:rotate-45">
                  <ArrowRight className="size-4" />
                </span>
                <h3 className="font-display text-3xl font-semibold">{cat.label}</h3>
                <p className="mt-1 text-sm text-foam/80">{cat.blurb}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
