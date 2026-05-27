/**
 * KodeinKGP — Tailwind Design System v3.0
 * =========================================
 * Foundation for the flagship homepage redesign.
 *
 * Color System
 * ─────────────────────────────────────────────
 * Base       : #040814  (deep space midnight)
 * Surface    : #0A0F1C  (elevated background)
 * Card       : #0D1426  (card surface)
 * Cyan-500   : #00E5FF  (cyber-cyan, primary accent)
 * Electric-500: #007BFF (electric blue, secondary)
 *
 * Legacy aliases (navy-*, cyan-300..700) preserved for existing pages.
 *
 * Animation Tokens
 * ─────────────────────────────────────────────
 * scan-line     → boot CRT sweep (single fire)
 * glitch-a/b    → dual-layer text glitch (single fire)
 * terminal-blink → terminal cursor (infinite)
 * float / float-slow → ambient levitation (infinite)
 * glow-pulse    → halo breathing (infinite)
 * shimmer       → skeleton / gradient sweep (infinite)
 * marquee-ltr / marquee-rtl → infinite scroll bands
 * cursor-ring   → click ripple (single fire)
 * fade-up       → entrance helper (single fire)
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      // ── Colour Palette ──────────────────────────────────────────
      colors: {
        // Deep space backgrounds
        space: {
          950: "#020509",
          900: "#040814",   // ← page base
          800: "#060C18",
          700: "#080F1F",
          600: "#0A0F1C",   // ← surface / nav
          500: "#0D1426",   // ← card bg
          400: "#111B35",   // ← elevated card
          300: "#1A2544",
          200: "#243055",
          100: "#2F3D70",
        },

        // Cyber-cyan — primary brand accent
        cyan: {
          50:  "#E0FEFF",
          100: "#B3FCFF",
          200: "#7FF9FF",
          300: "#4DF7FF",
          400: "#1AF4FF",
          500: "#00E5FF",   // ← primary
          600: "#00B2CC",
          700: "#008099",
          800: "#004D66",
          900: "#001A33",
        },

        // Electric blue — secondary accent
        electric: {
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#007BFF",
          600: "#0062CC",
          700: "#004A99",
        },

        // Domain accent colours
        violet: {
          300: "#C4B5FD",
          400: "#A78BFA",   // AI / Metaverse
          500: "#8B5CF6",
          600: "#7C3AED",
        },
        amber: {
          300: "#FDE68A",
          400: "#FCD34D",   // Blockchain
          500: "#F59E0B",
          600: "#D97706",
        },

        // Semantic aliases
        brand:   "#00E5FF",    // cyber-cyan
        base:    "#040814",    // page bg
        surface: "#0A0F1C",   // elevated bg
        card:    "#0D1426",   // card bg

        // ── Legacy aliases (keep existing pages working) ────────
        navy: {
          700: "#111B35",
          800: "#0A0F1C",
          900: "#060C18",
          950: "#040814",  // mapped to new base
        },
        stone: {
          400: "#9CA3AF",
          600: "#4B5563",
        },
      },

      // ── Font Families ─────────────────────────────────────────
      fontFamily: {
        // New design system
        grotesk: ["var(--font-grotesk)", "sans-serif"],     // Space Grotesk — display
        sans:    ["var(--font-dm)",      "sans-serif"],     // DM Sans — body
        // Terminal / code
        mono:    ["var(--font-mono)",    "monospace"],      // JetBrains Mono
        // Legacy (existing components keep working)
        kanit:   ["var(--font-kanit)",   "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },

      // ── Typography Scale ───────────────────────────────────────
      fontSize: {
        "display-3xl": ["clamp(3.8rem, 10vw, 9rem)",   { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-2xl": ["clamp(3rem,   7vw,  6.5rem)", { lineHeight: "1.0",  letterSpacing: "-0.03em" }],
        "display-xl":  ["clamp(2.25rem, 4vw, 4.25rem)",{ lineHeight: "1.06", letterSpacing: "-0.025em" }],
        "display-lg":  ["clamp(1.75rem, 3vw, 3rem)",   { lineHeight: "1.12", letterSpacing: "-0.018em" }],
        "display-md":  ["clamp(1.25rem, 2vw, 2rem)",   { lineHeight: "1.18" }],
        "body-lg":     ["1.125rem", { lineHeight: "1.75" }],
        "body-md":     ["1rem",     { lineHeight: "1.7"  }],
        "body-sm":     ["0.875rem", { lineHeight: "1.6"  }],
        "label":       ["0.75rem",  { lineHeight: "1.5", letterSpacing: "0.08em" }],
        "micro":       ["0.625rem", { lineHeight: "1.4", letterSpacing: "0.16em" }],
      },

      // ── Border Radius ──────────────────────────────────────────
      borderRadius: {
        "card":    "0.875rem",
        "card-lg": "1.25rem",
        "card-xl": "1.875rem",
        "pill":    "99px",
      },

      // ── Box Shadows ────────────────────────────────────────────
      boxShadow: {
        // Cyan glow
        "glow-xs":   "0 0 12px rgba(0,229,255,0.16)",
        "glow-sm":   "0 0 24px rgba(0,229,255,0.22)",
        "glow-md":   "0 0 48px rgba(0,229,255,0.28), 0 0 96px rgba(0,229,255,0.10)",
        "glow-lg":   "0 0 72px rgba(0,229,255,0.35), 0 0 144px rgba(0,229,255,0.13)",
        // Blue glow
        "glow-blue": "0 0 32px rgba(0,123,255,0.32), 0 0 64px rgba(0,123,255,0.12)",
        // Violet glow (AI domain)
        "glow-violet":"0 0 32px rgba(139,92,246,0.32), 0 0 64px rgba(139,92,246,0.10)",
        // Amber glow (Blockchain domain)
        "glow-amber": "0 0 32px rgba(245,158,11,0.30), 0 0 64px rgba(245,158,11,0.10)",
        // Card
        "card":        "0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
        "card-hover":  "0 12px 60px rgba(0,0,0,0.65), 0 0 48px rgba(0,229,255,0.16)",
        // Glass inset highlight
        "glass":       "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.14)",
        // Terminal window
        "terminal":    "0 0 80px rgba(0,229,255,0.20), 0 48px 100px rgba(0,0,0,0.90)",
        // Navbar
        "nav":         "0 1px 0 rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.30)",
      },

      // ── Backdrop Blur ──────────────────────────────────────────
      backdropBlur: {
        nav:      "20px",
        glass:    "14px",
        modal:    "28px",
        terminal: "36px",
      },

      // ── Spacing ────────────────────────────────────────────────
      spacing: {
        "nav-h":      "4.5rem",
        "section-sm": "5rem",
        "section-md": "7rem",
        "section-lg": "10rem",
        "section-xl": "14rem",
      },

      height:    { "nav-h": "4.5rem" },
      minHeight: { "nav-h": "4.5rem" },

      // ── Background Images ──────────────────────────────────────
      backgroundImage: {
        // Brand gradients
        "brand-text":      "linear-gradient(135deg, #00E5FF 0%, #B3FCFF 45%, #007BFF 100%)",
        "brand-sweep":     "linear-gradient(135deg, #00E5FF 0%, #007BFF 55%, #00E5FF 100%)",
        "brand-radial":    "radial-gradient(ellipse at 65% 35%, #B3FCFF 0%, #4DF7FF 30%, #00E5FF 60%, #007BFF 100%)",
        // Glass surfaces
        "glass-surface":   "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)",
        "glass-cyan":      "linear-gradient(135deg, rgba(0,229,255,0.08)  0%, rgba(0,229,255,0.025) 100%)",
        "glass-blue":      "linear-gradient(135deg, rgba(0,123,255,0.08)  0%, rgba(0,123,255,0.025) 100%)",
        "glass-violet":    "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.025) 100%)",
        "glass-amber":     "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.025) 100%)",
        // Grid/texture patterns (use with backgroundSize)
        "dot-grid":        "radial-gradient(rgba(0,229,255,0.12) 1px, transparent 1px)",
        "dot-grid-dim":    "radial-gradient(rgba(0,229,255,0.07) 1px, transparent 1px)",
        "line-grid":       "linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px)",
        // Terminal background
        "terminal-bg":     "linear-gradient(180deg, rgba(4,8,20,0.96) 0%, rgba(6,12,24,0.98) 100%)",
      },

      // ── Easing ────────────────────────────────────────────────
      transitionTimingFunction: {
        "smooth-out": "cubic-bezier(0.16, 1, 0.30, 1)",
        "expo-out":   "cubic-bezier(0.19, 1, 0.22, 1)",
        "spring":     "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "sharp":      "cubic-bezier(0.65, 0, 0.35, 1)",
      },

      transitionDuration: {
        250: "250ms",
        350: "350ms",
        400: "400ms",
        600: "600ms",
        800: "800ms",
        1200: "1200ms",
      },

      // ── Keyframes ─────────────────────────────────────────────
      keyframes: {
        // CRT boot scan — single fire
        "scan-line": {
          "0%":   { top: "-2px", opacity: "0" },
          "8%":   { opacity: "0.85" },
          "92%":  { opacity: "0.50" },
          "100%": { top: "100%", opacity: "0" },
        },
        // Dual-layer text glitch — single fire
        "glitch-a": {
          "0%, 100%": { clipPath: "inset(0 0 97% 0)",  transform: "translateX(-3px)" },
          "33%":      { clipPath: "inset(35% 0 55% 0)", transform: "translateX(3px)" },
          "66%":      { clipPath: "inset(72% 0 12% 0)", transform: "translateX(-2px)" },
        },
        "glitch-b": {
          "0%, 100%": { clipPath: "inset(85% 0 3% 0)",  transform: "translateX(3px)" },
          "33%":      { clipPath: "inset(10% 0 82% 0)", transform: "translateX(-3px)" },
          "66%":      { clipPath: "inset(48% 0 38% 0)", transform: "translateX(2px)" },
        },
        // Terminal cursor blink
        "terminal-blink": {
          "0%, 49%":   { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        // Ambient float
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "40%":      { transform: "translateY(-10px) rotate(0.5deg)" },
          "70%":      { transform: "translateY(-5px) rotate(-0.5deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        // Halo breathing
        "glow-pulse": {
          "0%, 100%": { opacity: "0.30" },
          "50%":      { opacity: "0.85" },
        },
        // Shimmer skeleton / gradient sweep
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
        // Infinite marquee bands
        "marquee-ltr": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.3334%)" },
        },
        "marquee-rtl": {
          "0%":   { transform: "translateX(-33.3334%)" },
          "100%": { transform: "translateX(0)" },
        },
        // Custom cursor click ripple
        "cursor-ring": {
          "0%":   { transform: "translate(-50%,-50%) scale(0.7)", opacity: "0.9" },
          "100%": { transform: "translate(-50%,-50%) scale(1.8)", opacity: "0" },
        },
        // Entrance helper
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Terminal slide-up
        "terminal-slide-up": {
          "0%":   { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        "terminal-slide-down": {
          "0%":   { transform: "translateY(0)",    opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
      },

      // ── Animation Utilities ────────────────────────────────────
      animation: {
        "scan-line":          "scan-line 0.65s ease-out forwards",
        "glitch-a":           "glitch-a 0.32s steps(1) 1",
        "glitch-b":           "glitch-b 0.32s steps(1) 1",
        "terminal-blink":     "terminal-blink 1.1s step-end infinite",
        "float":              "float 6s ease-in-out infinite",
        "float-slow":         "float-slow 9s ease-in-out infinite",
        "glow-pulse":         "glow-pulse 3.5s ease-in-out infinite",
        "shimmer":            "shimmer 2.5s linear infinite",
        "marquee-ltr":        "marquee-ltr 38s linear infinite",
        "marquee-rtl":        "marquee-rtl 30s linear infinite",
        "cursor-ring":        "cursor-ring 0.5s ease-out forwards",
        "fade-up":            "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "terminal-slide-up":  "terminal-slide-up 0.45s cubic-bezier(0.16,1,0.3,1) forwards",
        "terminal-slide-down":"terminal-slide-down 0.35s cubic-bezier(0.65,0,0.35,1) forwards",
      },

      // ── Breakpoints ────────────────────────────────────────────
      screens: {
        xs:    "480px",
        "3xl": "1920px",
      },
    },
  },

  plugins: [],
};

export default config;
