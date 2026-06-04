"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { SoapVisual } from "@/components/ui/SoapVisual";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.08 }}
      className="group relative flex flex-col"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[2rem] bg-sand p-6 transition-colors duration-500 group-hover:bg-sand-deep">
          {product.badge && (
            <span className="absolute left-5 top-5 z-10 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-foam">
              {product.badge}
            </span>
          )}

          <motion.div
            whileHover={{ rotate: -4, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
          >
            <SoapVisual
              accent={product.accent}
              accent2={product.accent2}
              label={product.name.charAt(0)}
              className="mx-auto max-w-[78%]"
            />
          </motion.div>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-display text-lg leading-tight text-ink transition-colors group-hover:text-clay">
              {product.name}
            </h3>
          </Link>
          <p className="mt-0.5 text-sm text-ink-soft">{product.scent}</p>
          <div className="mt-1.5 flex items-center gap-1 text-xs text-ink-soft">
            <Star className="size-3.5 fill-gold text-gold" />
            <span className="font-medium text-ink">{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="font-display text-lg text-ink">{formatPrice(product.price)}</span>
          <button
            aria-label={`Add ${product.name} to cart`}
            onClick={() => addItem(product)}
            className="grid size-10 place-items-center rounded-full bg-moss text-foam transition-all duration-300 hover:scale-110 hover:bg-ink active:scale-95"
          >
            <Plus className="size-4.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
