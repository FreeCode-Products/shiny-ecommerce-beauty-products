"use client";

import { useMemo, useState } from "react";
import { IndianRupee, Package, ShoppingBag, TrendingUp } from "lucide-react";
import type { Product } from "@/data/products";
import { SoapVisual } from "@/components/ui/SoapVisual";
import { formatPrice } from "@/lib/utils";

export interface AdminOrder {
  id: string;
  email: string | null;
  phone: string | null;
  shipping_address: {
    name?: string;
    line1?: string;
    city?: string;
    state?: string;
    pincode?: string;
  } | null;
  user_id: string;
  items: { slug: string; name: string; price: number; quantity: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  created_at: string;
}

const STATUSES = ["created", "paid", "fulfilled", "cancelled", "failed"];
const PAID = new Set(["paid", "fulfilled"]);

const statusStyles: Record<string, string> = {
  created: "bg-ink/10 text-ink-soft",
  paid: "bg-sage/25 text-moss",
  fulfilled: "bg-moss text-foam",
  cancelled: "bg-clay/20 text-clay",
  failed: "bg-clay/20 text-clay",
};

export function AdminDashboard({
  initialOrders,
  products,
}: {
  initialOrders: AdminOrder[];
  products: Product[];
}) {
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const metrics = useMemo(() => {
    const paidOrders = orders.filter((o) => PAID.has(o.status));
    const revenue = paidOrders.reduce((s, o) => s + Number(o.total), 0);
    return {
      revenue,
      total: orders.length,
      paid: paidOrders.length,
      pending: orders.filter((o) => o.status === "created").length,
    };
  }, [orders]);

  const productSales = useMemo(() => {
    const map = new Map<string, { units: number; revenue: number }>();
    for (const o of orders) {
      if (!PAID.has(o.status)) continue;
      for (const it of o.items ?? []) {
        const cur = map.get(it.slug) ?? { units: 0, revenue: 0 };
        cur.units += it.quantity;
        cur.revenue += it.quantity * it.price;
        map.set(it.slug, cur);
      }
    }
    return products
      .map((p) => ({ product: p, ...(map.get(p.slug) ?? { units: 0, revenue: 0 }) }))
      .sort((a, b) => b.units - a.units);
  }, [orders, products]);

  async function updateStatus(orderId: string, status: string) {
    setSavingId(orderId);
    setError(null);
    const prev = orders;
    setOrders((os) => os.map((o) => (o.id === orderId ? { ...o, status } : o)));

    const res = await fetch("/api/admin/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not update order.");
      setOrders(prev); // rollback
    }
    setSavingId(null);
  }

  const cards = [
    { label: "Revenue (paid)", value: formatPrice(metrics.revenue), icon: IndianRupee },
    { label: "Orders", value: String(metrics.total), icon: ShoppingBag },
    { label: "Paid", value: String(metrics.paid), icon: TrendingUp },
    { label: "Awaiting payment", value: String(metrics.pending), icon: Package },
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-3xl border border-ink/10 bg-foam p-5">
            <c.icon className="size-5 text-clay" />
            <p className="mt-3 font-display text-3xl font-semibold text-ink">{c.value}</p>
            <p className="text-sm text-ink-soft">{c.label}</p>
          </div>
        ))}
      </div>

      {error && (
        <p className="rounded-2xl border border-clay/30 bg-clay/10 p-3 text-sm text-clay">
          {error}
        </p>
      )}

      {/* Orders */}
      <section>
        <h2 className="font-display text-2xl text-ink">Orders</h2>
        {orders.length === 0 ? (
          <p className="mt-4 text-ink-soft">No orders yet.</p>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-3xl border border-ink/10 bg-foam">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-ink/10 text-ink-soft">
                <tr>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Customer</th>
                  <th className="px-5 py-4 font-medium">Deliver to</th>
                  <th className="px-5 py-4 font-medium">Items</th>
                  <th className="px-5 py-4 font-medium">Total</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="px-5 py-4 text-ink-soft">
                      {new Date(o.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-ink">{o.shipping_address?.name ?? o.email ?? o.user_id.slice(0, 8)}</p>
                      {o.phone && <p className="text-xs text-ink-soft">📞 {o.phone}</p>}
                      {o.email && <p className="text-xs text-ink-soft">{o.email}</p>}
                    </td>
                    <td className="px-5 py-4 text-ink-soft">
                      {o.shipping_address ? (
                        <span className="block max-w-[200px]">
                          {o.shipping_address.line1}, {o.shipping_address.city},{" "}
                          {o.shipping_address.state} {o.shipping_address.pincode}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-5 py-4 text-ink-soft">
                      {(o.items ?? [])
                        .map((i) => `${i.name} ×${i.quantity}`)
                        .join(", ")}
                    </td>
                    <td className="px-5 py-4 font-medium text-ink">{formatPrice(o.total)}</td>
                    <td className="px-5 py-4">
                      <select
                        value={o.status}
                        disabled={savingId === o.id}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize focus:outline-none ${
                          statusStyles[o.status] ?? "bg-ink/10 text-ink-soft"
                        }`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Product performance */}
      <section>
        <h2 className="font-display text-2xl text-ink">Products</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Catalogue lives in code (<code className="rounded bg-ink/5 px-1">src/data/products.ts</code>).
          Sales are aggregated from paid orders.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {productSales.map(({ product, units, revenue }) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-foam p-4"
            >
              <div className="size-14 shrink-0 rounded-xl bg-sand p-1.5">
                <SoapVisual
                  accent={product.accent}
                  accent2={product.accent2}
                  label={product.name.charAt(0)}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{product.name}</p>
                <p className="text-xs text-ink-soft">
                  {formatPrice(product.price)} · {product.category}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-lg text-ink">{units}</p>
                <p className="text-xs text-ink-soft">
                  sold{units > 0 ? ` · ${formatPrice(revenue)}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
