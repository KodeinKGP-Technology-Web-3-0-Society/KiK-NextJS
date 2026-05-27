import { Kanit, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/authContext";

/* ── Font loading (next/font — no external @import needed) ─────── */
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--nf-kanit",        // maps into --font-kanit via @theme
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--nf-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--nf-mono",
  display: "swap",
});

export const metadata = {
  title: "KodeinKGP — Web 3.0 & Technology Society, IIT Kharagpur",
  description:
    "KodeinKGP is the Web3.0, Blockchain & AI society at IIT Kharagpur. " +
    "We host hackathons, workshops, and build real-world blockchain projects.",
  keywords: ["KodeinKGP", "Web3", "Blockchain", "AI", "IIT Kharagpur", "technology society"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${kanit.variable} ${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Font Awesome for social icons in Footer */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
