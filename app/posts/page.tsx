import Link from "next/link";
import { client } from "../lib/sanity";
import { simpleBlogCard } from "../lib/interface";

async function getData() {
  const query = `
  *[_type == "blog"] | order(_createdAt desc) {
    title,
    "currentSlug": slug.current,
    _createdAt
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Posts() {
  const data: simpleBlogCard[] = await getData();

  const postsByYear = data.reduce(
    (acc, post) => {
      const year = new Date(post._createdAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, simpleBlogCard[]>
  );

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="breadcrumb mb-12">
          <Link href="/">home</Link>
          <span>/</span>
          <span>posts</span>
        </div>

        <main className="space-y-16">
          {years.map((year) => (
            <section key={year} className="border-t border-white/20 pt-8 first:border-t-0">
              <h2 className="text-3xl text-white mb-12"># {year}</h2>
              <div className="space-y-6">
                {postsByYear[year].map((post, idx) => (
                  <Link
                    key={idx}
                    href={`/posts/${post.currentSlug}`}
                    className="block group"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-4">
                        <span className="text-white/60 text-xl font-mono">{new Date(post._createdAt).toISOString().split('T')[0].replace(/-/g, '')}</span>
                        <span className="text-white/20">—</span>
                        <span className="text-xl text-white group-hover:text-white/80">
                          {post.title}
                        </span>
                      </div>
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
