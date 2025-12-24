'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => removeEventListener('scroll', handleScroll)
  }, [])

  // Trigger initial animation on mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-300/90 backdrop-blur-xl border-b border-stone-400 shadow-sm'
            : 'bg-stone-300'
        } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
        style={{ transition: 'opacity 0.4s ease-out, transform 0.4s ease-out' }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-16 h-20">
          {/* Logo - Crest only on mobile, with text on desktop */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80 relative z-10"
          >
            <div className="relative w-16 h-16 lg:w-20 lg:h-20">
              <Image
                src="/images/dropbox/creative productionscrest.jpg"
                alt="Creative Productions Logo"
                fill
                className="object-contain drop-shadow-md"
                priority
              />
            </div>
            {/* Hide text on mobile, show on lg and up */}
            <span className="hidden lg:inline font-display text-lg font-semibold text-stone-900 tracking-wide">
              Creative Productions LLC
            </span>
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-base font-medium text-stone-600 tracking-wide relative transition-colors hover:text-stone-900 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-stone-900 after:transition-all after:duration-200 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}

            {/* Gallery Dropdown */}
            <DropdownMenu trigger="Gallery" items={galleryItems} mainHref="/gallery" />
          </nav>

          {/* Mobile Burger Menu Button */}
          <button
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-stone-900 rounded-full transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0 group-hover:w-7'
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-stone-900 rounded-full transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-stone-900 rounded-full transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'rotate-0 translate-y-0 group-hover:w-7'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/50 z-40 lg:hidden transition-opacity duration-500 ease-out animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <nav className="fixed top-20 right-0 bottom-0 w-[75%] max-w-sm bg-stone-200 z-40 lg:hidden shadow-2xl border-l border-stone-400 overflow-y-auto animate-slide-in-right">
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link, index) => (
                <div
                  key={link.href}
                  className="animate-slide-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <Link
                    href={link.href}
                    className="font-body text-xl font-medium text-stone-900 block py-3 px-4 rounded-lg transition-colors hover:bg-stone-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}

              {/* Gallery Section in Mobile Menu */}
              <div className="border-t border-stone-400 pt-4 mt-2">
                <Link
                  href="/gallery"
                  className="font-body text-xl font-medium text-stone-900 block py-3 px-4 rounded-lg transition-colors hover:bg-stone-300 mb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Gallery
                </Link>
                {galleryItems.length > 0 && (
                  <div className="pl-4 flex flex-col gap-2">
                    {galleryItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="font-body text-base font-medium text-stone-700 block py-2 px-4 rounded-lg transition-colors hover:bg-stone-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>
        </>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-slide-in {
          animation: slide-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  )
}
