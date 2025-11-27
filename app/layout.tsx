import type { Metadata } from "next";
import { Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/Footer";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500"],
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WildPaste",
  description: "Paste and share your text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${geistMono.variable} antialiased bg-stone-50 dark:bg-stone-800 text-stone-750 flex flex-col min-h-screen`}
      >
        <div className="px-4 flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
