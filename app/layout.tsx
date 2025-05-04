import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from "next/link";
import { Twitter, Mail } from 'lucide-react';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'blog',
  description: 'working on machine learning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentYear = new Date().getFullYear();
  
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif] antialiased flex flex-col min-h-screen">
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffe3]/80 backdrop-blur-sm border-b border-[#111]/10">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <nav className="flex justify-between items-center">
              <Link href="/" className="text-[#e5383b] text-3xl">vt.</Link>
              <div className="flex gap-8 text-[#e5383b]">
                <Link href="/posts" className="hover:underline text-[1.5rem]">posts</Link>
                <Link href="/projects" className="hover:underline text-[1.5rem]">projects</Link>
                <Link href="/list" className="hover:underline text-[1.5rem]">list</Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="pt-16 flex-grow">
          {children}
        </main>
        <footer className="py-6 border-t border-[#111]/10 mt-12">
          <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[#111]/60 text-sm">
              © {currentYear} weeye
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://twitter.com/wyetwt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#111]/60 hover:text-[#e5383b] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="mailto:theweeye@proton.me" 
                className="text-[#111]/60 hover:text-[#e5383b] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}