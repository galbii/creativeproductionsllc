'use client'

import React from 'react'
import { VideoPlayer } from './VideoPlayer'
import styles from './VideoCard.module.css'

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
  return (
    <article className={isFeatured ? styles.featuredCard : styles.card}>
      <div className={styles.videoWrapper}>
        <VideoPlayer
          videoId={video.videoId || ''}
          videoType={video.videoType}
          title={video.title}
        />
      </div>

      <div className={styles.info}>
        <h3>{video.title}</h3>
        {video.description && <p>{video.description}</p>}
      </div>
    </article>
  )
}
