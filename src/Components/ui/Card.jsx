/**
 * Card — Glass surface card with optional glow border.
 * This replaces the scattered `rounded-[20px] border-2 border-[#87CEEB]/60
 * bg-gradient-to-br from-[#0a0a2e]/90...` patterns.
 *
 * @example
 *   <Card>content</Card>
 *   <Card glow hover className="p-8">content</Card>
 *   <Card variant="brand">highlighted content</Card>
 */

export default function Card({
  variant = "default",  // "default" | "brand" | "flat"
  glow = false,
  hover = false,
  className = "",
  children,
  ...props
}) {
  const base = "rounded-card relative overflow-hidden";

  const variants = {
    default: "glass border border-[var(--color-border-subtle)]",
    brand:   "glass-brand border border-[var(--color-border-accent)]",
    flat:    "bg-navy-800 border border-[var(--color-border-subtle)]",
  };

  const glowClass  = glow  ? "glow-border" : "";
  const hoverClass = hover
    ? "transition-all duration-400 ease-smooth-out hover:-translate-y-1 hover:shadow-card-hover"
    : "";

  return (
    <div
      className={[base, variants[variant], glowClass, hoverClass, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
