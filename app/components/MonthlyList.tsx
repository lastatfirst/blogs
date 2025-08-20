"use client";

import { useState } from "react";

interface ReadingItem {
  title: string;
  url: string;
  completed: boolean;
}

interface MonthlyListProps {
  weekStart: string;
  weekEnd: string;
  items: ReadingItem[];
}

export default function MonthlyList({
  weekStart,
  weekEnd,
  items,
}: MonthlyListProps) {
  const date = new Date(weekStart);
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear().toString();

  return (
    <div className="space-y-4">
      <h2 className="text-xl mb-4">
        {month} {year}
      </h2>
      <div className="space-y-3 pl-8 border-l border-white/10">
        {items.map((item, index) => (
          <div key={index} className="group">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline justify-between"
            >
              <span
                className={`text-white group-hover:text-white/70 ${item.completed ? "line-through" : ""}`}
              >
                {item.title}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
