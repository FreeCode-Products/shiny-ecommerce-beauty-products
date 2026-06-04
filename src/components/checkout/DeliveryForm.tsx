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

/** Returns an error message if the delivery details are incomplete/invalid. */
export function deliveryError(d: Delivery): string | null {
  if (!d.name.trim()) return "Please enter the full name.";
  if (!/^[0-9]{10}$/.test(d.phone.trim())) return "Enter a valid 10-digit mobile number.";
  if (!d.line1.trim()) return "Please enter the address.";
  if (!d.city.trim()) return "Please enter the city.";
  if (!d.state.trim()) return "Please enter the state.";
  if (!/^[0-9]{6}$/.test(d.pincode.trim())) return "Enter a valid 6-digit pincode.";
  return null;
}

export function DeliveryForm({
  value,
  onChange,
}: {
  value: Delivery;
  onChange: (d: Delivery) => void;
}) {
  const set = (field: keyof Delivery, v: string) => onChange({ ...value, [field]: v });

  return (
    <div className="rounded-3xl border border-ink/10 bg-foam p-6">
      <h2 className="flex items-center gap-2 font-display text-xl text-ink">
        <MapPin className="size-5 text-clay" /> Delivery details
      </h2>
      <p className="mt-1 text-sm text-ink-soft">Where should we send your soap?</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          className="sm:col-span-1"
          label="Full name"
          value={value.name}
          onChange={(v) => set("name", v)}
          placeholder="Your name"
          autoComplete="name"
        />
        <Field
          label="Mobile number"
          value={value.phone}
          onChange={(v) => set("phone", v.replace(/[^0-9]/g, "").slice(0, 10))}
          placeholder="10-digit number"
          inputMode="numeric"
          autoComplete="tel"
        />
        <Field
          className="sm:col-span-2"
          label="Address"
          value={value.line1}
          onChange={(v) => set("line1", v)}
          placeholder="House / flat, street, area"
          autoComplete="street-address"
        />
        <Field
          label="City"
          value={value.city}
          onChange={(v) => set("city", v)}
          placeholder="City"
          autoComplete="address-level2"
        />
        <Field
          label="State"
          value={value.state}
          onChange={(v) => set("state", v)}
          placeholder="State"
          autoComplete="address-level1"
        />
        <Field
          label="Pincode"
          value={value.pincode}
          onChange={(v) => set("pincode", v.replace(/[^0-9]/g, "").slice(0, 6))}
          placeholder="6-digit pincode"
          inputMode="numeric"
          autoComplete="postal-code"
        />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  inputMode,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="h-12 rounded-xl border border-ink/15 bg-cream px-4 text-ink placeholder:text-ink-soft/60 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
      />
    </label>
  );
}
