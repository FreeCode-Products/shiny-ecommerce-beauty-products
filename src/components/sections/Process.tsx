"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SoapVisual } from "@/components/ui/SoapVisual";

const steps = [
  {
    n: "01",
    title: "Source",
    body: "We start with cold-pressed plant oils, raw shea butter and pure essential oils — nothing synthetic, ever.",
    accent: "#a3b58f",
    accent2: "#74865f",
  },
  {
    n: "02",
    title: "Blend",
    body: "Small batches are stirred by hand using the traditional cold-process method that preserves natural glycerin.",
    accent: "#d68f6e",
    accent2: "#c1714e",
  },
  {
    n: "03",
    title: "Cut & stamp",
    body: "Each loaf is hand-cut into bars and stamped with our seal, so no two are exactly alike.",
    accent: "#9a86c4",
    accent2: "#6a5797",
  },
  {
    n: "04",
    title: "Cure",
    body: "Bars rest for six full weeks. The wait makes them harder, milder and longer-lasting in your shower.",
    accent: "#69b59a",
    accent2: "#2f8d72",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[340vh] bg-ink text-foam">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="flex items-end justify-between px-6 pt-24 sm:px-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-clay-light">
              How it&apos;s made
            </p>
            <h2 className="mt-3 max-w-md font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              From oil to ritual, by hand.
            </h2>
          </div>
        </div>

        <motion.div style={{ x }} className="flex flex-1 items-center">
          {steps.map((step) => (
            <div
              key={step.n}
              className="flex w-screen shrink-0 items-center justify-center px-6 sm:px-10"
            >
              <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2">
                <div className="mx-auto w-52 sm:w-72">
                  <SoapVisual accent={step.accent} accent2={step.accent2} label={step.n} />
                </div>
                <div>
                  <span className="font-display text-7xl font-semibold text-foam/15">
                    {step.n}
                  </span>
                  <h3 className="mt-2 font-display text-4xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-lg leading-relaxed text-foam/70">
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* progress bar */}
        <div className="mx-6 mb-10 h-1 overflow-hidden rounded-full bg-foam/15 sm:mx-10">
          <motion.div style={{ width: progress }} className="h-full rounded-full bg-clay" />
        </div>
      </div>
    </section>
  );
}
