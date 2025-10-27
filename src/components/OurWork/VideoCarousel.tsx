'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import type { GalleryVideo } from '@/payload-types'

interface VideoCarouselProps {
  videos: GalleryVideo[]
}

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        scrollNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollPrev, scrollNext])

  const getVideoThumbnail = (video: GalleryVideo): string => {
    if (!video.videoId) return ''

    if (video.videoType === 'youtube') {
      return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
    } else if (video.videoType === 'vimeo') {
      // Vimeo thumbnails require API call, fallback to placeholder
      return `https://vumbnail.com/${video.videoId}.jpg`
    }
    return ''
  }

  const getVideoEmbedUrl = (video: GalleryVideo): string => {
    if (!video.videoId) return ''

    if (video.videoType === 'youtube') {
      return `https://www.youtube.com/embed/${video.videoId}?autoplay=1`
    } else if (video.videoType === 'vimeo') {
      return `https://player.vimeo.com/video/${video.videoId}?autoplay=1`
    }
    return ''
  }

  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  const handlePlayVideo = (index: number) => {
    setPlayingIndex(index)
  }

  return (
    <div className="w-full relative" role="region" aria-label="Featured work video carousel">
      <div className="overflow-hidden relative">
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex gap-6 items-center">
            {videos.map((video, index) => {
              const thumbnail = getVideoThumbnail(video)
              const embedUrl = getVideoEmbedUrl(video)
              const isPlaying = playingIndex === index

              return (
                <div
                  key={video.id}
                  className="flex-[0_0_100%] min-w-0 flex flex-col items-center"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${videos.length}`}
                >
                  <div className="relative w-full aspect-video bg-stone-100 rounded-lg overflow-hidden group">
                    {isPlaying ? (
                      <iframe
                        src={embedUrl}
                        title={video.title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        {thumbnail && (
                          <Image
                            src={thumbnail}
                            alt={video.title || `Video ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 90vw"
                            priority={index === 0}
                            unoptimized
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />

                        {/* Play button overlay */}
                        <button
                          onClick={() => handlePlayVideo(index)}
                          aria-label={`Play ${video.title}`}
                          className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                        >
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-terracotta-500/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-terracotta-600 group-hover:scale-110">
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="white"
                              className="ml-1"
                            >
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </div>
                        </button>

                        {/* Video title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 !text-white">
                          <h3 className="text-xl md:text-2xl font-display font-bold mb-2 !text-white">
                            {video.title}
                          </h3>
                          {video.description && (
                            <p className="text-sm md:text-base !text-white/90 line-clamp-2">
                              {video.description}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        {videos.length > 1 && (
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 md:px-8 pointer-events-none z-20">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous video"
              className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-stone-900/60 backdrop-blur-sm border border-stone-200 rounded-full text-white cursor-pointer transition-all duration-200 ease-out pointer-events-auto hover:bg-stone-900/80 hover:border-stone-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next video"
              className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-stone-900/60 backdrop-blur-sm border border-stone-200 rounded-full text-white cursor-pointer transition-all duration-200 ease-out pointer-events-auto hover:bg-stone-900/80 hover:border-stone-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Pagination Dots */}
      {videos.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to video ${index + 1}`}
              aria-current={index === selectedIndex}
              className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-all duration-200 ease-out p-0 ${
                index === selectedIndex
                  ? 'bg-terracotta-500 w-6 rounded-[5px]'
                  : 'bg-stone-400 hover:bg-stone-500 hover:scale-110'
              } focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
