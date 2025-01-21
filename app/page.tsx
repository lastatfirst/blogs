import type { simpleBlogCard } from "./lib/interface";
import { client } from "./lib/sanity";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { Button } from "@/components/ui/button";
import Snowfall from './components/Snowfall'; // Import the Snowfall component

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    _createdAt
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <>
      <Navbar />
      <Snowfall /> {/* Add the snowfall effect */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-8 heading">Blog</h1>
        <div className="space-y-8">
          {data.map((post, idx) => {
            const createdDate = new Date(post._createdAt);
            const formattedDate = createdDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <article key={idx} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold group font-sans">
                    <Link
                      href={`/blog/${post.currentSlug}`}
                      className="inline-block transition-transform duration-200 ease-in-out hover:translate-x-1"
                    >
                      {post.title}
                      <span className="inline-block transition-transform duration-200 ease-in-out group-hover:translate-x-1 ml-1">
                        →
                      </span>
                    </Link>
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="ml-4 shrink-0 bg-white text-black border-black hover:bg-gray-100 hover:text-black"
                  >
                    <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-sans">{post.smallDescription}</p>
                <time className="text-sm text-gray-500 font-sans">{formattedDate}</time>
              </article>
            );
          })}
        </div>
      </main>
    </>
  );
}
