'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { GalleryVideo } from '@/payload-types'

interface VideoCardProps {
  video: GalleryVideo
  onClick: () => void
  index: number
}

export function VideoCard({ video, onClick, index }: VideoCardProps) {
  const getVideoThumbnail = (video: GalleryVideo): string => {
    if (!video.videoId) return ''

    if (video.videoType === 'youtube') {
      return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
    } else if (video.videoType === 'vimeo') {
      return `https://vumbnail.com/${video.videoId}.jpg`
    }
    return ''
  }

  const thumbnail = getVideoThumbnail(video)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
    >
      <button
        onClick={onClick}
        className="group relative w-full aspect-video bg-stone-100 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-4"
        aria-label={`Play ${video.title}`}
      >
        {/* Thumbnail Image */}
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={video.title || 'Video thumbnail'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Play Button - Centered, appears prominently on hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-terracotta-500 rounded-full flex items-center justify-center transform transition-all duration-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 shadow-xl">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="white"
              className="ml-1"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>

        {/* Video Title - Bottom Left */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 className="text-lg md:text-xl lg:text-2xl font-display font-bold !text-white mb-1 transition-transform duration-300 group-hover:translate-y-0">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-sm md:text-base !text-white line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {video.description}
            </p>
          )}
        </div>

        {/* Subtle Border Highlight */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-xl transition-colors duration-300" />
      </button>
    </motion.div>
  )
}
