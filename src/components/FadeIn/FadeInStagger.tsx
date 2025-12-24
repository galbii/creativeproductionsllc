'use client'

import React, { useEffect, useRef, useState } from 'react'

interface FadeInStaggerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  maxDelay?: number
  viewport?: {
    once?: boolean
    amount?: number
  }
}

export function FadeInStagger({
  children,
  className,
  staggerDelay = 0.1,
  maxDelay = 0.6,
  viewport = { once: true, amount: 0.1 },
}: FadeInStaggerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const childrenArray = React.Children.toArray(children)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (viewport.once) {
              observer.unobserve(element)
            }
          } else if (!viewport.once) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold: viewport.amount || 0.1,
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [viewport.once, viewport.amount])

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => {
        const delay = Math.min(index * staggerDelay, maxDelay)

        return (
          <div
            key={index}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: `opacity 0.6s cubic-bezier(0, 0, 0.2, 1) ${delay}s, transform 0.6s cubic-bezier(0, 0, 0.2, 1) ${delay}s`,
            }}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}
