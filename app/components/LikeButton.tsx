'use client';

import { useState } from 'react';

export default function LikeButton({ initialLikes, slug }: { initialLikes: number, slug: string }) {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    await fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, likes: newLikes })
    });
  };

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={handleLike}
        className="text-3xl hover:scale-110 transition-transform cursor-pointer"
      >
        ❤️
      </button>
      <span className="text-white/60 text-2xl">{likes}</span>
    </div>
  );
}
