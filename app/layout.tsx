"use client";  // This tells Next.js that this component is a client component

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react"; // Import the Analytics component
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";  // ShadCN Card components
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
    // Trigger the popup on page load
    setShowPopup(true);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {/* Popup Warning */}
        {showPopup && (
          <div
            style={{
              position: "fixed",
              top: "-50px",  // Moved the card 50px up
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",  // Darker background
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            {/* ShadCN Card as Warning with Border */}
            <Card style={{
              width: "600px",
              backgroundColor: "black",
              color: "white",
              border: "2px solid white" // Rounded corners for the border
            }}>
              <CardHeader>
                <CardTitle style={{ fontSize: "30px", fontWeight: "bold" }}>--  Warning!!</CardTitle>
              </CardHeader>
              <div style={{ padding: "10px 20px 15px 20px", fontSize: "16px" }}>
                <p>The developer is allergic to designing, continue only if you are fine with it.</p>
              </div>
              <CardFooter>
                <button
                  onClick={handleClose}
                  style={{
                    width: "100%",
                    padding: "8px 15px",  // Decreased button padding
                    backgroundColor: "white",  // White button background
                    color: "black",  // Black text for contrast
                    border: "2px solid white",  // White border for button
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",  // Decreased font size for button text
                    transition: "background-color 0.3s ease, border 0.3s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f1f1f1"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
                >
                  Accept
                </button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Add the Analytics component just before closing body tag */}
        <Analytics />
      </body>
    </html>
  );
}
