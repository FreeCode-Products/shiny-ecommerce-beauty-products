import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Leaf, Recycle, Star, Truck } from "lucide-react";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { SoapVisual } from "@/components/ui/SoapVisual";
import { AddToCart } from "@/components/AddToCart";
import { ProductCard } from "@/components/ProductCard";
import { Reviews } from "@/components/Reviews";
import { formatPrice } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

const perks = [
  { icon: Truck, label: "Free shipping over ₹999" },
  { icon: Leaf, label: "100% vegan ingredients" },
  { icon: Recycle, label: "Plastic-free packaging" },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = (await getAllProducts()).filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <article className="pt-28">
      <div className="mx-auto max-w-7xl px-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" /> Back to shop
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <div
            className="relative grid place-items-center overflow-hidden rounded-[2.5rem] p-12"
            style={{
              background: `radial-gradient(120% 120% at 30% 20%, ${product.accent}33 0%, ${product.accent2}22 100%)`,
            }}
          >
            {product.badge && (
              <span className="absolute left-6 top-6 rounded-full bg-ink/85 px-3 py-1 text-xs font-medium uppercase tracking-wider text-foam">
                {product.badge}
              </span>
            )}
            <SoapVisual
              accent={product.accent}
              accent2={product.accent2}
              label={product.name.charAt(0)}
              className="max-w-[70%] animate-float"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-sm font-medium uppercase tracking-widest text-clay">
              {product.category} · {product.scent}
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < Math.round(product.rating)
                        ? "fill-gold text-gold"
                        : "text-ink/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-ink-soft">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              {product.description}
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl text-ink">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-ink-soft">/ {product.weight} bar</span>
            </div>

            <div className="mt-8">
              <AddToCart product={product} />
            </div>

            {/* perks */}
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {perks.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-ink-soft">
                  <Icon className="size-4 text-moss" /> {label}
                </li>
              ))}
            </ul>

            {/* benefits + ingredients */}
            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-lg text-ink">Benefits</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-ink-soft">
                      <Check className="size-4 text-clay" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-lg text-ink">Key ingredients</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="rounded-full border border-ink/15 bg-foam px-3 py-1 text-xs font-medium text-ink-soft"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <Reviews productSlug={product.slug} />

        {/* Related */}
        <section className="mt-24 pb-24">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
            You may also like
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
