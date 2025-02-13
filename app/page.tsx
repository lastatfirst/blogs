import Link from "next/link";
import Navbar from "@/app/blog/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-geist">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6">
        <header className="pt-8 pb-12">
          <h1 className="text-3xl" style={{ color: '#e91e63' }}>
            you have reached the home -{" "}
            <Link href="/blog" style={{ color: '#FFD700' }} className="hover:underline">
              blog
            </Link>
          </h1>
        </header>
      </div>
    </div>
  );
}