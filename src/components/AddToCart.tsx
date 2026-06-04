"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4 rounded-full border border-ink/20 px-3 py-2">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="grid size-8 place-items-center rounded-full transition-colors hover:bg-ink/5"
        >
          <Minus className="size-4" />
        </button>
        <span className="w-6 text-center font-medium">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
          className="grid size-8 place-items-center rounded-full transition-colors hover:bg-ink/5"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <button
        onClick={() => addItem(product, qty)}
        className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-moss px-8 font-medium text-foam shadow-sm transition-all duration-300 hover:bg-ink hover:shadow-md active:scale-[0.98]"
      >
        <ShoppingBag className="size-5" /> Add to bag
      </button>
    </div>
  );
}
