import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      title: "QuSCII",
      description: "a quantum ascii art generator",
      tags: ["c"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="breadcrumb mb-8">
          <Link href="/">home</Link>
          <span>/</span>
          <span>projects</span>
        </div>

        <section className="border-b border-white/20 pb-8 mb-8">
          <h1 className="text-4xl text-[#d2dffd] mb-4">~ projects</h1>
        </section>

        <section>
          <div className="space-y-4 pl-8 border-l border-white/20">
            {projects.map((project, idx) => (
              <Link
                key={idx}
                href={project.link}
                className="block group"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-white/60 font-mono text-lg">
                    {project.tags.join(", ")} —
                  </span>
                  <span className="text-lg text-white group-hover:text-white/80">
                    {project.title}
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
