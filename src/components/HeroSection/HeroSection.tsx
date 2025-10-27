'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// List of images to cycle through from public/images folder
const heroImages = [
  '/images/Fujifilm-X-H2S-21-inhand-1.webp',
  '/images/istock_000017395433large.jpg',
  '/images/istockphoto-531321011-612x612.jpg',
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Only cycle if there are images
    if (heroImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-stone-50 py-16 md:py-20 lg:py-24 px-6 md:px-10 lg:px-16">
      {/* Background Pattern (subtle) */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(120 113 108) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Background images */}
      {heroImages.length > 0 && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </motion.div>
      )}

      <div className="relative z-20 w-full max-w-5xl text-center">
        {/* Brand Presentation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0, 0, 0.2, 1] }}
          className="mb-6"
        >
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none !text-white">
            Creative
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0, 0, 0.2, 1] }}
          className="mb-8"
        >
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none !text-white">
            Productions
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-xl md:text-2xl font-body font-light tracking-wide mb-4 !text-white"
        >
          Cinematic storytelling for brands that move people
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5, ease: [0, 0, 0.2, 1] }}
          >
            <Link
              href="/contact"
              className="
                inline-flex items-center justify-center
                px-8 py-4 min-w-[200px]
                text-lg font-semibold
                bg-terracotta-500 text-white
                border-2 border-terracotta-500
                rounded-lg
                transition-all duration-200
                hover:bg-terracotta-600 hover:border-terracotta-600
                hover:-translate-y-0.5 hover:shadow-lg
                focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2
              "
            >
              Contact Us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.65, ease: [0, 0, 0.2, 1] }}
          >
            <Link
              href="/gallery"
              className="
                inline-flex items-center justify-center
                px-8 py-4 min-w-[200px]
                text-lg font-semibold
                bg-transparent text-white
                border-2 border-white
                rounded-lg
                transition-all duration-200
                hover:bg-white hover:text-stone-900
                hover:-translate-y-0.5 hover:shadow-lg
                focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
              "
            >
              View Gallery
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
