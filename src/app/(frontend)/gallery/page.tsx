import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Header } from '@/components/Header'
import { GalleryHero } from '@/components/GalleryHero/GalleryHero'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import type { GallerySection, GalleryVideo, GalleryImage } from '@/payload-types'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Gallery | Creative Productions LLC',
  description: 'Explore our portfolio of video productions and image galleries',
}

type SectionWithContent = GallerySection & {
  videos?: GalleryVideo[]
  images?: GalleryImage[]
}

export default async function GalleryPage() {
  const payload = await getPayload({ config })

  // Fetch all visible sections, sorted by order
  const { docs: sections } = await payload.find({
    collection: 'gallery-sections',
    where: {
      isVisible: { equals: true },
    },
    sort: 'order',
    limit: 100,
  })

  // For each section, fetch its content based on contentType
  const sectionsWithContent = await Promise.all(
    sections.map(async (section): Promise<SectionWithContent> => {
      if (section.contentType === 'video') {
        // Fetch videos for this section
        const { docs: videos } = await payload.find({
          collection: 'gallery-videos',
          where: {
            and: [{ section: { equals: section.id } }, { isVisible: { equals: true } }],
          },
          sort: 'order',
          depth: 0,
          limit: 50,
        })

        return {
          ...section,
          videos,
        }
      } else {
        // Fetch images for this section
        const { docs: images } = await payload.find({
          collection: 'gallery-images',
          where: {
            and: [{ section: { equals: section.id } }, { isVisible: { equals: true } }],
          },
          sort: 'order',
          depth: 1, // Populate image relationships
          limit: 50,
        })

        return {
          ...section,
          images,
        }
      }
    }),
  )

  // Filter out sections with no content
  const sectionsToDisplay = sectionsWithContent.filter((section) => {
    if (section.contentType === 'video') {
      return section.videos && section.videos.length > 0
    } else {
      return section.images && section.images.length > 0
    }
  })

  return (
    <>
      <Header />
      <main className={styles.main}>
        <GalleryHero />

        {sectionsToDisplay.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.container}>
              <p>No content available at the moment. Check back soon!</p>
            </div>
          </div>
        ) : (
          <GalleryGrid sections={sectionsToDisplay} />
        )}
      </main>
    </>
  )
}
