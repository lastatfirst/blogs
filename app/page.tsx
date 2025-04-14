import Link from "next/link";
import Navbar from "@/app/blog/components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen text-[#d4d4d4] font-geist">
      {/* Background image with overlay to remove edge effects */}
      <div className="fixed inset-0 z-[-1] bg-[#1e1e1e]">
        <div 
          className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundSize: '100% 100%',  // Forces image to stretch full width/height
            imageRendering: 'pixelated'   // Helps with texture quality
          }}
        />
      </div>
      
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