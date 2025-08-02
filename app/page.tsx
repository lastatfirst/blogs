import { client } from "./lib/sanity";
import Link from "next/link";
import { simpleBlogCard } from "./lib/interface";
import HeadingWithUnderline from "./components/HeadingWithUnderline";

async function getLatestPosts(): Promise<simpleBlogCard[]> {
  const query = `
  *[_type == "blog"] | order(_createdAt desc)[0...3] {
    title,
    "currentSlug": slug.current,
    _createdAt
  }`;
  return await client.fetch(query);
}

export default async function Home() {
  const posts = await getLatestPosts();
  const projects = [
    {
      title: "QuSCII",
      description: "A quantum image to ascii generator",
      link: "https://weeye.vercel.app/posts/quscii",

      /* Remove all other color rules except #7b97aa and white on hover */
    },
    {
      title: "NervParse",
      description: "A neural based dependency parser ",
      link: "https://github.com/vihanvt/nervparse",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-6">
        <section className="border-b border-white/10 pb-4 mb-4">
          {" "}
          <HeadingWithUnderline
            level={1}
            className="text-3xl mb-3 font-extrabold"
            style={{ color: "#7b97aa" }}
          >
            [weeye]
          </HeadingWithUnderline>{" "}
          <p className="text-base mb-3" style={{ color: "#FFFAFA" }}>
            hello, i'm currently a cs undergradute student, my primary interests
            lie in quantum computing and neural networks , researching on stuff
            sometimes.
          </p>
          <p className="text-base mb-3" style={{ color: "#FFFAFA" }}>
            feel free to have a talk anytime on{" "}
            <a
              href="https://x.com/wyetwt"
              className="text-[#7b97aa] hover:text-white transition-colors"
            >
              twitter
            </a>{" "}
            or theweeye at proton dot me
          </p>
          <div className="flex gap-4 text-xl flex-wrap">
            <Link
              href="/projects"
              className="hover:text-white text-[#7b97aa] transition-colors whitespace-nowrap"
            >
              projects
            </Link>
            <Link
              href="/posts"
              className="hover:text-white text-[#7b97aa] transition-colors whitespace-nowrap"
            >
              posts
            </Link>
            <Link
              href="https://wyeyap.vercel.app"
              className="hover:text-white text-[#7b97aa] transition-colors whitespace-nowrap"
            >
              thoughts
            </Link>
            <Link
              href="/list"
              className="hover:text-white text-[#7b97aa] transition-colors whitespace-nowrap"
            >
              list
            </Link>
          </div>
        </section>
        <section className="border-b border-white/10 pb-3 mb-3">
          {" "}
          <HeadingWithUnderline
            level={2}
            className="text-xl mb-3"
            style={{ color: "#7b97aa" }}
          >
            ~ recent projects
          </HeadingWithUnderline>
          <div className="space-y-3 pl-8 border-l border-white/10">
            {projects.map((project, idx) => (
              <div key={idx} className="block group">
                <div className="flex flex-col gap-1">
                  {" "}
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-4">
                      <span className="text-base text-[#7b97aa] group-hover:text-[#7b97aa]">
                        {project.title}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm" style={{ color: "#FFFAFA" }}>
                    {project.description}
                  </div>
                  <div className="ml-16 mt-1">
                    <Link
                      href={project.link}
                      className="text-sm transition-colors duration-200 text-[#7b97aa] hover:text-[#7b97aa]"
                    >
                      view project
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="border-b border-white/10 pb-3 mb-3">
          {" "}
          <HeadingWithUnderline
            level={2}
            className="text-xl mb-3"
            style={{ color: "#7b97aa" }}
          >
            ~ recent posts
          </HeadingWithUnderline>
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                href={`/posts/${post.currentSlug}`}
                key={post.currentSlug}
                className="block group"
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="group-hover:text-[#7b97aa] text-sm"
                    style={{ color: "#FFFAFA" }}
                  >
                    {post.title}
                  </span>
                  <span className="text-xs" style={{ color: "#FFFAFA" }}>
                    {new Date(post._createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
