'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { VideoCard } from './VideoCard'
import { ImageCard } from './ImageCard'
import type { Media } from '@/payload-types'
import styles from './GalleryGrid.module.css'

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
    <div className={styles.gallery}>
      {sections.map((section) => {
        // Handle video sections
        if (section.contentType === 'video' && section.videos) {
          const featuredVideos = section.videos.filter((video) => video.isFeatured)
          const regularVideos = section.videos.filter((video) => !video.isFeatured)

          return (
            <section key={section.id} className={styles.section}>
              <div className={styles.container}>
                {/* Section Header - Appears at top of section */}
                <div className={styles.sectionHeader}>
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
                  >
                    {section.title}
                  </motion.h2>
                  {section.description && (
                    <motion.p
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
                  <div className={styles.featuredGrid}>
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
                  <div className={styles.videoGrid}>
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
            <section key={section.id} className={styles.section}>
              <div className={styles.container}>
                {/* Section Header - Appears at top of section */}
                <div className={styles.sectionHeader}>
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
                  >
                    {section.title}
                  </motion.h2>
                  {section.description && (
                    <motion.p
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
                  <div className={styles.featuredGrid}>
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
                  <div className={styles.videoGrid}>
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
