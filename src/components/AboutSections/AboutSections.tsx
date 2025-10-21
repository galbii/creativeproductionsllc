'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { TeamMember as TeamMemberType, Media } from '@/payload-types'
import styles from './AboutSections.module.css'

interface AboutSectionsProps {
  teamMembers: TeamMemberType[]
}

export function AboutSections({ teamMembers }: AboutSectionsProps) {
  return (
    <>
      {/* Hero Section */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
      >
        <h1 className={styles.heroTitle}>
          We bring bold ideas to life through the power of video storytelling
        </h1>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className={styles.mission}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.container}>
          <motion.span
            className={styles.label}
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
            className={styles.textContent}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            <p>
              At Creative Productions LLC, we specialize in creating compelling video content that
              resonates with audiences and drives measurable results. With years of experience in the
              Los Angeles production scene, we&apos;ve perfected the art of visual storytelling.
            </p>
            <p>
              Our team combines technical expertise with creative vision to deliver video content that
              exceeds expectations. From initial concept to final delivery, we&apos;re committed to
              producing work that stands out in today&apos;s crowded digital landscape.
            </p>
            <p>
              We believe that great video production is more than just capturing footage—it&apos;s
              about crafting narratives that connect, engage, and inspire action.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Capabilities Section */}
      <section className={styles.capabilities}>
        <div className={styles.container}>
          <motion.span
            className={styles.label}
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

          <div className={styles.grid}>
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
                className={styles.card}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                  ease: [0, 0, 0.2, 1],
                }}
              >
                <div className={styles.cardNumber}>{capability.number}</div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.process}>
        <div className={styles.container}>
          <motion.span
            className={styles.label}
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

          <div className={styles.steps}>
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
                className={styles.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.15,
                  ease: [0, 0, 0.2, 1],
                }}
              >
                <div className={styles.stepNumber}>{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className={styles.team}>
          <div className={styles.container}>
            <motion.span
              className={styles.label}
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

            <div className={styles.teamGrid}>
              {teamMembers.map((member, index) => {
                const imageData = typeof member.image === 'object' ? member.image : null
                const imageUrl = imageData?.url || ''

                return (
                  <motion.div
                    key={member.id}
                    className={styles.teamCard}
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
                      <div className={styles.teamImageWrapper}>
                        <Image
                          src={imageUrl}
                          alt={imageData?.alt || member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className={styles.teamContent}>
                      <h3>{member.name}</h3>
                      <p className={styles.role}>{member.role}</p>
                      <p>{member.bio}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <motion.section
        className={styles.cta}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
      >
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Let&apos;s create something remarkable together</h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            <Link href="/contact" className={styles.ctaButton}>
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}
