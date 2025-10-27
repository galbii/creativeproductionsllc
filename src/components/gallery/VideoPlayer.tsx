'use client'

import React from 'react'

interface VideoPlayerProps {
  videoId: string
  videoType: 'youtube' | 'vimeo'
  title: string
}

export function VideoPlayer({ videoId, videoType, title }: VideoPlayerProps) {
  const getEmbedUrl = () => {
    if (videoType === 'youtube') {
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
    }
    if (videoType === 'vimeo') {
      return `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`
    }
    return ''
  }

  if (!videoId) {
    return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
        <p className="m-0 text-sm">Invalid video ID</p>
      </div>
    )
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <iframe
        src={getEmbedUrl()}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="w-full h-full border-none"
      />
    </div>
  )
}
