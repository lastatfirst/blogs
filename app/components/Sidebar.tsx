"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Sidebar() {
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const images = ["/side1.jpg", "/side2.jpg", "/side3.jpg", "/side4.jpg"];

    // Create a longer strip by repeating and shuffling
    const createImageStrip = () => {
      const repeatedImages = [];
      // Repeat images multiple times to fill the height
      for (let i = 0; i < 50; i++) {
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
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 h-screen w-8 flex flex-col z-10 overflow-hidden">
      <div
        className="flex flex-col"
        style={{
          transform: `translateY(-${scrollY * 0.5}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {shuffledImages.map((src, index) => (
          <div key={index} className="w-8 h-8 flex-shrink-0">
            <Image
              src={src}
              alt=""
              width={32}
              height={32}
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
