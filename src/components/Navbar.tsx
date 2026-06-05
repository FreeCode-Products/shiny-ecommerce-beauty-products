"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/#collections" },
  { label: "Our Story", href: "/#story" },
  { label: "Reviews", href: "/#reviews" },
];

export function Navbar() {
  const { count, openCart } = useCart();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "pointer-events-auto mx-auto mt-3 flex max-w-7xl items-center justify-between gap-6 rounded-full px-5 py-3 transition-all duration-500 sm:mx-4 lg:mx-auto",
          scrolled
            ? "border border-ink/10 bg-foam/80 shadow-[0_8px_30px_-12px_rgba(31,26,20,0.25)] backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        )}
      >
        <Link
          href="/"
          className="flex items-center"
          aria-label="The Soap Company, crafted by shiny — home"
        >
          <Image
            src="/logo-mark.png"
            alt="The Soap Company, crafted by shiny"
            width={440}
            height={474}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="link-underline text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={user ? "/account" : "/login"}
            aria-label={user ? "Your account" : "Log in"}
            className="relative grid size-11 place-items-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
          >
            <User className="size-5" />
            {user && (
              <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-sage ring-2 ring-cream" />
            )}
          </Link>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative grid size-11 place-items-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
          >
            <ShoppingBag className="size-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-clay text-[11px] font-semibold text-foam"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid size-11 place-items-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10 md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto mx-4 mt-2 overflow-hidden rounded-3xl border border-ink/10 bg-foam/95 p-4 shadow-xl backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-ink/5"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
