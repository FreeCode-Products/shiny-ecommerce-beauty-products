import { NextResponse, type NextRequest } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getCurrentUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/admin";

export const runtime = "nodejs";

type Guard = { admin: SupabaseClient } | { error: string; status: number };

async function guard(): Promise<Guard> {
  const user = await getCurrentUser();
  if (!isAdminEmail(user?.email)) return { error: "Not authorized.", status: 403 };
  const admin = createSupabaseAdminClient();
  if (!admin) return { error: "Admin database not configured.", status: 503 };
  return { admin };
}

const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
const num = (v: unknown, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};
const arr = (v: unknown): string[] => {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v === "string") return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
};

function sanitize(body: Record<string, unknown>) {
  return {
    slug: str(body.slug).trim().toLowerCase().replace(/\s+/g, "-"),
    name: str(body.name).trim(),
    tagline: str(body.tagline) || null,
    scent: str(body.scent) || null,
    price: num(body.price),
    category: str(body.category, "Nourish"),
    accent: str(body.accent, "#c1714e"),
    accent2: str(body.accent2, "#7d3f28"),
    rating: body.rating != null ? num(body.rating, 5) : 5,
    reviews: num(body.reviews),
    badge: str(body.badge) || null,
    weight: str(body.weight, "120g"),
    ingredients: arr(body.ingredients),
    benefits: arr(body.benefits),
    description: str(body.description) || null,
    featured: Boolean(body.featured),
    sort_order: num(body.sort_order),
  };
}

export async function POST(request: NextRequest) {
  const g = await guard();
  if ("error" in g) return NextResponse.json({ error: g.error }, { status: g.status });

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const product = sanitize(body);
  if (!product.slug || !product.name) {
    return NextResponse.json({ error: "Name and slug are required." }, { status: 400 });
  }
  const { data, error } = await g.admin.from("products").insert(product).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ product: data });
}

export async function PUT(request: NextRequest) {
  const g = await guard();
  if ("error" in g) return NextResponse.json({ error: g.error }, { status: g.status });

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const id = num(body.id, 0);
  if (!id) return NextResponse.json({ error: "Missing product id." }, { status: 400 });

  const product = sanitize(body);
  if (!product.slug || !product.name) {
    return NextResponse.json({ error: "Name and slug are required." }, { status: 400 });
  }
  const { data, error } = await g.admin
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ product: data });
}

export async function DELETE(request: NextRequest) {
  const g = await guard();
  if ("error" in g) return NextResponse.json({ error: g.error }, { status: g.status });

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing product id." }, { status: 400 });

  const { error } = await g.admin.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
