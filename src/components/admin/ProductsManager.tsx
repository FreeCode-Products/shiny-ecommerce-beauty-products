"use client";

import { useState } from "react";
import { Loader2, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import type { Product, ProductCategory } from "@/data/products";
import { SoapVisual } from "@/components/ui/SoapVisual";
import { formatPrice } from "@/lib/utils";

const CATEGORIES: ProductCategory[] = ["Detox", "Calm", "Energize", "Nourish"];

interface FormState {
  id?: number;
  slug: string;
  name: string;
  tagline: string;
  scent: string;
  price: string;
  category: string;
  accent: string;
  accent2: string;
  rating: string;
  reviews: string;
  badge: string;
  weight: string;
  ingredients: string;
  benefits: string;
  description: string;
  featured: boolean;
  sortOrder: string;
}

function toForm(p?: Product): FormState {
  return {
    id: p?.id,
    slug: p?.slug ?? "",
    name: p?.name ?? "",
    tagline: p?.tagline ?? "",
    scent: p?.scent ?? "",
    price: p ? String(p.price) : "",
    category: p?.category ?? "Nourish",
    accent: p?.accent ?? "#c1714e",
    accent2: p?.accent2 ?? "#7d3f28",
    rating: p ? String(p.rating) : "5",
    reviews: p ? String(p.reviews) : "0",
    badge: p?.badge ?? "",
    weight: p?.weight ?? "120g",
    ingredients: (p?.ingredients ?? []).join(", "),
    benefits: (p?.benefits ?? []).join(", "),
    description: p?.description ?? "",
    featured: p?.featured ?? false,
    sortOrder: p?.sortOrder != null ? String(p.sortOrder) : "0",
  };
}

const splitList = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);

export function ProductsManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError(null);

    const isEdit = form.id != null;
    const res = await fetch("/api/admin/products", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: form.id,
        slug: form.slug,
        name: form.name,
        tagline: form.tagline,
        scent: form.scent,
        price: Number(form.price),
        category: form.category,
        accent: form.accent,
        accent2: form.accent2,
        rating: Number(form.rating),
        reviews: Number(form.reviews),
        badge: form.badge,
        weight: form.weight,
        ingredients: form.ingredients,
        benefits: form.benefits,
        description: form.description,
        featured: form.featured,
        sort_order: Number(form.sortOrder),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Could not save the product.");
      return;
    }

    const saved: Product = {
      id: data.product?.id ?? form.id ?? Date.now(),
      slug: form.slug,
      name: form.name,
      tagline: form.tagline,
      scent: form.scent,
      price: Number(form.price),
      category: form.category as ProductCategory,
      accent: form.accent,
      accent2: form.accent2,
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      badge: form.badge || undefined,
      weight: form.weight,
      ingredients: splitList(form.ingredients),
      benefits: splitList(form.benefits),
      description: form.description,
      featured: form.featured,
      sortOrder: Number(form.sortOrder),
    };
    setProducts((prev) =>
      isEdit ? prev.map((p) => (p.id === saved.id ? saved : p)) : [...prev, saved]
    );
    setForm(null);
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this product? This can't be undone.")) return;
    const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Could not delete.");
    }
  }

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-ink">Manage products</h2>
          <p className="text-sm text-ink-soft">Add, edit or remove items from your catalogue.</p>
        </div>
        <button
          onClick={() => {
            setError(null);
            setForm(toForm());
          }}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-moss px-5 font-medium text-foam transition-colors hover:bg-ink"
        >
          <Plus className="size-4" /> Add product
        </button>
      </div>

      {error && !form && (
        <p className="mt-4 rounded-2xl border border-clay/30 bg-clay/10 p-3 text-sm text-clay">
          {error}
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-foam p-4">
            <div className="size-14 shrink-0 rounded-xl bg-sand p-1.5">
              <SoapVisual accent={p.accent} accent2={p.accent2} label={p.name.charAt(0)} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 truncate font-medium text-ink">
                {p.name}
                {p.featured && <Star className="size-3.5 fill-gold text-gold" />}
              </p>
              <p className="text-xs text-ink-soft">
                {formatPrice(p.price)} · {p.category}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setError(null);
                  setForm(toForm(p));
                }}
                aria-label="Edit"
                className="grid size-9 place-items-center rounded-full hover:bg-ink/5"
              >
                <Pencil className="size-4 text-ink-soft" />
              </button>
              <button
                onClick={() => remove(p.id)}
                aria-label="Delete"
                className="grid size-9 place-items-center rounded-full hover:bg-clay/10"
              >
                <Trash2 className="size-4 text-clay" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / edit modal */}
      {form && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-sm">
          <form
            onSubmit={save}
            className="my-8 w-full max-w-2xl rounded-3xl border border-ink/10 bg-cream p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-ink">
                {form.id != null ? "Edit product" : "New product"}
              </h3>
              <button
                type="button"
                onClick={() => setForm(null)}
                className="grid size-9 place-items-center rounded-full hover:bg-ink/10"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name" value={form.name} onChange={(v) => set("name", v)} required />
              <Field label="Slug (url)" value={form.slug} onChange={(v) => set("slug", v)} required />
              <Field label="Price (₹)" type="number" value={form.price} onChange={(v) => set("price", v)} required />
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">Category</span>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="h-11 rounded-xl border border-ink/15 bg-foam px-3 text-ink focus:border-moss focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <Field label="Scent" value={form.scent} onChange={(v) => set("scent", v)} />
              <Field label="Badge (optional)" value={form.badge} onChange={(v) => set("badge", v)} />
              <Field className="sm:col-span-2" label="Tagline" value={form.tagline} onChange={(v) => set("tagline", v)} />
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-sm font-medium text-ink">Description</span>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className="rounded-xl border border-ink/15 bg-foam p-3 text-ink focus:border-moss focus:outline-none"
                />
              </label>
              <Field className="sm:col-span-2" label="Ingredients (comma separated)" value={form.ingredients} onChange={(v) => set("ingredients", v)} />
              <Field className="sm:col-span-2" label="Benefits (comma separated)" value={form.benefits} onChange={(v) => set("benefits", v)} />
              <div className="flex items-end gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-ink">Colour 1</span>
                  <input type="color" value={form.accent} onChange={(e) => set("accent", e.target.value)} className="h-11 w-16 rounded-lg border border-ink/15 bg-foam" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-ink">Colour 2</span>
                  <input type="color" value={form.accent2} onChange={(e) => set("accent2", e.target.value)} className="h-11 w-16 rounded-lg border border-ink/15 bg-foam" />
                </label>
              </div>
              <Field label="Weight" value={form.weight} onChange={(v) => set("weight", v)} />
              <Field label="Rating" type="number" value={form.rating} onChange={(v) => set("rating", v)} />
              <Field label="Reviews count" type="number" value={form.reviews} onChange={(v) => set("reviews", v)} />
              <Field label="Sort order" type="number" value={form.sortOrder} onChange={(v) => set("sortOrder", v)} />
              <label className="flex items-center gap-2 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="size-4 accent-moss"
                />
                <span className="text-sm font-medium text-ink">Show on homepage (featured)</span>
              </label>
            </div>

            {error && <p className="mt-4 text-sm text-clay">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setForm(null)}
                className="h-11 rounded-full border border-ink/20 px-5 font-medium text-ink hover:bg-ink/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-moss px-6 font-medium text-foam hover:bg-ink disabled:opacity-60"
              >
                {saving && <Loader2 className="size-4 animate-spin" />}
                {form.id != null ? "Save changes" : "Create product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-xl border border-ink/15 bg-foam px-3 text-ink focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
      />
    </label>
  );
}
