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
  const slug = params?.slug || ""; // Store slug in a separate variable
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
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="breadcrumb mb-8">
          <Link href="/">home</Link>
          <span>/</span>
          <span className="text-white/60">thoughts</span>
        </div>

        <section className="border-b border-white/10 pb-8 mb-8">          <h1 className="text-4xl text-[#ffa896] mb-4 font-nunito">~ thoughts</h1>
          <p className="text-white/70 font-nunito">Random musings and quick notes.</p>
        </section>

        <section className="space-y-8">
          {thoughts.map((thought, index) => (
            <article key={index} className="pb-8 border-b border-white/10 last:border-0">
              <div className="prose prose-invert max-w-none font-mono text-white">
                <PortableText
                  value={thought.content}
                  components={components}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-white/60 text-sm font-mono">
                <time>
                  {new Date(thought._createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {thought.tags && (
                  <div className="flex gap-2">
                    {thought.tags.map((tag, idx) => (
                      <span key={idx} className="text-[#ffa896]">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
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