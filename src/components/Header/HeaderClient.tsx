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
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 40)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
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
        className={`
          sticky top-0 z-50 w-full overflow-visible
          transition-all duration-500
          ${isScrolled ? 'bg-stone-200/93 backdrop-blur-2xl' : 'bg-stone-200'}
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}
        `}
      >
        {/* Terracotta top accent — fades slightly when scrolled */}
        <div
          className={`h-[2px] w-full transition-opacity duration-500 ${isScrolled ? 'opacity-40' : 'opacity-80'}`}
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #c2705d 25%, #c2705d 75%, transparent 100%)',
          }}
        />

        {/* Inner bar */}
        <div className="overflow-visible max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-16 h-16">
          {/* ── Logo medallion ── */}
          <Link
            href="/"
            className="relative z-10 flex items-center gap-4 group flex-shrink-0 hover:opacity-100"
          >
            {/*
              The medallion overhangs below the bar.
              In the resting state it's 84px and translated down 24px,
              so ~32px of it extends below the 64px bar.
              On scroll it snaps to 44px with no translate.
            */}
            <div
              className={`
                relative flex-shrink-0
                transition-[width,height,transform,filter] duration-500
                ${
                  isScrolled
                    ? 'w-11 h-11 translate-y-0'
                    : 'w-[84px] h-[84px] translate-y-[22px]'
                }
              `}
              style={{
                filter: isScrolled
                  ? 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))'
                  : 'drop-shadow(0 8px 24px rgba(0,0,0,0.22)) drop-shadow(0 2px 6px rgba(194,112,93,0.18))',
                transitionTimingFunction: 'cubic-bezier(0.34,1.46,0.64,1)',
              }}
            >
              <Image
                src="/images/dropbox/creative productionscrest.jpg"
                alt="Creative Productions Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Wordmark — desktop only */}
            <div className="hidden xl:flex flex-col leading-[0.88] tracking-[-0.03em]">
              <span
                className={`font-display font-bold transition-all duration-300 ${
                  isScrolled ? 'text-[13px] text-stone-900' : 'text-sm text-stone-900'
                }`}
              >
                Creative
              </span>
              <span
                className={`font-display font-bold transition-all duration-300 ${
                  isScrolled ? 'text-[13px] text-stone-900/60' : 'text-sm text-stone-900/60'
                }`}
              >
                Productions
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  font-body text-[10.5px] font-semibold uppercase tracking-[0.18em]
                  text-stone-500 relative transition-colors duration-200
                  hover:text-[#c2705d]
                  after:absolute after:bottom-[-3px] after:left-0
                  after:h-px after:w-0 after:bg-[#c2705d]
                  after:transition-all after:duration-300 after:ease-out
                  hover:after:w-full
                "
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu trigger="Gallery" items={galleryItems} mainHref="/gallery" />
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-end gap-[6px] group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {/* Top bar */}
            <span
              className={`block h-px bg-stone-800 rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[9px]' : 'w-6'
              }`}
            />
            {/* Middle bar — terracotta accent, shorter */}
            <span
              className={`block h-px rounded-full transition-all duration-300 ${
                isMobileMenuOpen
                  ? 'w-0 opacity-0 bg-stone-400'
                  : 'w-[14px] opacity-100 bg-[#c2705d] group-hover:w-6'
              }`}
            />
            {/* Bottom bar */}
            <span
              className={`block h-px bg-stone-800 rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[9px]' : 'w-6'
              }`}
            />
          </button>
        </div>

        {/* Bottom rule — fades out when scrolled (blur handles separation) */}
        <div
          className={`h-px w-full transition-opacity duration-300 ${isScrolled ? 'opacity-30' : 'opacity-60'}`}
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #a8a29e 20%, #a8a29e 80%, transparent 100%)',
          }}
        />
      </header>

      {/* ── Mobile slide panel ── */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/45 backdrop-blur-[2px] z-40 animate-backdrop-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Panel */}
          <nav
            className="fixed top-[68px] right-0 bottom-0 w-[78%] max-w-[300px] z-50 overflow-y-auto shadow-2xl border-l border-stone-300/70 animate-panel-in"
            style={{ background: 'linear-gradient(160deg, #e7e5e4 0%, #d6d3d1 100%)' }}
          >
            {/* Panel top accent */}
            <div className="h-[2px] opacity-60" style={{ background: '#c2705d' }} />

            <div className="flex flex-col px-8 py-10 gap-0">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mobile-link font-body text-[10.5px] font-semibold uppercase tracking-[0.22em] text-stone-600 block py-[14px] border-b border-stone-300/50 hover:text-[#c2705d] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ animationDelay: `${i * 55}ms` }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Gallery group */}
              <div>
                <Link
                  href="/gallery"
                  className="mobile-link font-body text-[10.5px] font-semibold uppercase tracking-[0.22em] text-stone-600 block py-[14px] border-b border-stone-300/50 hover:text-[#c2705d] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ animationDelay: `${navLinks.length * 55}ms` }}
                >
                  Gallery
                </Link>
                {galleryItems.length > 0 && (
                  <div className="pl-3 flex flex-col">
                    {galleryItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="font-body text-[9.5px] uppercase tracking-[0.18em] text-stone-400 block py-[10px] border-b border-stone-200/50 hover:text-[#c2705d] transition-colors"
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
        @keyframes backdrop-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes panel-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes link-in {
          from {
            opacity: 0;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-backdrop-in {
          animation: backdrop-in 0.25s ease-out forwards;
        }
        .animate-panel-in {
          animation: panel-in 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .mobile-link {
          animation: link-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </>
  )
}
