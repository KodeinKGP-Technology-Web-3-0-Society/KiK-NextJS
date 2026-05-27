/* ── Global ambient type declarations ───────────────────────────── */

/* Allow CSS file imports (side-effect) in TypeScript files */
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

/* Allow JSON imports */
declare module "*.json" {
  const value: unknown;
  export default value;
}
