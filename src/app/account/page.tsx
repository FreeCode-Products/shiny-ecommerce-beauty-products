"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Package, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

interface OrderRow {
  id: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: string;
  created_at: string;
}

export default function AccountPage() {
  const { user, loading, supabase, signOut, configured } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  // Only show the "loading orders" state when we can actually fetch them.
  const [ordersLoading, setOrdersLoading] = useState(configured);

  // Send guests to login.
  useEffect(() => {
    if (!loading && !user) router.replace("/login?redirect=/account");
  }, [loading, user, router]);

  // Load the user's orders.
  useEffect(() => {
    if (!user || !supabase) return;
    let active = true;
    supabase
      .from("orders")
      .select("id, items, total, status, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }: { data: OrderRow[] | null }) => {
        if (active) {
          setOrders(data ?? []);
          setOrdersLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [user, supabase]);

  if (loading || !user) {
    return <div className="min-h-[60vh]" />;
  }

  const name = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "there";

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 sm:pt-40">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-clay">Your account</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">
            Hi, {name} 👋
          </h1>
          <p className="mt-1 text-ink-soft">{user.email}</p>
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            await signOut();
            router.replace("/");
          }}
        >
          <LogOut className="size-4" /> Log out
        </Button>
      </div>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 font-display text-2xl text-ink">
          <Package className="size-5" /> Order history
        </h2>

        {!configured ? (
          <p className="mt-4 text-ink-soft">Connect Supabase to start saving orders.</p>
        ) : ordersLoading ? (
          <p className="mt-4 text-ink-soft">Loading your orders…</p>
        ) : orders.length === 0 ? (
          <div className="mt-6 flex flex-col items-center gap-4 rounded-3xl border border-ink/10 bg-foam py-16 text-center">
            <ShoppingBag className="size-8 text-ink-soft" />
            <p className="text-ink-soft">No orders yet.</p>
            <Button href="/shop">Start shopping</Button>
          </div>
        ) : (
          <ul className="mt-6 flex flex-col gap-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-foam p-5"
              >
                <div>
                  <p className="font-medium text-ink">
                    {order.items?.reduce((n, i) => n + i.quantity, 0)} item(s) ·{" "}
                    {order.items?.map((i) => i.name).join(", ")}
                  </p>
                  <p className="text-sm text-ink-soft">
                    {new Date(order.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      order.status === "paid"
                        ? "bg-sage/25 text-moss"
                        : "bg-ink/10 text-ink-soft"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="font-display text-lg text-ink">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
