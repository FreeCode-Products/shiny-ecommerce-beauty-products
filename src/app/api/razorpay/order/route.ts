import { NextResponse, type NextRequest } from "next/server";
import Razorpay from "razorpay";
import { products } from "@/data/products";
import { createSupabaseServerClient, getCurrentUser } from "@/lib/supabase/server";
import {
  FREE_SHIP_AT,
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  SHIP_COST,
  isRazorpayConfigured,
} from "@/lib/razorpay/config";

export const runtime = "nodejs";

interface IncomingItem {
  id: number;
  quantity: number;
}

export async function POST(request: NextRequest) {
  if (!isRazorpayConfigured) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Please log in to check out." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { items?: IncomingItem[] } | null;
  const incoming = body?.items;
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // Recompute totals server-side from the trusted catalogue (never trust the client).
  let subtotal = 0;
  const snapshot: { slug: string; name: string; price: number; quantity: number }[] = [];
  for (const item of incoming) {
    const product = products.find((p) => p.id === item.id);
    if (!product) continue;
    const quantity = Math.max(1, Math.min(99, Math.floor(Number(item.quantity) || 1)));
    subtotal += product.price * quantity;
    snapshot.push({ slug: product.slug, name: product.name, price: product.price, quantity });
  }

  if (snapshot.length === 0) {
    return NextResponse.json({ error: "No valid items in cart." }, { status: 400 });
  }

  const shipping = subtotal >= FREE_SHIP_AT ? 0 : SHIP_COST;
  const total = subtotal + shipping;
  const amount = Math.round(total * 100); // paise

  const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });

  let rzpOrderId: string;
  try {
    const rzpOrder = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `sapone_${Date.now()}`,
    });
    rzpOrderId = rzpOrder.id;
  } catch {
    return NextResponse.json({ error: "Could not start payment." }, { status: 502 });
  }

  // Persist a pending order (best-effort; payment still works without Supabase).
  let dbOrderId: string | null = null;
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        items: snapshot,
        subtotal,
        shipping,
        total,
        currency: "INR",
        status: "created",
        razorpay_order_id: rzpOrderId,
      })
      .select("id")
      .single();
    dbOrderId = (data?.id as string) ?? null;
  }

  return NextResponse.json({
    orderId: rzpOrderId,
    amount,
    currency: "INR",
    keyId: RAZORPAY_KEY_ID,
    dbOrderId,
  });
}
