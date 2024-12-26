import { PortableText } from "@portabletext/react";
import { fullBlog } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageProps } from "@/app/lib/interface";
import Image from "next/image";

// Fetch blog data based on the slug
async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == $slug] {
      title,
      content[] {
        ...,
        asset->{
          url
        }
      }
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

  // Custom PortableText components for rendering images
  const myPortableTextComponents = {
    types: {
      image: ({ value }: { value: { asset: { url: string }; alt?: string } }) => {
        const imageUrl = value?.asset?.url;

        if (!imageUrl) {
          return <p>No image available</p>; // Fallback if image URL is missing
        }

        return (
          <div className="my-4">
            <Image
              src={imageUrl} // Use the raw image URL from Sanity
              alt={value?.alt || "Image"} // Default alt text
              width={800} // Set width
              height={600} // Set height
              className="w-full h-auto" // Make image responsive
              priority // Optional: prioritize loading
            />
          </div>
        );
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="mt-8 max-w-4xl mx-auto px-4 pb-20">
        {/* Back Button */}
        <Link href="/">
          <Button
            variant="outline"
            className="mb-8 border-2 border-white text-white hover:bg-white hover:text-black px-6 py-2 rounded-md"
          >
            ← Back
          </Button>
        </Link>

        <h1 className="text-5xl sm:text-6xl md:text-7xl text-center text-white font-extrabold shadow-lg">
          {data.title}
        </h1>

        <div className="mt-6 prose prose-blue dark:prose-invert">
          <PortableText
            value={data.content}
            components={myPortableTextComponents} // Custom components for PortableText
          />
        </div>
      </div>
    </>
  );
}
