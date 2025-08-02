"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);

  useEffect(() => {
    const images = ["/side1.jpg", "/side2.jpg", "/side3.jpg", "/side4.jpg"];

    // Create a longer strip by repeating and shuffling
    const createImageStrip = () => {
      const repeatedImages = [];
      // Repeat images multiple times to fill the height
      for (let i = 0; i < 100; i++) {
        // Increased from 50 to 100 for more coverage
        repeatedImages.push(...images);
      }

      // Shuffle the array
      for (let i = repeatedImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [repeatedImages[i], repeatedImages[j]] = [
          repeatedImages[j],
          repeatedImages[i],
        ];
      }
      return repeatedImages;
    };

    setShuffledImages(createImageStrip());
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      setDocumentHeight(
        Math.max(document.documentElement.scrollHeight, window.innerHeight)
      );
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Update height on load and when content changes
    updateHeight();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateHeight);

    // Use MutationObserver to detect DOM changes that might affect height
    const observer = new MutationObserver(updateHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <Link href="/secret" className="group">
      <div
        className="fixed left-0 top-0 w-6 flex flex-col z-10 overflow-hidden cursor-pointer hover:w-8 transition-all duration-300 hover:shadow-lg"
        style={{ height: `${documentHeight}px` }}
      >
        <div
          className="flex flex-col group-hover:brightness-110 transition-all duration-300"
          style={{
            transform: `translateY(-${scrollY * 0.5}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {shuffledImages.map((src, index) => (
            <div
              key={index}
              className="w-6 h-6 flex-shrink-0 group-hover:w-8 group-hover:h-8 transition-all duration-300"
            >
              <Image
                src={src}
                alt=""
                width={40}
                height={40}
                className="w-full h-full object-cover block"
              />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
