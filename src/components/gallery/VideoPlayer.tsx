'use client'

import React from 'react'
import styles from './VideoPlayer.module.css'

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
      <div className={styles.placeholder}>
        <p>Invalid video ID</p>
      </div>
    )
  }

  return (
    <div className={styles.player}>
      <iframe
        src={getEmbedUrl()}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className={styles.iframe}
      />
    </div>
  )
}
