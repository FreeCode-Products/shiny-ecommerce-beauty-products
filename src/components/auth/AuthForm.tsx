"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Loader2, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const { signIn, signUp, user, configured } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/account";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Redirect away once authenticated.
  useEffect(() => {
    if (user) router.replace(redirect);
  }, [user, redirect, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);

    const result = isSignup
      ? await signUp(email, password, fullName.trim() || email.split("@")[0])
      : await signIn(email, password);

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.needsConfirmation) {
      setInfo("Almost there — check your email to confirm your account, then log in.");
      return;
    }
    router.replace(redirect);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-32">
      <div className="rounded-[2rem] border border-ink/10 bg-foam p-8 shadow-[0_30px_60px_-30px_rgba(31,26,20,0.3)]">
        <span className="grid size-12 place-items-center rounded-2xl bg-moss font-display text-2xl text-foam">
          S
        </span>
        <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          {isSignup
            ? "Join Saponé to track orders and leave reviews."
            : "Log in to your Saponé account."}
        </p>

        {!configured && (
          <div className="mt-5 flex items-start gap-2 rounded-2xl border border-clay/30 bg-clay/10 p-3 text-sm text-ink">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-clay" />
            <span>
              Login isn&apos;t connected yet. Add your free Supabase keys (see{" "}
              <code className="rounded bg-ink/5 px-1">SETUP.md</code>) to enable accounts.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {isSignup && (
            <Field
              label="Name"
              type="text"
              value={fullName}
              onChange={setFullName}
              placeholder="Your name"
              autoComplete="name"
            />
          )}
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@email.com"
            autoComplete="email"
            required
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            autoComplete={isSignup ? "new-password" : "current-password"}
            required
            minLength={6}
          />

          {error && (
            <p className="flex items-center gap-2 text-sm text-clay">
              <AlertCircle className="size-4" /> {error}
            </p>
          )}
          {info && (
            <p className="flex items-center gap-2 rounded-xl bg-sage/20 p-3 text-sm text-moss">
              <Mail className="size-4" /> {info}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-moss font-medium text-foam transition-all hover:bg-ink disabled:opacity-60"
          >
            {submitting && <Loader2 className="size-4 animate-spin" />}
            {isSignup ? "Create account" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          {isSignup ? "Already have an account? " : "New to Saponé? "}
          <Link
            href={isSignup ? "/login" : "/signup"}
            className="font-medium text-clay hover:underline"
          >
            {isSignup ? "Log in" : "Create one"}
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
  minLength,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        className="h-12 rounded-xl border border-ink/15 bg-cream px-4 text-ink placeholder:text-ink-soft/60 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
      />
    </label>
  );
}
