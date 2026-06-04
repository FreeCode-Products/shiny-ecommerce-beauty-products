"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  }

  return (
    <section id="newsletter" className="px-6 py-24 sm:py-32">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-moss px-6 py-16 text-center text-foam sm:px-16">
        <div className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-clay/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-sage/30 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-medium uppercase tracking-widest text-clay-light">
            Join the ritual
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl text-balance">
            Get 10% off your first bar
          </h2>
          <p className="mx-auto mt-4 max-w-md text-foam/70">
            Slow living, skincare notes and early access to new batches —
            straight to your inbox. No spam, ever.
          </p>

          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-foam/15 px-6 py-3 font-medium"
            >
              <Check className="size-5 text-sage" /> You&apos;re in — check your inbox!
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="h-13 flex-1 rounded-full border border-foam/20 bg-foam/10 px-5 text-foam placeholder:text-foam/50 focus:border-foam/50 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-clay px-6 font-medium text-foam transition-all hover:bg-clay-light active:scale-95"
              >
                Subscribe <Send className="size-4" />
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
