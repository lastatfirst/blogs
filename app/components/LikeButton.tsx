"use client";

<<<<<<< HEAD
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
=======
import { useState, useEffect } from "react";

// Define the type for the props
interface LikeButtonProps {
  postId: string; // postId should be a string
}

const LikeButton = ({ postId }: LikeButtonProps) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  // Retrieve like count and liked status from localStorage
  useEffect(() => {
    const storedLikes = localStorage.getItem(postId);
    if (storedLikes) {
      const parsedData = JSON.parse(storedLikes);
      setLikeCount(parsedData.likeCount);
      setLiked(parsedData.liked);
    }
  }, [postId]);

  // Handle clicking the like button
  const handleLike = () => {
    const newLikeStatus = !liked;
    const newLikeCount = newLikeStatus ? likeCount + 1 : likeCount - 1;

    // Update state
    setLiked(newLikeStatus);
    setLikeCount(newLikeCount);

    // Save the like status and count to localStorage
    localStorage.setItem(
      postId,
      JSON.stringify({
        likeCount: newLikeCount,
        liked: newLikeStatus,
      })
    );
  };

  return (
    <div>
      <button
        onClick={handleLike}
        className={`like-button ${liked ? "liked" : ""}`}
        style={{
          backgroundColor: liked ? "#FF5733" : "#ddd",
          color: liked ? "white" : "black",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {liked ? "Liked" : "Like"} ({likeCount})
      </button>
    </div>
  );
};

export default LikeButton;
>>>>>>> e553ea1f6291f4fdddbe0cfd1ab540aedfc56412
