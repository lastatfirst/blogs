import { PortableText } from "@portabletext/react";
import { fullBlog } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LikeButton from "@/app/components/LikeButton";
import Image from "next/image";

// Define proper types for the page props
type Props = {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Define type for the portable text image component props
type PortableImageProps = {
  value: {
    asset: {
      url: string;
    };
    alt?: string;
  };
};

// Fetch blog data based on the slug
async function getData(slug: string): Promise<fullBlog> {
  const query = `*[_type == "blog" && slug.current == $slug] {
    title,
    content[] {
      ...,
      asset->{
        url
      }
    }
  }[0]`;

  const data = await client.fetch(query, { slug });

  if (!data) {
    throw new Error('Blog post not found');
  }

  return data;
}

// BlogArticle component
export default async function BlogArticle({ params }: Props) {
  const { slug } = params;

  const data = await getData(slug);

  const wordsPerMinute = 200;
  const wordCount = data.content.reduce((count, block) => {
    if (block._type === "block" && block.children) {
      return count + block.children.reduce((childCount, child) =>
        (child.text ? child.text.split(/\s+/).length : 0) + childCount, 0);
    }
    return count;
  }, 0);

  const estimatedReadTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;

  const myPortableTextComponents = {
    types: {
      image: ({ value }: PortableImageProps) => {
        const imageUrl = value?.asset?.url;

        if (!imageUrl) {
          return <p>No image available</p>;
        }

        return (
          <div className="my-4">
            <Image
              src={imageUrl}
              alt={value?.alt || "Image"}
              width={800}
              height={600}
              className="w-full h-auto"
              priority
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
        <p className="mt-2 text-center text-gray-400 text-lg">{estimatedReadTime}</p>

        <div className="mt-4 flex justify-center">
          <LikeButton postId={slug} />
        </div>

        <div className="mt-6 prose prose-blue dark:prose-invert">
          <PortableText value={data.content} components={myPortableTextComponents} />
        </div>
      </div>
    </>
  );
}

// Generate static params for dynamic routing
export async function generateStaticParams() {
  const query = `*[_type == "blog"]{
    slug {
      current
    }
  }`;

  const slugs = await client.fetch(query);

  return slugs.map((slug: { slug: { current: string } }) => ({
    slug: slug.slug.current,
  }));
}
