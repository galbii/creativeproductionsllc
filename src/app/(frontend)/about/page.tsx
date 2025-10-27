import React from 'react'
import { Header } from '@/components/Header'
import { AboutSections } from '@/components/AboutSections'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata = {
  title: 'About | Creative Productions LLC',
  description: 'Learn about our mission, approach, and capabilities in video production',
}

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })

  const teamMembers = await payload.find({
    collection: 'team-members',
    sort: 'order',
    depth: 1,
  })

  return (
    <>
      <Header />
      <AboutSections teamMembers={teamMembers.docs} />
    </>
  )
}
