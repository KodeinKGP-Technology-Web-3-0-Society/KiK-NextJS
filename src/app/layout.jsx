import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Header/navbar";
import Footer from "@/Components/Footer/footer";
import { AuthProvider } from "@/contexts/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kodeinkgp.in"),
  title: {
    default: "KodeinKGP | Technology Web 3.0 Society, IIT Kharagpur",
    template: "%s | KodeinKGP",
  },
  description:
    "KodeinKGP is the premier open-source and Web3 society at IIT Kharagpur. Home to the PDS Bank, zero-latency WebAssembly C/C++ compiler, DekodeX, and engineering articles.",
  keywords: [
    "KodeinKGP",
    "IIT Kharagpur",
    "PDS Bank",
    "Online C Compiler",
    "CS10001",
    "CS11001",
    "Programming and Data Structures",
    "Web3 Society IIT KGP",
    "Open Source IIT Kharagpur",
  ],
  authors: [{ name: "KodeinKGP" }],
  creator: "KodeinKGP",
  publisher: "KodeinKGP",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KodeinKGP",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kodeinkgp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`} style={{ colorScheme: "dark" }}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Victor+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="min-h-screen bg-[#08090d] text-[#f8fafc] antialiased">
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
