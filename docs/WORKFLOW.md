# Development & deployment workflow

All changes flow through **GitHub** — no local VS Code editing required. Describe
work in an issue, let it land on `main` through a pull request, and Vercel deploys
the result automatically.

```
GitHub issue  →  PR on a claude/* branch  →  CI (lint + build)  →  squash-merge to main  →  Vercel deploy
```

## 1. Requesting a change (issue-driven)

1. Open a **GitHub issue** describing what you want changed.
2. Mention **`@claude`** in the issue title/body (or comment `@claude` on an
   existing issue or PR). This triggers [`.github/workflows/claude.yml`](../.github/workflows/claude.yml).
3. Claude implements the change on a `claude/*` branch and opens a pull request.

You can keep iterating by commenting `@claude <follow-up>` on the PR.

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

## Product content

Product copy lives in two places that must stay in sync:

- [`docs/product-catalogue.md`](./product-catalogue.md) — the human-readable source copy.
- [`src/data/products.ts`](../src/data/products.ts) — the bundled catalogue the
  storefront falls back to when Supabase isn't seeded. The admin dashboard (`/admin`)
  manages the DB-backed catalogue when Supabase is configured.
