// app/blog/[slug]/page.tsx

import { PortableText } from "@portabletext/react"; // For rendering Sanity content
import { fullBlog } from "@/app/lib/interface"; // Importing the type for blog data
import { client } from "@/app/lib/sanity"; // Sanity client for fetching data
import Navbar from "@/app/components/Navbar"; // Ensure the Navbar path is correct

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
export default async function BlogArticle({ params }: { params: { slug: string } }) {
  const { slug } = params; // Destructure the slug parameter
  const data: fullBlog = await getData(slug); // Fetch blog data based on the slug

  if (!data) {
    return (
      <div className="mt-8 text-center">
        <h1 className="text-2xl font-semibold">Blog Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar /> {/* Include the Navbar */}
      <div className="mt-8 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center sm:text-4xl">{data.title}</h1>
        <div className="mt-6 prose prose-lg dark:prose-dark">
          <PortableText value={data.content} />
        </div>
      </div>
    </>
  );
}
