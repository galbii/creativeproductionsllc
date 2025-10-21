import React from 'react'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { ServicesSection } from '@/components/ServicesSection'

export const metadata = {
  title: 'Video Production Los Angeles | Creative Productions LLC',
  description:
    'Award-winning video production company in Los Angeles. Commercial, corporate, social media & event video services. Professional LA videographers. Free quotes available.',
  alternates: {
    canonical: 'https://creativeproductions.com',
  },
}

export default async function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
      </main>
    </>
  )
}
