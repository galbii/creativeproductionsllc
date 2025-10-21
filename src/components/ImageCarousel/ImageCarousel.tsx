'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import styles from './ImageCarousel.module.css'

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
    <div className={styles.carousel} role="region" aria-label={ariaLabel || 'Image carousel'}>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={styles.embla__container}>
            {images.map((item, index) => {
              const mediaItem = typeof item.image === 'object' ? item.image : null
              const imageUrl = mediaItem?.url || ''
              const alt = item.altText || mediaItem?.alt || `Image ${index + 1}`

              return (
                <div
                  key={index}
                  className={styles.embla__slide}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${images.length}`}
                >
                  <div className={styles.imageWrapper}>
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={alt}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 90vw"
                        priority={index === 0}
                      />
                    )}
                  </div>
                  {item.caption && <p className={styles.caption}>{item.caption}</p>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className={styles.controls}>
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
            className={styles.button}
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
            className={styles.button}
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
        <div className={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex}
              className={`${styles.dot} ${index === selectedIndex ? styles.dotSelected : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
