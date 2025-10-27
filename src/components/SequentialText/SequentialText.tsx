'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SequentialTextProps {
  line1: string
  line2: string
}

export function SequentialText({ line1, line2 }: SequentialTextProps) {
  const line1Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0, 0, 0.2, 1] as [number, number, number, number], // ease-out
      },
    },
  }

  const line2Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 1.5, // 1.5s delay after page load
        ease: [0, 0, 0.2, 1] as [number, number, number, number], // ease-out
      },
    },
  }

  return (
    <div className="text-center flex flex-col gap-4">
      <motion.div
        className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-stone-600 tracking-wider uppercase"
        initial="hidden"
        animate="visible"
        variants={line1Variants}
      >
        {line1}
      </motion.div>

      <motion.div
        className="font-display text-5xl md:text-7xl lg:text-9xl font-bold text-stone-900 tracking-tighter leading-tight bg-gradient-to-r from-stone-900 to-stone-600 bg-clip-text text-transparent"
        initial="hidden"
        animate="visible"
        variants={line2Variants}
      >
        {line2}
      </motion.div>
    </div>
  )
}
