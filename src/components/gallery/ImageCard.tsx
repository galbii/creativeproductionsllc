'use client'

import React from 'react'
import { ImageCarousel } from '@/components/ImageCarousel'
import type { Media } from '@/payload-types'
import styles from './ImageCard.module.css'

interface CarouselImage {
  image: string | Media
  caption?: string | null
  altText?: string | null
}

interface ImageGallery {
  id: string | number
  title: string
  images: CarouselImage[]
  description?: string | null
}

interface ImageCardProps {
  gallery: ImageGallery
  isFeatured?: boolean
}

export function ImageCard({ gallery, isFeatured = false }: ImageCardProps) {
  return (
    <article className={isFeatured ? styles.featuredCard : styles.card}>
      <div className={styles.carouselWrapper}>
        <ImageCarousel images={gallery.images} ariaLabel={`${gallery.title} image gallery`} />
      </div>

      <div className={styles.info}>
        <h3>{gallery.title}</h3>
        {gallery.description && <p>{gallery.description}</p>}
      </div>
    </article>
  )
}
