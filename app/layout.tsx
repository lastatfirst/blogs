import './globals.css'
import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import Link from "next/link";

const sourceSans = Source_Sans_3({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'blog',
  description: 'working on machine learning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={sourceSans.className}>
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <nav className="flex justify-between items-center">
              <Link href="/" className="text-[#db0042] text-5xl">vt.</Link>
              <div className="flex gap-8 text-[#db0042] text-3xl">
                <Link href="/posts" className="hover:underline">posts</Link>
                <Link href="/projects" className="hover:underline">projects</Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}