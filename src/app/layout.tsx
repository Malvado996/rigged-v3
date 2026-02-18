// src/app/layout.tsx
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rigged",
  description: "Modern overland community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${manrope.variable} font-sans bg-background text-foreground min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}