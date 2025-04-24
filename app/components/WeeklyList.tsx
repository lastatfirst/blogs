'use client'

import { useState } from 'react'

interface ReadingItem {
  title: string
  url: string
  completed: boolean
}

interface WeeklyListProps {
  weekStart: string
  weekEnd: string
  items: ReadingItem[]
}

export default function WeeklyList({ weekStart, weekEnd, items }: WeeklyListProps) {
  const startDate = new Date(weekStart).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  const endDate = new Date(weekEnd).toLocaleDateString('en-US', { day: 'numeric' })

  return (
    <div className="mb-10">
      <h2 className="text-lg font-normal mb-4">
        {startDate}-{endDate}
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 group">
            <div 
              className={`min-w-[1rem] w-4 h-4 rounded-sm border transition-all duration-200 flex items-center justify-center
                ${item.completed 
                  ? 'border-[#e5383b] bg-[#e5383b]' 
                  : 'border-[#555] hover:border-[#e5383b]'
                }`}
            >
              {item.completed && (
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-base transition-all duration-200 ${
                item.completed 
                  ? 'text-[#999] line-through' 
                  : 'text-[#111] hover:text-[#e5383b]'
              }`}
            >
              {item.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}