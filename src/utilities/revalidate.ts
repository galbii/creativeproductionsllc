import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Revalidation utility for Payload CMS collections
 * This function triggers Next.js on-demand revalidation when content changes
 */

interface RevalidateOptions {
  collection?: string
  slug?: string
  paths?: string[]
  tags?: string[]
}

/**
 * Revalidate specific paths and tags based on collection changes
 * @param options - Configuration for revalidation
 */
export async function revalidateContent(options: RevalidateOptions): Promise<void> {
  const { collection, slug, paths = [], tags = [] } = options

  try {
    // Revalidate collection-specific paths
    if (collection) {
      // Always revalidate the homepage as it might show recent content
      revalidatePath('/')

      // Revalidate collection-specific pages
      switch (collection) {
        case 'gallery-videos':
        case 'gallery-sections':
          // Revalidate gallery page
          revalidatePath('/gallery')
          revalidateTag('gallery')
          break

        case 'team-members':
          // Revalidate about page (if you have team members there)
          revalidatePath('/about')
          revalidateTag('team')
          break

        case 'media':
          // Revalidate all pages that might use media
          revalidatePath('/', 'layout')
          revalidateTag('media')
          break

        default:
          // For any other collection, revalidate homepage
          revalidatePath('/')
          break
      }

      // If a slug is provided, revalidate the specific item page
      if (slug) {
        const itemPath = `/${collection}/${slug}`
        revalidatePath(itemPath)
      }
    }

    // Revalidate custom paths
    for (const path of paths) {
      revalidatePath(path)
    }

    // Revalidate custom tags
    for (const tag of tags) {
      revalidateTag(tag)
    }

    console.log(`✅ Revalidated content for ${collection || 'custom paths'}`)
  } catch (error) {
    console.error('❌ Error revalidating content:', error)
    // Don't throw - we don't want revalidation errors to break the CMS operation
  }
}

/**
 * Helper function to get revalidation paths for a specific collection
 * @param collection - The collection slug
 * @returns Array of paths to revalidate
 */
export function getRevalidationPaths(collection: string): string[] {
  const pathMap: Record<string, string[]> = {
    'gallery-videos': ['/', '/gallery'],
    'gallery-sections': ['/', '/gallery'],
    'team-members': ['/', '/about'],
    media: ['/'],
  }

  return pathMap[collection] || ['/']
}

/**
 * Helper function to get revalidation tags for a specific collection
 * @param collection - The collection slug
 * @returns Array of tags to revalidate
 */
export function getRevalidationTags(collection: string): string[] {
  const tagMap: Record<string, string[]> = {
    'gallery-videos': ['gallery', 'videos'],
    'gallery-sections': ['gallery', 'sections'],
    'team-members': ['team', 'about'],
    media: ['media'],
  }

  return tagMap[collection] || []
}
