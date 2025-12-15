'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
      className="py-12 md:py-16 lg:py-24 bg-stone-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
          >
            Our Services
          </motion.span>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            Video Production Services in Los Angeles
          </motion.h2>

          <motion.p
            className="text-lg text-stone-600 max-w-[800px] mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0, 0, 0.2, 1] }}
          >
            From concept to delivery, we offer comprehensive video production solutions tailored to
            your brand&apos;s unique needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="p-8 bg-white border border-stone-200 rounded-lg transition-all duration-300 ease-out relative overflow-hidden hover:bg-stone-50 hover:border-terracotta-500 hover:-translate-y-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
            >
              <div className="font-display text-sm font-medium text-stone-400 mb-4 tracking-wider">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-2xl mb-4 text-stone-900 leading-tight">{service.title}</h3>
              <p className="text-base text-stone-600 leading-relaxed mb-4">{service.description}</p>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                {service.keywords.map((keyword) => (
                  <li
                    key={keyword}
                    className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-sm border border-stone-200"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold bg-terracotta-500 text-white rounded-lg no-underline transition-all duration-200 hover:bg-terracotta-600 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2"
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
        </motion.div>
      </div>
    </motion.section>
  )
}
