import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../utilities/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Revalidate all pages when media is updated (images might be used anywhere)
        await revalidateContent({
          collection: 'media',
          paths: ['/', '/gallery', '/about'],
          tags: ['media'],
        })

        console.log(`🔄 Revalidated pages after ${operation} operation on media: ${doc.alt}`)

        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Revalidate when media is deleted
        await revalidateContent({
          collection: 'media',
          paths: ['/', '/gallery', '/about'],
          tags: ['media'],
        })

        console.log(`🔄 Revalidated pages after deleting media: ${doc.alt}`)
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'feature',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}
