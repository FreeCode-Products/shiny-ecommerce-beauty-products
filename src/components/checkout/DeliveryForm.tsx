"use client";

import { MapPin } from "lucide-react";

export interface Delivery {
  name: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
}

export const emptyDelivery: Delivery = {
  name: "",
  phone: "",
  line1: "",
  city: "",
  state: "",
  pincode: "",
};

/** Per-field validation errors (empty object = all valid). */
export function fieldErrors(d: Delivery): Partial<Record<keyof Delivery, string>> {
  const e: Partial<Record<keyof Delivery, string>> = {};
  if (!d.name.trim()) e.name = "Please enter the full name.";
  if (!/^[0-9]{10}$/.test(d.phone.trim())) e.phone = "Enter a valid 10-digit mobile number.";
  if (!d.line1.trim()) e.line1 = "Please enter the address.";
  if (!d.city.trim()) e.city = "Please enter the city.";
  if (!d.state.trim()) e.state = "Please enter the state.";
  if (!/^[0-9]{6}$/.test(d.pincode.trim())) e.pincode = "Enter a valid 6-digit pincode.";
  return e;
}

/** First error message, or null if the form is complete. */
export function deliveryError(d: Delivery): string | null {
  const e = fieldErrors(d);
  const first = Object.keys(e)[0] as keyof Delivery | undefined;
  return first ? e[first]! : null;
}

/** The id of the first invalid field's input (for focus/scroll). */
export function firstInvalidFieldId(d: Delivery): string | null {
  const first = Object.keys(fieldErrors(d))[0];
  return first ? `delivery-${first}` : null;
}

export function DeliveryForm({
  value,
  onChange,
  showErrors = false,
}: {
  value: Delivery;
  onChange: (d: Delivery) => void;
  showErrors?: boolean;
}) {
  const set = (field: keyof Delivery, v: string) => onChange({ ...value, [field]: v });
  const errors = showErrors ? fieldErrors(value) : {};

  return (
    <div id="delivery-details" className="scroll-mt-28 rounded-3xl border border-ink/10 bg-foam p-6">
      <h2 className="flex items-center gap-2 font-display text-xl text-ink">
        <MapPin className="size-5 text-clay" /> Delivery details
      </h2>
      <p className="mt-1 text-sm text-ink-soft">Where should we send your soap?</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          field="name"
          label="Full name"
          value={value.name}
          onChange={(v) => set("name", v)}
          placeholder="Your name"
          autoComplete="name"
          error={errors.name}
        />
        <Field
          field="phone"
          label="Mobile number"
          value={value.phone}
          onChange={(v) => set("phone", v.replace(/[^0-9]/g, "").slice(0, 10))}
          placeholder="10-digit number"
          inputMode="numeric"
          autoComplete="tel"
          error={errors.phone}
        />
        <Field
          field="line1"
          className="sm:col-span-2"
          label="Address"
          value={value.line1}
          onChange={(v) => set("line1", v)}
          placeholder="House / flat, street, area"
          autoComplete="street-address"
          error={errors.line1}
        />
        <Field
          field="city"
          label="City"
          value={value.city}
          onChange={(v) => set("city", v)}
          placeholder="City"
          autoComplete="address-level2"
          error={errors.city}
        />
        <Field
          field="state"
          label="State"
          value={value.state}
          onChange={(v) => set("state", v)}
          placeholder="State"
          autoComplete="address-level1"
          error={errors.state}
        />
        <Field
          field="pincode"
          label="Pincode"
          value={value.pincode}
          onChange={(v) => set("pincode", v.replace(/[^0-9]/g, "").slice(0, 6))}
          placeholder="6-digit pincode"
          inputMode="numeric"
          autoComplete="postal-code"
          error={errors.pincode}
        />
      </div>
    </div>
  );
}

function Field({
  field,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  inputMode,
  className,
  error,
}: {
  field: keyof Delivery;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
  className?: string;
  error?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        id={`delivery-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        className={`h-12 rounded-xl border bg-cream px-4 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 ${
          error
            ? "border-clay ring-clay/20 focus:border-clay focus:ring-clay/30"
            : "border-ink/15 focus:border-moss focus:ring-moss/20"
        }`}
      />
      {error && <span className="text-xs text-clay">{error}</span>}
    </label>
  );
}
