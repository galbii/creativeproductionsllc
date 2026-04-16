'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryVideo } from '@/payload-types'
import { VideoModal } from '@/components/OurWork/VideoModal'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getThumbnailUrl(video: GalleryVideo): string {
  if (!video.videoId) return ''
  if (video.videoType === 'youtube') {
    return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
  }
  return `https://vumbnail.com/${video.videoId}.jpg`
}

// ─── Cell config: 7 cells with staggered intervals ───────────────────────────

const CELL_CONFIG: { interval: number; startOffset: number }[] = [
  { interval: 4800, startOffset: 0 },
  { interval: 3600, startOffset: 900 },
  { interval: 5200, startOffset: 300 },
  { interval: 3900, startOffset: 1600 },
  { interval: 4400, startOffset: 600 },
  { interval: 3300, startOffset: 1100 },
  { interval: 5000, startOffset: 400 },
]

// ─── Individual Bento Cell ────────────────────────────────────────────────────

interface BentoCellProps {
  videos: GalleryVideo[]
  interval: number
  startOffset: number
  onVideoClick: (video: GalleryVideo) => void
  className?: string
}

function BentoCell({
  videos,
  interval,
  startOffset,
  onVideoClick,
  className = '',
}: BentoCellProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const isHoveredRef = useRef(false)

  // Keep ref in sync so the interval can read current hover state
  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  // Staggered shuffle loop: wait startOffset, then cycle every interval ms
  useEffect(() => {
    if (videos.length <= 1) return

    let intervalId: ReturnType<typeof setInterval>

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (!isHoveredRef.current) {
          setCurrentIdx((i) => (i + 1) % videos.length)
        }
      }, interval)
    }, startOffset)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [videos.length, interval, startOffset])

  const currentVideo = videos[currentIdx]
  if (!currentVideo) return null

  const thumbnailUrl = getThumbnailUrl(currentVideo)

  return (
    <div
      className={`relative overflow-hidden bg-stone-900 cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onVideoClick(currentVideo)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onVideoClick(currentVideo)}
      aria-label={`Play ${currentVideo.title}`}
    >
      {/* Cross-fading thumbnail layer */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentIdx}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          >
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={currentVideo.title}
                fill
                className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                unoptimized
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0 bg-stone-800" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Permanent subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

      {/* Hover reveal overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-3 pointer-events-none"
          >
            {/* Play circle */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polygon points="7 5 20 12 7 19 7 5" fill="#1c1917" />
              </svg>
            </motion.div>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.22, delay: 0.04 }}
              className="text-white text-xs font-semibold text-center leading-snug max-w-[80%] tracking-wide"
            >
              {currentVideo.title}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface BentoShuffleGalleryProps {
  videos: GalleryVideo[]
}

export function BentoShuffleGallery({ videos }: BentoShuffleGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Split shuffled videos into 7 pools — done in useEffect to avoid
  // server/client hydration mismatch with Math.random()
  const [videoPools, setVideoPools] = useState<GalleryVideo[][]>(
    Array.from({ length: 7 }, () => []),
  )

  useEffect(() => {
    if (videos.length === 0) return
    const shuffled = shuffleArray(videos)
    const total = shuffled.length
    const perCell = Math.max(5, Math.ceil(total / 7))

    setVideoPools(
      Array.from({ length: 7 }, (_, i) => {
        const start = (i * Math.floor(total / 7)) % total
        const slice = [...shuffled.slice(start), ...shuffled.slice(0, start)]
        return slice.slice(0, perCell)
      }),
    )
  }, [videos])

  const handleVideoClick = (video: GalleryVideo) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedVideo(null), 300)
  }

  return (
    <section className="bg-stone-950 py-12 md:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <div className="flex items-end justify-between mb-7 md:mb-8">
          <div>
            <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-stone-500 block mb-3">
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold !text-white leading-tight tracking-tight">
              Stories We&apos;ve Told
            </h2>
          </div>

          <Link
            href="/gallery"
            className="hidden md:inline-flex items-center gap-2 text-[13px] font-semibold text-stone-400 hover:text-white transition-colors duration-200 border border-stone-700 hover:border-stone-500 px-5 py-2.5 rounded-sm"
          >
            Full Gallery
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ── Bento Grid ── */}
        {/*
          Desktop 4-col layout (3 rows):
          [1: 2×2 big] [2] [3]
          [1 cont.   ] [4: 2×1 wide]
          [5] [6: 2×1 wide] [7]
        */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2.5"
          style={{ gridAutoRows: 'clamp(150px, 16vw, 230px)' }}
        >
          {/* Cell 1 — 2×2 big feature */}
          <div className="col-span-2 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3">
            <BentoCell
              videos={videoPools[0]}
              {...CELL_CONFIG[0]}
              onVideoClick={handleVideoClick}
              className="h-full w-full rounded-md"
            />
          </div>

          {/* Cell 2 — small */}
          <div className="md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2">
            <BentoCell
              videos={videoPools[1]}
              {...CELL_CONFIG[1]}
              onVideoClick={handleVideoClick}
              className="h-full w-full rounded-md"
            />
          </div>

          {/* Cell 3 — small */}
          <div className="md:col-start-4 md:col-end-5 md:row-start-1 md:row-end-2">
            <BentoCell
              videos={videoPools[2]}
              {...CELL_CONFIG[2]}
              onVideoClick={handleVideoClick}
              className="h-full w-full rounded-md"
            />
          </div>

          {/* Cell 4 — 2×1 wide (right side, row 2) */}
          <div className="col-span-2 md:col-start-3 md:col-end-5 md:row-start-2 md:row-end-3">
            <BentoCell
              videos={videoPools[3]}
              {...CELL_CONFIG[3]}
              onVideoClick={handleVideoClick}
              className="h-full w-full rounded-md"
            />
          </div>

          {/* Cell 5 — small (row 3, col 1) */}
          <div className="md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4">
            <BentoCell
              videos={videoPools[4]}
              {...CELL_CONFIG[4]}
              onVideoClick={handleVideoClick}
              className="h-full w-full rounded-md"
            />
          </div>

          {/* Cell 6 — 2×1 wide (row 3, col 2-3) */}
          <div className="md:col-start-2 md:col-end-4 md:row-start-3 md:row-end-4">
            <BentoCell
              videos={videoPools[5]}
              {...CELL_CONFIG[5]}
              onVideoClick={handleVideoClick}
              className="h-full w-full rounded-md"
            />
          </div>

          {/* Cell 7 — small (row 3, col 4) */}
          <div className="md:col-start-4 md:col-end-5 md:row-start-3 md:row-end-4">
            <BentoCell
              videos={videoPools[6]}
              {...CELL_CONFIG[6]}
              onVideoClick={handleVideoClick}
              className="h-full w-full rounded-md"
            />
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden text-center mt-8">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-stone-400 border border-stone-700 px-6 py-3 rounded-sm"
          >
            View Full Gallery
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
