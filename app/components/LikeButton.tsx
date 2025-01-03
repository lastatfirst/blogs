"use client"
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false // Since we're not using authentication
    }
  }
);

interface LikeButtonProps {
  postId: string;
}

export default function LikeButton({ postId }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { error, count } = await supabase
          .from('likes')
          .select('*', { count: 'exact' })
          .eq('post_id', postId);

        if (error) {
          console.error('Error fetching likes:', error.message);
          return;
        }

        const hasLiked = localStorage.getItem(`liked_${postId}`);
        setLikes(count || 0);
        setIsLiked(hasLiked === 'true');
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching likes:', error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    try {
      setIsLoading(true);

      if (isLiked) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .match({ post_id: postId });

        if (error) {
          console.error('Error removing like:', error.message);
          return;
        }

        setLikes((prev) => prev - 1);
        setIsLiked(false);
        localStorage.removeItem(`liked_${postId}`);
      } else {
        const { error } = await supabase
          .from('likes')
          .insert([{ 
            post_id: postId,
            created_at: new Date().toISOString()
          }]);

        if (error) {
          console.error('Error adding like:', error.message);
          return;
        }

        setLikes((prev) => prev + 1);
        setIsLiked(true);
        localStorage.setItem(`liked_${postId}`, 'true');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error during like action:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLike}
      disabled={isLoading}
      variant={isLiked ? 'default' : 'outline'}
      className="flex items-center gap-2 transition-all duration-300"
    >
      <Heart
        className={`w-5 h-5 transition-all duration-300 ${
          isLiked ? 'fill-white' : 'fill-none'
        }`}
      />
      <span>{likes}</span>
    </Button>
  );
}
