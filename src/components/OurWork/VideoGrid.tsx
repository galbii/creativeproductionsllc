'use client'

import React, { useState } from 'react'
import type { GalleryVideo } from '@/payload-types'
import { VideoCard } from './VideoCard'
import { VideoModal } from './VideoModal'

interface VideoGridProps {
  videos: GalleryVideo[]
}

export function VideoGrid({ videos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleVideoClick = (video: GalleryVideo) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Delay clearing the video to allow exit animation
    setTimeout(() => setSelectedVideo(null), 300)
  }

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
        role="region"
        aria-label="Featured work video grid"
      >
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => handleVideoClick(video)}
            index={index}
          />
        ))}
      </div>

      <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
