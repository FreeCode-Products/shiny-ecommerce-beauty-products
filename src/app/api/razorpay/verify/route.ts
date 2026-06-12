import crypto from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { RAZORPAY_KEY_SECRET, isRazorpayConfigured } from "@/lib/razorpay/config";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isRazorpayConfigured) {
    return NextResponse.json({ error: "Payments are not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body ?? {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment fields." }, { status: 400 });
  }

  // Verify the HMAC signature to confirm the payment is authentic.
  const expected = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const valid =
    expected.length === razorpay_signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));

  // Reflect the result on the saved order (best-effort, admin client bypasses RLS for guest orders).
  const adminDb = createSupabaseAdminClient();
  if (adminDb) {
    await adminDb
      .from("orders")
      .update({
        status: valid ? "paid" : "failed",
        razorpay_payment_id,
      })
      .eq("razorpay_order_id", razorpay_order_id);
  }

  if (!valid) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
