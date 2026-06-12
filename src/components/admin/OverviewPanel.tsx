"use client";

import { useMemo } from "react";
import { IndianRupee, ShoppingBag, TrendingUp, Users } from "lucide-react";
import type { AdminOrder } from "./AdminDashboard";
import type { Product } from "@/data/products";
import { SoapVisual } from "@/components/ui/SoapVisual";
import { formatPrice } from "@/lib/utils";

const PAID = new Set(["paid", "fulfilled"]);

const statusStyles: Record<string, string> = {
  created: "bg-ink/10 text-ink-soft",
  paid: "bg-sage/25 text-moss",
  fulfilled: "bg-moss text-foam",
  cancelled: "bg-clay/20 text-clay",
  failed: "bg-clay/20 text-clay",
};

export function OverviewPanel({
  orders,
  products,
}: {
  orders: AdminOrder[];
  products: Product[];
}) {
  const metrics = useMemo(() => {
    const paidOrders = orders.filter((o) => PAID.has(o.status));
    const revenue = paidOrders.reduce((s, o) => s + Number(o.total), 0);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const monthRevenue = paidOrders
      .filter((o) => new Date(o.created_at) >= startOfMonth)
      .reduce((s, o) => s + Number(o.total), 0);

    const todayRevenue = paidOrders
      .filter((o) => new Date(o.created_at) >= startOfToday)
      .reduce((s, o) => s + Number(o.total), 0);

    const uniqueCustomers = new Set(orders.map((o) => o.user_id)).size;

    return {
      revenue,
      monthRevenue,
      todayRevenue,
      total: orders.length,
      paid: paidOrders.length,
      pending: orders.filter((o) => o.status === "created").length,
      uniqueCustomers,
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
      .sort((a, b) => b.units - a.units)
      .slice(0, 6);
  }, [orders, products]);

  const recentOrders = orders.slice(0, 6);

  const statCards = [
    {
      label: "Total revenue",
      value: formatPrice(metrics.revenue),
      icon: IndianRupee,
      sub: `${formatPrice(metrics.monthRevenue)} this month`,
    },
    {
      label: "Today's revenue",
      value: formatPrice(metrics.todayRevenue),
      icon: TrendingUp,
      sub: `${metrics.paid} paid orders total`,
    },
    {
      label: "Total orders",
      value: String(metrics.total),
      icon: ShoppingBag,
      sub: `${metrics.pending} awaiting payment`,
    },
    {
      label: "Unique customers",
      value: String(metrics.uniqueCustomers),
      icon: Users,
      sub: "based on orders placed",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((c) => (
          <div key={c.label} className="rounded-3xl border border-ink/10 bg-foam p-5">
            <c.icon className="size-5 text-clay" />
            <p className="mt-3 font-display text-3xl font-semibold text-ink">{c.value}</p>
            <p className="text-sm text-ink-soft">{c.label}</p>
            <p className="mt-1 text-xs text-ink-soft">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-xl text-ink">Recent orders</h2>
          {recentOrders.length === 0 ? (
            <p className="mt-4 text-sm text-ink-soft">No orders yet.</p>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              {recentOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between rounded-2xl border border-ink/10 bg-foam px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {o.shipping_address?.name ?? o.email ?? o.user_id.slice(0, 8)}
                    </p>
                    <p className="text-xs text-ink-soft">
                      {new Date(o.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                      {" · "}
                      {(o.items ?? []).length} item
                      {(o.items ?? []).length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="ml-3 flex shrink-0 items-center gap-3">
                    <span className="font-medium text-ink">{formatPrice(o.total)}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[o.status] ?? "bg-ink/10 text-ink-soft"}`}
                    >
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Top products</h2>
          <div className="mt-4 flex flex-col gap-2">
            {productSales.map(({ product, units, revenue }) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-foam px-4 py-3"
              >
                <div className="size-10 shrink-0 rounded-lg bg-sand p-1">
                  <SoapVisual
                    accent={product.accent}
                    accent2={product.accent2}
                    label={product.name.charAt(0)}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{product.name}</p>
                  <p className="text-xs text-ink-soft">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-ink">{units} sold</p>
                  {revenue > 0 && (
                    <p className="text-xs text-ink-soft">{formatPrice(revenue)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
