'use client';

import { useState, useEffect } from 'react';
import supabase from '@/app/lib/supabaseClient';
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
    <button
      onClick={handleLike}
      disabled={isLoading || isLiked}
      className={`
        flex items-center gap-2 transition-all duration-200 
        ${isLiked 
          ? 'text-[#e5383b]' 
          : 'text-[#555] hover:text-[#e5383b]'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <Heart
        className={`w-4 h-4 transition-all duration-200 
          ${isLiked ? 'fill-[#e5383b] stroke-[#e5383b]' : 'stroke-current fill-none'}
        `}
      />
      <span>{likes}</span>
    </button>
  );
}
