import React from 'react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import { HeaderWithNav } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { GallerySection, GalleryVideo } from '@/payload-types'
import { SectionGalleryContent } from '@/components/gallery/SectionGalleryContent'

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

  // Fetch videos for this section (sorted by most recent)
  const { docs: videos } = await payload.find({
    collection: 'gallery-videos',
    where: {
      and: [{ section: { equals: section.id } }, { isVisible: { equals: true } }],
    },
    sort: '-createdAt', // Most recent first
    limit: 100,
  })

  return (
    <>
      <HeaderWithNav />
      <main className="min-h-screen bg-stone-50">
        <SectionGalleryContent section={section as GallerySection} videos={videos as GalleryVideo[]} />
      </main>
      <Footer />
    </>
  )
}
