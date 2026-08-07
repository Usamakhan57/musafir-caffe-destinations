import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { Footer, Navbar } from "@/shared/components";
import { Providers } from "@/providers";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MusafirCaffe — Where Travelers Meet Over Coffee",
    template: "%s | MusafirCaffe",
  },
  description:
    "MusafirCaffe is the gathering place for curious travelers. Discover legendary cafés, hidden coffee towns, and road-tested travel guides — all brewed by a global community of wanderers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#FAFAF9] font-sans text-[#111827]">
        <Providers>
          <Navbar />
          <div id="main-content" className="flex flex-1 flex-col">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
