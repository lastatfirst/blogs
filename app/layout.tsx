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
    setShowPopup(true);
  }, []);

  const handleClose = () => {
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
            style={{
              position: "fixed",
              top: "-50px",
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <Card
              style={{
                width: "600px",
                backgroundColor: "black",
                color: "white",
                border: "2px solid white",
              }}
            >
              <CardHeader>
                <CardTitle style={{ fontSize: "30px", fontWeight: "bold" }}>
                  -- Warning!!
                </CardTitle>
              </CardHeader>
              <div style={{ padding: "10px 20px 15px 20px", fontSize: "16px" }}>
                <p>
                  The developer is allergic to graphic designing, continue only if you
                  are fine with this. Anything nearly visually appealing is purely
                  coincidental.
                </p>
              </div>
              <CardFooter>
                <button
                  onClick={handleClose}
                  style={{
                    width: "100%",
                    padding: "8px 15px",
                    backgroundColor: "white",
                    color: "black",
                    border: "2px solid white",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "background-color 0.3s ease, border 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f1f1f1")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "white")
                  }
                >
                  Accept
                </button>
              </CardFooter>
            </Card>
          </div>
        )}

        <Analytics />
      </body>
    </html>
  );
}
