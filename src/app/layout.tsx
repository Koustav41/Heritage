import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parampara (পরম্পরা) — West Bengal Heritage & Cultural Tourism Ecosystem",
  description: "Discover West Bengal's 55+ canonical heritage sites, living traditions, verified guides, artisan craft workshops, authentic sweets, and community green initiatives.",
  keywords: ["West Bengal Heritage", "Bengal Culture", "Parampara", "SIH 26197", "Bishnupur", "Santiniketan", "Durga Puja", "Darjeeling", "Dokra", "Baluchari"],
  authors: [{ name: "Parampara Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
