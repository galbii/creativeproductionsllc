'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

      <div className="relative z-20 w-full max-w-6xl text-center">
        {/* Logo - Drops in with scale and bounce */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.34, 1.56, 0.64, 1], // Cubic bezier for bounce
            opacity: { duration: 0.8 },
          }}
          className="flex justify-center mb-8 md:mb-12"
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
            <Image
              src="/images/dropbox/creative productionscrest.jpg"
              alt="Creative Productions Logo"
              fill
              className="object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
              priority
            />
          </div>
        </motion.div>

        {/* Brand Name - Single line with responsive wrapping */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0, 0, 0.2, 1] }}
          className="mb-8 md:mb-10"
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none whitespace-nowrap !text-stone-50 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            <span className="inline-block sm:inline">Creative</span>{' '}
            <span className="inline-block sm:inline">Productions</span>
          </h1>
        </motion.div>

        {/* Tagline - Subtle fade in */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-xl md:text-2xl lg:text-3xl font-body font-light tracking-wide mb-12 md:mb-16 !text-stone-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
        >
          Cinematic storytelling for brands that move people
        </motion.p>

        {/* CTAs - Stagger in from below */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0, ease: [0, 0, 0.2, 1] }}
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
                hover:-translate-y-0.5
                shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)]
                focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2
              "
            >
              Contact Us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.15, ease: [0, 0, 0.2, 1] }}
          >
            <Link
              href="/gallery"
              className="
                inline-flex items-center justify-center
                px-8 py-4 min-w-[200px]
                text-lg font-semibold
                bg-white/10 backdrop-blur-sm text-white
                border-2 border-white/80
                rounded-lg
                transition-all duration-200
                hover:bg-white hover:text-stone-900 hover:border-white
                hover:-translate-y-0.5
                shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)]
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
