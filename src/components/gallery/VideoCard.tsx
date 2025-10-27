'use client'

import React from 'react'
import { VideoPlayer } from './VideoPlayer'

interface Video {
  id: string | number
  title: string
  videoUrl: string
  videoType: 'youtube' | 'vimeo'
  videoId?: string | null
  description?: string | null
}

interface VideoCardProps {
  video: Video
  isFeatured?: boolean
}

export function VideoCard({ video, isFeatured = false }: VideoCardProps) {
  if (isFeatured) {
    return (
      <article className="bg-white border-2 border-stone-200 rounded-lg overflow-hidden transition-all duration-300 ease-out w-full shadow-xl hover:-translate-y-2 hover:border-terracotta-500 hover:shadow-2xl">
        <div className="relative pb-[56.25%] h-0 overflow-hidden bg-stone-100">
          <VideoPlayer
            videoId={video.videoId || ''}
            videoType={video.videoType}
            title={video.title}
          />
        </div>

        <div className="p-6 md:p-8 lg:p-12">
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">{video.title}</h3>
          {video.description && (
            <p className="text-base md:text-lg lg:text-xl mt-3 md:mt-4 lg:mt-6 leading-relaxed max-w-none text-stone-600">
              {video.description}
            </p>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className="bg-white border border-stone-200 rounded-md overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-terracotta-500 hover:shadow-lg">
      <div className="relative pb-[56.25%] h-0 overflow-hidden bg-stone-100">
        <VideoPlayer
          videoId={video.videoId || ''}
          videoType={video.videoType}
          title={video.title}
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-stone-900 mb-2">{video.title}</h3>
        {video.description && (
          <p className="text-sm text-stone-600 leading-relaxed m-0">{video.description}</p>
        )}
      </div>
    </article>
  )
}
