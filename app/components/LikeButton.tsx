"use client";

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
  const handleLike = async () => {
    if (liked) {
      return; // Prevent further likes if already liked
    }

    const newLikeStatus = !liked;
    const newLikeCount = newLikeStatus ? likeCount + 1 : likeCount;

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

    // Optionally, here you can call your backend to store the like data persistently
    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        body: JSON.stringify({ postId, liked: newLikeStatus, likeCount: newLikeCount }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to update like');
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
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
