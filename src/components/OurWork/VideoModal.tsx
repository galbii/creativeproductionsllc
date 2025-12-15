'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryVideo } from '@/payload-types'

interface VideoModalProps {
  video: GalleryVideo | null
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!video) return null

  const getVideoEmbedUrl = (video: GalleryVideo): string => {
    if (!video.videoId) return ''

    if (video.videoType === 'youtube') {
      return `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`
    } else if (video.videoType === 'vimeo') {
      return `https://player.vimeo.com/video/${video.videoId}?autoplay=1`
    }
    return ''
  }

  const embedUrl = getVideoEmbedUrl(video)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-md" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-6xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-12 right-0 md:-top-14 md:-right-14 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-stone-950 rounded-lg overflow-hidden shadow-2xl">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <p>Video not available</p>
                </div>
              )}
            </div>

            {/* Video Info */}
            {(video.title || video.description) && (
              <div className="mt-4 md:mt-6 text-white">
                {video.title && (
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-2">
                    {video.title}
                  </h3>
                )}
                {video.description && (
                  <p className="text-sm md:text-base text-white/80">{video.description}</p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
