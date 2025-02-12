"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    const handleScroll = () => {
      // Ensure documentElement is available
      if (document.documentElement) {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = window.scrollY;
        const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0; // Prevent division by zero
        setScrollProgress(progress);
      }
    };

    // Initial calculation and attach scroll listener
    handleScroll(); // Calculate initial progress
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]); // Added pathname dependency

  // Check if we're on a blog post page (adjust the condition as needed)
  const isBlogPostPage = pathname?.startsWith('/blog/');

  if (!isBlogPostPage) {
    return null; // Don't render on other pages
  }

  return (
    <div
      className="fixed bottom-0 left-0 h-1 bg-[#db0042] z-50 w-full transition-transform duration-200"  // Default position
      style={{
        width: `${scrollProgress}%`,
        transform: `translateY(${scrollProgress > 0 ? '0' : '100%'})`, // Hide if no scroll
      }}
    />
  );
}