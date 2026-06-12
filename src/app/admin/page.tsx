import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { getCurrentUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/admin";
import { AdminDashboard, type AdminOrder } from "@/components/admin/AdminDashboard";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

function Gate({ title, body, cta }: { title: string; body: string; cta?: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 pt-24 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-clay/15 text-clay">
        <ShieldAlert className="size-7" />
      </div>
      <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-3 text-ink-soft">{body}</p>
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  );
}

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Gate
        title="Admin access"
        body="Please log in with an admin account to view this dashboard."
        cta={
          <Button href="/login?redirect=/admin" size="lg">
            Log in
          </Button>
        }
      />
    );
  }

  if (!isAdminEmail(user.email)) {
    return (
      <Gate
        title="Not authorized"
        body="This account doesn't have admin access. Add your email to NEXT_PUBLIC_ADMIN_EMAILS in .env.local (see SETUP.md)."
        cta={
          <Button href="/" variant="outline" size="lg">
            Back home
          </Button>
        }
      />
    );
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return (
      <Gate
        title="Admin not configured"
        body="Add SUPABASE_SERVICE_ROLE_KEY to .env.local so the dashboard can read all orders (see SETUP.md)."
      />
    );
  }

  const { data } = await admin
    .from("orders")
    .select(
      "id, email, phone, shipping_address, user_id, items, subtotal, shipping, total, status, razorpay_order_id, razorpay_payment_id, created_at"
    )
    .order("created_at", { ascending: false });

  const orders = (data as AdminOrder[] | null) ?? [];
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-40">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-clay">Admin</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">
            Store dashboard
          </h1>
          <p className="mt-1 text-ink-soft">Signed in as {user.email}</p>
        </div>
        <Link
          href="/shop"
          className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          View storefront →
        </Link>
      </header>

      <AdminDashboard initialOrders={orders} products={products} />
    </div>
  );
}
