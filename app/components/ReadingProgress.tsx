'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateReadProgress = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateReadProgress);
    updateReadProgress();

    return () => window.removeEventListener('scroll', updateReadProgress);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-1 bg-white/10">
      <div 
        className="h-full bg-[#db0042] transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}