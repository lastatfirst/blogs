import Link from "next/link";
import { client } from "../lib/sanity";
import { simpleBlogCard } from "../lib/interface";
import Breadcrumb from "@/app/components/Breadcrumb";
import HeadingWithUnderline from "../components/HeadingWithUnderline";

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

export default async function Blogs() {
  const data: simpleBlogCard[] = await getData();
  const blogsByYear = data.reduce(
    (acc, blog) => {
      const year = new Date(blog._createdAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(blog);
      return acc;
    },
    {} as Record<number, simpleBlogCard[]>
  );

  const years = Object.keys(blogsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-6">
        <Breadcrumb
          items={[{ label: "home", href: "/" }, { label: "blogs" }]}
        />

        <section className="border-b border-white/10 pb-8 mb-8">
          <HeadingWithUnderline level={1} className="text-4xl mb-4">
            ~ blogs
          </HeadingWithUnderline>
          <p className="text-white">All blogs in chronological order.</p>
        </section>

        <section>
          {Object.entries(blogsByYear)
            .reverse()
            .map(([year, blogs]) => (
              <div key={year} className="mb-12">
                <HeadingWithUnderline level={2} className="text-xl mb-6">
                  {year}
                </HeadingWithUnderline>
                <div className="space-y-4 pl-8 border-l border-white/10">
                  {blogs.map((blog) => (
                    <Link
                      href={`/blogs/${blog.currentSlug}`}
                      key={blog.currentSlug}
                      className="block group"
                    >
                      <div className="flex items-baseline justify-between text-white/90">
                        <span className="text-lg text-[#79b8ff] group-hover:text-[#79b8ff]">
                          {blog.title}
                        </span>
                        <span className="text-sm text-white/60">
                          {new Date(blog._createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
}
