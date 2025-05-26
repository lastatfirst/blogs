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
    <div className="space-y-4">
      <h2 className="text-xl mb-4" style={{ color: '#7b97aa' }}>
        {startDate} - {endDate}
      </h2>
      <div className="space-y-3 pl-8 border-l border-white/10">
        {items.map((item, index) => (
          <div key={index} className="group">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline justify-between"
            >              <span className={`group-hover:text-white/70 ${item.completed ? 'line-through' : ''}`} style={{ color: '#7b97aa' }}>
                {item.title}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}