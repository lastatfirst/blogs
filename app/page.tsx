import type { simpleBlogCard } from "./lib/interface";
import { client } from "./lib/sanity";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale'; // Or your preferred locale
//import { formatInTimeZone } from 'date-fns-tz';

export const revalidate = 30;

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    _createdAt
  }
  `;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  // Group posts by year
  const postsByYear = data.reduce(
    (acc, post) => {
      const year = new Date(post._createdAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, simpleBlogCard[]>,
  );

  //sorting the years
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-geist">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6">
        <header className="pt-8 pb-12">
          <h1 className="text-3xl" style={{ color: '#e91e63 ' }}>
            words from me to me
          </h1>
        </header>

        <main>
          {years.map((year) => (
            <section key={year} className="mb-16">
              <h2 className="text-lg">{year}</h2>
              <div className="space-y-6">
                {postsByYear[year].map((post, idx) => {
                  const date = new Date(post._createdAt);
                  // const formattedDate = date.toLocaleDateString("en-US", { // REMOVE THIS LINE
                  //   month: "short",
                  //   day: "numeric",
                  // });

                  const formattedDate = format(date, 'MMM d', { locale: enUS }); // Use date-fns


                  return (
                    <article key={idx} className="group border-b border-gray-700 pb-4">
                      <Link
                        href={`/blog/${post.currentSlug}`}
                        className="block py-2"
                      >
                        <div className="flex items-baseline justify-between">
                          <h3 className="text-md group-hover:text-[#db0042]">
                            {post.title}
                          </h3>
                          <time className="text-sm">
                            {formattedDate}
                          </time>
                        </div>
                        {post.smallDescription && (
                          <p className="text-sm mt-1 ml-4"> {/* Increaesed size */}
                            {post.smallDescription}
                          </p>
                        )}
                      </Link>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}