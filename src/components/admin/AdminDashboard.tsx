"use client";

import { useState } from "react";
import { BarChart3, CreditCard, Package, ShoppingBag, Users } from "lucide-react";
import type { Product } from "@/data/products";
import { OverviewPanel } from "./OverviewPanel";
import { OrdersPanel } from "./OrdersPanel";
import { TransactionsPanel } from "./TransactionsPanel";
import { ProductsManager } from "./ProductsManager";
import { CustomersPanel } from "./CustomersPanel";

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
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  created_at: string;
}

const TABS = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "transactions", label: "Transactions", icon: CreditCard },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AdminDashboard({
  initialOrders,
  products,
}: {
  initialOrders: AdminOrder[];
  products: Product[];
}) {
  const [tab, setTab] = useState<TabId>("overview");
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);

  return (
    <div className="flex flex-col gap-8">
      <nav className="flex flex-wrap gap-1 rounded-2xl border border-ink/10 bg-foam p-1.5">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-moss text-foam shadow-sm"
                  : "text-ink-soft hover:bg-ink/5 hover:text-ink"
              }`}
            >
              <t.icon className="size-4" />
              {t.label}
            </button>
          );
        })}
      </nav>

      {tab === "overview" && <OverviewPanel orders={orders} products={products} />}
      {tab === "orders" && <OrdersPanel orders={orders} setOrders={setOrders} />}
      {tab === "transactions" && <TransactionsPanel orders={orders} />}
      {tab === "products" && <ProductsManager initialProducts={products} />}
      {tab === "customers" && <CustomersPanel orders={orders} />}
    </div>
  );
}
