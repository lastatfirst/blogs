import { client } from "@/app/lib/sanity";
import MonthlyList from "@/app/components/MonthlyList";
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";
import HeadingWithUnderline from "@/app/components/HeadingWithUnderline";

async function getReadingLists() {
  const query = `*[_type == "readingList"] | order(monthDate desc) {
    monthDate,
    items[] {
      title,
      url,
      completed
    }
  }`;
  return client.fetch(query);
}

export default async function ListPage() {
  const readingLists = await getReadingLists();

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-6">
        <Breadcrumb
          items={[{ label: "home", href: "/" }, { label: "reading list" }]}
        />

        <section className="border-b border-white/10 pb-8 mb-8">
          {" "}
          <HeadingWithUnderline
            level={1}
            className="text-4xl text-[#7b97aa] mb-4"
          >
            ~ reading list
          </HeadingWithUnderline>
          <p className="text-white">
            random dump of interesting blogs/papers/articles/books
          </p>
        </section>

        <section className="space-y-12">
          {readingLists.map((list: any) => (
            <MonthlyList
              key={list.monthDate}
              weekStart={list.monthDate} // Keep weekStart prop for MonthlyList component
              weekEnd={list.monthDate} // Keep weekEnd prop for MonthlyList component, can be same as weekStart for monthly
              items={list.items}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
