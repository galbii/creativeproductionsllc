'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-stone-50 py-16 md:py-20 lg:py-24 px-6 md:px-10 lg:px-16">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://player.vimeo.com/video/713139613?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '100vw',
            height: '56.25vw', // 16:9 aspect ratio
            minHeight: '100vh',
            minWidth: '177.77vh', // 16:9 aspect ratio
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Hero Background Video"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-20 w-full max-w-6xl text-center">
        {/* Logo - Drops in with scale and bounce */}
        <div
          className={`
            flex justify-center mb-8 md:mb-12
            transition-all duration-1000
            ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 -translate-y-8'}
          `}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: '300ms',
          }}
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
        </div>

        {/* Brand Name - Single line with responsive wrapping */}
        <div
          className={`
            mb-8 md:mb-10
            transition-all duration-800
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
          style={{
            transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
            transitionDelay: '1100ms',
          }}
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-tight sm:leading-none !text-stone-50 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            <span className="inline-block sm:inline">Creative</span>{' '}
            <span className="inline-block sm:inline">Productions</span>
          </h1>
        </div>

        {/* Tagline - Subtle fade in */}
        <p
          className={`
            text-xl md:text-2xl lg:text-3xl font-body font-light tracking-wide mb-12 md:mb-16 !text-stone-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]
            transition-opacity duration-800
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ transitionDelay: '1600ms' }}
        >
          Cinematic storytelling for brands that move people
        </p>

        {/* CTAs - Stagger in from below */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
          <div
            className={`
              transition-all duration-600
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{
              transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
              transitionDelay: '2000ms',
            }}
          >
            <Link
              href="/contact"
              className="
                inline-flex items-center justify-center
                px-10 py-5 min-w-[220px]
                text-lg font-semibold
                bg-terracotta-500 text-white
                border-2 border-terracotta-500
                rounded-lg
                transition-all duration-200
                hover:bg-terracotta-600 hover:border-terracotta-600
                hover:-translate-y-1
                shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.7)]
                focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2
              "
            >
              Book a Consultation
              <svg
                className="ml-3 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </Link>
          </div>

          <div
            className={`
              transition-all duration-600
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{
              transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
              transitionDelay: '2150ms',
            }}
          >
            <Link
              href="/about"
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
              Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
