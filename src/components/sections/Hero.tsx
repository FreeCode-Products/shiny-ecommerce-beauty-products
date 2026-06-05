"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

const SoapScene = dynamic(() => import("@/components/three/SoapScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <div className="size-32 animate-pulse rounded-[28%] bg-gradient-to-br from-clay to-clay-light opacity-60 blur-2xl" />
    </div>
  ),
});

const EASE = [0.16, 1, 0.3, 1] as const;
const headline = ["Soap,", "but", "make", "it", "a", "ritual."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain relative min-h-screen overflow-hidden bg-gradient-to-b from-cream via-cream to-sand pt-28"
    >
      {/* ambient colour blobs */}
      <div className="pointer-events-none absolute -left-16 top-20 size-64 rounded-full bg-clay/20 blur-3xl sm:-left-32 sm:size-96" />
      <div className="pointer-events-none absolute -right-12 bottom-10 size-64 rounded-full bg-sage/30 blur-3xl sm:-right-24 sm:size-96" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-6 lg:grid-cols-2 lg:gap-10">
        {/* Copy */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-foam/60 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-ink-soft backdrop-blur"
          >
            <Leaf className="size-3.5 text-moss" /> Handmade · Cold-process · Vegan
          </motion.span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {headline.map((word, i) => (
              <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.08 }}
                  className={`inline-block ${word === "ritual." ? "text-clay italic" : ""}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft text-balance"
          >
            Small-batch botanical bars, cured for six weeks and poured by hand.
            Real ingredients, real lather, zero plastic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="/shop" size="lg">
              Shop the collection <ArrowRight className="size-4.5" />
            </Button>
            <Button href="/#story" variant="outline" size="lg">
              <Sparkles className="size-4.5" /> Our craft
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-soft"
          >
            <div>
              <p className="font-display text-2xl text-ink">40k+</p>
              <p>bars cured</p>
            </div>
            <div className="h-8 w-px bg-ink/15" />
            <div>
              <p className="font-display text-2xl text-ink">4.9★</p>
              <p>2,000+ reviews</p>
            </div>
            <div className="h-8 w-px bg-ink/15" />
            <div>
              <p className="font-display text-2xl text-ink">100%</p>
              <p>plastic-free</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D scene */}
        <div className="order-1 h-[46vh] w-full lg:order-2 lg:h-screen">
          <SoapScene />
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-soft lg:flex"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-ink/30"
        />
      </motion.div>
    </section>
  );
}
