'use client';

import { useState, useEffect } from 'react';
import supabase from '@/app/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  initialLikes: number;
  slug: string;
}

export default function LikeButton({ initialLikes, slug }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        // Get the total likes count
        const { data: likesData, error: likesError } = await supabase
          .from('likes')
          .select('*', { count: 'exact' })
          .eq('post_id', slug);

        if (likesError) {
          console.error('Error fetching likes:', likesError.message);
          return;
        }

        // Check if the current user has liked
        const hasLiked = localStorage.getItem(`liked_${slug}`);
        
        setLikes(likesData?.length || initialLikes);
        setIsLiked(hasLiked === 'true');
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikeStatus();

    // Subscribe to changes
    const channel = supabase
      .channel('likes_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'likes',
          filter: `post_id=eq.${slug}`
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setLikes((prev) => prev + 1);
          } else if (payload.eventType === 'DELETE') {
            setLikes((prev) => Math.max(0, prev - 1));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug, initialLikes]);

  const handleLike = async () => {
    if (isLiked) return;

    try {
      setIsLoading(true);

      const { error } = await supabase
        .from('likes')
        .insert([{ 
          post_id: slug,
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('Error adding like:', error.message);
        return;
      }

      setIsLiked(true);
      localStorage.setItem(`liked_${slug}`, 'true');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLike}
      disabled={isLoading || isLiked}
      variant={isLiked ? 'default' : 'outline'}
      className="flex items-center gap-3 transition-all duration-300 border-2 border-gray-300 rounded-lg px-4 py-2 text-base"
    >
      <Heart
        className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'fill-white' : 'fill-none'}`}
      />
      <span className="text-lg">{likes}</span>
    </Button>
  );
}
