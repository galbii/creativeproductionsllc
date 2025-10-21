'use client'

import React, { useState } from 'react'
import styles from './QuoteForm.module.css'

interface FormData {
  // Contact Information
  name: string
  email: string
  phone: string
  company: string

  // Project Details
  projectType: string
  projectTitle: string
  projectDescription: string

  // Timeline & Budget
  timeline: string
  budget: string

  // Production Needs
  needsScriptwriting: boolean
  needsLocationScouting: boolean
  needsActorsCasting: boolean
  needsPostProduction: boolean
  needsMotionGraphics: boolean
  needsVoiceover: boolean

  // Distribution
  distributionChannels: string[]
  videoLength: string

  // Additional Info
  referenceLinks: string
  additionalNotes: string
}

export function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectTitle: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    needsScriptwriting: false,
    needsLocationScouting: false,
    needsActorsCasting: false,
    needsPostProduction: true,
    needsMotionGraphics: false,
    needsVoiceover: false,
    distributionChannels: [],
    videoLength: '',
    referenceLinks: '',
    additionalNotes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleDistributionChange = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      distributionChannels: prev.distributionChannels.includes(channel)
        ? prev.distributionChannels.filter((c) => c !== channel)
        : [...prev.distributionChannels, channel],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Replace with actual API endpoint
      // For now, just simulate a submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log('Form submitted:', formData)
      setSubmitStatus('success')

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          projectTitle: '',
          projectDescription: '',
          timeline: '',
          budget: '',
          needsScriptwriting: false,
          needsLocationScouting: false,
          needsActorsCasting: false,
          needsPostProduction: true,
          needsMotionGraphics: false,
          needsVoiceover: false,
          distributionChannels: [],
          videoLength: '',
          referenceLinks: '',
          additionalNotes: '',
        })
        setSubmitStatus('idle')
      }, 3000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Contact Information */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact Information</h2>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Full Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="company" className={styles.label}>
              Company/Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Project Details</h2>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="projectType" className={styles.label}>
              Project Type <span className={styles.required}>*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select a project type</option>
              <option value="corporate">Corporate Video</option>
              <option value="commercial">Commercial/Advertisement</option>
              <option value="event">Event Coverage</option>
              <option value="documentary">Documentary</option>
              <option value="social-media">Social Media Content</option>
              <option value="training">Training/Educational Video</option>
              <option value="product">Product Demo</option>
              <option value="testimonial">Testimonial/Case Study</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="videoLength" className={styles.label}>
              Desired Video Length <span className={styles.required}>*</span>
            </label>
            <select
              id="videoLength"
              name="videoLength"
              value={formData.videoLength}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select length</option>
              <option value="under-30">Under 30 seconds</option>
              <option value="30-60">30-60 seconds</option>
              <option value="1-2">1-2 minutes</option>
              <option value="2-5">2-5 minutes</option>
              <option value="5-10">5-10 minutes</option>
              <option value="10-plus">10+ minutes</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>

          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="projectTitle" className={styles.label}>
              Project Title
            </label>
            <input
              type="text"
              id="projectTitle"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              className={styles.input}
              placeholder="What's the working title for your project?"
            />
          </div>

          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="projectDescription" className={styles.label}>
              Project Description <span className={styles.required}>*</span>
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              required
              rows={6}
              className={styles.textarea}
              placeholder="Please describe your project, goals, target audience, and key message..."
            />
          </div>
        </div>
      </div>

      {/* Timeline & Budget */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Timeline & Budget</h2>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="timeline" className={styles.label}>
              Project Timeline <span className={styles.required}>*</span>
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select timeline</option>
              <option value="asap">ASAP (Rush)</option>
              <option value="2-4-weeks">2-4 weeks</option>
              <option value="1-2-months">1-2 months</option>
              <option value="2-3-months">2-3 months</option>
              <option value="3-plus-months">3+ months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="budget" className={styles.label}>
              Budget Range <span className={styles.required}>*</span>
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select budget range</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="50k-plus">$50,000+</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Production Needs */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Production Services Needed</h2>
        <div className={styles.checkboxGrid}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="needsScriptwriting"
              checked={formData.needsScriptwriting}
              onChange={handleChange}
            />
            <span>Scriptwriting</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="needsLocationScouting"
              checked={formData.needsLocationScouting}
              onChange={handleChange}
            />
            <span>Location Scouting</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="needsActorsCasting"
              checked={formData.needsActorsCasting}
              onChange={handleChange}
            />
            <span>Actors/Talent Casting</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="needsPostProduction"
              checked={formData.needsPostProduction}
              onChange={handleChange}
            />
            <span>Post-Production/Editing</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="needsMotionGraphics"
              checked={formData.needsMotionGraphics}
              onChange={handleChange}
            />
            <span>Motion Graphics/Animation</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="needsVoiceover"
              checked={formData.needsVoiceover}
              onChange={handleChange}
            />
            <span>Voiceover/Narration</span>
          </label>
        </div>
      </div>

      {/* Distribution */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Where will this video be used?</h2>
        <div className={styles.checkboxGrid}>
          {['Website', 'Social Media', 'YouTube', 'Television', 'Events', 'Internal/Training'].map(
            (channel) => (
              <label key={channel} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.distributionChannels.includes(channel)}
                  onChange={() => handleDistributionChange(channel)}
                />
                <span>{channel}</span>
              </label>
            ),
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Additional Information</h2>
        <div className={styles.grid}>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="referenceLinks" className={styles.label}>
              Reference Links
            </label>
            <input
              type="text"
              id="referenceLinks"
              name="referenceLinks"
              value={formData.referenceLinks}
              onChange={handleChange}
              className={styles.input}
              placeholder="Links to videos you like or want to emulate (optional)"
            />
          </div>

          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="additionalNotes" className={styles.label}>
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={4}
              className={styles.textarea}
              placeholder="Any other details we should know about your project?"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className={styles.submitSection}>
        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
          {isSubmitting ? 'Submitting...' : 'Request Quote'}
        </button>

        {submitStatus === 'success' && (
          <p className={styles.successMessage}>
            Thank you! We&apos;ve received your quote request and will be in touch within 24 hours.
          </p>
        )}

        {submitStatus === 'error' && (
          <p className={styles.errorMessage}>
            Something went wrong. Please try again or contact us directly.
          </p>
        )}
      </div>
    </form>
  )
}
