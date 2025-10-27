'use client'

import React from 'react'
import { ImageCarousel } from '@/components/ImageCarousel'
import type { Media } from '@/payload-types'

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
  if (isFeatured) {
    return (
      <article className="bg-white border-2 border-stone-200 rounded-lg overflow-hidden transition-all duration-300 ease-out w-full shadow-xl hover:-translate-y-2 hover:border-terracotta-500 hover:shadow-2xl">
        <div className="relative bg-stone-100 p-4">
          <ImageCarousel images={gallery.images} ariaLabel={`${gallery.title} image gallery`} />
        </div>

        <div className="p-6 md:p-8 lg:p-12">
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">{gallery.title}</h3>
          {gallery.description && (
            <p className="text-base md:text-lg lg:text-xl mt-3 md:mt-4 lg:mt-6 leading-relaxed max-w-none text-stone-600">
              {gallery.description}
            </p>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className="bg-white border border-stone-200 rounded-md overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-terracotta-500 hover:shadow-lg">
      <div className="relative bg-stone-100 p-4">
        <ImageCarousel images={gallery.images} ariaLabel={`${gallery.title} image gallery`} />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-stone-900 mb-2">{gallery.title}</h3>
        {gallery.description && (
          <p className="text-sm text-stone-600 leading-relaxed m-0">{gallery.description}</p>
        )}
      </div>
    </article>
  )
}
