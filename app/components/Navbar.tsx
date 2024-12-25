import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      {/* Top Navbar */}
      <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5 border-b border-gray-300">
        <Link href="/" className="font-bold text-4xl">
          <span className="text-primary">Blog</span>
        </Link>
        <ModeToggle />
      </nav>

      {/* Bottom Navbar */}
      <footer className="fixed bottom-0 w-full bg-gray-100 py-3">
        <div className="flex justify-center space-x-6">
          <Link href="https://twitter.com/weeye" target="_blank" className="hover:text-black">
            <FaTwitter size={24} style={{ color: "black" }} />
          </Link>
          <Link href="https://linkedin.com/in/vihan-vt" target="_blank" className="hover:text-black">
            <FaLinkedin size={24} style={{ color: "black" }} />
          </Link>
          <Link href="https://github.com/vihanvt" target="_blank" className="hover:text-black">
            <FaGithub size={24} style={{ color: "black" }} />
          </Link>
        </div>
      </footer>
    </>
  );
}
