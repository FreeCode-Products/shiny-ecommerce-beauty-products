"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Loader2, Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { AdminOrder } from "./AdminDashboard";

interface Customer {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  order_count: number;
  total_spent: number;
}

const statusStyles: Record<string, string> = {
  created: "bg-ink/10 text-ink-soft",
  paid: "bg-sage/25 text-moss",
  fulfilled: "bg-moss text-foam",
  cancelled: "bg-clay/20 text-clay",
  failed: "bg-clay/20 text-clay",
};

export function CustomersPanel({ orders }: { orders: AdminOrder[] }) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setCustomers(d.customers);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const ordersByUser = useMemo(() => {
    const map = new Map<string, AdminOrder[]>();
    for (const o of orders) {
      const list = map.get(o.user_id) ?? [];
      list.push(o);
      map.set(o.user_id, list);
    }
    return map;
  }, [orders]);

  const filtered = useMemo(() => {
    if (!search) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) =>
        c.email.toLowerCase().includes(q) ||
        (c.full_name?.toLowerCase().includes(q) ?? false)
    );
  }, [customers, search]);

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-ink-soft">
        <Loader2 className="size-5 animate-spin" />
        Loading customers…
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-2xl border border-clay/30 bg-clay/10 p-4 text-sm text-clay">
        {error.includes("configured")
          ? "Customer list requires Supabase to be configured with a service role key."
          : error}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-ink/15 bg-foam pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
          />
        </div>
        <p className="shrink-0 text-sm text-ink-soft">
          {filtered.length} customer{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <p className="text-sm text-ink-soft">No customers match your search.</p>
        )}
        {filtered.map((c) => {
          const userOrders = ordersByUser.get(c.id) ?? [];
          const isOpen = expanded === c.id;
          return (
            <div
              key={c.id}
              className="overflow-hidden rounded-2xl border border-ink/10 bg-foam"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : c.id)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-sand/30"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-full bg-moss/10 font-display text-lg font-semibold text-moss">
                    {(c.full_name ?? c.email).charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{c.full_name ?? "—"}</p>
                    <p className="truncate text-sm text-ink-soft">{c.email}</p>
                  </div>
                </div>
                <div className="ml-4 flex shrink-0 items-center gap-6">
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium text-ink">
                      {c.order_count} order{c.order_count !== 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-ink-soft">{formatPrice(c.total_spent)} spent</p>
                  </div>
                  <div className="hidden text-right md:block">
                    <p className="text-xs text-ink-soft">Joined</p>
                    <p className="text-sm text-ink">
                      {new Date(c.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="size-4 shrink-0 text-ink-soft" />
                  ) : (
                    <ChevronDown className="size-4 shrink-0 text-ink-soft" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-ink/10 px-5 py-4">
                  <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div>
                      <p className="text-xs text-ink-soft">Email</p>
                      <p className="break-all text-sm text-ink">{c.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-ink-soft">Total orders</p>
                      <p className="text-sm font-medium text-ink">{c.order_count}</p>
                    </div>
                    <div>
                      <p className="text-xs text-ink-soft">Total spent</p>
                      <p className="text-sm font-medium text-ink">{formatPrice(c.total_spent)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-ink-soft">Last sign-in</p>
                      <p className="text-sm text-ink">
                        {c.last_sign_in_at
                          ? new Date(c.last_sign_in_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </p>
                    </div>
                  </div>

                  {userOrders.length > 0 ? (
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-soft">
                        Order history
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {userOrders.map((o) => (
                          <div
                            key={o.id}
                            className="flex items-center justify-between rounded-xl bg-sand/40 px-4 py-2.5"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm text-ink">
                                {(o.items ?? [])
                                  .map((i) => `${i.name} ×${i.quantity}`)
                                  .join(", ")}
                              </p>
                              <p className="text-xs text-ink-soft">
                                {new Date(o.created_at).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                            <div className="ml-3 flex shrink-0 items-center gap-3">
                              <span className="text-sm font-medium text-ink">
                                {formatPrice(o.total)}
                              </span>
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[o.status] ?? "bg-ink/10 text-ink-soft"}`}
                              >
                                {o.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-ink-soft">No orders yet.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
