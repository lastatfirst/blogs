import { PortableText } from "@portabletext/react";
import { fullBlog, PortableTextBlock, PortableTextChild } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { myPortableTextComponents } from "@/app/lib/portableTextComponents";
import LikeButton from "@/app/components/LikeButton";
import ReadingProgress from "@/app/components/ReadingProgress";

// Reverted getData function to a simpler state
async function getData(slug: string): Promise<fullBlog | null> {
  if (!slug) return null;
  
  // Basic query, might need adjustment based on the very original state
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    title,
    content,
    likes,
    _createdAt
  }`;

  try {
    const data = await client.fetch<fullBlog>(query, { slug });
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    return null;
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  if (!params?.slug) {
    return null;
  }

  const data = await getData(params.slug);

  // Basic word count and read time logic
  const wordsPerMinute = 200;
  const wordCount = data?.content?.reduce((count: number, block: PortableTextBlock) => {
    if (block._type === "block" && block.children) {
      return count + block.children.reduce((sum: number, child: PortableTextChild) =>
        sum + (child.text ? child.text.split(/\s+/).length : 0), 0);
    }
    return count;
  }, 0) || 0;
  const estimatedReadTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;

  if (!data) {
    // Basic 404 rendering
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <ReadingProgress />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
          <p className="text-zinc-400 mb-8">Could not find the requested post.</p>
          <Link href="/posts" className="text-[#00ff66] hover:underline">
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-300">
      <ReadingProgress />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Basic Breadcrumbs */}
        <div className="breadcrumb mb-8 sm:mb-12 text-sm sm:text-base">
          <Link href="/">home</Link>
          <span>/</span>
          <Link href="/posts">posts</Link>
          <span>/</span>
          <span className="text-zinc-500">{params.slug}</span>
        </div>

        {/* Basic Header */}
        <header className="mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{data.title}</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-b border-zinc-700 py-4 mt-6">
            <div className="text-sm text-zinc-400 flex items-center gap-4">
               <span>{new Date(data._createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
               <span>·</span>
               <span>{estimatedReadTime}</span>
            </div>
            <LikeButton initialLikes={data.likes || 0} slug={params.slug} />
          </div>
        </header>

        {/* Main Content - Simplified PortableText call */}
        <main className="prose prose-invert prose-lg max-w-none">
          <PortableText 
            value={data.content} 
            components={myPortableTextComponents} 
          />
        </main>
      </div>
    </div>
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
