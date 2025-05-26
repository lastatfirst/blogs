import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '[weeye]',
  description: 'anecdote',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentYear = new Date().getFullYear();
  
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased flex flex-col min-h-screen text-[#7b97aa]">
        <main className="flex-grow">
          {children}
        </main>
        <footer className="w-full border-t border-white/10">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <p className="text-[#7b97aa] text-sm">&copy; {currentYear} [weeye]. all rights reserved.</p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}