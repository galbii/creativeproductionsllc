import React from 'react'
import { HeaderWithNav } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactHeader } from '@/components/ContactHeader'
import { ContactInfo } from '@/components/ContactInfo'
import { QuoteForm } from '@/components/QuoteForm/QuoteForm'

export const metadata = {
  title: 'Contact Us | Creative Productions LLC',
  description: 'Get in touch with Creative Productions LLC. Professional video production services in Los Angeles. Call (310) 880-2213 or email joel@creativeproductionsllc.net for a quote.',
}

export default async function ContactPage() {
  return (
    <>
      <HeaderWithNav />
      <main>
        {/* Header Section */}
        <ContactHeader />

        {/* Contact Info with Map */}
        <ContactInfo phone="(310) 880-2213" email="joel@creativeproductionsllc.net" />

        {/* Quote Form Section */}
        <section className="py-16 md:py-20 lg:py-24 px-6 md:px-10 bg-stone-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                Request a Quote
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Tell us about your project and we&apos;ll get back to you within 24 hours with a custom quote
              </p>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
