import Link from "next/link";
import { client } from "../lib/sanity";
import { simpleBlogCard } from "../lib/interface";

async function getData() {
  const query = `
  *[_type == "thought"] | order(_createdAt desc) {
    title,
    "currentSlug": slug.current,
    _createdAt
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Thoughts() {
  const data: simpleBlogCard[] = await getData();

  const thoughtsByYear = data.reduce(
    (acc, thought) => {
      const year = new Date(thought._createdAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(thought);
      return acc;
    },
    {} as Record<number, simpleBlogCard[]>
  );

  const years = Object.keys(thoughtsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="breadcrumb mb-12">
          <Link href="/">home</Link>
          <span>/</span>
          <span>thoughts</span>
        </div>

        <main className="space-y-16">
          {years.map((year) => (
            <section key={year} className="border-t border-white/20 pt-8 first:border-t-0">
              <h2 className="text-3xl text-white mb-8"># {year}</h2>
              <div className="space-y-6">
                {thoughtsByYear[year].map((thought, idx) => (
                  <Link
                    key={idx}
                    href={`/thoughts/${thought.currentSlug}`}
                    className="block text-white hover:text-white/80"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-white/60 text-lg font-mono">{new Date(thought._createdAt).toISOString().split('T')[0].replace(/-/g, '')}</span>
                      <span className="text-white/20">—</span>
                      <span className="text-xl">{thought.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
