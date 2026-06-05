import Link from "next/link";
import Image from "next/image";
import { AtSign, Camera, Leaf, MessageCircle } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All soaps", href: "/shop" },
      { label: "Detox", href: "/shop?category=Detox" },
      { label: "Calm", href: "/shop?category=Calm" },
      { label: "Energize", href: "/shop?category=Energize" },
      { label: "Nourish", href: "/shop?category=Nourish" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/#story" },
      { label: "Ingredients", href: "/#story" },
      { label: "Reviews", href: "/#reviews" },
      { label: "Sustainability", href: "/#story" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/#newsletter" },
      { label: "Shipping", href: "/cart" },
      { label: "Returns", href: "/cart" },
      { label: "FAQ", href: "/#story" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-moss text-foam">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid place-items-center rounded-2xl bg-foam p-1.5">
                <Image
                  src="/logo-mark.png"
                  alt="The Soap Company, crafted by shiny"
                  width={440}
                  height={474}
                  className="h-10 w-auto"
                />
              </span>
              <span className="font-display text-lg font-semibold sm:text-2xl">The Soap Company, crafted by shiny</span>
            </Link>
            <p className="mt-1 text-xs text-foam/50">A soap company by Shiny</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foam/70">
              Small-batch botanical soap, hand-cut and cured for six weeks in our
              workshop. Kind to skin, kinder to the planet.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Camera, AtSign, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid size-10 place-items-center rounded-full bg-foam/10 transition-colors hover:bg-foam/20"
                >
                  <Icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foam/60">
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-foam/80 transition-colors hover:text-foam"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-foam/15 pt-8 text-sm text-foam/60 sm:flex-row">
          <p className="flex items-center gap-2">
            <Leaf className="size-4" /> © {new Date().getFullYear()} The Soap Company, crafted by shiny. Made with care.
          </p>
          <p>Vegan · Cruelty-free · Plastic-free</p>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="pointer-events-none select-none px-6">
        <p className="-mb-6 bg-gradient-to-b from-foam/10 to-transparent bg-clip-text text-center font-display text-[18vw] font-semibold leading-none text-transparent">
          The Soap Company, crafted by shiny
        </p>
      </div>
    </footer>
  );
}
