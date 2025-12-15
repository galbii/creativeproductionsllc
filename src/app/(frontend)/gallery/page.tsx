import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { HeaderWithNav } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { GalleryVideo, GallerySection } from '@/payload-types'
import { BentoGalleryContent } from '@/components/gallery/BentoGalleryContent'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return {
    title: 'Gallery | Creative Productions LLC',
    description: 'Browse our latest video productions across all categories.',
  }
}

export default async function GalleryPage() {
  const payload = await getPayload({ config })

  // Fetch all visible videos with section data populated
  const { docs: videos } = await payload.find({
    collection: 'gallery-videos',
    where: {
      isVisible: { equals: true },
    },
    sort: '-createdAt', // Most recent first
    depth: 1, // Populate section relationships
    limit: 100,
  })

  // Fetch all visible sections for the filter
  const { docs: sections } = await payload.find({
    collection: 'gallery-sections',
    where: {
      isVisible: { equals: true },
    },
    sort: 'order',
    limit: 50,
  })

  return (
    <>
      <HeaderWithNav />
      <main className="min-h-screen bg-white">
        <BentoGalleryContent
          videos={videos as GalleryVideo[]}
          sections={sections as GallerySection[]}
        />
      </main>
      <Footer />
    </>
  )
}
