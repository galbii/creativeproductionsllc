import React from 'react'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata = {
  title: 'Video Production Los Angeles | Creative Productions LLC',
  description:
    'Professional video production company in Los Angeles. Commercial, corporate, social media & event video services. Award-winning LA videographers. Get a quote today.',
  keywords:
    'video production Los Angeles, LA video production, commercial video production, corporate video LA, video production company Los Angeles, videographer LA, video services Los Angeles',
  openGraph: {
    title: 'Video Production Los Angeles | Creative Productions LLC',
    description:
      'Award-winning video production services in Los Angeles. Commercial, corporate & social media videos.',
    url: 'https://creativeproductions.com',
    siteName: 'Creative Productions LLC',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Production Los Angeles | Creative Productions LLC',
    description: 'Professional video production services in Los Angeles',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Structured Data for SEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Creative Productions LLC',
    description: 'Professional video production company in Los Angeles',
    url: 'https://creativeproductions.com',
    logo: 'https://creativeproductions.com/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-555-1234',
      contactType: 'customer service',
      email: 'hello@creativeproductions.com',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    sameAs: [
      // Add social media profiles here when available
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://creativeproductions.com',
    name: 'Creative Productions LLC',
    image: 'https://creativeproductions.com/logo.png',
    description:
      'Award-winning video production company serving Los Angeles. Specializing in commercial, corporate, social media, and event video production.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.0522,
      longitude: -118.2437,
    },
    url: 'https://creativeproductions.com',
    telephone: '+1-555-555-1234',
    email: 'hello@creativeproductions.com',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '50',
    },
    servesCuisine: undefined,
    areaServed: {
      '@type': 'City',
      name: 'Los Angeles',
    },
  }

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
