# Development & deployment workflow

All changes flow through **GitHub** — no local VS Code editing required. Describe
work in an issue, let it land on `main` through a pull request, and Vercel deploys
the result automatically.

```
GitHub issue  →  PR on a claude/* branch  →  CI (lint + build + smoke)  →  squash-merge to main  →  Vercel deploy
                                                                                                   ↘  DB migrations (if any)
```

## 1. Requesting a change (issue-driven)

**Just open a GitHub issue** describing what you want changed — that's the only
step. [`.github/workflows/claude-auto.yml`](../.github/workflows/claude-auto.yml)
fires on every newly opened issue (no `@claude` mention needed), implements the
change on a `claude/*` branch and opens a pull request.

- To iterate on the result, comment **`@claude <follow-up>`** on the PR or issue
  — handled by [`.github/workflows/claude.yml`](../.github/workflows/claude.yml).
- To make the auto-implement selective instead of "every issue," add a label gate
  to `claude-auto.yml` (a one-line `if:` — see the comment in that file).

## 2. Continuous integration

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs on every PR and on
pushes to `main`:

- `npm ci`
- `npm run lint`
- `npm run build` (also runs the TypeScript check)
- **smoke test** — boots the production server and asserts that `/`, `/shop` and a
  product page return HTTP 200, so a change that compiles but crashes at runtime
  fails CI instead of auto-deploying.

CI runs **without secrets** — the app degrades gracefully when env vars are absent,
so CI never needs production keys (the smoke test exercises the bundled-catalogue
fallback). A newer push cancels any in-flight run for the same branch (`concurrency`).

## 3. Auto-merge

[`.github/workflows/auto-merge.yml`](../.github/workflows/auto-merge.yml) watches
for a **successful CI run** on a PR whose branch starts with `claude/`. When CI is
green it **squash-merges** the PR into `main` and deletes the branch. Green CI is
the safety gate.

> Human-authored PRs are **not** auto-merged — review and merge them via the
> GitHub UI once CI passes.

## 4. Deployment (Vercel)

Vercel's Git integration is connected to this repo (project
`shiny-ecommerce-beauty-products`, see [`.vercel/project.json`](../.vercel/project.json)).
**Every push to `main` triggers a production deploy** — including the squash-merges
from auto-merge. There is no deploy step inside GitHub Actions; Vercel owns it.

Preview deploys are created automatically for open PRs.

## 5. Database migrations

[`.github/workflows/migrate.yml`](../.github/workflows/migrate.yml) applies any new
[`supabase/migrations/*.sql`](../supabase/migrations/) to the **production** database
when they land on `main`. Files are idempotent + additive-only, tracked in
`public.schema_migrations`, and each runs in a single transaction (a bad file rolls
back and fails the run). It only runs when a migration file changes, and is a clean
**no-op until the `SUPABASE_DB_URL` secret is set** (see
[`supabase/migrations/README.md`](../supabase/migrations/README.md)).

So a schema-changing issue ships end-to-end: Claude adds the migration in the PR →
CI → merge → the migration applies → Vercel serves the new code.

> **Ordering caveat:** the migration job and Vercel's deploy both start from the
> same push and run in parallel. Because migrations are **additive-only**, the old
> and new code both work against the schema during the brief overlap, so order
> doesn't matter. (Never ship a destructive migration through this path.)

## Required configuration

**GitHub repository secret**

| Secret | Used by | Purpose |
| --- | --- | --- |
| `CLAUDE_CODE_OAUTH_TOKEN` | `claude.yml`, `claude-auto.yml` | Authorizes the Claude Code action (run `claude setup-token`). Swap for `ANTHROPIC_API_KEY` if preferred. |
| `SUPABASE_DB_URL` | `migrate.yml` | Postgres connection URI (use the **Session pooler** string, IPv4) so migrations can be auto-applied. Optional — migrations skip until it's set. |

**Vercel project environment variables** (Production + Preview) — see
[`.env.example`](../.env.example) for the full list:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_ADMIN_EMAILS`, `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_DEMO_EMAIL`, `NEXT_PUBLIC_DEMO_PASSWORD` (optional)
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

## Recommended: protect `main`

So nothing reaches production unverified, enable branch protection on `main`
(GitHub → Settings → Branches):

- Require the **CI** status check to pass before merging.
- Require pull requests before merging (allow the auto-merge workflow to satisfy it).

## What still needs you (and what can't go in the workflow)

Most work — code, components, styling, copy, and the bundled product catalogue
(`src/data/products.ts`) — is fully hands-off: open an issue → it ships. The
items below are the exceptions.

| Task | Auto? | Notes |
| --- | --- | --- |
| Code / UI / copy / config changes | ✅ Yes | Already automated |
| Bundled catalogue (`src/data/products.ts`) | ✅ Yes | Already automated |
| **DB schema change** (Supabase tables, columns, RLS) | ✅ Yes | Auto-applied via `migrate.yml` once `SUPABASE_DB_URL` is set (additive-only). |
| **Correctness / does it actually work** | ✅ Mostly | CI smoke test boots the app + checks key pages. Logic bugs still possible — add more tests per feature. |
| **DB row data / seeding** | ⚠️ Partly | Manage via `/admin`, or ask for a seed step on deploy. |
| **New secret / env var** (a *new* API key) | ❌ One-time | Add in **Vercel → Settings → Env Vars**. Provisioning prod secrets shouldn't be automated. |
| **Provider dashboard settings** (Supabase Auth redirect URLs, custom domain/DNS) | ❌ One-time | Lives in third-party dashboards. |
| **Razorpay test → live** | ❌ One-time | Requires KYC / business verification — a legal human step. |

The last three are the only **permanent** manual items, and each is a rare,
one-time-per-integration setup action rather than recurring work.

## Product content

Product copy lives in two places that must stay in sync:

- [`docs/product-catalogue.md`](./product-catalogue.md) — the human-readable source copy.
- [`src/data/products.ts`](../src/data/products.ts) — the bundled catalogue the
  storefront falls back to when Supabase isn't seeded. The admin dashboard (`/admin`)
  manages the DB-backed catalogue when Supabase is configured.
