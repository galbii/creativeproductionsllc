'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'

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
  immediate?: boolean // Don't use whileInView, animate immediately
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
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return { y: distance }
      case 'down':
        return { y: -distance }
      case 'left':
        return { x: distance }
      case 'right':
        return { x: -distance }
      case 'none':
      default:
        return {}
    }
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getTransform(),
      ...(scale && { scale: 0.95 }),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(scale && { scale: 1 }),
      transition: {
        duration,
        delay,
        ease: [0, 0, 0.2, 1], // ease-out cubic bezier
      },
    },
  }

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
