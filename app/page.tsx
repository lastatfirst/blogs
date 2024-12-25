import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client } from "./lib/sanity";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./components/Navbar"; // Ensure Navbar is imported

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    _createdAt
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <>
      <Navbar /> {/* Ensure Navbar is rendered */}
      <div className="mt-5 flex justify-center w-full"> {/* Center the content */}
        <div className="w-full max-w-7xl px-4"> {/* Limit max width on larger screens */}
          <div className="grid grid-cols-1 gap-5"> {/* Always 1 column */}
            {data.map((post, idx) => {
              const createdDate = new Date(post._createdAt); // Convert _createdAt to a Date object
              const formattedDate = createdDate.toLocaleDateString("en-US", {
                weekday: "short", // Optional, you can customize the format
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <Card
                  key={idx}
                  className="flex justify-center items-center mx-auto border border-gray-300 rounded-md shadow-sm" // Border and shadow added
                >
                  <CardContent className="mt-5 text-center w-full">
                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                      {post.smallDescription}
                    </p>
                    {/* Display the formatted creation date with a smaller font size */}
                    <p className="mt-2 text-sm text-gray-500">
                      -- {formattedDate}
                    </p>
                    <Button asChild className="w-full mt-3">
                      <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
