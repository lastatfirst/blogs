import { PortableText } from "@portabletext/react";
import {
  fullBlog,
  PortableTextBlock,
  PortableTextChild,
} from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { myPortableTextComponents } from "@/app/lib/portableTextComponents";
import LikeButton from "@/app/components/LikeButton";
import ReadingProgress from "@/app/components/ReadingProgress";
import Breadcrumb from "@/app/components/Breadcrumb";

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

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug; // Store slug in a separate variable

  if (!slug) {
    return null;
  }

  const data = await getData(slug);

  // Basic word count and read time logic
  const wordsPerMinute = 200;
  const wordCount =
    data?.content?.reduce((count: number, block: PortableTextBlock) => {
      if (block._type === "block" && block.children) {
        return (
          count +
          block.children.reduce(
            (sum: number, child: PortableTextChild) =>
              sum + (child.text ? child.text.split(/\s+/).length : 0),
            0
          )
        );
      }
      return count;
    }, 0) || 0;
  const estimatedReadTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white font-mono">Post not found</p>
      </div>
    );
  }

  return (
    <article className="min-h-screen relative">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Breadcrumb
          items={[
            { label: "home", href: "/" },
            { label: "posts", href: "/posts" },
            { label: data.title },
          ]}
        />

        <div className="mb-8 pb-8 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl" style={{ color: "#7b97aa" }}>
              {data.title}
            </h1>
            <LikeButton slug={slug} initialLikes={data.likes} />
          </div>
          <div className="flex items-center gap-4 text-white/60">
            <time>
              {new Date(data._createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{estimatedReadTime}</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-white">
          <PortableText
            value={data.content}
            components={myPortableTextComponents}
          />
        </div>
      </div>
      <ReadingProgress />
    </article>
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
