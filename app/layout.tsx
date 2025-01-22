"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Provider } from "@lyket/react";
import "./globals.css";
import { AlertTriangle } from "lucide-react";

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
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-light tracking-wide text-white/80 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-white/60" />
                  hello there
                </CardTitle>
              </CardHeader>
              <div className="px-6 py-2 text-sm text-gray-400 leading-relaxed">
                <p>
                  fair warning: any aesthetic appeal you find here is purely coincidental
                </p>
              </div>
              <CardFooter className="pb-4">
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 text-sm text-white/80 border border-white/10 rounded-md transition-all duration-300 hover:border-white/20"
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
