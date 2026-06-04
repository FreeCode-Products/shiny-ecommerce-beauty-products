"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Review {
  id: string;
  author_name: string;
  rating: number;
  body: string;
  created_at: string;
  user_id: string;
}

export function Reviews({ productSlug }: { productSlug: string }) {
  const { user, supabase, configured } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!supabase) return;
    const { data } = await supabase
      .from("reviews")
      .select("id, author_name, rating, body, created_at, user_id")
      .eq("product_slug", productSlug)
      .order("created_at", { ascending: false });
    setReviews((data as Review[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("reviews")
        .select("id, author_name, rating, body, created_at, user_id")
        .eq("product_slug", productSlug)
        .order("created_at", { ascending: false });
      if (active) {
        setReviews((data as Review[]) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [supabase, productSlug]);

  const average = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  }, [reviews]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !user) return;
    setError(null);
    setSubmitting(true);

    const authorName =
      (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Anonymous";

    const { error } = await supabase.from("reviews").upsert(
      {
        product_slug: productSlug,
        user_id: user.id,
        author_name: authorName,
        rating,
        body: body.trim(),
      },
      { onConflict: "user_id,product_slug" }
    );

    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setBody("");
    setRating(5);
    load();
  }

  return (
    <section className="mt-20 border-t border-ink/10 pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Customer reviews
        </h2>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-5 ${
                    i < Math.round(average) ? "fill-gold text-gold" : "text-ink/20"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-ink-soft">
              {average.toFixed(1)} · {reviews.length} review{reviews.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* Write a review */}
      <div className="mt-8">
        {!configured ? (
          <p className="rounded-2xl border border-ink/10 bg-foam p-4 text-sm text-ink-soft">
            Reviews go live once Supabase is connected (see SETUP.md).
          </p>
        ) : user ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-ink/10 bg-foam p-6"
          >
            <p className="font-medium text-ink">Share your experience</p>
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const value = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHover(value)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`size-7 transition-colors ${
                        value <= (hover || rating) ? "fill-gold text-gold" : "text-ink/20"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={3}
              placeholder="How did this bar work for your skin?"
              className="mt-4 w-full rounded-2xl border border-ink/15 bg-cream p-4 text-ink placeholder:text-ink-soft/60 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
            />
            {error && <p className="mt-2 text-sm text-clay">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-moss px-6 font-medium text-foam transition-colors hover:bg-ink disabled:opacity-60"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              Post review
            </button>
          </form>
        ) : (
          <p className="rounded-2xl border border-ink/10 bg-foam p-4 text-sm text-ink-soft">
            <Link href="/login" className="font-medium text-clay hover:underline">
              Log in
            </Link>{" "}
            to write a review.
          </p>
        )}
      </div>

      {/* Review list */}
      <div className="mt-8">
        {loading ? (
          <p className="text-ink-soft">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p className="text-ink-soft">No reviews yet — be the first to share.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-ink/10">
            {reviews.map((r) => (
              <li key={r.id} className="py-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-moss font-display text-foam">
                    {r.author_name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-medium text-ink">{r.author_name}</p>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3.5 ${
                            i < r.rating ? "fill-gold text-gold" : "text-ink/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-ink-soft">{r.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
