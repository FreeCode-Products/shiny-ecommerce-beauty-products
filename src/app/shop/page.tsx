import type { Metadata } from "next";
import { ShopClient } from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop all soaps",
  description:
    "Browse the full Saponé collection of handmade botanical soap bars — detox, calm, energize and nourish.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-40">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-clay">
          The collection
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
          Every bar, hand-cured.
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Eight botanical blends, each cold-processed and cured for six weeks.
          Find the one your skin has been waiting for.
        </p>
      </header>

      <div className="mt-12">
        <ShopClient initialCategory={category} />
      </div>
    </div>
  );
}
