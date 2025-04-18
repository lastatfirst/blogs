// @ts-nocheck
// src/app/blog/[slug]/page.tsx
// Removed client directive as this is a server component using async/await
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { client } from "@/app/lib/sanity";
import { fullBlog } from "@/app/lib/interface"; // Assuming this interface is defined correctly
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LikeButton from "@/app/blog/components/LikeButton"; // Ensure path is correct
import katex from "katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { notFound } from 'next/navigation'; // Import notFound for cleaner handling

// Define interfaces for custom block types (enhances type safety)
interface SanityImageValue {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
    url: string; // Added by asset->{url} in query
    metadata?: { // Fetching metadata
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
      lqip?: string; // Low Quality Image Placeholder (optional)
    };
  };
  alt?: string;
  caption?: string; // Example: if you have captions
}

interface SanityMathValue {
  _type: 'math';
  equation: string;
  inline: boolean;
}

interface SanityCodeValue {
  _type: 'code';
  code: string;
  language: string;
  filename?: string; // Example: if you add filenames
}

// --- Fetch post data from Sanity ---
const getData = async (slug: string): Promise<fullBlog | null> => {
  // Return null if no slug is provided
  if (!slug) {
    return null;
  }
  
  // Updated query to fetch image metadata (dimensions, potentially lqip)
  const query = `
    *[_type == "post" && slug.current == "${slug}"][0] {
      title,
      "slug": slug.current, // Fetch slug for LikeButton if needed differently
      content[]{
        ...,
        _type == "image" => { // Conditional projection for images
          asset->{
            url,
            metadata {
              dimensions,
              lqip // Low Quality Image Placeholder (optional)
            }
          }
        }
      }
      // Add other fields you might need, e.g., published date, author
    }
  `;
  try {
    const data = await client.fetch<fullBlog>(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch Sanity data:", error);
    return null; // Return null on fetch error
  }
}

// --- Static path generation ---
export async function generateStaticParams() {
  // Ensure slug.current exists before returning it
  const query = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;
  try {
    const slugs = await client.fetch<{ slug: string }[]>(query);
    // Ensure slugs is an array before mapping
    return Array.isArray(slugs) ? slugs.map((item) => ({ slug: item.slug })) : [];
  } catch (error) {
    console.error("Failed to fetch slugs for generateStaticParams:", error);
    return []; // Return empty array on error
  }
}

// --- Main Post Component ---
// Use the correct typing for Next.js App Router pages  
export default async function PostArticle({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params || {}; // Add a fallback for params
  const data = await getData(slug);

  // Handle case where data is not found or fetch failed
  if (!data) {
    notFound(); // Use Next.js notFound() for standard 404 page
    // notFound() stops execution, so the rest of the code won't run
  }

  // Destructure data here *after* the notFound check
  const { title, content } = data;

  // --- Read Time Calculation ---
  const wordsPerMinute = 200;
  const wordCount = content?.reduce((count, block) => {
    if (block._type === "block" && block.children) {
      return count + block.children.reduce((childCount, child) => 
        (child.text ? child.text.split(/\s+/).length : 0) + childCount, 0);
    }
    return count;
  }, 0) || 0;

  const estimatedReadTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;

  // --- Portable Text Component Configurations ---
  const myPortableTextComponents: PortableTextComponents = {
    types: {
      // --- Image Component ---
      image: ({ value }: { value: SanityImageValue }) => {
        if (!value?.asset?.url) {
          return <p className="text-red-500">Image not available</p>;
        }
        
        return (
          <div className="my-8 relative">
            <Image
              src={value.asset.url}
              alt={value.alt || "Blog image"}
              width={1000} // Default dimensions
              height={600}
              className="rounded-lg shadow-lg w-full h-auto"
              priority // Prioritize loading for above-the-fold images
            />
            {value.caption && (
              <p className="text-center text-sm text-gray-400 mt-2">{value.caption}</p>
            )}
          </div>
        );
      },
      
      // --- Math Component ---
      math: ({ value }: { value: SanityMathValue }) => {
        if (!value?.equation) {
          return null; // Don't render if no equation
        }
        
        try {
          // Render the math equation using KaTeX
          const mathHtml = katex.renderToString(value.equation, {
            throwOnError: false, // Prevents KaTeX from crashing on parse errors
            displayMode: !value.inline, // Controls whether to render in display mode (centered, block) or inline
          });
        
          return (
            <div className={value.inline ? "inline-block" : "my-4 text-center block"}>
              <span dangerouslySetInnerHTML={{ __html: mathHtml }} />
            </div>
          );
        } catch (error) {
          console.error("Error rendering math equation:", error);
          return <p className="text-red-500">Error rendering equation</p>;
        }
      },
      
      // --- Code Component ---
      code: ({ value }: { value: SanityCodeValue }) => {
        if (!value?.code) {
          return null; // Don't render if no code value
        }
        
        return (
          <div className="my-6 text-sm relative group">
            {value.filename && (
               <span className="text-xs text-gray-400 absolute -top-4 left-2 bg-[#1e1e1e] px-1 rounded-sm">
                 {value.filename}
               </span>
            )}
            <SyntaxHighlighter
              language={value.language || 'plaintext'} // Default to plaintext if language is missing
              style={okaidia}
              // Optional: Add line numbers, wrap lines etc.
              showLineNumbers={false}
              wrapLines={true}
              lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
            >
              {value.code}
            </SyntaxHighlighter>
          </div>
        );
      },
    },
    // Optional: Add custom block or mark definitions if needed
    block: {
      h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{props.children}</h1>,
      h2: (props) => <h2 className="text-2xl font-semibold mt-7 mb-3 text-white">{props.children}</h2>,
      h3: (props) => <h3 className="text-xl font-semibold mt-6 mb-2 text-white">{props.children}</h3>,
      // Add other block types as needed (h4, h5, h6, blockquote, etc.)
      // Ensure default rendering for p tags etc. is handled by prose classes or explicitly here
    },
    // Optional: Add custom marks (bold, italic, links, etc.)
    // mark: {
    //   link: ({children, value}) => {
    //     const rel = value.href.startsWith('/') ? undefined : 'noreferrer noopener'
    //     return (
    //       <a href={value.href} rel={rel} className="text-blue-400 hover:underline">
    //         {children}
    //       </a>
    //     )
    //   },
    //   // Add other marks like code, strong, em
    //   code: ({children}) => <code className="bg-gray-800 text-gray-200 px-1 rounded">{children}</code>,
    // },
  };

  return (
    <div className="relative min-h-screen text-[#d4d4d4] font-geist overflow-x-hidden"> {/* Added overflow-x-hidden */}
      {/* Background Layer */}
      <div className="fixed inset-0 z-[-1] bg-[#1e1e1e]">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat opacity-30" // Added opacity for readability
          // style={{ backgroundSize: '100% 100%' }} // Using bg-cover is usually better than stretching 100% 100%
        />
         {/* Optional: Overlay for better text readability over image */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content Layer */}
      <Navbar />
      <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10"> {/* Added padding for smaller screens, z-10 */}
        <Link href="/">
          <Button
            variant="outline"
            className="mb-8 border-2 border-white text-white hover:bg-white hover:text-black px-6 py-2 rounded-md text-sm transition duration-200" // Added transition
          >
            ← Back
          </Button>
        </Link>

        <h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-extrabold text-white leading-tight"> {/* Added leading-tight */}
          {title}
        </h1>

        <p className="mt-2 text-center text-gray-400 text-base">{estimatedReadTime}</p>
        <div className="mt-4 flex justify-center">
          {/* Assuming LikeButton takes a string postId */}
          <LikeButton postId={slug} />
        </div>

        {/* Prose classes style the Portable Text output */}
        {/* Max-w-none allows the content to take the full width of its container */}
        {/* Ensure your prose classes are configured for your dark theme */}
        <div className="mt-8 prose prose-blue dark:prose-invert max-w-none">
          <PortableText
            value={content}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </div>
  );
}