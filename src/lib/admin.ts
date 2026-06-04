/**
 * Admin allow-list. Emails are not secrets, so this is safe to expose to the
 * client (it only controls whether the Admin link/page is shown). The actual
 * data access is still protected server-side: the admin API re-checks the
 * signed-in user's email and uses the service-role key, which stays on the
 * server. Set NEXT_PUBLIC_ADMIN_EMAILS="you@example.com,teammate@example.com".
 */
const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "";

export const adminEmails = raw
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email?: string | null): boolean {
  return Boolean(email && adminEmails.includes(email.toLowerCase()));
}
