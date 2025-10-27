'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ContactInfoProps {
  phone?: string
  email?: string
}

export function ContactInfo({
  phone = '(310) 880-2213',
  email = 'joel@creativeproductionsllc.net',
}: ContactInfoProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            Visit Us in Los Angeles
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Based in the heart of LA County, we&apos;re ready to bring your creative vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-stone-200"
          >
            <iframe
              title="Los Angeles County Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423283.43480069877!2d-118.69191531640625!3d34.02060633923591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1652889487821!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Contact Information Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* Phone */}
            <div className="group">
              <div className="flex items-start space-x-4 p-6 rounded-xl bg-stone-50 border border-stone-200 transition-all duration-300 hover:border-terracotta-300 hover:shadow-md">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-terracotta-100 text-terracotta-600 group-hover:bg-terracotta-500 group-hover:text-white transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    Phone
                  </h3>
                  <a
                    href={`tel:${phone.replace(/\D/g, '')}`}
                    className="text-2xl font-display font-bold text-stone-900 hover:text-terracotta-600 transition-colors duration-200"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <div className="flex items-start space-x-4 p-6 rounded-xl bg-stone-50 border border-stone-200 transition-all duration-300 hover:border-sage-300 hover:shadow-md">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-sage-100 text-sage-600 group-hover:bg-sage-400 group-hover:text-white transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${email}`}
                    className="text-xl md:text-2xl font-display font-bold text-stone-900 hover:text-sage-600 transition-colors duration-200 break-words"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="group">
              <div className="flex items-start space-x-4 p-6 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-stone-200 text-stone-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    Response Time
                  </h3>
                  <p className="text-lg text-stone-700 leading-relaxed">
                    We typically respond within 24 hours on business days
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
