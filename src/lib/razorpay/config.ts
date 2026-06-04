/** Server-only Razorpay credentials (test or live keys from the dashboard). */
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID ?? "";
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET ?? "";

export const isRazorpayConfigured = Boolean(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);

/** Free shipping threshold / flat shipping (INR). Kept in sync with the cart UI. */
export const FREE_SHIP_AT = 999;
export const SHIP_COST = 59;
