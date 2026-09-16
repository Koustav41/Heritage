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
  title: "Parampara (परंपरा • পরম্পরা) — India Heritage & Cultural Tourism Ecosystem",
  description: "Discover India's canonical UNESCO World Heritage sites, living traditions, state-wise verified guides, artisan craft workshops, authentic regional cuisines, and community cultural preservation.",
  keywords: ["India Heritage", "Indian Culture", "UNESCO World Heritage India", "Parampara", "Taj Mahal", "Hampi", "Amer Fort", "Konark", "Bishnupur", "Ajanta Ellora", "State Wise Guides", "Indian Cuisine", "Living Traditions"],
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('parampara_theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
