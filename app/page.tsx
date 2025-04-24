import { client } from "./lib/sanity";
import Link from "next/link";
import { simpleBlogCard } from "./lib/interface";

async function getLatestPosts(): Promise<simpleBlogCard[]> {
  const query = `
  *[_type == "blog"] | order(_createdAt desc)[0...3] {
    title,
    "currentSlug": slug.current,
    _createdAt,
    likes
  }`;
  return await client.fetch(query);
}

export default async function Home() {
  const posts = await getLatestPosts();
  const projects = [
    {
      title: "QuSCII",
      description: "a lightweight HTTP server written from scratch in C, handling GET requests with multi-threading support.",
      tags: ["c"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section className="border-b border-[#111]/10 pb-8 mb-8">
          <h1 className="text-2xl text-[#111] mb-4 font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
            you have reached the home
          </h1>
        </section>

        <section>
          <div className="border-b border-[#111]/10 pb-8 mb-8">
            <h2 className="text-2xl text-[#e5383b] mb-6 font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">~ latest posts</h2>
            <div className="space-y-4 pl-8 border-l border-[#111]/10">
              {posts.map((post, idx) => (
                <Link
                  key={idx}
                  href={`/posts/${post.currentSlug}`}
                  className="block group"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[#111]/60 text-lg">
                      {new Date(post._createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} —
                    </span>
                    <span className="text-lg text-[#111] group-hover:text-[#111]/80">
                      {post.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="border-b border-[#111]/10 pb-8">
            <h2 className="text-2xl text-[#e5383b] mb-6">~ projects</h2>
            <div className="space-y-4 pl-8 border-l border-[#111]/10">
              {projects.map((project, idx) => (
                <Link
                  key={idx}
                  href={project.link}
                  className="block group"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[#111]/60 font-mono text-lg">
                      {project.tags.join(", ")} —
                    </span>
                    <span className="text-lg text-[#111] group-hover:text-[#111]/80">
                      {project.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link 
                href="/projects" 
                className="text-[#e5383b] hover:text-[#c72c2f] transition-colors duration-200"
              >
                view all projects →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}