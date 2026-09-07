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
  title: "Porjotok (পর্যটক) — West Bengal Heritage & Cultural Tourism Ecosystem",
  description: "Discover West Bengal's 55+ canonical heritage sites, living traditions, verified guides, artisan craft workshops, authentic sweets, and community green initiatives.",
  keywords: ["West Bengal Heritage", "Bengal Culture", "Porjotok", "SIH 26197", "Bishnupur", "Santiniketan", "Durga Puja", "Darjeeling", "Dokra", "Baluchari"],
  authors: [{ name: "Porjotok Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
