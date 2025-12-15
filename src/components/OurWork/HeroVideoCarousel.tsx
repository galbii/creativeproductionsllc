'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryVideo } from '@/payload-types'
import { VideoModal } from './VideoModal'

interface HeroVideoCarouselProps {
  videos: GalleryVideo[]
}

export function HeroVideoCarousel({ videos }: HeroVideoCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  const selectedVideo = videos[selectedIndex]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return // Don't navigate when modal is open

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, videos.length, isModalOpen])

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % videos.length)
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index)
    // Scroll thumbnail into view
    thumbnailRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  const handleHeroClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const getVideoThumbnail = (video: GalleryVideo): string => {
    if (!video.videoId) return ''

    if (video.videoType === 'youtube') {
      return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
    } else if (video.videoType === 'vimeo') {
      return `https://vumbnail.com/${video.videoId}.jpg`
    }
    return ''
  }

  if (!videos || videos.length === 0) return null

  const showNavigation = videos.length > 1

  return (
    <div className="w-full" role="region" aria-label="Featured video showcase">
      {/* Hero Display */}
      <div className="relative w-full aspect-video bg-stone-100 rounded-xl overflow-hidden shadow-lg mb-6 md:mb-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <button
              onClick={handleHeroClick}
              className="group relative w-full h-full focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-4"
              aria-label={`Play ${selectedVideo.title}`}
            >
              {/* Thumbnail Image */}
              {getVideoThumbnail(selectedVideo) && (
                <Image
                  src={getVideoThumbnail(selectedVideo)}
                  alt={selectedVideo.title || 'Video thumbnail'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="100vw"
                  priority
                  unoptimized
                />
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-terracotta-500 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-terracotta-600 shadow-2xl">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="ml-1">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold !text-white mb-3 transition-transform duration-300 group-hover:translate-y-0">
                  {selectedVideo.title}
                </h3>
                {selectedVideo.description && (
                  <p className="text-base md:text-lg !text-white/90 line-clamp-2 max-w-3xl">
                    {selectedVideo.description}
                  </p>
                )}
              </div>
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows on Hero */}
        {showNavigation && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              aria-label="Previous video"
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-stone-900/60 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:bg-stone-900/80 hover:scale-110 focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2 z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              aria-label="Next video"
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-stone-900/60 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:bg-stone-900/80 hover:scale-110 focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2 z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation Strip */}
      {showNavigation && (
        <div
          className="relative"
          role="tablist"
          aria-label="Video navigation"
        >
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            {videos.map((video, index) => {
              const isActive = index === selectedIndex
              const thumbnail = getVideoThumbnail(video)

              return (
                <motion.button
                  key={video.id}
                  ref={(el) => {
                    thumbnailRefs.current[index] = el
                  }}
                  onClick={() => handleThumbnailClick(index)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View ${video.title}`}
                  className="relative flex-shrink-0 w-32 md:w-40 lg:w-48 aspect-video bg-stone-100 rounded-lg overflow-hidden snap-center focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2"
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                >
                  {/* Thumbnail Image */}
                  {thumbnail && (
                    <Image
                      src={thumbnail}
                      alt={video.title || 'Video thumbnail'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                      unoptimized
                    />
                  )}

                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />

                  {/* Active Border */}
                  <div
                    className={`absolute inset-0 border-2 rounded-lg transition-colors duration-300 ${
                      isActive ? 'border-terracotta-500' : 'border-transparent'
                    }`}
                  />

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-xs md:text-sm font-semibold !text-white line-clamp-1">
                      {video.title}
                    </p>
                  </div>

                  {/* Play indicator for active */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 bg-terracotta-500 rounded-full flex items-center justify-center"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      {/* Video Modal */}
      <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={handleCloseModal} />

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
