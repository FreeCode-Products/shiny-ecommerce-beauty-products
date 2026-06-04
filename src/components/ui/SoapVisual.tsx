import { cn } from "@/lib/utils";

interface SoapVisualProps {
  accent: string;
  accent2: string;
  /** Monogram / initial embossed on the bar */
  label?: string;
  className?: string;
  /** Rounded "bar" or "round" puck */
  shape?: "bar" | "round";
}

/**
 * A purely-CSS tactile soap visual — layered gradients, gloss highlight and an
 * embossed monogram. Keeps the project asset-free and fully open-source.
 */
export function SoapVisual({
  accent,
  accent2,
  label = "S",
  className,
  shape = "bar",
}: SoapVisualProps) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden",
        shape === "bar" ? "rounded-[28%]" : "rounded-full",
        className
      )}
      style={{
        background: `radial-gradient(120% 120% at 30% 22%, ${accent} 0%, ${accent2} 78%)`,
        boxShadow: `inset 0 6px 18px rgba(255,255,255,0.35), inset 0 -16px 30px rgba(0,0,0,0.28), 0 22px 45px -18px ${accent2}`,
      }}
    >
      {/* glossy sweep */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 38%)",
          mixBlendMode: "soft-light",
        }}
      />
      {/* soft top highlight */}
      <div
        className="absolute left-1/2 top-[14%] h-[26%] w-[55%] -translate-x-1/2 rounded-full blur-md"
        style={{ background: "rgba(255,255,255,0.4)" }}
      />
      {/* embossed monogram */}
      <span
        className="absolute inset-0 flex items-center justify-center font-display text-[34%] font-semibold tracking-tight"
        style={{
          color: "rgba(255,255,255,0.16)",
          textShadow: "0 1px 1px rgba(0,0,0,0.25), 0 -1px 1px rgba(255,255,255,0.25)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
