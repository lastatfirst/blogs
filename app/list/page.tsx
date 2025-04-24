import { client } from "@/app/lib/sanity"
import WeeklyList from "@/app/components/WeeklyList"
import Link from "next/link"

async function getReadingLists() {
  const query = `*[_type == "readingList"] | order(weekStart desc) {
    weekStart,
    weekEnd,
    items[] {
      title,
      url,
      completed
    }
  }`
  return client.fetch(query)
}

export default async function ListPage() {
  const readingLists = await getReadingLists()
  
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="breadcrumb mb-8">
          <Link href="/">home</Link>
          <span>/</span>
          <span>list</span>
        </div>

        <section className="border-b border-[#111]/10 pb-8 mb-8">
          <h1 className="text-4xl text-[#e5383b] mb-4">~ weekly list</h1>
          <p className="text-[#111]/70">interesting blogs/articles/papers/books dump</p>
        </section>

        <section>
          {readingLists.map((list, idx) => (
            <WeeklyList
              key={idx}
              weekStart={list.weekStart}
              weekEnd={list.weekEnd}
              items={list.items}
            />
          ))}
        </section>
      </div>
    </div>
  )
}