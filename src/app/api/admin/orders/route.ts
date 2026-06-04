import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/admin";

export const runtime = "nodejs";

const ALLOWED_STATUSES = ["created", "paid", "fulfilled", "cancelled", "failed"];

export async function POST(request: NextRequest) {
  // Re-verify admin on the server — never trust the client.
  const user = await getCurrentUser();
  if (!isAdminEmail(user?.email)) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Admin database access not configured (SUPABASE_SERVICE_ROLE_KEY)." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const orderId = body?.orderId as string | undefined;
  const status = body?.status as string | undefined;

  if (!orderId || !status || !ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid order id or status." }, { status: 400 });
  }

  const { error } = await admin.from("orders").update({ status }).eq("id", orderId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
