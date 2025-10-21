'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SequentialText } from '../SequentialText/SequentialText'
import styles from './HeroSection.module.css'

// List of images to cycle through from public/images folder
const heroImages = [
  '/images/Fujifilm-X-H2S-21-inhand-1.webp',
  '/images/istock_000017395433large.jpg',
  '/images/istockphoto-531321011-612x612.jpg',
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Only cycle if there are images
    if (heroImages.length === 0) return

    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
        setIsTransitioning(false)
      }, 500) // Half of the transition duration
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.hero}>
      {/* Background images */}
      {heroImages.length > 0 && (
        <motion.div
          className={styles.backgroundContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`${styles.backgroundImage} ${
                index === currentImageIndex ? styles.active : ''
              } ${isTransitioning && index === currentImageIndex ? styles.transitioning : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          {/* Dark overlay for readability */}
          <div className={styles.overlay} />
        </motion.div>
      )}

      <div className={styles.content}>
        <SequentialText line1="Welcome to" line2="Creative Productions LLC" />

        <div className={styles.ctaButtons}>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.3, ease: [0, 0, 0.2, 1] }}
          >
            <Link href="/contact" className={styles.ctaPrimary}>
              Contact Us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.45, ease: [0, 0, 0.2, 1] }}
          >
            <Link href="/gallery" className={styles.ctaSecondary}>
              View Gallery
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
