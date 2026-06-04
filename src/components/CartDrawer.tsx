"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SoapVisual } from "@/components/ui/SoapVisual";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

const FREE_SHIP_AT = 45;

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, count } = useCart();

  const remaining = Math.max(0, FREE_SHIP_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP_AT) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 38 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink">
                <ShoppingBag className="size-5" /> Your bag
                <span className="text-ink-soft">({count})</span>
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="grid size-10 place-items-center rounded-full bg-ink/5 transition-colors hover:bg-ink/10"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Free-shipping progress */}
            {items.length > 0 && (
              <div className="border-b border-ink/10 px-6 py-4">
                <p className="text-sm text-ink-soft">
                  {remaining > 0 ? (
                    <>
                      Add <span className="font-semibold text-ink">{formatPrice(remaining)}</span>{" "}
                      for free shipping
                    </>
                  ) : (
                    <span className="font-medium text-moss">🎉 You&apos;ve unlocked free shipping!</span>
                  )}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
                  <motion.div
                    className="h-full rounded-full bg-clay"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="grid size-16 place-items-center rounded-full bg-sand">
                    <ShoppingBag className="size-7 text-ink-soft" />
                  </div>
                  <p className="text-ink-soft">Your bag is empty.</p>
                  <Button href="/shop" variant="primary" size="sm" onClick={closeCart}>
                    Browse soaps
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {items.map(({ product, quantity }) => (
                      <motion.li
                        key={product.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4"
                      >
                        <div className="size-20 shrink-0 rounded-2xl bg-sand p-2">
                          <SoapVisual
                            accent={product.accent}
                            accent2={product.accent2}
                            label={product.name.charAt(0)}
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <div>
                              <h3 className="font-medium leading-tight text-ink">{product.name}</h3>
                              <p className="text-xs text-ink-soft">{product.scent}</p>
                            </div>
                            <button
                              onClick={() => removeItem(product.id)}
                              aria-label={`Remove ${product.name}`}
                              className="text-ink-soft transition-colors hover:text-clay"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-ink/15 px-2 py-1">
                              <button
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                aria-label="Decrease quantity"
                                className="grid size-6 place-items-center rounded-full hover:bg-ink/5"
                              >
                                <Minus className="size-3.5" />
                              </button>
                              <span className="w-4 text-center text-sm font-medium">{quantity}</span>
                              <button
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                aria-label="Increase quantity"
                                className="grid size-6 place-items-center rounded-full hover:bg-ink/5"
                              >
                                <Plus className="size-3.5" />
                              </button>
                            </div>
                            <span className="font-medium text-ink">
                              {formatPrice(product.price * quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-ink-soft">Subtotal</span>
                  <span className="font-display text-2xl text-ink">{formatPrice(subtotal)}</span>
                </div>
                <Button href="/cart" size="lg" className="w-full" onClick={closeCart}>
                  Checkout
                </Button>
                <p className="mt-3 text-center text-xs text-ink-soft">
                  Taxes &amp; shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
