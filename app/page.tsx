import type { simpleBlogCard } from "./lib/interface"
import { client } from "./lib/sanity"
import Link from "next/link"
import Navbar from "./components/Navbar"

export const revalidate = 30

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    _createdAt
  }`
  const data = await client.fetch(query)
  return data
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData()

  // Group posts by year
  const postsByYear = data.reduce(
    (acc, post) => {
      const year = new Date(post._createdAt).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    },
    {} as Record<number, simpleBlogCard[]>,
  )

  // Sort years in descending order
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <header className="py-16 px-6 font-mono">
        <nav className="text-center">
          <span className="text-3xl tracking-tight text-gray-200 hover:text-white transition-all duration-500 font-light border-b border-gray-800 pb-2 hover:border-gray-500">
            words from me to me
          </span>
        </nav>
      </header>

      <main className="px-6 pb-20 font-mono max-w-2xl mx-auto">
        {years.map((year) => (
          <section key={year} className="mb-16">
            <h2 className="text-sm mb-8">{year}</h2>
            <div className="space-y-0">
              {postsByYear[year].map((post, idx) => {
                const date = new Date(post._createdAt)
                const formattedDate = date.toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                })

                return (
                  <article key={idx} className="group border-b border-white/10">
                    <Link 
                      href={`/blog/${post.currentSlug}`} 
                      className="flex justify-between items-baseline p-3 -mx-2 rounded-lg transition-colors duration-200 hover:bg-white/5"
                    >
                      <div className="flex items-baseline space-x-4">
                        <time className="text-base text-gray-500">{formattedDate}</time>
                        <div>
                          <h3 className="text-base group-hover:text-white">{post.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{post.smallDescription}</p>
                        </div>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

