// @ts-nocheck
import { PortableText } from "@portabletext/react";
import { fullBlog } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Navbar from "@/app/components/Navbar"; // Fixed import path
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LikeButton from "@/app/components/LikeButton"; // Fixed import path
import katex from "katex";
import "katex/dist/katex.min.css"; // Import KaTeX CSS for styling
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism"; // Syntax highlighter style

// Fetch thought data from Sanity - updated to use "thought" type instead of "blog"
async function getData(slug) {
  // Return empty array if no slug is provided
  if (!slug) {
    return null;
  }
  
  const query = `
    *[_type == "thought" && slug.current == "${slug}"] {
      title,
      content[] {
        ...,
        asset->{
          url
        }
      }
    }[0]
  `;
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching thought data:", error);
    return null;
  }
}

export default async function ThoughtArticle({ params }: { params: { slug: string } }) {
  const { slug } = params || {};
  const data: fullBlog = await getData(slug);

  // If no data is found, show a "Thought Not Found" message
  if (!data) {
    return (
      <div className="mt-8 text-center prose prose-blue dark:prose-invert">
        <h1 className="text-2xl font-semibold">Thought Not Found</h1>
      </div>
    );
  }

  // Calculate estimated read time
  const wordsPerMinute = 200;
  const wordCount = data.content.reduce((count, block) => {
    if (block._type === "block" && block.children) {
      return count + block.children.reduce((childCount, child) =>
        (child.text ? child.text.split(/\s+/).length : 0) + childCount, 0);
    }
    return count;
  }, 0);
  const estimatedReadTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;

  // Custom components for PortableText
  const myPortableTextComponents = {
    types: {
      // Handle images
      image: ({ value }: { value: { asset: { url: string }; alt?: string } }) => {
        // Check for different possible URL structures
        const imageUrl = value?.asset?.url || 
                        (value?.asset?._ref && `https://cdn.sanity.io/images/YOUR_PROJECT_ID/production/${value.asset._ref
                          .replace('image-', '')
                          .replace('-jpg', '.jpg')
                          .replace('-png', '.png')
                          .replace('-webp', '.webp')
                          .replace('-jpeg', '.jpeg')}`);

        if (!imageUrl) {
          console.error("Image URL not found in:", value);
          return <p>No image available</p>;
        }

        return (
          <div className="my-8">
            <Image
              src={imageUrl}
              alt={value?.alt || "Image"}
              width={1000}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        );
      },
      // Handle math equations
      math: ({ value }: { value: { equation: string; inline: boolean } }) => {
        if (!value?.equation) {
          return null;
        }
        
        try {
          const mathHtml = katex.renderToString(value.equation, {
            throwOnError: false,
            displayMode: !value.inline,
          });
          
          return <span dangerouslySetInnerHTML={{ __html: mathHtml }} />;
        } catch (error) {
          console.error("KaTeX error:", error);
          return <span>Math rendering error</span>;
        }
      },
      // Handle code blocks
      code: ({ value }: { value: { code: string; language: string } }) => {
        if (!value?.code) {
          return null;
        }
        
        return (
          <div className="my-8">
            <SyntaxHighlighter language={value.language || 'text'} style={okaidia}>
              {value.code}
            </SyntaxHighlighter>
          </div>
        );
      },
    },
  };

  return (
    <div className="relative min-h-screen text-[#d4d4d4] font-geist">
      {/* Background image with clean implementation */}
      <div className="fixed inset-0 z-[-1] bg-[#1e1e1e]">
        <div 
          className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundSize: '100% 100%'
          }}
        />
      </div>
      
      <Navbar />
      {/* Main container with slightly decreased width */}
      <div className="mt-8 max-w-4xl mx-auto px-6 pb-20">
        {/* Back button */}
        <Link href="/thoughts">
          <Button
            variant="outline"
            className="mb-8 border-2 border-white text-white hover:bg-white hover:text-black px-6 py-2 rounded-md text-sm"
          >
            ← Back to Thoughts
          </Button>
        </Link>

        {/* Blog title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-extrabold text-[#d2dffd]">
          {data.title}
        </h1>

        {/* Estimated read time and like button */}
        <p className="mt-2 text-center text-gray-400 text-base">{estimatedReadTime}</p>
        <div className="mt-4 flex justify-center">
          <LikeButton postId={slug} />
        </div>

        {/* Blog content */}
        <div className="mt-8 prose prose-blue dark:prose-invert max-w-none prose-lg">
          <PortableText
            value={data.content}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </div>
  );
}

// Generate static paths for SSG - updated to use "thought" type
export async function generateStaticParams() {
  try {
    const query = `*[_type == "thought" && defined(slug.current)]{
      "slug": slug.current
    }`;
    const slugs = await client.fetch(query);
    return Array.isArray(slugs) ? slugs.map((slug) => ({
      slug: slug.slug
    })) : [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}