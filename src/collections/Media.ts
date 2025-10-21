import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../utilities/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
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
  upload: true,
}
