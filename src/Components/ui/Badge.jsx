/**
 * Badge — Team / category / status pill.
 * Replaces the scattered inline-styled team pills and category chips.
 *
 * @example
 *   <Badge>Blockchain</Badge>
 *   <Badge color="#a78bfa" glow>AI & Metaverse</Badge>
 *   <Badge variant="solid">New</Badge>
 */

export default function Badge({
  variant = "outline",  // "outline" | "solid" | "ghost"
  color,                // optional override color (hex)
  glow = false,
  className = "",
  children,
  ...props
}) {
  // If a custom color is provided, use inline style; otherwise fall back to tokens
  const style = color
    ? {
        borderColor: `${color}55`,
        color: color,
        backgroundColor: `${color}14`,
        ...(glow && { boxShadow: `0 0 10px ${color}40` }),
      }
    : {};

  const variantClass = {
    outline:
      "border border-[var(--color-border-accent)] text-brand bg-brand/[0.08]",
    solid:
      "border border-brand bg-brand text-navy-950 font-semibold",
    ghost:
      "border-transparent text-stone-400 bg-white/[0.05]",
  }[variant];

  return (
    <span
      className={`badge ${variantClass} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
}
