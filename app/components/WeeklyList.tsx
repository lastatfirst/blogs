'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'

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
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-200">
        Reading List [{startDate}-{endDate}]
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 group">
            <div 
              className={`min-w-[1.5rem] w-6 h-6 rounded border-2 transition-all duration-200 flex items-center justify-center
                ${item.completed 
                  ? 'border-[#db0042] bg-[#db0042]' 
                  : 'border-gray-600 hover:border-[#db0042]/50'
                }`}
            >
              {item.completed && (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-300 hover:text-[#db0042]'
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