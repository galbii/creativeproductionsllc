import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../utilities/revalidate'

export const GalleryVideos: CollectionConfig = {
  slug: 'gallery-videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'videoType', 'updatedAt'],
    group: 'Gallery',
  },
  access: {
    read: () => true, // Public read access for frontend
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Revalidate gallery page when videos are added, updated, or deleted
        await revalidateContent({
          collection: 'gallery-videos',
          paths: ['/', '/gallery'],
          tags: ['gallery', 'videos'],
        })

        console.log(
          `🔄 Revalidated gallery after ${operation} operation on video: ${doc.title}`,
        )

        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Revalidate when a video is deleted
        await revalidateContent({
          collection: 'gallery-videos',
          paths: ['/', '/gallery'],
          tags: ['gallery', 'videos'],
        })

        console.log(`🔄 Revalidated gallery after deleting video: ${doc.title}`)
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Video Title',
      admin: {
        description: 'Title displayed below the video',
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
        description: 'The gallery section this video belongs to',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      required: true,
      label: 'Video URL',
      admin: {
        description:
          'Full URL from YouTube or Vimeo (e.g., https://www.youtube.com/watch?v=... or https://vimeo.com/...)',
      },
      validate: (value: unknown) => {
        if (!value) return true
        if (typeof value !== 'string') return 'Please enter a valid URL'

        // Validate YouTube or Vimeo URLs
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
        const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+/

        if (!youtubeRegex.test(value) && !vimeoRegex.test(value)) {
          return 'Please enter a valid YouTube or Vimeo URL'
        }

        return true
      },
    },
    {
      name: 'videoType',
      type: 'select',
      required: true,
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
      ],
      admin: {
        description: 'Auto-detected from URL, but can be manually set',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }: { value?: unknown; data?: Record<string, unknown> }) => {
            // Auto-detect video type from URL
            if (data?.videoUrl && typeof data.videoUrl === 'string') {
              if (
                data.videoUrl.includes('youtube.com') ||
                data.videoUrl.includes('youtu.be')
              ) {
                return 'youtube'
              }
              if (data.videoUrl.includes('vimeo.com')) {
                return 'vimeo'
              }
            }
            return value || 'youtube'
          },
        ],
      },
    },
    {
      name: 'videoId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Extracted video ID (auto-populated)',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }: { value?: unknown; data?: Record<string, unknown> }) => {
            // Extract video ID from URL
            if (!data?.videoUrl || typeof data.videoUrl !== 'string') return value

            const url = data.videoUrl
            let videoId = ''

            // YouTube extraction
            if (url.includes('youtube.com') || url.includes('youtu.be')) {
              const youtubeMatch = url.match(
                /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
              )
              videoId = youtubeMatch ? youtubeMatch[1] : ''
            }

            // Vimeo extraction
            if (url.includes('vimeo.com')) {
              const vimeoMatch = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/)
              videoId = vimeoMatch ? vimeoMatch[1] : ''
            }

            return videoId
          },
        ],
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional custom thumbnail (if not provided, platform default will be used)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional video description or caption',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: true,
      index: true,
      admin: {
        description: 'Featured videos are displayed larger at the top of each section',
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
        description: 'Toggle video visibility',
        position: 'sidebar',
      },
    },
  ],
}
