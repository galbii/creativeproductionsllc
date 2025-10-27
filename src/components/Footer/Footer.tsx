'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="bg-stone-300 border-t border-stone-400">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-4 transition-opacity hover:opacity-80">
              <div className="relative w-14 h-14">
                <Image
                  src="/images/dropbox/creative productionscrest.jpg"
                  alt="Creative Productions Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display text-lg font-semibold text-stone-900 tracking-wide">
                Creative Productions LLC
              </span>
            </Link>
            <p className="text-base font-body italic text-stone-600 mb-4">
              Cinematic storytelling for brands that move people
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-stone-900 mb-6">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="font-body text-base text-stone-600 tracking-wide transition-colors hover:text-stone-900"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="font-body text-base text-stone-600 tracking-wide transition-colors hover:text-stone-900"
              >
                About
              </Link>
              <Link
                href="/gallery"
                className="font-body text-base text-stone-600 tracking-wide transition-colors hover:text-stone-900"
              >
                Gallery
              </Link>
              <Link
                href="/services"
                className="font-body text-base text-stone-600 tracking-wide transition-colors hover:text-stone-900"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="font-body text-base text-stone-600 tracking-wide transition-colors hover:text-stone-900"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-stone-900 mb-6">
              Get In Touch
            </h3>
            <div className="flex flex-col gap-3">
              <p className="font-body text-base text-stone-600">
                Los Angeles, California
              </p>
              <a
                href="tel:+13108802213"
                className="inline-flex items-center gap-2 font-body text-base text-stone-600 transition-colors hover:text-stone-900"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (310) 880-2213
              </a>
              <a
                href="mailto:joel@creativeproductionsllc.net"
                className="inline-flex items-center gap-2 font-body text-base text-stone-600 transition-colors hover:text-stone-900"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                joel@creativeproductionsllc.net
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 mt-2 bg-terracotta-500 text-white font-body text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-terracotta-600 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-400 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-stone-600 text-center md:text-left">
            Copyright © 2021 Creative Productions LLC - All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-body text-sm text-stone-600 transition-colors hover:text-stone-900"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-body text-sm text-stone-600 transition-colors hover:text-stone-900"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
