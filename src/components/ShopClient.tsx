"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, type Product, type ProductCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

type Filter = "All" | ProductCategory;
type Sort = "featured" | "price-asc" | "price-desc" | "rating";

const sorts: { key: Sort; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "rating", label: "Top rated" },
];

export function ShopClient({
  initialCategory,
  products,
}: {
  initialCategory?: string;
  products: Product[];
}) {
  const validInitial = categories.some((c) => c.key === initialCategory)
    ? (initialCategory as ProductCategory)
    : "All";

  const [filter, setFilter] = useState<Filter>(validInitial);
  const [sort, setSort] = useState<Sort>("featured");

  const visible = useMemo(() => {
    let list = filter === "All" ? products : products.filter((p) => p.category === filter);
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [filter, sort, products]);

  const filters: Filter[] = ["All", ...categories.map((c) => c.key)];

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                filter === f
                  ? "bg-moss text-foam"
                  : "border border-ink/15 text-ink-soft hover:border-ink/40 hover:text-ink"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-ink-soft">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-ink/15 bg-foam px-4 py-2 text-sm font-medium text-ink focus:border-ink/40 focus:outline-none"
          >
            {sorts.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        Showing {visible.length} {visible.length === 1 ? "soap" : "soaps"}
      </p>

      <motion.div
        layout
        className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
