'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function GalleryHero() {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage:
            "url('/images/mt-fuji-at-kawaguchiko-lake-in-japan-beautiful-scenic-landscape-of-mountain-fuji-or-fujisan-with-reflection-on-shoji-lake-at-dawn-with-twilight-sky-japan-ai-generated-free-photo-1955180426.jpg')",
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0, 0, 0.2, 1] }}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-stone-900/40 to-stone-900/60 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className="relative z-20 text-center px-6 md:px-8 lg:px-12">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight shadow-[0_2px_10px_rgba(0,0,0,0.5)] !text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
        >
          Video Gallery
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl m-0 shadow-[0_2px_6px_rgba(0,0,0,0.5)] !text-white"
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
