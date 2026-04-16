'use client'

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryVideo, GallerySection } from '@/payload-types'
import { BentoVideoCard } from './BentoVideoCard'
import { VideoModal } from './VideoModal'
import Image from 'next/image'

interface BentoGalleryContentProps {
  videos: GalleryVideo[]
  sections: GallerySection[]
}

export function BentoGalleryContent({ videos, sections }: BentoGalleryContentProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })

  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  // Video count per section
  const sectionCounts = useMemo(() => {
    const counts: Record<string, number> = { all: videos.length }
    sections.forEach((section) => {
      counts[section.id] = videos.filter((v) => {
        const s = v.section
        return typeof s === 'object' && s !== null ? s.id === section.id : s === section.id
      }).length
    })
    return counts
  }, [videos, sections])

  // Filtered video list
  const filteredVideos = useMemo(() => {
    if (activeFilter === 'all') return videos
    return videos.filter((video) => {
      const section = video.section
      if (typeof section === 'object' && section !== null) return section.id === activeFilter
      return section === activeFilter
    })
  }, [videos, activeFilter])

  // Slide the indicator to the active tab
  const updateIndicator = useCallback(() => {
    const tab = tabRefs.current[activeFilter]
    if (tab) {
      setIndicatorStyle({ left: tab.offsetLeft, width: tab.offsetWidth, opacity: 1 })
    }
  }, [activeFilter])

  useEffect(() => {
    // rAF ensures layout is settled before measuring
    const raf = requestAnimationFrame(updateIndicator)
    return () => cancelAnimationFrame(raf)
  }, [updateIndicator])

  useEffect(() => {
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId)
    tabRefs.current[filterId]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  const getBentoClass = (index: number): string => {
    const position = index % 6
    return position === 4 || position === 5 ? 'md:col-span-2' : 'col-span-1'
  }

  const handleVideoClick = (video: GalleryVideo) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedVideo(null), 300)
  }

  const activeSection = sections.find((s) => s.id === activeFilter)

  const allTabs = [
    { id: 'all', title: 'All', count: sectionCounts['all'] },
    ...sections.map((s) => ({ id: s.id, title: s.title, count: sectionCounts[s.id] ?? 0 })),
  ]

  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <section className="relative min-h-[65vh] md:min-h-[72vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://player.vimeo.com/video/698837089?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '100vw',
              height: '56.25vw',
              minHeight: '100vh',
              minWidth: '177.77vh',
            }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Gallery Background Video"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-20 w-full max-w-6xl text-center px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.34, 1.56, 0.64, 1], opacity: { duration: 0.8 } }}
            className="flex justify-center mb-8 md:mb-12"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
              <Image
                src="/images/dropbox/creative productionscrest.jpg"
                alt="Creative Productions"
                fill
                className="object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)]"
                priority
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0, 0, 0.2, 1] }}
            className="font-display font-bold tracking-[-0.03em] leading-none !text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8.5rem)' }}
          >
            Gallery
          </motion.h1>
        </div>
      </section>

      {/* ── Sticky Category Tab Rail ── */}
      <div className="sticky top-16 z-40">
        {/* Terracotta top accent — matches header */}
        <div
          className="h-[2px] w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #c2705d 25%, #c2705d 75%, transparent 100%)',
          }}
        />

        <div className="bg-stone-200/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            {/* Scrollable tab strip — indicator is absolute inside here */}
            <div className="relative flex overflow-x-auto scrollbar-hide px-6 lg:px-16">
              {allTabs.map((tab) => (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el
                  }}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`
                    flex-shrink-0 flex items-center gap-2 px-3 py-[14px]
                    font-body text-[10.5px] font-semibold uppercase tracking-[0.18em]
                    transition-colors duration-200 whitespace-nowrap
                    ${activeFilter === tab.id ? 'text-[#c2705d]' : 'text-stone-500 hover:text-stone-800'}
                  `}
                >
                  {tab.title}
                  <span
                    className={`
                      text-[9px] px-[5px] py-[2px] rounded-[3px] font-semibold tabular-nums
                      transition-colors duration-200
                      ${activeFilter === tab.id ? 'bg-[#c2705d]/15 text-[#c2705d]' : 'bg-stone-300/80 text-stone-500'}
                    `}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}

              {/* Sliding underline indicator */}
              <div
                className="absolute bottom-0 h-[2px] bg-[#c2705d] pointer-events-none"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: indicatorStyle.opacity,
                  transition:
                    'left 0.28s cubic-bezier(0.4, 0, 0.2, 1), width 0.28s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s',
                }}
              />
            </div>
          </div>

          {/* Bottom rule */}
          <div
            className="h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, #d6d3d1 20%, #d6d3d1 80%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* ── Active Section Description Band ── */}
      <AnimatePresence mode="wait">
        {activeSection && (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0, 0, 0.2, 1] }}
            className="overflow-hidden bg-stone-50 border-b border-stone-200"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-8 md:py-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h2
                    className="font-display font-bold text-stone-900 tracking-[-0.03em] leading-none"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                  >
                    {activeSection.title}
                  </h2>
                  {activeSection.description && (
                    <p className="text-sm md:text-base text-stone-500 font-light leading-relaxed mt-3 max-w-xl">
                      {activeSection.description}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="font-display text-4xl font-bold text-stone-900 leading-none tabular-nums">
                    {filteredVideos.length}
                  </div>
                  <div className="font-body text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1">
                    {filteredVideos.length === 1 ? 'Video' : 'Videos'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Video Grid ── */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6"
            >
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.04, 0.4),
                    ease: [0, 0, 0.2, 1],
                  }}
                  className={getBentoClass(index)}
                >
                  <BentoVideoCard video={video} onClick={() => handleVideoClick(video)} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredVideos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-stone-400">
                No videos in this category
              </p>
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

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
