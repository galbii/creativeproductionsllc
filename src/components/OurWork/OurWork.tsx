import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HeroVideoCarousel } from './HeroVideoCarousel'
import type { GalleryVideo } from '@/payload-types'

export async function OurWork() {
  const payload = await getPayload({ config })

  // Fetch featured videos
  const { docs: featuredVideos } = await payload.find({
    collection: 'gallery-videos',
    where: {
      and: [
        {
          isFeatured: {
            equals: true,
          },
        },
        {
          isVisible: {
            equals: true,
          },
        },
      ],
    },
    sort: 'order',
    limit: 10,
    depth: 1,
  })

  const hasVideos = featuredVideos && featuredVideos.length > 0

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-4">
            Featured Work
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-stone-900 mb-6 leading-tight">
            Stories That Move
          </h2>

          <p className="text-lg text-stone-600 max-w-[700px] mx-auto leading-relaxed">
            Experience the stories we&apos;ve brought to life. From concept to final cut, each
            project showcases our commitment to cinematic excellence.
          </p>
        </div>

        {/* Hero Video Carousel or Empty State */}
        {hasVideos ? (
          <HeroVideoCarousel videos={featuredVideos as GalleryVideo[]} />
        ) : (
          <div className="text-center py-16 px-6">
            <div className="max-w-md mx-auto bg-stone-50 border-2 border-dashed border-stone-300 rounded-lg p-8">
              <svg
                className="mx-auto h-12 w-12 text-stone-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg font-display font-semibold text-stone-900 mb-2">
                No Featured Videos Yet
              </h3>
              <p className="text-sm text-stone-600 mb-4">
                Add videos in the admin panel and mark them as featured to display them here.
              </p>
              <Link
                href="/admin/collections/gallery-videos"
                className="inline-flex items-center text-sm font-semibold text-terracotta-500 hover:text-terracotta-600"
              >
                Go to Admin Panel →
              </Link>
            </div>
          </div>
        )}

        {/* Book Consultation CTA */}
        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold bg-terracotta-500 text-white rounded-lg transition-all duration-200 hover:bg-terracotta-600 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2"
          >
            Book a Consultation
            <svg
              className="ml-3 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
