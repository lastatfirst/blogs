import { PortableText } from "@portabletext/react";
import { fullBlog, PageProps, PortableTextBlock, PortableTextChild } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { myPortableTextComponents } from "@/app/lib/portableTextComponents";
import Navbar from "@/app/components/Navbar";
import LikeButton from "@/app/components/LikeButton";

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == $slug] {
      title,
      content[] {
        ...,
        asset->{
          url
        }
      },
      likes
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
      <div className="min-h-screen bg-black">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="flex items-baseline gap-2">
            <span className="text-[#00ff66]">&gt;</span>
            <h1 className="text-white text-2xl">404 / not found</h1>
          </div>
        </div>
        <Navbar />
      </div>
    );
  }

  const wordsPerMinute = 200;
  const wordCount = data.content.reduce((count: number, block: PortableTextBlock) => {
    if (block._type === "block" && block.children) {
      return count + block.children.reduce((sum: number, child: PortableTextChild) =>
        sum + (child.text ? child.text.split(/\s+/).length : 0), 0);
    }
    return count;
  }, 0);
  const estimatedReadTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <header className="mb-16">
          <Link href="/blog" className="text-[#00ff66] hover:text-[#33ff85]">← posts</Link>
          <h1 className="text-6xl font-bold mt-8 text-white">{data.title}</h1>
          <div className="flex items-center justify-between mt-4">
            <p className="text-zinc-400">{estimatedReadTime}</p>
            <LikeButton initialLikes={data.likes || 0} slug={slug} />
          </div>
        </header>

        <main className="prose prose-invert max-w-none">
          <PortableText value={data.content} components={myPortableTextComponents} />
        </main>
      </div>
      <Navbar />
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