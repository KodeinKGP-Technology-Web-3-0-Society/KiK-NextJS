/**
 * KodeinKGP — Root Layout  v3.0
 * ══════════════════════════════════════════════════════════════════
 * Fonts      : Space Grotesk (display) · DM Sans (body) · JetBrains Mono
 * Base color : #040814 (set in globals.css)
 * Client wrappers: AuthProvider, CustomCursor, TerminalEasterEgg
 * ══════════════════════════════════════════════════════════════════
 */

import type { Metadata } from "next";
import {
  Space_Grotesk,
  DM_Sans,
  JetBrains_Mono,
  // Legacy fonts kept for existing pages
  Kanit,
  Poppins,
} from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import TerminalEasterEgg from "@/components/ui/TerminalEasterEgg";
import { AuthProvider } from "@/contexts/authContext";

/* ── Display font: Space Grotesk ─────────────────────────────────── */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--nf-grotesk",
  display: "swap",
  preload: true,
});

/* ── Body font: DM Sans ──────────────────────────────────────────── */
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--nf-dm",
  display: "swap",
  preload: true,
});

/* ── Monospace: JetBrains Mono ───────────────────────────────────── */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--nf-mono",
  display: "swap",
  preload: false, // deferred — only needed for terminal
});

/* ── Legacy fonts (backward compat for existing pages) ───────────── */
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--nf-kanit",
  display: "swap",
  preload: false,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--nf-poppins",
  display: "swap",
  preload: false,
});

/* ── Metadata ────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "KodeinKGP — Web 3.0 & Technology Society, IIT Kharagpur",
    template: "%s | KodeinKGP",
  },
  description:
    "KodeinKGP is the Web3.0, Blockchain & AI society at IIT Kharagpur. " +
    "We host hackathons, workshops, and build real-world projects in " +
    "Blockchain, Artificial Intelligence, and emerging Web technologies.",
  keywords: [
    "KodeinKGP",
    "Web3",
    "Blockchain",
    "AI",
    "IIT Kharagpur",
    "technology society",
    "DeFi",
    "Metaverse",
    "smart contracts",
  ],
  authors: [{ name: "KodeinKGP" }],
  creator: "KodeinKGP",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "KodeinKGP",
    title: "KodeinKGP — Web 3.0 & Technology Society",
    description: "Building the decentralised future at IIT Kharagpur.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kodeinkgp",
  },
  themeColor: "#040814",
};

/* ── Root layout ─────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVars = [
    spaceGrotesk.variable,
    dmSans.variable,
    jetbrainsMono.variable,
    kanit.variable,
    poppins.variable,
  ].join(" ");

  return (
    <html lang="en" className={fontVars}>
      <head>
        {/* Font Awesome — social icons in Footer */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>

      <body className="antialiased">
        <AuthProvider>
          {/* Custom glowing cursor — hidden on touch devices automatically */}
          <CustomCursor />

          {/* Terminal Easter Egg — global ` key listener + slide-up terminal */}
          <TerminalEasterEgg />

          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
