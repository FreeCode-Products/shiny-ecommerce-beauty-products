import { NextResponse, type NextRequest } from "next/server";
import Razorpay from "razorpay";
import { getAllProducts } from "@/lib/products";
import { getCurrentUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
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

interface Shipping {
  name?: string;
  phone?: string;
  line1?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

function validShipping(s: Shipping | undefined): string | null {
  if (!s) return "Missing delivery details.";
  if (!s.name?.trim()) return "Name is required.";
  if (!/^[0-9]{10}$/.test((s.phone ?? "").trim())) return "Valid 10-digit mobile required.";
  if (!s.line1?.trim()) return "Address is required.";
  if (!s.city?.trim()) return "City is required.";
  if (!s.state?.trim()) return "State is required.";
  if (!/^[0-9]{6}$/.test((s.pincode ?? "").trim())) return "Valid 6-digit pincode required.";
  return null;
}

export async function POST(request: NextRequest) {
  // Pure demo (no Supabase + no Razorpay): nothing to persist — let the client
  // show a demo confirmation.
  if (!isSupabaseConfigured && !isRazorpayConfigured) {
    return NextResponse.json({ mode: "demo" }, { status: 503 });
  }

  // Guest checkout is allowed — user may be null.
  const user = await getCurrentUser();

  const body = (await request.json().catch(() => null)) as
    | { items?: IncomingItem[]; shipping?: Shipping }
    | null;

  const incoming = body?.items;
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const shipErr = validShipping(body?.shipping);
  if (shipErr) {
    return NextResponse.json({ error: shipErr }, { status: 400 });
  }
  const ship = body!.shipping!;

  // Recompute totals server-side from the trusted catalogue (DB or fallback).
  const products = await getAllProducts();
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

  const shippingCost = subtotal >= FREE_SHIP_AT ? 0 : SHIP_COST;
  const total = subtotal + shippingCost;

  const shipping_address = {
    name: ship.name!.trim(),
    line1: ship.line1!.trim(),
    city: ship.city!.trim(),
    state: ship.state!.trim(),
    pincode: ship.pincode!.trim(),
  };

  const baseOrder = {
    user_id: user?.id ?? null,
    email: user?.email ?? null,
    phone: ship.phone!.trim(),
    shipping_address,
    items: snapshot,
    subtotal,
    shipping: shippingCost,
    total,
    currency: "INR",
  };

  // --- Razorpay path -------------------------------------------------------
  if (isRazorpayConfigured) {
    const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
    let rzpOrderId: string;
    try {
      const rzpOrder = await razorpay.orders.create({
        amount: Math.round(total * 100),
        currency: "INR",
        receipt: `sapone_${Date.now()}`,
      });
      rzpOrderId = rzpOrder.id;
    } catch {
      return NextResponse.json({ error: "Could not start payment." }, { status: 502 });
    }

    const adminDb = createSupabaseAdminClient();
    let dbOrderId: string | null = null;
    if (adminDb) {
      const { data } = await adminDb
        .from("orders")
        .insert({ ...baseOrder, status: "created", razorpay_order_id: rzpOrderId })
        .select("id")
        .single();
      dbOrderId = (data?.id as string) ?? null;
    }

    return NextResponse.json({
      mode: "razorpay",
      orderId: rzpOrderId,
      amount: Math.round(total * 100),
      currency: "INR",
      keyId: RAZORPAY_KEY_ID,
      dbOrderId,
      prefill: {
        name: shipping_address.name,
        contact: baseOrder.phone,
        email: user?.email ?? undefined,
      },
    });
  }

  // --- Cash on delivery path (Razorpay not configured yet) -----------------
  const adminDb = createSupabaseAdminClient();
  if (!adminDb) {
    return NextResponse.json({ error: "Service not configured." }, { status: 503 });
  }
  const { error } = await adminDb
    .from("orders")
    .insert({ ...baseOrder, status: "created" });

  if (error) {
    return NextResponse.json({ error: "Could not place order." }, { status: 500 });
  }

  return NextResponse.json({ mode: "cod" });
}
