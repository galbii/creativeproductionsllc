'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './SequentialText.module.css'

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
    <div className={styles.container}>
      <motion.div
        className={styles.line1}
        initial="hidden"
        animate="visible"
        variants={line1Variants}
      >
        {line1}
      </motion.div>

      <motion.div
        className={styles.line2}
        initial="hidden"
        animate="visible"
        variants={line2Variants}
      >
        {line2}
      </motion.div>
    </div>
  )
}
