'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './Header.module.css'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Creative Productions LLC
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
          <Link href="/gallery" className={styles.navLink}>
            Gallery
          </Link>
          <Link href="/services" className={styles.navLink}>
            Services
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Contact
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}
