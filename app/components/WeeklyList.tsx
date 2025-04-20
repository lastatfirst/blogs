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
  const startDate = new Date(weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const endDate = new Date(weekEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-gray-200">
        Weekly List of {startDate} - {endDate}
      </h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3 group">
            <div className={`w-4 h-4 rounded-sm ${item.completed ? 'bg-[#db0042]' : 'bg-gray-800'} flex items-center justify-center`}>
              {item.completed && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-300 hover:text-[#db0042] transition-colors ${
                item.completed ? 'line-through text-gray-500' : ''
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