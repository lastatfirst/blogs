// app/blog/page.tsx
import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

async function getData() {
  const query = `*[_type == "blog"]{
    title,
    slug {
      current
    }
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function BlogIndex() {
  const posts = await getData();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post: { slug: { current: Key | null | undefined; }; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <li key={post.slug.current}>
            <Link href={`/blog/${post.slug.current}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}