import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),
  ),
  title: "Muhammad Rizal Haris — Developer & Research Engineer",
  description:
    "Website pribadi Muhammad Rizal Haris — Full-Stack Developer & Machine Learning / Research Engineer. Membangun produk digital dan solusi riset.",
  authors: [{ name: "Muhammad Rizal Haris" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    title: "Muhammad Rizal Haris — Developer & Research Engineer",
    description:
      "Full-Stack Developer & Machine Learning / Research Engineer. Membangun produk digital dan solusi riset.",
  },
};

export const viewport: Viewport = {
  themeColor: "#e5a93c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable}`}>{children}</body>
    </html>
  );
}
