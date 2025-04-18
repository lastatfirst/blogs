import { PortableText } from "@portabletext/react";
import { fullBlog, PortableTextBlock, PortableTextChild } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { myPortableTextComponents } from "@/app/lib/portableTextComponents";
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
      views,
      likes,
      _createdAt
    }[0]
  `;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data: fullBlog = await getData(slug);

  const wordsPerMinute = 200;

  const wordCount = data.content.reduce((count: number, block: PortableTextBlock) => {
    if (block._type === "block" && block.children) {
      return count + block.children.reduce((sum: number, child: PortableTextChild) =>
        sum + (child.text ? child.text.split(/\s+/).length : 0), 0);
    }
    return count;
  }, 0);
  const estimatedReadTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;

  if (!data) {
    return (
      <div className="min-h-screen bg-black">
        <div className="fixed top-0 left-0 w-full h-1 bg-white/10">
          <div id="progress-bar" className="h-full bg-[#db0042] w-0 transition-all duration-200"></div>
        </div>
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="breadcrumb mb-12">
            <Link href="/">home</Link>
            <span>/</span>
            <Link href="/posts">posts</Link>
            <span>/</span>
            <span>404</span>
          </div>
          <h1 className="text-white text-6xl">not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10">
        <div id="read-progress" className="h-full bg-[#db0042] w-0 transition-all duration-200"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="breadcrumb mb-12">
          <Link href="/">home</Link>
          <span>/</span>
          <Link href="/posts">posts</Link>
          <span>/</span>
          <span>{slug}</span>
        </div>

        <header className="mb-16">
          <h1 className="text-6xl font-bold text-white">{data.title}</h1>
          <div className="mt-8 flex items-center justify-between border-t border-b border-white/20 py-4">
            <p className="text-white/60">{estimatedReadTime}</p>
            <LikeButton initialLikes={data.likes || 0} slug={slug} />
          </div>
        </header>

        <main className="prose prose-invert prose-lg max-w-none">
          <PortableText value={data.content} components={myPortableTextComponents} />
        </main>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        const updateReadProgress = () => {
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          document.getElementById('read-progress').style.width = scrolled + '%';
        };
        document.addEventListener('scroll', updateReadProgress);
        updateReadProgress();
      `}} />
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
