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
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="breadcrumb mb-8">
          <Link href="/">home</Link>
          <span>/</span>
          <span>list</span>
        </div>

        <section className="border-b border-white/20 pb-8 mb-8">
          <h1 className="text-4xl text-yellow-400 mb-4 underline decoration-[#db0042] decoration-4 underline-offset-4">~ weekly list</h1>
          <p className="text-gray-400">my weekly lists</p>
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