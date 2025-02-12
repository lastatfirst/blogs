"use client";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type React from "react";
import ProgressBar from "./components/ProgressBar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geist.variable} antialiased`}
        style={{
          backgroundColor: "#1e1e1e",
          color: "#d4d4d4",
        }}
      >
        <ProgressBar /> {/* Add the progress bar */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}