'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryVideo, GallerySection } from '@/payload-types'
import { BentoVideoCard } from './BentoVideoCard'
import { VideoModal } from './VideoModal'
import Image from 'next/image'

interface BentoGalleryContentProps {
  videos: GalleryVideo[]
  sections: GallerySection[]
}

export function BentoGalleryContent({ videos, sections }: BentoGalleryContentProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter videos based on selected section
  const filteredVideos = useMemo(() => {
    if (activeFilter === 'all') {
      return videos
    }

    return videos.filter((video) => {
      const section = video.section
      if (typeof section === 'object' && section !== null) {
        return section.id === activeFilter
      }
      return section === activeFilter
    })
  }, [videos, activeFilter])

  // Bento grid pattern: some items span 2 columns for visual interest
  const getBentoClass = (index: number): string => {
    // Pattern: every 5th and 6th item span 2 columns for variety
    // Pattern repeats: regular, regular, regular, regular, wide, wide
    const position = index % 6
    if (position === 4 || position === 5) {
      return 'md:col-span-2' // Wide on desktop
    }
    return 'col-span-1'
  }

  // Handle video click
  const handleVideoClick = (video: GalleryVideo) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    // Delay clearing selected video for exit animation
    setTimeout(() => setSelectedVideo(null), 300)
  }

  return (
    <div className="w-full">
      {/* Hero Section with Background Video */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://player.vimeo.com/video/698837089?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0"
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '100vw',
              height: '56.25vw', // 16:9 aspect ratio
              minHeight: '100vh',
              minWidth: '177.77vh', // 16:9 aspect ratio
            }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Gallery Background Video"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-6xl text-center px-6 md:px-10 lg:px-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.34, 1.56, 0.64, 1], // Cubic bezier for bounce
              opacity: { duration: 0.8 },
            }}
            className="flex justify-center mb-8 md:mb-12"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
              <Image
                src="/images/dropbox/creative productionscrest.jpg"
                alt="Creative Productions"
                fill
                className="object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
                priority
              />
            </div>
          </motion.div>

          {/* Gallery Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0, 0, 0.2, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-10 md:mb-12 !text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          >
            Gallery
          </motion.h1>

          {/* Filter Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease: [0, 0, 0.2, 1] }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {/* All Filter */}
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-terracotta-500 !text-white shadow-lg'
                  : 'bg-white/10 backdrop-blur-sm !text-white border border-white/80 hover:bg-white hover:!text-stone-900'
              }`}
            >
              All
            </button>

            {/* Section Filters */}
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveFilter(section.id)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === section.id
                    ? 'bg-terracotta-500 !text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm !text-white border border-white/80 hover:bg-white hover:!text-stone-900'
                }`}
              >
                {section.title}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Gallery */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6"
            >
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.05, 0.6),
                    ease: [0, 0, 0.2, 1],
                  }}
                  className={getBentoClass(index)}
                >
                  <BentoVideoCard video={video} onClick={() => handleVideoClick(video)} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredVideos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-lg text-stone-600">
                No videos found in this category. Try selecting a different filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          videoId={selectedVideo.videoId || ''}
          videoType={selectedVideo.videoType}
          title={selectedVideo.title}
        />
      )}
    </div>
  )
}
