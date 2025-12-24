'use client'

import React, { useEffect, useState } from 'react'
import { VideoPlayer } from './VideoPlayer'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
  videoType: 'youtube' | 'vimeo'
  title: string
}

export function VideoModal({ isOpen, onClose, videoId, videoType, title }: VideoModalProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Handle modal mount/unmount with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Trigger animation after render
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!shouldRender) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/90 z-50 cursor-pointer
          transition-opacity duration-300
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
        <div
          className={`
            relative w-full max-w-6xl pointer-events-auto
            transition-all duration-300
            ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-5'}
          `}
          style={{ transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 md:-top-16 md:-right-16 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-stone-900 transition-all duration-200 z-10"
            aria-label="Close video"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Video Container */}
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
            <div className="relative w-full pb-[56.25%]">
              <div className="absolute inset-0">
                <VideoPlayer videoId={videoId} videoType={videoType} title={title} />
              </div>
            </div>

            {/* Title Bar */}
            <div className="bg-gradient-to-t from-black/90 to-black/60 px-6 py-4">
              <h3 className="font-display text-lg md:text-xl font-semibold !text-white">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
