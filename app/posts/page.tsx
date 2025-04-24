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
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="breadcrumb mb-8">
          <Link href="/">home</Link>
          <span>/</span>
          <span>posts</span>
        </div>

        <main className="space-y-12">
          {years.map((year) => (
            <section key={year} className="border-t border-[#111]/10 pt-4 first:border-t-0">
              <h2 className="text-3xl text-[#e5383b] mb-6 font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">~ {year}</h2>
              <div className="space-y-4">
                {postsByYear[year].map((post, idx) => (
                  <Link
                    key={idx}
                    href={`/posts/${post.currentSlug}`}
                    className="block group"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[#111]/60 text-base font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
                        {new Date(post._createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} —
                      </span>
                      <span className="text-xl text-[#111] group-hover:text-[#111]/80 font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
                        {post.title}
                      </span>
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
