"use client";

import { useState } from "react";
import supabase from '../lib/supabaseClient';

type LikeButtonProps = {
  postId: string;
};

export default function LikeButton({ postId }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);

  const handleLike = async () => {
    const { data, error } = await supabase
      .from("likes")
      .upsert({ post_id: postId, like_count: likes + 1 });

    if (error) {
      console.error("Error liking post:", error.message);
    } else {
      setLikes((prev) => prev + 1);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
    >
      Like ({likes})
    </button>
  );
}
