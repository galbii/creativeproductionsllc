'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './ServicesSection.module.css'

const services = [
  {
    title: 'Commercial Video Production',
    description:
      'High-impact commercials for television, streaming platforms, and digital advertising campaigns that drive results.',
    keywords: ['TV commercials', 'digital ads', 'brand videos'],
  },
  {
    title: 'Corporate Video Services',
    description:
      'Professional corporate videos, training content, and internal communications that elevate your brand.',
    keywords: ['training videos', 'company culture', 'presentations'],
  },
  {
    title: 'Social Media Video Content',
    description:
      'Engaging short-form videos optimized for Instagram, TikTok, YouTube, and other social platforms.',
    keywords: ['Instagram Reels', 'TikTok', 'YouTube Shorts'],
  },
  {
    title: 'Event Video Coverage',
    description:
      'Capture your conferences, product launches, and special events with cinematic quality.',
    keywords: ['conferences', 'product launches', 'live events'],
  },
  {
    title: 'Product Demo Videos',
    description:
      'Showcase your products with compelling demos that convert viewers into customers.',
    keywords: ['e-commerce', 'product launches', 'explainer videos'],
  },
  {
    title: 'Testimonial & Case Studies',
    description:
      'Authentic customer stories and case studies that build trust and credibility.',
    keywords: ['client testimonials', 'success stories', 'reviews'],
  },
]

export function ServicesSection() {
  return (
    <motion.section
      className={styles.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
          >
            Our Services
          </motion.span>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            Video Production Services in Los Angeles
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0, 0, 0.2, 1] }}
          >
            From concept to delivery, we offer comprehensive video production solutions tailored to
            your brand&apos;s unique needs
          </motion.p>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + index * 0.1,
                ease: [0, 0, 0.2, 1],
              }}
            >
              <div className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <ul className={styles.keywords}>
                {service.keywords.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 1.1, ease: [0, 0, 0.2, 1] }}
        >
          <Link href="/contact" className={styles.ctaButton}>
            Get a Free Quote
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
