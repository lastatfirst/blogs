"use client";

import { useState, useEffect } from "react";
import supabase from "@/app/lib/supabaseClient";
import { Eye } from "lucide-react";

interface ViewsDisplayProps {
  initialViews: number;
  slug: string;
}

export default function ViewsDisplay({
  initialViews,
  slug,
}: ViewsDisplayProps) {
  const [views, setViews] = useState(initialViews);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const incrementAndFetchViews = async () => {
      try {
        // Check if this user has already viewed this post in this session
        const hasViewed = sessionStorage.getItem(`viewed_${slug}`);

        if (!hasViewed) {
          // Increment view count
          const { error } = await supabase.from("views").insert([
            {
              post_id: slug,
              created_at: new Date().toISOString(),
            },
          ]);

          if (error) {
            console.error("Error adding view:", error.message);
          } else {
            // Mark as viewed in this session
            sessionStorage.setItem(`viewed_${slug}`, "true");
          }
        }

        // Get the total views count
        const { data: viewsData, error: viewsError } = await supabase
          .from("views")
          .select("*", { count: "exact" })
          .eq("post_id", slug);

        if (viewsError) {
          console.error("Error fetching views:", viewsError.message);
          return;
        }

        setViews(viewsData?.length || initialViews);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    incrementAndFetchViews();

    // Subscribe to changes
    const channel = supabase
      .channel("views_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "views",
          filter: `post_id=eq.${slug}`,
        },
        () => {
          setViews((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug, initialViews]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-[#555]">
        <Eye className="w-4 h-4" />
        <span>...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-[#555]">
      <Eye className="w-4 h-4" />
      <span>{views}</span>
    </div>
  );
}
