# Database migrations

SQL files here are **applied to the production Supabase database automatically**
on every push to `main` (after a PR auto-merges), by
[`.github/workflows/migrate.yml`](../../.github/workflows/migrate.yml).

## Rules (so auto-apply is safe)

- **One file per change**, named `YYYYMMDD_short_description.sql`
  (UTC date prefix → files apply in chronological order). Example:
  `20260605_add_products_subtitle.sql`.
- **Idempotent**: use `IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`,
  `CREATE OR REPLACE`, `DROP POLICY IF EXISTS` + `CREATE POLICY`. A migration may
  be re-run, so it must be safe to run twice.
- **Additive only**: add tables/columns/policies. Avoid `DROP`/`DELETE`/`TRUNCATE`
  or type changes that lose data — there is no human review before it hits prod.
- Each file runs in a **single transaction**; if it errors, the deploy's migration
  step fails (and the SQL is rolled back).

Applied files are tracked in a `public.schema_migrations` table, so each runs
once. Files are never edited after they've been applied — add a new file instead.

> The existing baseline schema lives in [`../schema.sql`](../schema.sql) /
> [`../products.sql`](../products.sql) and was applied by hand when the project
> was first set up. Migrations here cover **changes from now on**.

## One-time setup (already done once enables all future auto-migrations)

Add a single GitHub repository secret named **`SUPABASE_DB_URL`**:

1. Supabase → **Project Settings → Database → Connection string → URI**.
2. Use the **Session pooler** URI (host looks like
   `aws-0-<region>.pooler.supabase.com`, port `5432`) — GitHub runners are
   IPv4-only, and the pooler is IPv4-reachable. Include the password.
3. GitHub → repo **Settings → Secrets and variables → Actions → New repository
   secret** → name `SUPABASE_DB_URL`, value = that URI.

Until this secret exists, the migration step **skips cleanly** (no failures).
