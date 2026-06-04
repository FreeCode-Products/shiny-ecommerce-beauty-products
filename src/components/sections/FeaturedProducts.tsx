import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { featured } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedProducts() {
  return (
    <section id="bestsellers" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-clay">
            Loved by thousands
          </p>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl text-balance">
            The bars our customers reorder
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-clay"
          >
            View all soaps
            <span className="grid size-8 place-items-center rounded-full border border-ink/20 transition-all group-hover:border-clay group-hover:bg-clay group-hover:text-foam">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
