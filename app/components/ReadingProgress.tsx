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
    <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-50">
      <div 
        className="h-full bg-[#ea7477] transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}