import { PortableText } from "@portabletext/react";
import { fullBlog } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Navbar from "@/app/components/Navbar";
import { PageProps } from "@/app/lib/interface";

// Function to fetch data for the given slug
async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == $slug] {
      title,
      content
    }[0]
  `;
  const data = await client.fetch(query, { slug });
  return data;
}

// BlogArticle component
export default async function BlogArticle({ params }: PageProps) {
  const { slug } = await params; // Await the params object to get the slug

  const data: fullBlog = await getData(slug); // Fetch blog data based on the slug

  if (!data) {
    return (
      <div className="mt-8 text-center prose prose-blue dark:prose-invert">
        <h1 className="text-2xl font-semibold">Blog Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-8 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-center">{data.title}</h1>

        <div className="mt-10"></div> {/* Spacer added here */}

        <div className="mt-6 prose prose-blue dark:prose-invert">
          <PortableText value={data.content} />
        </div>
      </div>
    </>
  );
}
