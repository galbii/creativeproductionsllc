'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import type { GalleryVideo } from '@/payload-types'

interface BentoVideoCardProps {
  video: GalleryVideo
  onClick: () => void
}

export function BentoVideoCard({ video, onClick }: BentoVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Generate thumbnail URL based on video type
  const getThumbnailUrl = (): string => {
    const videoId = video.videoId || ''

    if (video.videoType === 'youtube') {
      // YouTube thumbnail - try maxresdefault first
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    } else {
      // Vimeo thumbnail - using vumbnail service
      return `https://vumbnail.com/${videoId}.jpg`
    }
  }

  // Fallback thumbnail for errors
  const getFallbackThumbnail = (): string => {
    if (video.videoType === 'youtube') {
      // Fallback to hqdefault for YouTube
      return `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
    }
    // For Vimeo, return a gradient placeholder
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"%3E%3Crect fill="%23ddd" width="1280" height="720"/%3E%3C/svg%3E'
  }

  return (
    <article
      className="group relative h-full bg-stone-900 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Thumbnail Container - Aspect Ratio 16:9 */}
      <div className="relative w-full pb-[56.25%] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={imageError ? getFallbackThumbnail() : getThumbnailUrl()}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Dark overlay on hover */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 ${
                isHovered ? 'scale-110 bg-terracotta-500' : 'scale-100'
              }`}
            >
              <svg
                className={`w-8 h-8 md:w-10 md:h-10 transition-colors duration-300 ${
                  isHovered ? 'text-white' : 'text-terracotta-500'
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay with Title/Date */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 md:p-5 transition-all duration-300">
        <div className="relative">
          {/* Title - Always visible, fades out on hover */}
          <h3
            className={`font-display text-base md:text-lg font-semibold !text-white transition-all duration-300 ${
              isHovered ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            {video.title}
          </h3>

          {/* Date - Shown on hover, fades in */}
          <p
            className={`font-body text-sm md:text-base !text-white absolute inset-0 flex items-center transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            {formatDate(video.createdAt)}
          </p>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div
        className={`absolute inset-0 border-2 rounded-lg pointer-events-none transition-all duration-300 ${
          isHovered ? 'border-terracotta-500' : 'border-transparent'
        }`}
      />
    </article>
  )
}
