"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Provider } from "@lyket/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('warningAccepted');
    if (!hasAccepted) {
      setShowPopup(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('warningAccepted', 'true');
    setShowPopup(false);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>Vihan&apos;s vt.</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider apiKey="pt_ac9956a36f2b598b4543a2b53dfb6f">
            {children}
          </Provider>
        </ThemeProvider>

        {showPopup && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            style={{ animation: "fadeIn 0.3s ease-in-out" }}
          >
            <Card className="w-[90%] max-w-[450px] bg-black/90 border border-white/10 shadow-2xl backdrop-blur-sm"
                  style={{ animation: "slideIn 0.3s ease-out" }}>
              <CardHeader>
                <CardTitle className="text-xl font-light tracking-wide text-white/80">
                  -Warning
                </CardTitle>
              </CardHeader>
              <div className="px-6 py-3 text-sm text-gray-400 leading-relaxed">
                <p>
                  The developer is allergic to graphic designing, continue only if you
                  are fine with this. Anything nearly visually appealing is purely
                  coincidental.
                </p>
              </div>
              <CardFooter className="pb-4">
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 px-4 bg-red-950/30 hover:bg-red-900/40 text-sm text-red-200/80 border border-red-900/30 rounded-md transition-all duration-300 hover:border-red-800/50"
                >
                  understood
                </button>
              </CardFooter>
            </Card>
          </div>
        )}

        <Analytics />
      </body>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </html>
  );
}
