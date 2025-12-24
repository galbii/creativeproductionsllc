'use client'

import React, { useEffect, useState } from 'react'

interface SequentialTextProps {
  line1: string
  line2: string
}

export function SequentialText({ line1, line2 }: SequentialTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="text-center flex flex-col gap-4">
      <div
        className={`
          font-display text-2xl md:text-3xl lg:text-4xl font-light text-stone-600 tracking-wider uppercase
          transition-all duration-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
        `}
        style={{ transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}
      >
        {line1}
      </div>

      <div
        className={`
          font-display text-5xl md:text-7xl lg:text-9xl font-bold text-stone-900 tracking-tighter leading-tight bg-gradient-to-r from-stone-900 to-stone-600 bg-clip-text text-transparent
          transition-all duration-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
        style={{
          transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          transitionDelay: '1500ms',
        }}
      >
        {line2}
      </div>
    </div>
  )
}
