# Development & deployment workflow

All changes flow through **GitHub** — no local VS Code editing required. Describe
work in an issue, let it land on `main` through a pull request, and Vercel deploys
the result automatically.

```
GitHub issue  →  PR on a claude/* branch  →  CI (lint + build)  →  squash-merge to main  →  Vercel deploy
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

The build runs **without secrets** — the app degrades gracefully when env vars are
absent, so CI never needs production keys. A newer push cancels any in-flight run
for the same branch (`concurrency`).

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

## Required configuration

**GitHub repository secret**

| Secret | Used by | Purpose |
| --- | --- | --- |
| `CLAUDE_CODE_OAUTH_TOKEN` | `claude.yml` | Authorizes the Claude Code action (run `claude setup-token`). Swap for `ANTHROPIC_API_KEY` if preferred. |

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

| Task | Auto today? | Can it be automated? |
| --- | --- | --- |
| Code / UI / copy / config changes | ✅ Yes | Already automated |
| Bundled catalogue (`src/data/products.ts`) | ✅ Yes | Already automated |
| **DB schema change** (Supabase tables, columns, RLS) | ❌ Manual — paste SQL from `supabase/` into the Supabase **SQL Editor** | ⚠️ Yes, via an opt-in migrations runner (see below) — has real risk |
| **New secret / env var** (API key, etc.) | ❌ Manual — add in **Vercel → Settings → Env Vars** (and GitHub secret if CI needs it) | 🚫 No — provisioning prod secrets shouldn't be automated |
| **DB row data / seeding** (DB-backed products, etc.) | ❌ Manual — `/admin` or SQL | ⚠️ Partly — a seed step could run on deploy |
| **Provider dashboard settings** (Supabase Auth redirect URLs, Razorpay test→live, custom domain/DNS) | ❌ Manual, one-time | 🚫 No — lives in third-party dashboards |
| **Correctness / does it actually work** | ⚠️ CI only checks `lint` + `build` | ⚠️ Add tests / a smoke test to CI to raise confidence |

### Automating DB schema changes (optional, opt-in)

Schema changes are the one piece of "real" work that recurs. They can be moved
into the pipeline, but auto-applying DDL to a **production** database without
review is genuinely risky (a bad migration can lock or drop data). If you want it:

1. Keep versioned migrations as `supabase/migrations/*.sql` (Claude writes these
   in the PR).
2. Add one secret — `SUPABASE_DB_URL` (the project's Postgres connection string)
   — in GitHub.
3. Add a job that runs on push to `main` and applies pending migrations (Supabase
   CLI `supabase db push`, or `psql -f`).

Trade-off: with that in place, a schema-changing issue ships end-to-end with no
manual step — at the cost of unreviewed production DDL. Ask and I'll set it up,
with additive-only migrations recommended. **Until then, schema changes are the
one thing you apply by hand** (the PR will call out the exact SQL to run).

## Product content

Product copy lives in two places that must stay in sync:

- [`docs/product-catalogue.md`](./product-catalogue.md) — the human-readable source copy.
- [`src/data/products.ts`](../src/data/products.ts) — the bundled catalogue the
  storefront falls back to when Supabase isn't seeded. The admin dashboard (`/admin`)
  manages the DB-backed catalogue when Supabase is configured.
