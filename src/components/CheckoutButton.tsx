"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { loadRazorpayScript, type RazorpayResponse } from "@/lib/razorpay/checkout";

export function CheckoutButton({ onSuccess }: { onSuccess: () => void }) {
  const { items } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (items.length === 0) return;
    setError(null);
    setProcessing(true);

    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.product.id, quantity: i.quantity })),
        }),
      });

      // Payments not configured yet → fall back to the demo confirmation.
      if (res.status === 503) {
        onSuccess();
        return;
      }
      // Razorpay needs a logged-in user.
      if (res.status === 401) {
        router.push("/login?redirect=/cart");
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not start checkout.");
        return;
      }

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setError("Couldn't load the payment window. Check your connection.");
        return;
      }

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Saponé",
        description: "Botanical soap order",
        order_id: data.orderId,
        prefill: { email: user?.email ?? undefined },
        theme: { color: "#2e3a30" },
        handler: async (response: RazorpayResponse) => {
          const verify = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, dbOrderId: data.dbOrderId }),
          });
          if (verify.ok) {
            onSuccess();
          } else {
            setError("Payment could not be verified. You were not charged.");
          }
        },
        modal: { ondismiss: () => setProcessing(false) },
      });
      rzp.open();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={processing || items.length === 0}
        className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-moss font-medium text-foam shadow-sm transition-all duration-300 hover:bg-ink hover:shadow-md active:scale-[0.98] disabled:opacity-60"
      >
        {processing && <Loader2 className="size-4 animate-spin" />}
        {processing ? "Starting checkout…" : "Place order"}
      </button>
      {error && <p className="mt-3 text-center text-sm text-clay">{error}</p>}
    </div>
  );
}
