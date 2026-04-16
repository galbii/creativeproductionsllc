'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative h-screen min-h-[580px] flex flex-col justify-end overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://player.vimeo.com/video/713139613?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.77vh',
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Hero Background"
        />

      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-16 md:pb-20 lg:pb-24">
        {/* Location label */}
        <div
          className={`mb-5 transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] uppercase text-white">
            <span className="w-6 h-px bg-white/60" />
            Los Angeles, CA
            <span className="w-6 h-px bg-white/60" />
          </span>
        </div>

        {/* Main headline */}
        <div
          className={`mb-8 md:mb-10 transition-all duration-1000 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '350ms' }}
        >
          <h1
            className="font-display font-bold text-white leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 8.5rem)' }}
          >
            Creative
            <br />
            <span className="text-white/75">Productions</span>
            {' '}
            <span
              className="font-body font-semibold uppercase tracking-[0.28em] text-white/30"
              style={{ fontSize: '13px' }}
            >
              LLC
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div
          className={`mb-8 transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '550ms' }}
        >
          <p className="text-base md:text-xl font-semibold leading-relaxed" style={{ color: 'white' }}>
            Cinematic storytelling for brands that move people.
          </p>
        </div>

        {/* CTAs */}
        <div
          className={`flex items-center gap-3 transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <Link
            href="/gallery"
            className="px-6 py-3 bg-white text-stone-900 text-sm font-semibold rounded-sm hover:bg-stone-100 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            View Work
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-white/40 text-white text-sm font-semibold rounded-sm hover:bg-white/10 hover:border-white/70 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Get in Touch
          </Link>
        </div>
      </div>

    </section>
  )
}
