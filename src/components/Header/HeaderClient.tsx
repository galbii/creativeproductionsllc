'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { DropdownMenu } from '@/components/DropdownMenu'

interface GalleryItem {
  label: string
  href: string
}

interface HeaderClientProps {
  galleryItems: GalleryItem[]
}

export function HeaderClient({ galleryItems }: HeaderClientProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`
        sticky top-0 z-50 w-full transition-all duration-300 overflow-visible
        ${
          isScrolled
            ? 'bg-stone-300/90 backdrop-blur-xl border-b border-stone-400 shadow-sm'
            : 'bg-stone-300'
        }
      `}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
    >
      <div
        className="
          max-w-7xl mx-auto
          flex justify-between items-center
          px-6 md:px-10 lg:px-16
          h-20
        "
      >
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80 relative z-10"
        >
          <div
            className={`relative transition-all duration-300 ${isScrolled ? 'w-14 h-14 mt-0' : 'w-[120px] h-[120px] mt-12'}`}
          >
            <Image
              src="/images/dropbox/creative productionscrest.jpg"
              alt="Creative Productions Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display text-lg font-semibold text-stone-900 tracking-wide">
            Creative Productions LLC
          </span>
        </Link>

        <nav className="flex items-center gap-6 md:gap-8">
          <Link
            href="/"
            className="
              font-body text-base font-medium text-stone-600 tracking-wide
              relative transition-colors hover:text-stone-900
              after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px]
              after:bg-stone-900 after:transition-all after:duration-200
              hover:after:w-full
            "
          >
            Home
          </Link>
          <Link
            href="/about"
            className="
              font-body text-base font-medium text-stone-600 tracking-wide
              relative transition-colors hover:text-stone-900
              after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px]
              after:bg-stone-900 after:transition-all after:duration-200
              hover:after:w-full
            "
          >
            About
          </Link>

          {/* Gallery Dropdown */}
          <DropdownMenu trigger="Gallery" items={galleryItems} />

          <Link
            href="/services"
            className="
              font-body text-base font-medium text-stone-600 tracking-wide
              relative transition-colors hover:text-stone-900
              after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px]
              after:bg-stone-900 after:transition-all after:duration-200
              hover:after:w-full
            "
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="
              font-body text-base font-medium text-stone-600 tracking-wide
              relative transition-colors hover:text-stone-900
              after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px]
              after:bg-stone-900 after:transition-all after:duration-200
              hover:after:w-full
            "
          >
            Contact
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}
