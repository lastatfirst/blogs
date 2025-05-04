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
      description: "A quantum image to ascii generator",
      tags: ["a"],
      link: "https://weeye.vercel.app/posts/quscii"
    },
    {
      title:"NervParse",
      description:"A neural based dependency parser ",
      tags: ["b"],
      link:"https://github.com/vihanvt/nervparse"

    }
   
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section className="border-b border-[#111]/10 pb-8 mb-8">
          <h1 className="text-3xl text-[#111] mb-4 font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
            
          </h1>
          <p className="text-lg text-[#111]/70 mb-4">
            hello, i'm currently a cs undergradute student, my primary interests lie in quantum computing and neural networks
            ,in specific, understanding the operations of quantum circuits on graph neural networks.
          </p>
        </section>
        {/* Projects section now comes first */}
        <section>
          <div className="border-b border-[#111]/10 pb-8 mb-8">
            <h2 className="text-2xl text-[#e5383b] mb-6">~ projects</h2>
            <div className="space-y-4 pl-8 border-l border-[#111]/10">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="block group"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-4">
                        <span className="text-[#111]/60 font-mono text-lg">
                          {project.tags.join(", ")} —
                        </span>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-lg text-[#111] group-hover:text-[#111]/80 hover:text-[#e5383b] transition-colors"
                        >
                          {project.title}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 ml-4">
                        <div className={`w-2.5 h-2.5 rounded-full ${project.link === '#' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                        <span className={`text-sm ${project.link === '#' ? 'text-orange-500' : 'text-green-500'}`}>
                          {project.link === '#' ? 'in progress' : 'completed'}
                        </span>
                      </div>
                    </div>
                    <div className="ml-16 text-[#111]/70 text-base">
                      {project.description}
                    </div>
                  </div>
                </div>
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

        {/* Posts section now comes second */}
        <section>
          <div className="border-b border-[#111]/10 pb-8">
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
            <div className="mt-4">
              <Link 
                href="/posts" 
                className="text-[#e5383b] hover:text-[#c72c2f] transition-colors duration-200"
              >
                view all posts →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}