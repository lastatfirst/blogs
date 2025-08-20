import Link from "next/link";
import HeadingWithUnderline from "../components/HeadingWithUnderline";

export default function Projects() {
  const projects = [
    {
      title: "QuSCII",
      description: "A quantum ascii art generator",
      link: "https://weeye.vercel.app/blogs/quscii",
    },
    {
      title: "NervParse",
      description: "A neural dependency parser",
      link: "https://github.com/vihanvt/nervparse",
    },
    {
      title: "QMusic",
      description: "A quantum music generator",
      link: "#",
    },
    {
      title: "smolNN",
      description: "Neural network from scratch",
      link: "https://weeye.vercel.app/blogs/nnfs",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-6">
        <div className="breadcrumb mb-8 text-lg">
          <Link
            href="/"
            className="text-[#79b8ff] hover:text-white transition-colors"
          >
            home
          </Link>
          <span className="text-white/50 mx-2">/</span>
          <span>projects</span>
        </div>
        <section className="border-b border-white/10 pb-8 mb-8">
          <HeadingWithUnderline level={1} className="text-4xl mb-4">
            ~ projects
          </HeadingWithUnderline>
          <p className="text-white">Things I've built.</p>
        </section>

        <section>
          <div className="space-y-3 pl-8 border-l border-white/10">
            {projects.map((project, idx) => (
              <div key={idx} className="block group">
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-4">
                      <span className="text-lg text-[#9ecbff] group-hover:text-[#9ecbff]">
                        {project.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          project.link === "#"
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <span
                        className={`text-sm font-['Source_Sans_Pro'] ${
                          project.link === "#"
                            ? "text-orange-500"
                            : "text-green-500"
                        }`}
                      >
                        {project.link === "#" ? "in progress" : "completed"}
                      </span>
                    </div>
                  </div>
                  <div className="text-base text-white/70">
                    {project.description}
                  </div>
                  {project.link !== "#" && (
                    <div className="mt-1">
                      <Link
                        href={project.link}
                        className="text-sm transition-colors duration-200 text-white hover:text-[#7b97aa]"
                      >
                        view project →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
