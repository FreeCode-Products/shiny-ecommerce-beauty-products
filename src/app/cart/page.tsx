"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SoapVisual } from "@/components/ui/SoapVisual";
import { Button } from "@/components/ui/Button";
import { CheckoutButton } from "@/components/CheckoutButton";
import { smoothScrollTo } from "@/lib/lenis";
import {
  DeliveryForm,
  emptyDelivery,
  firstInvalidFieldId,
  type Delivery,
} from "@/components/checkout/DeliveryForm";
import { formatPrice } from "@/lib/utils";

const FREE_SHIP_AT = 999;
const SHIP_COST = 59;

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clear, count } = useCart();
  const [placed, setPlaced] = useState(false);
  const [delivery, setDelivery] = useState<Delivery>(emptyDelivery);
  const [showErrors, setShowErrors] = useState(false);

  // When checkout is attempted with missing details: reveal inline errors,
  // smooth-scroll to the form, and focus the first empty field.
  function handleInvalidDelivery() {
    setShowErrors(true);
    const el = document.getElementById("delivery-details");
    if (el) smoothScrollTo(el);
    const fieldId = firstInvalidFieldId(delivery);
    if (fieldId) {
      window.setTimeout(
        () => document.getElementById(fieldId)?.focus({ preventScroll: true }),
        650
      );
    }
  }

  const shipping = subtotal >= FREE_SHIP_AT || subtotal === 0 ? 0 : SHIP_COST;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-24 pt-44 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="grid size-20 place-items-center rounded-full bg-moss text-foam"
        >
          <Check className="size-9" />
        </motion.div>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink">
          Order placed!
        </h1>
        <p className="mt-3 text-ink-soft">
          Thank you for choosing The Soap Company, crafted by shiny. This is a demo store, so no payment was
          taken — but your imaginary soaps are on their way. 🧼
        </p>
        <Button href="/shop" size="lg" className="mt-8">
          Keep shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-40">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" /> Continue shopping
      </Link>

      <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight text-ink">
        Your bag
      </h1>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-5 rounded-3xl border border-ink/10 bg-foam py-20 text-center">
          <p className="text-lg text-ink-soft">Your bag is feeling light.</p>
          <Button href="/shop" size="lg">
            Discover our soaps
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Items */}
          <div>
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <p className="text-sm text-ink-soft">{count} items</p>
              <button
                onClick={clear}
                className="text-sm text-ink-soft transition-colors hover:text-clay"
              >
                Clear bag
              </button>
            </div>

            <ul className="divide-y divide-ink/10">
              <AnimatePresence initial={false}>
                {items.map(({ product, quantity }) => (
                  <motion.li
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="flex gap-5 py-6"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      className="size-28 shrink-0 rounded-2xl bg-sand p-3"
                    >
                      <SoapVisual
                        accent={product.accent}
                        accent2={product.accent2}
                        label={product.name.charAt(0)}
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link href={`/product/${product.slug}`}>
                            <h3 className="font-display text-xl text-ink">{product.name}</h3>
                          </Link>
                          <p className="text-sm text-ink-soft">{product.scent}</p>
                        </div>
                        <span className="font-display text-xl text-ink">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-4 rounded-full border border-ink/15 px-3 py-1.5">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            aria-label="Decrease quantity"
                            className="grid size-7 place-items-center rounded-full hover:bg-ink/5"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm font-medium">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            aria-label="Increase quantity"
                            className="grid size-7 place-items-center rounded-full hover:bg-ink/5"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-clay"
                        >
                          <Trash2 className="size-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="mt-8">
              <DeliveryForm
                value={delivery}
                onChange={setDelivery}
                showErrors={showErrors}
              />
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-3xl border border-ink/10 bg-foam p-7 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl text-ink">Order summary</h2>
            <dl className="mt-6 flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd className="font-medium text-ink">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </dd>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-ink-soft">
                  Add {formatPrice(FREE_SHIP_AT - subtotal)} more for free shipping.
                </p>
              )}
              <div className="mt-3 flex justify-between border-t border-ink/10 pt-4">
                <dt className="font-display text-lg text-ink">Total</dt>
                <dd className="font-display text-lg text-ink">{formatPrice(total)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <CheckoutButton
                delivery={delivery}
                onInvalid={handleInvalidDelivery}
                onSuccess={() => {
                  clear();
                  setPlaced(true);
                }}
              />
            </div>
            <p className="mt-3 text-center text-xs text-ink-soft">
              Pay online via Razorpay (test mode), or cash on delivery if payments
              aren&apos;t set up yet.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
