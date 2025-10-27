import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../utilities/revalidate'

export const GallerySections: CollectionConfig = {
  slug: 'gallery-sections',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
    group: 'Gallery',
  },
  access: {
    read: () => true, // Public read access for frontend
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Revalidate gallery page when sections are added, updated, or deleted
        await revalidateContent({
          collection: 'gallery-sections',
          paths: ['/', '/gallery'],
          tags: ['gallery', 'sections'],
        })

        console.log(
          `🔄 Revalidated gallery after ${operation} operation on section: ${doc.title}`,
        )

        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Revalidate when a section is deleted
        await revalidateContent({
          collection: 'gallery-sections',
          paths: ['/', '/gallery'],
          tags: ['gallery', 'sections'],
        })

        console.log(`🔄 Revalidated gallery after deleting section: ${doc.title}`)
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
      admin: {
        description:
          'The title displayed for this gallery section (e.g., "Corporate Videos", "Event Highlights")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly identifier for this section',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }: { value?: unknown; data?: Record<string, unknown> }) => {
            // Auto-generate slug from title if not provided
            if (!value && data?.title && typeof data.title === 'string') {
              return data.title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description for this section',
      },
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      defaultValue: 'video',
      options: [
        { label: 'Video Gallery', value: 'video' },
        { label: 'Image Gallery', value: 'image' },
      ],
      admin: {
        description: 'Type of content this section displays',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      index: true,
      admin: {
        description: 'Display order (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    {
      name: 'isVisible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Toggle section visibility on the frontend',
        position: 'sidebar',
      },
    },
  ],
}
