'use client'

import React, { useEffect, useRef, useState } from 'react'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  scale?: boolean
  viewport?: {
    once?: boolean
    amount?: number
  }
  immediate?: boolean // Don't use intersection observer, animate immediately
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 20,
  scale = false,
  viewport = { once: true, amount: 0.2 },
  immediate = false,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(immediate)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (immediate) {
      setIsVisible(true)
      return
    }

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
        threshold: viewport.amount || 0.2,
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [immediate, viewport.once, viewport.amount])

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`
      case 'down':
        return `translateY(-${distance}px)`
      case 'left':
        return `translateX(${distance}px)`
      case 'right':
        return `translateX(-${distance}px)`
      case 'none':
      default:
        return 'translateY(0)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateX(0) translateY(0) scale(1)'
          : `${getInitialTransform()} ${scale ? 'scale(0.95)' : 'scale(1)'}`,
        transition: `opacity ${duration}s cubic-bezier(0, 0, 0.2, 1) ${delay}s, transform ${duration}s cubic-bezier(0, 0, 0.2, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
