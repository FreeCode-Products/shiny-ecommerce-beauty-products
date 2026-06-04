"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Recycle, Sprout } from "lucide-react";

const paragraph =
  "We began in a small kitchen with a single pot, a stack of botanical oils and a stubborn belief that everyday soap could be beautiful. Today, every Saponé bar is still made the slow way — by hand, in tiny batches, cured for six patient weeks.";

const pillars = [
  { icon: Leaf, label: "100% botanical" },
  { icon: Recycle, label: "Plastic-free" },
  { icon: Sprout, label: "Carbon-neutral" },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-word",
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative">
          <div
            className="aspect-[4/5] w-full rounded-[2.5rem]"
            style={{
              background:
                "radial-gradient(120% 120% at 30% 20%, #c1714e 0%, #7d3f28 75%)",
              boxShadow: "0 40px 80px -30px rgba(125,63,40,0.6)",
            }}
          />
          <div className="absolute -bottom-6 -right-2 rounded-3xl border border-ink/10 bg-foam p-5 shadow-xl sm:-right-6">
            <p className="font-display text-3xl font-semibold text-ink">Est. 2018</p>
            <p className="text-sm text-ink-soft">made in small batches</p>
          </div>
        </div>

        <div ref={ref}>
          <p className="text-sm font-medium uppercase tracking-widest text-clay">
            Our craft
          </p>
          <p className="mt-5 font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
            {paragraph.split(" ").map((word, i) => (
              <span key={i} className="story-word inline-block">
                {word}&nbsp;
              </span>
            ))}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            {pillars.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-ink/15 bg-foam px-4 py-2 text-sm font-medium text-ink"
              >
                <Icon className="size-4 text-moss" /> {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
