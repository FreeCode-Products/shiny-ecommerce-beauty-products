"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { AdminOrder } from "./AdminDashboard";
import { formatPrice } from "@/lib/utils";

const PAID = new Set(["paid", "fulfilled"]);

const statusStyles: Record<string, string> = {
  created: "bg-ink/10 text-ink-soft",
  paid: "bg-sage/25 text-moss",
  fulfilled: "bg-moss text-foam",
  cancelled: "bg-clay/20 text-clay",
  failed: "bg-clay/20 text-clay",
};

export function TransactionsPanel({ orders }: { orders: AdminOrder[] }) {
  const [search, setSearch] = useState("");

  const stats = useMemo(() => {
    const paidOrders = orders.filter((o) => PAID.has(o.status));
    return {
      collected: paidOrders.reduce((s, o) => s + Number(o.total), 0),
      paid: paidOrders.length,
      failed: orders.filter((o) => o.status === "failed" || o.status === "cancelled").length,
      pending: orders.filter((o) => o.status === "created").length,
    };
  }, [orders]);

  const filtered = useMemo(() => {
    if (!search) return orders;
    const q = search.toLowerCase();
    return orders.filter(
      (o) =>
        o.razorpay_order_id?.toLowerCase().includes(q) ||
        o.razorpay_payment_id?.toLowerCase().includes(q) ||
        o.email?.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q)
    );
  }, [orders, search]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total collected", value: formatPrice(stats.collected) },
          { label: "Paid transactions", value: String(stats.paid) },
          { label: "Pending payment", value: String(stats.pending) },
          { label: "Failed / cancelled", value: String(stats.failed) },
        ].map((c) => (
          <div key={c.label} className="rounded-3xl border border-ink/10 bg-foam p-5">
            <p className="text-sm text-ink-soft">{c.label}</p>
            <p className="mt-1 font-display text-3xl font-semibold text-ink">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
        <input
          type="text"
          placeholder="Search by payment ID, order ID, email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full rounded-xl border border-ink/15 bg-foam pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
        />
      </div>

      <div className="overflow-x-auto rounded-3xl border border-ink/10 bg-foam">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-ink/10 text-ink-soft">
            <tr>
              <th className="px-5 py-4 font-medium">Date</th>
              <th className="px-5 py-4 font-medium">Customer</th>
              <th className="px-5 py-4 font-medium">Amount</th>
              <th className="px-5 py-4 font-medium">Razorpay order ID</th>
              <th className="px-5 py-4 font-medium">Payment ID</th>
              <th className="px-5 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {filtered.map((o) => (
              <tr key={o.id} className="transition-colors hover:bg-sand/30">
                <td className="px-5 py-4 text-ink-soft">
                  {new Date(o.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-4">
                  <p className="font-medium text-ink">
                    {o.shipping_address?.name ?? o.email ?? "—"}
                  </p>
                  {o.email && <p className="text-xs text-ink-soft">{o.email}</p>}
                </td>
                <td className="px-5 py-4 font-medium text-ink">{formatPrice(o.total)}</td>
                <td className="px-5 py-4 font-mono text-xs text-ink-soft">
                  {o.razorpay_order_id ?? "—"}
                </td>
                <td className="px-5 py-4 font-mono text-xs text-ink-soft">
                  {o.razorpay_payment_id ?? "—"}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[o.status] ?? "bg-ink/10 text-ink-soft"}`}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
