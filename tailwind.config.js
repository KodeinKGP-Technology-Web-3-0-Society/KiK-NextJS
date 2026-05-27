/** @type {import('tailwindcss').Config} */
// Tailwind v4 note: @theme in globals.css creates CSS variables.
// BUT utility classes (rounded-*, shadow-*, text-*, font-*) MUST be
// defined here in tailwind.config.js — v4's @theme auto-generation
// is not reliable for all token types. This file is the single source
// of truth for Tailwind utility generation.

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // ── Colors ─────────────────────────────────────────────────
      colors: {
        cyan: {
          200: "#B5F6FD",
          300: "#5BE6FF",
          400: "#11E3FB",
          500: "#33BBCF",
          600: "#218ACB",
          700: "#0A6FA0",
        },
        navy: {
          700:  "#12123D",
          800:  "#0A0A2E",
          900:  "#050520",
          950:  "#01011B",
        },
        brand:   "#11E3FB",
        surface: "#0A0A2E",
        base:    "#01011B",
        stone: {
          400: "#979898",
          600: "#3F3E45",
        },
      },

      // ── Typography ──────────────────────────────────────────────
      fontFamily: {
        kanit:  ["var(--font-kanit)",  "sans-serif"],
        poppins:["var(--font-poppins)","sans-serif"],
        mono:   ["var(--font-mono)",   "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem,6vw,5rem)",       { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl":  ["clamp(2.25rem,4vw,3.75rem)", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-lg":  ["clamp(1.75rem,3vw,3rem)",    { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-md":  ["clamp(1.25rem,2vw,2rem)",    { lineHeight: "1.2"  }],
        "body-lg":     ["1.125rem", { lineHeight: "1.75" }],
        "body-md":     ["1rem",     { lineHeight: "1.7"  }],
        "body-sm":     ["0.875rem", { lineHeight: "1.6"  }],
        "label":       ["0.75rem",  { lineHeight: "1.5", letterSpacing: "0.08em" }],
      },

      // ── Border radius ───────────────────────────────────────────
      borderRadius: {
        "card":    "1.25rem",
        "card-lg": "1.875rem",
        "pill":    "99px",
      },

      // ── Box shadows ─────────────────────────────────────────────
      boxShadow: {
        "glow-sm":    "0 0 15px rgba(17,227,251,0.20)",
        "glow-md":    "0 0 30px rgba(17,227,251,0.25), 0 0 60px rgba(17,227,251,0.10)",
        "glow-lg":    "0 0 50px rgba(17,227,251,0.30), 0 0 100px rgba(17,227,251,0.12)",
        "card":       "0 4px 24px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.50), 0 0 30px rgba(17,227,251,0.15)",
      },

      // ── Backdrop blur ───────────────────────────────────────────
      backdropBlur: {
        nav:   "20px",
        glass: "12px",
      },

      // ── Spacing (semantic aliases) ──────────────────────────────
      spacing: {
        "nav-h":       "5rem",
        "section-sm":  "4rem",
        "section-md":  "6rem",
        "section-lg":  "8rem",
        "section-xl":  "12rem",
      },

      // ── Height shorthands ───────────────────────────────────────
      height:    { "nav-h": "5rem" },
      minHeight: { "nav-h": "5rem" },

      // ── Background images ───────────────────────────────────────
      backgroundImage: {
        "brand-radial":
          "radial-gradient(64.18% 64.18% at 71.16% 35.69%,#B5F6FD 0.89%,#9DEDF0 17.23%,#7DE7EB 42.04%,#5CE1E6 55.12%,#33BBCF 71.54%,#11E3FB 100%)",
        "brand-sweep":
          "linear-gradient(135deg,#11E3FB 0%,#5BE6FF 40%,#B5F6FD 70%,#11E3FB 100%)",
        "glass":
          "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)",
      },

      // ── Transitions ─────────────────────────────────────────────
      transitionTimingFunction: {
        "spring":     "cubic-bezier(0.34,1.56,0.64,1)",
        "smooth-out": "cubic-bezier(0.16,1,0.3,1)",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },

      // ── Screens ─────────────────────────────────────────────────
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
