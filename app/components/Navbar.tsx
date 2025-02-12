"use client"; // Make it a client component for interactivity

import Link from "next/link";
import { useState, useRef, useEffect } from "react"; // Import useState and useRef
import { useTransition, animated } from 'react-spring';  // Import react-spring

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility
  const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !(dropdownRef.current.contains(event.target as Node))) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  // React Spring Animation
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: 'translateY(-10px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-10px)' },
    config: { tension: 200, friction: 20 },
  });


  return (
    <nav className="flex items-center justify-between max-w-4xl mx-auto px-6 py-8 border-b border-gray-700">
      <Link
        href="/"
        className="text-2xl font-medium tracking-tight hover:text-red-600 transition-colors text-[#e91e63]"
        style={{ fontSize: '2rem' }}
      >
        vt.
      </Link>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="text-lg focus:outline-none hover:text-red-600 transition-colors"
        >
          ☰ {/* Hamburger Icon */}
        </button>

        {/* Animated Dropdown Menu */}
        {transitions((style, item) =>
          item && (
            <animated.div
              className="absolute right-0 mt-2 w-48 rounded-md shadow-xl  ring-1 ring-black ring-opacity-5 focus:outline-none"
              style={{ ...style, backgroundColor: '#1e1e1e' }} // Background Color
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                <Link
                  href="https://vihan.vercel.app"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-[#db0042] transition-colors"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                >
                  Home
                </Link>
                <Link
                  href="https://x.com/weeye"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-[#db0042] transition-colors"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-1"
                >
                  Twitter
                </Link>
                <Link
                  href="https://github.com/vihanvt"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-[#db0042] transition-colors"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-2"
                >
                  Github
                </Link>
                <Link
                  href="https://linkedin.com/in/vihanvt"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-[#db0042] transition-colors"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-3"
                >
                  LinkedIn
                </Link>
              </div>
            </animated.div>
          )
        )}
      </div>
    </nav>
  );
}