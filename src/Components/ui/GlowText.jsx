/**
 * GlowText — Gradient heading text.
 * Replaces the scattered `bg-gradient-to-br from-[#11E3FB]...bg-clip-text text-transparent`
 * pattern used on every single page.
 *
 * @example
 *   <GlowText as="h1" size="display-2xl">KodeinKGP</GlowText>
 *   <GlowText as="h2" variant="sweep">Our Expertise</GlowText>
 */

const TAG_MAP = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  span: "span",
  p: "p",
};

const FONT_SIZE_MAP = {
  "display-2xl": "text-display-2xl",
  "display-xl":  "text-display-xl",
  "display-lg":  "text-display-lg",
  "display-md":  "text-display-md",
  "body-lg":     "text-body-lg",
};

export default function GlowText({
  as = "h2",
  size = "display-lg",
  variant = "radial",   // "radial" | "sweep"
  className = "",
  children,
  ...props
}) {
  const Tag = TAG_MAP[as] ?? "h2";
  const sizeClass = FONT_SIZE_MAP[size] ?? "";
  const gradientClass =
    variant === "sweep" ? "text-gradient-sweep" : "text-gradient";

  return (
    <Tag
      className={`font-kanit font-bold ${sizeClass} ${gradientClass} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
