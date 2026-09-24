import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "DYC PAPER",
    template: "%s | DYC PAPER",
  },
  description:
    "DYC PAPER is a minimalist art community for unfinished works that invite viewers to draw, complete, and share.",
  openGraph: {
    title: "DYC PAPER",
    description:
      "DYC PAPER is a minimalist art community for unfinished works that invite viewers to draw, complete, and share.",
    type: "website",
    siteName: "DYC PAPER",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ja: "/ja",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
