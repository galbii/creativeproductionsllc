import React from 'react'
import { Header } from '@/components/Header'
import { QuoteForm } from '@/components/QuoteForm/QuoteForm'
import styles from './page.module.css'

export const metadata = {
  title: 'Contact Us | Creative Productions LLC',
  description: 'Get a quote for your next video production project',
}

export default async function ContactPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={`${styles.hero} ${styles.section}`}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>Let&apos;s Create Something Amazing Together</h1>
            <p className={styles.heroSubtitle}>
              Tell us about your project and we&apos;ll get back to you within 24 hours with a
              custom quote
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className={`${styles.formSection} ${styles.section}`}>
          <div className={styles.container}>
            <QuoteForm />
          </div>
        </section>

        {/* Contact Info Section */}
        <section className={`${styles.infoSection} ${styles.section}`}>
          <div className={styles.container}>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3>Email</h3>
                <p>
                  <a href="mailto:hello@creativeproductions.com">hello@creativeproductions.com</a>
                </p>
              </div>
              <div className={styles.infoCard}>
                <h3>Phone</h3>
                <p>
                  <a href="tel:+15555551234">(555) 555-1234</a>
                </p>
              </div>
              <div className={styles.infoCard}>
                <h3>Response Time</h3>
                <p>We typically respond within 24 hours on business days</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
