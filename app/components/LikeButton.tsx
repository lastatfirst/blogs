"use client"
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'; // Import createClient from supabase-js
import { Button } from '@/components/ui/button';

// Fetch the environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Ensure the environment variables are not undefined
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anon key are required');
}

// Initialize Supabase Client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface LikeButtonProps {
  postId: string;
}

const LikeButton = ({ postId }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if the user has already liked the post
    const liked = localStorage.getItem(`liked_${postId}`);
    if (liked) {
      setIsLiked(true);
    }

    // Fetch the current number of likes
    const fetchLikes = async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId);

      if (error) {
        console.error('Error fetching likes:', error.message || error);
        return;
      }

      setLikes(data ? data.length : 0); // Set the total likes
    };

    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    try {
      setIsLoading(true);

      if (isLiked) {
        // If already liked, remove the like
        const { data, error } = await supabase
          .from('likes')
          .delete()
          .match({ post_id: postId })
          .select();

        if (error) {
          console.error('Delete error details:', error.message || error);
          return;
        }

        console.log('Deleted like:', data);
        setLikes((prev) => prev - 1);
        setIsLiked(false);
        localStorage.removeItem(`liked_${postId}`);
      } else {
        // Add a new like
        const { data, error } = await supabase
          .from('likes')
          .insert([{ post_id: postId, created_at: new Date().toISOString() }])
          .select();

        if (error) {
          console.error('Insert error details:', error.message || error);
          return;
        }

        console.log('Added like:', data);
        setLikes((prev) => prev + 1);
        setIsLiked(true);
        localStorage.setItem(`liked_${postId}`, 'true');
      }
    } catch (error: any) {
      console.error('Like action error:', error);
      console.error('Error details:', error.message);
      if (error.details) console.error('Error details:', error.details);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        className={`px-4 py-2 rounded-md ${isLiked ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'}`}
        onClick={handleLike}
        disabled={isLoading}
      >
        {isLiked ? 'Liked' : 'Like'}
      </Button>
      <span className="text-white">{likes} likes</span>
    </div>
  );
};

export default LikeButton;
