import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { HeaderClient } from './HeaderClient'

export async function HeaderWithNav() {
  const payload = await getPayload({ config })

  // Fetch visible gallery sections for navigation
  const { docs: sections } = await payload.find({
    collection: 'gallery-sections',
    where: {
      isVisible: { equals: true },
    },
    sort: 'order',
    limit: 100,
  })

  // Transform sections into dropdown items
  const galleryItems = sections.map((section) => ({
    label: section.title,
    href: `/gallery/${section.slug}`,
  }))

  return <HeaderClient galleryItems={galleryItems} />
}
