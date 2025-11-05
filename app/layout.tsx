import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClipboardPaste } from "lucide-react";
import Link from "next/link";
import { Header } from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50 dark:bg-stone-800 flex flex-col min-h-screen`}
      >
        <div className="px-4 flex-1">{children}</div>
        <footer>
          <div className="flex flex-col my-12 justify-center items-center text-stone-500">
            <div className="w-xs border-b my-8" />

            <p className="max-w-xl text-center">
              "When you paste and share, you’re not just duplicating
              words—you’re spreading ideas, sparking connections, and planting
              seeds for something greater."
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
