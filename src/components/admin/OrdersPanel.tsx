"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { AdminOrder } from "./AdminDashboard";
import { formatPrice } from "@/lib/utils";

const STATUSES = ["created", "paid", "fulfilled", "cancelled", "failed"];

const statusStyles: Record<string, string> = {
  created: "bg-ink/10 text-ink-soft",
  paid: "bg-sage/25 text-moss",
  fulfilled: "bg-moss text-foam",
  cancelled: "bg-clay/20 text-clay",
  failed: "bg-clay/20 text-clay",
};

export function OrdersPanel({
  orders,
  setOrders,
}: {
  orders: AdminOrder[];
  setOrders: React.Dispatch<React.SetStateAction<AdminOrder[]>>;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        o.email?.toLowerCase().includes(q) ||
        o.shipping_address?.name?.toLowerCase().includes(q) ||
        o.phone?.includes(q) ||
        o.id.toLowerCase().includes(q)
      );
    });
  }, [orders, search, statusFilter]);

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
      setOrders(() => prev);
    }
    setSavingId(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
          <input
            type="text"
            placeholder="Search name, email, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-ink/15 bg-foam pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-xl border border-ink/15 bg-foam px-3 text-sm text-ink focus:border-moss focus:outline-none"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="rounded-2xl border border-clay/30 bg-clay/10 p-3 text-sm text-clay">
          {error}
        </p>
      )}

      <p className="text-sm text-ink-soft">
        {filtered.length} order{filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="text-ink-soft">No orders match your filters.</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-ink/10 bg-foam">
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
                      {o.shipping_address?.name ?? o.email ?? o.user_id.slice(0, 8)}
                    </p>
                    {o.phone && <p className="text-xs text-ink-soft">{o.phone}</p>}
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
                    {(o.items ?? []).map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                  </td>
                  <td className="px-5 py-4 font-medium text-ink">{formatPrice(o.total)}</td>
                  <td className="px-5 py-4">
                    <select
                      value={o.status}
                      disabled={savingId === o.id}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize focus:outline-none disabled:opacity-60 ${statusStyles[o.status] ?? "bg-ink/10 text-ink-soft"}`}
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
    </div>
  );
}
