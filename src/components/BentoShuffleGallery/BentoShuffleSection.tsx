import { getPayload } from 'payload'
import config from '@payload-config'
import { BentoShuffleGallery } from './BentoShuffleGallery'
import type { GalleryVideo } from '@/payload-types'

export async function BentoShuffleSection() {
  const payload = await getPayload({ config })

  const { docs: videos } = await payload.find({
    collection: 'gallery-videos',
    where: {
      isVisible: { equals: true },
    },
    limit: 200,
    depth: 0,
  })

  if (!videos || videos.length === 0) return null

  return <BentoShuffleGallery videos={videos as GalleryVideo[]} />
}
