import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      title: "QuSCII",
      description: "a quantum ascii art generator",
      tags: ["a"],
      link: "https://weeye.vercel.app/posts/quscii"
    },
    {
      title: "NervParse",
      description: "A neural dependency parser",
      tags: ["b"],
      link: "https://github.com/vihanvt/nervparse"
    },
    {
      title:"QMusic",
      description:"A quantum music generator",
      tags:["c"],
      link:"#"
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
              <div key={idx} className="block group">
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[#111]/60 font-mono text-lg">
                      {project.tags.join(", ")} —
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-[#111] group-hover:text-[#111]/80 font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
                        {project.title}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${project.link === '#' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                        <span className={`text-xs ${project.link === '#' ? 'text-orange-500' : 'text-green-500'}`}>
                          {project.link === '#' ? 'in progress' : 'completed'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-16 text-[#111]/70 text-base">
                    {project.description}
                  </div>
                  {project.link !== '#' && (
                    <div className="ml-16 mt-1">
                      <Link 
                        href={project.link}
                        className="text-[#e5383b] hover:text-[#c72c2f] text-sm transition-colors duration-200"
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
