import { PortableText } from "@portabletext/react";
import { fullBlog } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Navbar from "@/app/blog/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageProps } from "@/app/lib/interface";
import Image from "next/image";
import LikeButton from "@/app/blog/components/LikeButton";
import katex from "katex";
import "katex/dist/katex.min.css"; // Import KaTeX CSS for styling
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism"; // Syntax highlighter style

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

export default async function BlogArticle({ params }: PageProps) {
  const { slug } = await params;
  const data: fullBlog = await getData(slug);

  if (!data) {
    return (
      <div className="mt-8 text-center prose prose-blue dark:prose-invert">
        <h1 className="text-2xl font-semibold">Blog Not Found</h1>
      </div>
    );
  }

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
      image: ({ value }: { value: { asset: { url: string }; alt?: string } }) => {
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
      math: ({ value }: { value: { equation: string; inline: boolean } }) => {
        const mathHtml = katex.renderToString(value.equation, {
          throwOnError: false,
          displayMode: !value.inline,
        });

        return <span dangerouslySetInnerHTML={{ __html: mathHtml }} />;
      },
      code: ({ value }: { value: { code: string; language: string } }) => {
        return (
          <div className="my-4">
            <SyntaxHighlighter language={value.language} style={okaidia}>
              {value.code}
            </SyntaxHighlighter>
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

        <h1 className="text-5xl sm:text-6xl md:text-7xl text-center font-extrabold text-white">
          {data.title}
        </h1>

        <p className="mt-2 text-center text-gray-400 text-lg">{estimatedReadTime}</p>
        <div className="mt-4 flex justify-center">
          <LikeButton postId={slug} />
        </div>

        <div className="mt-6 prose prose-blue dark:prose-invert">
          <PortableText
            value={data.content}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </>
  );
}

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
