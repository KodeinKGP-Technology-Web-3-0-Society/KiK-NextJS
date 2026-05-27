/** @type {import('tailwindcss').Config} */

// ─── KodeinKGP Design System Tokens ───────────────────────────────────────────
// All raw values live HERE. Pages reference token names, never hex codes.
// Changing a token here propagates everywhere automatically.

const colors = {
  // ── Brand Cyan ────────────────────────────────────────────────────────────
  cyan: {
    200: "#B5F6FD", // lightest — highlight text, subtle fills
    300: "#5BE6FF", // light — gradient midpoint
    400: "#11E3FB", // PRIMARY — the KodeinKGP signature cyan
    500: "#33BBCF", // mid — secondary accents, borders
    600: "#218ACB", // deep — card borders, focused states
    700: "#0A6FA0", // dark — rarely used
  },
  // ── Navy (page backgrounds / surfaces) ────────────────────────────────────
  navy: {
    950: "#01011B", // BASE — page background (was bg-[#01011b])
    900: "#050520", // surface — elevated cards
    800: "#0A0A2E", // card bg — glass panels
    700: "#12123D", // hover states on dark surfaces
  },
  // ── Neutrals ──────────────────────────────────────────────────────────────
  stone: {
    400: "#979898", // body text / secondary text
    500: "#6B6B6B", // muted labels
    600: "#3F3E45", // dividers / subtle borders (was border-t-[#3f3e45])
  },
  // ── Semantic shortcuts for Tailwind utilities ──────────────────────────────
  brand: "#11E3FB",       // bg-brand, text-brand, border-brand
  surface: "#0A0A2E",     // bg-surface
  base: "#01011B",        // bg-base
};

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // ── Colors ─────────────────────────────────────────────────────────────
      colors: {
        ...colors,
      },

      // ── Typography ─────────────────────────────────────────────────────────
      // Three fonts only. No Arial, Montserrat, Istok Web, Kaisei Opti.
      fontFamily: {
        kanit:  ["var(--font-kanit)", "sans-serif"],      // display headings
        poppins:["var(--font-poppins)", "sans-serif"],    // body / UI
        mono:   ["var(--font-jetbrains)", "monospace"],   // code / labels / tags
      },

      // ── Type Scale ─────────────────────────────────────────────────────────
      // 6 steps. Use these instead of text-[55px] etc.
      fontSize: {
        "display-2xl": ["clamp(3rem,   6vw, 5rem)",    { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl":  ["clamp(2.25rem,4vw, 3.75rem)", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-lg":  ["clamp(1.75rem,3vw, 3rem)",    { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-md":  ["clamp(1.25rem,2vw, 2rem)",    { lineHeight: "1.2"  }],
        "body-lg":     ["1.125rem",                    { lineHeight: "1.75" }],
        "body-md":     ["1rem",                        { lineHeight: "1.7"  }],
        "body-sm":     ["0.875rem",                    { lineHeight: "1.6"  }],
        "label":       ["0.75rem",                     { lineHeight: "1.5", letterSpacing: "0.08em" }],
      },

      // ── Spacing ────────────────────────────────────────────────────────────
      // 8px grid. Named semantic aliases for sections.
      spacing: {
        "section-sm":  "4rem",    // 64px  — tight section padding
        "section-md":  "6rem",    // 96px  — standard section padding
        "section-lg":  "8rem",    // 128px — hero / feature sections
        "section-xl":  "12rem",   // 192px — full-bleed spacers
        "nav-h":       "5rem",    // 80px  — navbar height (for sticky offset)
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },

      // ── Border radius ───────────────────────────────────────────────────────
      borderRadius: {
        "card":   "1.25rem",  // 20px — standard card
        "card-lg":"1.875rem", // 30px — large feature card
        "pill":   "99px",     // pill / tag
      },

      // ── Backgrounds ─────────────────────────────────────────────────────────
      backgroundImage: {
        // The KodeinKGP signature radial gradient (used on H1 text)
        "brand-radial":
          "radial-gradient(64.18% 64.18% at 71.16% 35.69%, #B5F6FD 0.89%, #9DEDF0 17.23%, #7DE7EB 42.04%, #5CE1E6 55.12%, #33BBCF 71.54%, #11E3FB 100%)",

        // Linear sweep (used on section headings, CTA)
        "brand-sweep":
          "linear-gradient(135deg, #11E3FB 0%, #5BE6FF 40%, #B5F6FD 70%, #11E3FB 100%)",

        // Card glass surface
        "glass":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",

        // Subtle page noise — layered over bg-base for texture
        "page-glow":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(17,227,251,0.12) 0%, transparent 70%)",
      },

      // ── Box shadows ─────────────────────────────────────────────────────────
      boxShadow: {
        "glow-sm":  "0 0 15px rgba(17,227,251,0.2)",
        "glow-md":  "0 0 30px rgba(17,227,251,0.25), 0 0 60px rgba(17,227,251,0.1)",
        "glow-lg":  "0 0 50px rgba(17,227,251,0.3), 0 0 100px rgba(17,227,251,0.12)",
        "card":     "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset",
        "card-hover":"0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(17,227,251,0.15)",
      },

      // ── Backdrop blur ───────────────────────────────────────────────────────
      backdropBlur: {
        "glass": "12px",
        "nav":   "20px",
      },

      // ── Animations (Framer Motion handles complex ones; these are CSS-only) ─
      keyframes: {
        // Gentle floating (for ambient orbs / decorative elements)
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-12px)" },
        },
        // Pulsing glow ring
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%":       { opacity: "0.8", transform: "scale(1.05)" },
        },
        // Shimmer scan line (for skeleton / loading states)
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Marquee (for tech stack ticker if added later)
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Subtle scan line (decorative)
        scan: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },

      animation: {
        "float":      "float 5s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "shimmer":    "shimmer 2s linear infinite",
        "marquee":    "marquee 25s linear infinite",
        "scan":       "scan 8s linear infinite",
      },

      // ── Custom screens ──────────────────────────────────────────────────────
      screens: {
        "xs":     "480px",
        "3xl":    "1920px",
        // Max-width variants (used sparingly — prefer min-width mobile-first)
        "max-sm": { max: "639px" },
        "max-md": { max: "767px" },
        "max-lg": { max: "1023px" },
      },

      // ── Transitions ─────────────────────────────────────────────────────────
      transitionTimingFunction: {
        "spring":     "cubic-bezier(0.34, 1.56, 0.64, 1)",   // overshoot/spring
        "smooth-out": "cubic-bezier(0.16, 1, 0.3, 1)",       // expo-out feel
      },
      transitionDuration: {
        250:  "250ms",
        400:  "400ms",
        600:  "600ms",
        800:  "800ms",
        1200: "1200ms",
      },
    },
  },

  plugins: [],
};
