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
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="breadcrumb mb-8">
          <Link href="/">home</Link>
          <span>/</span>
          <span>projects</span>
        </div>

        <section className="border-b border-[#111]/10 pb-8 mb-8">
          <h1 className="text-4xl text-[#e5383b] mb-4 font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">~ projects</h1>
        </section>

        <section>
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
                  <span className="text-lg text-[#111] group-hover:text-[#111]/80 font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
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
