import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../utilities/revalidate'

export const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'updatedAt'],
    group: 'Gallery',
  },
  access: {
    read: () => true, // Public read access for frontend
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Revalidate gallery page when image galleries are added, updated, or deleted
        await revalidateContent({
          collection: 'gallery-images',
          paths: ['/', '/gallery'],
          tags: ['gallery', 'images'],
        })

        console.log(
          `🔄 Revalidated gallery after ${operation} operation on image gallery: ${doc.title}`,
        )

        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Revalidate when an image gallery is deleted
        await revalidateContent({
          collection: 'gallery-images',
          paths: ['/', '/gallery'],
          tags: ['gallery', 'images'],
        })

        console.log(`🔄 Revalidated gallery after deleting image gallery: ${doc.title}`)
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Gallery Item Title',
      admin: {
        description: 'Title displayed for this image carousel',
      },
    },
    {
      name: 'section',
      type: 'relationship',
      relationTo: 'gallery-sections',
      required: true,
      hasMany: false,
      index: true,
      admin: {
        description: 'The gallery section this image carousel belongs to',
      },
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption',
          admin: {
            description: 'Optional caption for this image',
          },
        },
        {
          name: 'altText',
          type: 'text',
          label: 'Alt Text',
          admin: {
            description: 'Accessibility description (defaults to media alt if empty)',
          },
        },
      ],
      admin: {
        description: 'Upload multiple images for this carousel (1-20 images)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description for this image gallery',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        description: 'Featured image galleries are displayed larger at the top of each section',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      index: true,
      admin: {
        description: 'Display order within the section (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    {
      name: 'isVisible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Toggle gallery visibility',
        position: 'sidebar',
      },
    },
  ],
}
