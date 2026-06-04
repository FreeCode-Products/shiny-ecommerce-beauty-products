import {
  products as fallbackProducts,
  categories,
  type Product,
  type ProductCategory,
} from "@/data/products";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export { categories };
export type { Product, ProductCategory };

/** Columns selected from the DB, mapped onto the Product shape used by the UI. */
interface ProductRow {
  id: number;
  slug: string;
  name: string;
  tagline: string | null;
  scent: string | null;
  price: number;
  category: string;
  accent: string;
  accent2: string;
  rating: number;
  reviews: number;
  badge: string | null;
  weight: string | null;
  ingredients: string[] | null;
  benefits: string[] | null;
  description: string | null;
  featured: boolean;
  sort_order: number;
}

function rowToProduct(r: ProductRow): Product {
  return {
    id: Number(r.id),
    slug: r.slug,
    name: r.name,
    tagline: r.tagline ?? "",
    scent: r.scent ?? "",
    price: Number(r.price),
    category: r.category as ProductCategory,
    accent: r.accent,
    accent2: r.accent2,
    rating: Number(r.rating),
    reviews: Number(r.reviews),
    badge: r.badge ?? undefined,
    weight: r.weight ?? "120g",
    ingredients: r.ingredients ?? [],
    benefits: r.benefits ?? [],
    description: r.description ?? "",
    featured: r.featured,
    sortOrder: r.sort_order,
  };
}

/**
 * All products. Reads from the DB when configured & seeded, otherwise falls
 * back to the bundled catalogue — so the storefront always works.
 */
export async function getAllProducts(): Promise<Product[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return fallbackProducts;

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, name, tagline, scent, price, category, accent, accent2, rating, reviews, badge, weight, ingredients, benefits, description, featured, sort_order"
    )
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallbackProducts;
  return (data as ProductRow[]).map(rowToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const supabase = createSupabasePublicClient();
  if (supabase) {
    const { data } = await supabase
      .from("products")
      .select(
        "id, slug, name, tagline, scent, price, category, accent, accent2, rating, reviews, badge, weight, ingredients, benefits, description, featured, sort_order"
      )
      .eq("featured", true)
      .order("sort_order", { ascending: true });
    if (data && data.length > 0) return (data as ProductRow[]).map(rowToProduct).slice(0, limit);
  }
  // Fallback: first matching from the bundled catalogue.
  const featuredSlugs = ["charcoal-detox", "lavender-dream", "citrus-zest", "rose-petal"];
  return fallbackProducts.filter((p) => featuredSlugs.includes(p.slug)).slice(0, limit);
}
