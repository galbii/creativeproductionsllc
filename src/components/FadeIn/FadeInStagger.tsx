'use client'

import React from 'react'
import { motion } from 'framer-motion'

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
  const childrenArray = React.Children.toArray(children)

  return (
    <div className={className}>
      {childrenArray.map((child, index) => {
        const delay = Math.min(index * staggerDelay, maxDelay)

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{
              duration: 0.6,
              delay,
              ease: [0, 0, 0.2, 1],
            }}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}
