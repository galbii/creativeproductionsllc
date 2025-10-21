'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './GalleryHero.module.css'

export function GalleryHero() {
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.backgroundImage}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0, 0, 0.2, 1] }}
      />
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
        >
          Video Gallery
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0, 0, 0.2, 1] }}
        >
          Explore our latest work
        </motion.p>
      </div>
    </section>
  )
}
