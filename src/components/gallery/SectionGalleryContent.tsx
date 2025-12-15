'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { GalleryVideo, GallerySection } from '@/payload-types'
import { BentoVideoCard } from './BentoVideoCard'
import { VideoModal } from './VideoModal'
import Link from 'next/link'

interface SectionGalleryContentProps {
  section: GallerySection
  videos: GalleryVideo[]
}

export function SectionGalleryContent({ section, videos }: SectionGalleryContentProps) {
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    <>
      {/* Minimal Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-white border-b-2 border-stone-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-8"
          >
            <nav className="flex items-center gap-2 text-sm text-stone-600">
              <Link
                href="/gallery"
                className="hover:text-terracotta-500 transition-colors duration-200"
              >
                Gallery
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-stone-900 font-medium">{section.title}</span>
            </nav>
          </motion.div>

          {/* Section Title & Description */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-4"
              >
                {section.title}
              </motion.h1>
              {section.description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg md:text-xl text-stone-600 max-w-2xl"
                >
                  {section.description}
                </motion.p>
              )}
            </div>

            {/* Video Count Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-shrink-0"
            >
              <div className="inline-flex items-center gap-2 px-5 py-3 bg-stone-100 rounded-full border border-stone-200">
                <svg
                  className="w-5 h-5 text-terracotta-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-semibold text-stone-900">
                  {videos.length} {videos.length === 1 ? 'Video' : 'Videos'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clean Bento Grid */}
      <section className="py-8 md:py-12 lg:py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {videos.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7"
            >
              {videos.map((video, index) => {
                // Unique bento pattern for section pages
                const getBentoClass = (): string => {
                  // First video is featured (full width)
                  if (index === 0) return 'md:col-span-2 lg:col-span-3'
                  // Every 7th and 8th video spans 2 columns
                  const position = (index - 1) % 8
                  if (position === 6 || position === 7) return 'md:col-span-2'
                  return 'col-span-1'
                }

                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + Math.min(index * 0.05, 0.8),
                      ease: [0, 0, 0.2, 1],
                    }}
                    className={getBentoClass()}
                  >
                    <BentoVideoCard video={video} onClick={() => handleVideoClick(video)} />
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-200 mb-4">
                <svg
                  className="w-8 h-8 text-stone-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stone-900 mb-2">
                No videos yet
              </h3>
              <p className="text-stone-600 mb-6">
                Check back soon for new content in this section.
              </p>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta-500 text-white rounded-lg hover:bg-terracotta-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Gallery
              </Link>
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
    </>
  )
}
