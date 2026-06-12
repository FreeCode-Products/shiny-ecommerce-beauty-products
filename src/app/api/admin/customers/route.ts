import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/admin";

export const runtime = "nodejs";

export interface AdminCustomer {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  order_count: number;
  total_spent: number;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!isAdminEmail(user?.email)) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Admin database not configured." }, { status: 503 });
  }

  const {
    data: { users },
    error: usersError,
  } = await admin.auth.admin.listUsers({ perPage: 1000 });

  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 });
  }

  const { data: orders } = await admin
    .from("orders")
    .select("user_id, total, status")
    .in("status", ["paid", "fulfilled"]);

  const orderStats = new Map<string, { count: number; spent: number }>();
  for (const o of orders ?? []) {
    const cur = orderStats.get(o.user_id) ?? { count: 0, spent: 0 };
    cur.count += 1;
    cur.spent += Number(o.total);
    orderStats.set(o.user_id, cur);
  }

  const customers: AdminCustomer[] = users.map((u) => {
    const stats = orderStats.get(u.id) ?? { count: 0, spent: 0 };
    return {
      id: u.id,
      email: u.email ?? "",
      full_name: (u.user_metadata as { full_name?: string })?.full_name ?? null,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
      order_count: stats.count,
      total_spent: stats.spent,
    };
  });

  customers.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return NextResponse.json({ customers });
}
