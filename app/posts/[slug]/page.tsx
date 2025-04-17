import { PortableText } from "@portabletext/react";
import { fullBlog } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import katex from "katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
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

async function updateLikes(slug: string, likes: number) {
  const response = await fetch('/api/likes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, likes })
  });
  return response.json();
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const data: fullBlog = await getData(slug);

  const wordsPerMinute = 200;

  interface BlockChild {
    text?: string;
  }

  interface ContentBlock {
    _type: string;
    children?: BlockChild[];
  }

  const wordCount = data.content.reduce((count: number, block: ContentBlock) => {
    if (block._type === "block" && block.children) {
      return count + block.children.reduce((childCount: number, child: BlockChild) =>
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
          return <p className="text-zinc-400">No image available</p>;
        }
        return (
          <div className="my-8">
            <Image
              src={imageUrl}
              alt={value?.alt || "Image"}
              width={1000}
              height={600}
              className="w-full h-auto rounded-sm"
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
          <div className="my-8">
            <SyntaxHighlighter language={value.language} style={okaidia}>
              {value.code}
            </SyntaxHighlighter>
          </div>
        );
      },
    },
    block: {
      h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-12 mb-4 text-white">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-10 mb-4 text-white">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h3>,
      normal: ({ children }: any) => <p className="text-zinc-300 mb-4 leading-relaxed">{children}</p>,
    },
    marks: {
      link: ({ children, value }: any) => {
        return (
          <a href={value?.href} className="text-[#00ff66] hover:text-[#33ff85] underline">
            {children}
          </a>
        );
      },
      code: ({ children }: any) => {
        return (
          <code className="bg-zinc-900 text-[#00ff66] rounded px-1 py-0.5">
            {children}
          </code>
        );
      },
    },
  };

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
          <PortableText
            value={data.content}
            components={myPortableTextComponents}
          />
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
