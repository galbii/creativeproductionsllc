'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { VideoCard } from './VideoCard'
import { ImageCard } from './ImageCard'
import type { Media } from '@/payload-types'

interface Video {
  id: string | number
  title: string
  videoUrl: string
  videoType: 'youtube' | 'vimeo'
  videoId?: string | null
  description?: string | null
  isFeatured?: boolean | null
}

interface CarouselImage {
  image: string | Media
  caption?: string | null
  altText?: string | null
}

interface ImageGallery {
  id: string | number
  title: string
  images: CarouselImage[]
  description?: string | null
  isFeatured?: boolean | null
}

interface Section {
  id: string | number
  title: string
  slug: string
  description?: string | null
  contentType: 'video' | 'image'
  order: number
  isVisible?: boolean | null
  updatedAt: string
  createdAt: string
  videos?: Video[]
  images?: ImageGallery[]
}

interface GalleryGridProps {
  sections: Section[]
}

export function GalleryGrid({ sections }: GalleryGridProps) {
  return (
    <div className="w-full">
      {sections.map((section) => {
        // Handle video sections
        if (section.contentType === 'video' && section.videos) {
          const featuredVideos = section.videos.filter((video) => video.isFeatured)
          const regularVideos = section.videos.filter((video) => !video.isFeatured)

          return (
            <section key={section.id} className="py-12 md:py-16 lg:py-24 even:bg-stone-50">
              <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                {/* Section Header - Appears at top of section */}
                <div className="mb-12 text-center">
                  <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
                  >
                    {section.title}
                  </motion.h2>
                  {section.description && (
                    <motion.p
                      className="text-lg text-stone-600 max-w-[700px] mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.8, delay: 0.1, ease: [0, 0, 0.2, 1] }}
                    >
                      {section.description}
                    </motion.p>
                  )}
                </div>

                {/* Featured Videos - Displayed prominently after header */}
                {featuredVideos.length > 0 && (
                  <div className="grid grid-cols-1 gap-10 md:gap-12 lg:gap-20 mb-16 md:mb-20 lg:mb-24 w-full mx-auto justify-items-center md:w-[95%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
                    {featuredVideos.map((video, index) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.15,
                          ease: [0, 0, 0.2, 1],
                        }}
                      >
                        <VideoCard video={video} isFeatured />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Regular Videos - Below featured videos */}
                {regularVideos.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularVideos.map((video, index) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{
                          duration: 0.6,
                          delay: Math.min(index * 0.06, 0.6),
                          ease: [0, 0, 0.2, 1],
                        }}
                      >
                        <VideoCard video={video} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )
        }

        // Handle image sections
        if (section.contentType === 'image' && section.images) {
          const featuredGalleries = section.images.filter((gallery) => gallery.isFeatured)
          const regularGalleries = section.images.filter((gallery) => !gallery.isFeatured)

          return (
            <section key={section.id} className="py-12 md:py-16 lg:py-24 even:bg-stone-50">
              <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                {/* Section Header - Appears at top of section */}
                <div className="mb-12 text-center">
                  <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
                  >
                    {section.title}
                  </motion.h2>
                  {section.description && (
                    <motion.p
                      className="text-lg text-stone-600 max-w-[700px] mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.8, delay: 0.1, ease: [0, 0, 0.2, 1] }}
                    >
                      {section.description}
                    </motion.p>
                  )}
                </div>

                {/* Featured Image Galleries - Displayed prominently after header */}
                {featuredGalleries.length > 0 && (
                  <div className="grid grid-cols-1 gap-10 md:gap-12 lg:gap-20 mb-16 md:mb-20 lg:mb-24 w-full mx-auto justify-items-center md:w-[95%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
                    {featuredGalleries.map((gallery, index) => (
                      <motion.div
                        key={gallery.id}
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.15,
                          ease: [0, 0, 0.2, 1],
                        }}
                      >
                        <ImageCard gallery={gallery} isFeatured />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Regular Image Galleries - Below featured galleries */}
                {regularGalleries.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularGalleries.map((gallery, index) => (
                      <motion.div
                        key={gallery.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{
                          duration: 0.6,
                          delay: Math.min(index * 0.06, 0.6),
                          ease: [0, 0, 0.2, 1],
                        }}
                      >
                        <ImageCard gallery={gallery} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )
        }

        return null
      })}
    </div>
  )
}
