import React from 'react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import { HeaderWithNav } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { GallerySection, GalleryVideo } from '@/payload-types'
import { VideoCard } from '@/components/gallery/VideoCard'
import { ImageCard } from '@/components/gallery/ImageCard'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'gallery-sections',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const section = docs[0]

  if (!section) {
    return {
      title: 'Section Not Found | Creative Productions LLC',
    }
  }

  return {
    title: `${section.title} | Creative Productions LLC`,
    description: section.description || `Browse our ${section.title} collection`,
  }
}

export default async function GallerySectionPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  // Fetch the section by slug
  const { docs: sections } = await payload.find({
    collection: 'gallery-sections',
    where: {
      and: [{ slug: { equals: slug } }, { isVisible: { equals: true } }],
    },
    limit: 1,
  })

  const section = sections[0]

  // If section not found, show 404
  if (!section) {
    notFound()
  }

  // Fetch content based on section type
  let videos: GalleryVideo[] = []
  let images: any[] = []

  if (section.contentType === 'video') {
    const { docs: videoData } = await payload.find({
      collection: 'gallery-videos',
      where: {
        and: [{ section: { equals: section.id } }, { isVisible: { equals: true } }],
      },
      sort: 'order',
      limit: 100,
    })
    videos = videoData
  } else {
    const { docs: imageData } = await payload.find({
      collection: 'gallery-images',
      where: {
        and: [{ section: { equals: section.id } }, { isVisible: { equals: true } }],
      },
      sort: 'order',
      depth: 1,
      limit: 100,
    })
    images = imageData
  }

  // Separate featured and regular content
  const featuredVideos = videos.filter((video) => video.isFeatured)
  const regularVideos = videos.filter((video) => !video.isFeatured)
  const featuredImages = images.filter((img) => img.isFeatured)
  const regularImages = images.filter((img) => !img.isFeatured)

  return (
    <>
      <HeaderWithNav />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-6">
              {section.title}
            </h1>
            {section.description && (
              <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
                {section.description}
              </p>
            )}
          </div>
        </section>

        {/* Content Grid */}
        {section.contentType === 'video' ? (
          <section className="py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
              {/* Featured Videos */}
              {featuredVideos.length > 0 && (
                <div className="grid grid-cols-1 gap-10 md:gap-12 lg:gap-20 mb-16 md:mb-20 lg:mb-24 w-full mx-auto justify-items-center md:w-[95%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
                  {featuredVideos.map((video) => (
                    <div key={video.id} className="w-full">
                      <VideoCard video={video} isFeatured />
                    </div>
                  ))}
                </div>
              )}

              {/* Regular Videos */}
              {regularVideos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {videos.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-lg text-stone-600">
                    No videos available in this section yet. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
              {/* Featured Images */}
              {featuredImages.length > 0 && (
                <div className="grid grid-cols-1 gap-10 md:gap-12 lg:gap-20 mb-16 md:mb-20 lg:mb-24 w-full mx-auto justify-items-center md:w-[95%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
                  {featuredImages.map((gallery) => (
                    <div key={gallery.id} className="w-full">
                      <ImageCard gallery={gallery} isFeatured />
                    </div>
                  ))}
                </div>
              )}

              {/* Regular Images */}
              {regularImages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularImages.map((gallery) => (
                    <ImageCard key={gallery.id} gallery={gallery} />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {images.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-lg text-stone-600">
                    No images available in this section yet. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
