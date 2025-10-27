'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

interface CarouselImage {
  image: string | Media
  caption?: string | null
  altText?: string | null
}

interface ImageCarouselProps {
  images: CarouselImage[]
  ariaLabel?: string
}

export function ImageCarousel({ images, ariaLabel }: ImageCarouselProps) {
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

  return (
    <div className="w-full relative" role="region" aria-label={ariaLabel || 'Image carousel'}>
      <div className="overflow-hidden relative">
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex gap-6 items-center">
            {images.map((item, index) => {
              const mediaItem = typeof item.image === 'object' ? item.image : null
              const imageUrl = mediaItem?.url || ''
              const alt = item.altText || mediaItem?.alt || `Image ${index + 1}`

              return (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 flex flex-col items-center"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${images.length}`}
                >
                  <div className="relative w-full aspect-video bg-stone-100 rounded-lg overflow-hidden">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 90vw"
                        priority={index === 0}
                      />
                    )}
                  </div>
                  {item.caption && (
                    <p className="mt-4 text-base md:text-lg text-stone-600 text-center max-w-[800px]">
                      {item.caption}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 md:px-8 pointer-events-none z-20">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
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
            aria-label="Next slide"
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
      </div>

      {/* Pagination Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex}
              className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-all duration-200 ease-out p-0 ${
                index === selectedIndex
                  ? 'bg-stone-900 w-6 rounded-[5px]'
                  : 'bg-stone-400 hover:bg-stone-500 hover:scale-110'
              } focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
