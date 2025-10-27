'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function ContactHeader() {
  return (
    <section className="relative bg-gradient-to-b from-stone-50 to-white py-20 md:py-24 lg:py-28 px-6 md:px-10 overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(120 113 108) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
        >
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Ready to bring your vision to life? Let&apos;s start a conversation about your next
            video project.
          </p>
        </motion.div>

        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0, 0, 0.2, 1] }}
          className="mt-8 h-1 w-32 mx-auto bg-gradient-to-r from-terracotta-500 to-sage-400 rounded-full"
        />
      </div>
    </section>
  )
}
