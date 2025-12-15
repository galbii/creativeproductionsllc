'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { TeamMember as TeamMemberType } from '@/payload-types'

interface AboutSectionsProps {
  teamMembers: TeamMemberType[]
}

export function AboutSections({ teamMembers }: AboutSectionsProps) {
  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[60vh] flex items-center justify-center text-center py-12 md:py-16 lg:py-24 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://player.vimeo.com/video/868540633?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0"
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '100vw',
              height: '56.25vw',
              minHeight: '100%',
              minWidth: '177.77vh',
            }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="About Hero Background Video"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/60 to-stone-900/70 z-10" />
        </div>
        <h1 className="relative z-20 max-w-[900px] mx-auto px-6 md:px-8 lg:px-12 text-4xl md:text-5xl lg:text-6xl leading-tight !text-white">
          We bring bold ideas to life through the power of video storytelling
        </h1>
      </motion.section>

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="bg-stone-50 py-12 md:py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
            <motion.span
              className="inline-block font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
            >
              Our Team
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
            >
              Meet the People Behind the Work
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12">
              {teamMembers.map((member, index) => {
                const imageData = typeof member.image === 'object' ? member.image : null
                const imageUrl = imageData?.url || ''

                return (
                  <motion.div
                    key={member.id}
                    className="flex flex-col bg-white border border-stone-200 rounded-lg overflow-hidden transition-all duration-300 ease-out hover:bg-stone-50 hover:border-terracotta-500 hover:-translate-y-1.5"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + index * 0.15,
                      ease: [0, 0, 0.2, 1],
                    }}
                  >
                    {imageUrl && (
                      <div className="relative w-full aspect-square bg-stone-100 overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={imageData?.alt || member.name}
                          fill
                          className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-2xl font-semibold m-0 mb-2 text-stone-900">{member.name}</h3>
                      <p className="text-sm font-medium text-stone-500 uppercase tracking-wide m-0 mb-4">
                        {member.role}
                      </p>
                      <p className="text-base leading-relaxed text-stone-600 m-0">{member.bio}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Mission Section */}
      <motion.section
        className="py-12 md:py-16 lg:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.span
            className="inline-block font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          >
            Our Mission
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          >
            Creating Impact Through Creative Excellence
          </motion.h2>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            <p className="text-lg leading-relaxed text-stone-600 mb-6">
              At Creative Productions LLC, we specialize in creating compelling video content that
              resonates with audiences and drives measurable results. With years of experience in the
              Los Angeles production scene, we&apos;ve perfected the art of visual storytelling.
            </p>
            <p className="text-lg leading-relaxed text-stone-600 mb-6">
              Our team combines technical expertise with creative vision to deliver video content that
              exceeds expectations. From initial concept to final delivery, we&apos;re committed to
              producing work that stands out in today&apos;s crowded digital landscape.
            </p>
            <p className="text-lg leading-relaxed text-stone-600 mb-6">
              We believe that great video production is more than just capturing footage—it&apos;s
              about crafting narratives that connect, engage, and inspire action.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Capabilities Section */}
      <section className="bg-stone-50 py-12 md:py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.span
            className="inline-block font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          >
            What We Do
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          >
            Our Capabilities
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
            {[
              {
                number: '01',
                title: 'Pre-Production Planning',
                description:
                  'Strategic planning, scripting, storyboarding, and location scouting to ensure your project starts on the right foot.',
              },
              {
                number: '02',
                title: 'Professional Cinematography',
                description:
                  'State-of-the-art camera equipment and experienced cinematographers who know how to capture your vision.',
              },
              {
                number: '03',
                title: 'Creative Direction',
                description:
                  'Innovative approaches to storytelling that make your content stand out and resonate with your audience.',
              },
              {
                number: '04',
                title: 'Post-Production',
                description:
                  'Expert editing, color grading, sound design, and visual effects that bring your story to life.',
              },
              {
                number: '05',
                title: 'Motion Graphics',
                description:
                  'Eye-catching animations and graphics that enhance your message and elevate production value.',
              },
              {
                number: '06',
                title: 'Distribution Strategy',
                description:
                  'Guidance on optimizing and distributing your content across platforms for maximum impact.',
              },
            ].map((capability, index) => (
              <motion.div
                key={capability.number}
                className="p-8 bg-white border border-stone-200 rounded-md transition-all duration-300 ease-out hover:bg-stone-50 hover:border-terracotta-500 hover:-translate-y-1"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                  ease: [0, 0, 0.2, 1],
                }}
              >
                <div className="font-display text-sm font-medium text-stone-400 mb-4 tracking-wider">
                  {capability.number}
                </div>
                <h3 className="text-2xl mb-3 text-stone-900">{capability.title}</h3>
                <p className="text-base text-stone-600 leading-relaxed m-0">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.span
            className="inline-block font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          >
            Our Approach
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          >
            How We Work
          </motion.h2>

          <div className="mt-12 flex flex-col gap-16">
            {[
              {
                number: '1',
                title: 'Discovery & Strategy',
                description:
                  'We start by understanding your goals, audience, and message to develop a strategic approach.',
              },
              {
                number: '2',
                title: 'Creative Development',
                description:
                  'Our team crafts concepts, scripts, and storyboards that bring your vision to life.',
              },
              {
                number: '3',
                title: 'Production',
                description:
                  'We execute the shoot with precision, creativity, and professionalism on set.',
              },
              {
                number: '4',
                title: 'Post & Delivery',
                description:
                  'We polish your project in post-production and deliver files optimized for your needs.',
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                className="relative pl-16"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.15,
                  ease: [0, 0, 0.2, 1],
                }}
              >
                <div className="absolute left-0 top-0 font-display text-9xl font-extrabold text-stone-950 leading-none opacity-10 pointer-events-none">
                  {step.number}
                </div>
                <h3 className="text-3xl mb-4 relative z-10">{step.title}</h3>
                <p className="text-lg text-stone-600 leading-relaxed m-0">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="min-h-[60vh] flex items-center justify-center text-center py-12 md:py-16 lg:py-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="max-w-[700px] mx-auto mb-10 px-6 md:px-8 lg:px-12 text-3xl md:text-4xl lg:text-5xl leading-snug">
            Let&apos;s create something remarkable together
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-terracotta-500 text-white font-body text-base font-semibold no-underline rounded-md transition-all duration-300 ease-smooth border-2 border-terracotta-500 hover:bg-terracotta-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(194,112,93,0.2)]"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}
