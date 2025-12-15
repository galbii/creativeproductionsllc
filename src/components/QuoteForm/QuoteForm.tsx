'use client'

import React, { useState } from 'react'

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
    <form onSubmit={handleSubmit} className="max-w-[900px] mx-auto">
      {/* Contact Information */}
      <div className="mb-12 p-8 bg-white border border-stone-200 rounded-lg">
        <h2 className="text-2xl font-semibold text-stone-900 mb-6 pb-4 border-b border-stone-200">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-base font-body text-stone-900 bg-white border border-stone-300 rounded-md transition-all duration-200 ease-smooth focus:outline-none focus:border-terracotta-500 focus:shadow-[0_0_0_3px_rgba(194,112,93,0.1)] placeholder:text-stone-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-base font-body text-stone-900 bg-white border border-stone-300 rounded-md transition-all duration-200 ease-smooth focus:outline-none focus:border-terracotta-500 focus:shadow-[0_0_0_3px_rgba(194,112,93,0.1)] placeholder:text-stone-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 text-base font-body text-stone-900 bg-white border border-stone-300 rounded-md transition-all duration-200 ease-smooth focus:outline-none focus:border-terracotta-500 focus:shadow-[0_0_0_3px_rgba(194,112,93,0.1)] placeholder:text-stone-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="company" className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
              Company/Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 text-base font-body text-stone-900 bg-white border border-stone-300 rounded-md transition-all duration-200 ease-smooth focus:outline-none focus:border-terracotta-500 focus:shadow-[0_0_0_3px_rgba(194,112,93,0.1)] placeholder:text-stone-400"
            />
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="mb-12 p-8 bg-white border border-stone-200 rounded-lg">
        <h2 className="text-2xl font-semibold text-stone-900 mb-6 pb-4 border-b border-stone-200">
          Project Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="projectType" className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
              Project Type <span className="text-red-500">*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-base font-body text-stone-900 bg-white border border-stone-300 rounded-md transition-all duration-200 ease-smooth cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2012%2012%22%3E%3Cpath%20fill=%22%23a8a29e%22%20d=%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center] pr-12 focus:outline-none focus:border-terracotta-500 focus:shadow-[0_0_0_3px_rgba(194,112,93,0.1)]"
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

          <div className="flex flex-col">
            <label htmlFor="videoLength" className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
              Desired Video Length <span className="text-red-500">*</span>
            </label>
            <select
              id="videoLength"
              name="videoLength"
              value={formData.videoLength}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-base font-body text-stone-900 bg-white border border-stone-300 rounded-md transition-all duration-200 ease-smooth cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2012%2012%22%3E%3Cpath%20fill=%22%23a8a29e%22%20d=%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center] pr-12 focus:outline-none focus:border-terracotta-500 focus:shadow-[0_0_0_3px_rgba(194,112,93,0.1)]"
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

          <div className="flex flex-col col-span-1 md:col-span-2">
            <label htmlFor="projectTitle" className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
              Project Title
            </label>
            <input
              type="text"
              id="projectTitle"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 text-base font-body text-stone-900 bg-white border border-stone-300 rounded-md transition-all duration-200 ease-smooth focus:outline-none focus:border-terracotta-500 focus:shadow-[0_0_0_3px_rgba(194,112,93,0.1)] placeholder:text-stone-400"
              placeholder="What's the working title for your project?"
            />
          </div>

          <div className="flex flex-col col-span-1 md:col-span-2">
            <label htmlFor="projectDescription" className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 text-base font-body text-stone-900 bg-white border border-stone-300 rounded-md transition-all duration-200 ease-smooth resize-y min-h-[120px] leading-relaxed focus:outline-none focus:border-terracotta-500 focus:shadow-[0_0_0_3px_rgba(194,112,93,0.1)] placeholder:text-stone-400"
              placeholder="Please describe your project, goals, target audience, and key message..."
            />
          </div>
        </div>
      </div>

      {/* Timeline & Budget */}
      <div className="mb-12 p-8 bg-white border border-stone-200 rounded-lg">
        <h2 className="text-2xl font-semibold text-stone-900 mb-6 pb-4 border-b border-stone-200">
          Timeline & Budget
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="timeline" className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
              Project Timeline <span className="text-red-500">*</span>
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-base font-body text-stone-900 bg-white border border-stone-300 rounded-md transition-all duration-200 ease-smooth cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2012%2012%22%3E%3Cpath%20fill=%22%23a8a29e%22%20d=%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center] pr-12 focus:outline-none focus:border-terracotta-500 focus:shadow-[0_0_0_3px_rgba(194,112,93,0.1)]"
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

          <div className="flex flex-col">
            <label htmlFor="budget" className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
              Budget Range <span className="text-red-500">*</span>
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-base font-body text-stone-900 bg-white border border-stone-300 rounded-md transition-all duration-200 ease-smooth cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2012%2012%22%3E%3Cpath%20fill=%22%23a8a29e%22%20d=%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center] pr-12 focus:outline-none focus:border-terracotta-500 focus:shadow-[0_0_0_3px_rgba(194,112,93,0.1)]"
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
      <div className="mb-12 p-8 bg-white border border-stone-200 rounded-lg">
        <h2 className="text-2xl font-semibold text-stone-900 mb-6 pb-4 border-b border-stone-200">
          Production Services Needed
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <label className="flex items-center gap-3 p-3 cursor-pointer rounded-md transition-colors duration-200 ease-smooth hover:bg-stone-50">
            <input
              type="checkbox"
              name="needsScriptwriting"
              checked={formData.needsScriptwriting}
              onChange={handleChange}
              className="w-5 h-5 cursor-pointer accent-terracotta-500"
            />
            <span className="text-base text-stone-600 select-none">Scriptwriting</span>
          </label>

          <label className="flex items-center gap-3 p-3 cursor-pointer rounded-md transition-colors duration-200 ease-smooth hover:bg-stone-50">
            <input
              type="checkbox"
              name="needsLocationScouting"
              checked={formData.needsLocationScouting}
              onChange={handleChange}
              className="w-5 h-5 cursor-pointer accent-terracotta-500"
            />
            <span className="text-base text-stone-600 select-none">Location Scouting</span>
          </label>

          <label className="flex items-center gap-3 p-3 cursor-pointer rounded-md transition-colors duration-200 ease-smooth hover:bg-stone-50">
            <input
              type="checkbox"
              name="needsActorsCasting"
              checked={formData.needsActorsCasting}
              onChange={handleChange}
              className="w-5 h-5 cursor-pointer accent-terracotta-500"
            />
            <span className="text-base text-stone-600 select-none">Actors/Talent Casting</span>
          </label>

          <label className="flex items-center gap-3 p-3 cursor-pointer rounded-md transition-colors duration-200 ease-smooth hover:bg-stone-50">
            <input
              type="checkbox"
              name="needsPostProduction"
              checked={formData.needsPostProduction}
              onChange={handleChange}
              className="w-5 h-5 cursor-pointer accent-terracotta-500"
            />
            <span className="text-base text-stone-600 select-none">Post-Production/Editing</span>
          </label>

          <label className="flex items-center gap-3 p-3 cursor-pointer rounded-md transition-colors duration-200 ease-smooth hover:bg-stone-50">
            <input
              type="checkbox"
              name="needsMotionGraphics"
              checked={formData.needsMotionGraphics}
              onChange={handleChange}
              className="w-5 h-5 cursor-pointer accent-terracotta-500"
            />
            <span className="text-base text-stone-600 select-none">Motion Graphics/Animation</span>
          </label>

          <label className="flex items-center gap-3 p-3 cursor-pointer rounded-md transition-colors duration-200 ease-smooth hover:bg-stone-50">
            <input
              type="checkbox"
              name="needsVoiceover"
              checked={formData.needsVoiceover}
              onChange={handleChange}
              className="w-5 h-5 cursor-pointer accent-terracotta-500"
            />
            <span className="text-base text-stone-600 select-none">Voiceover/Narration</span>
          </label>
        </div>
      </div>

      {/* Distribution */}
      <div className="mb-12 p-8 bg-white border border-stone-200 rounded-lg">
        <h2 className="text-2xl font-semibold text-stone-900 mb-6 pb-4 border-b border-stone-200">
          Where will this video be used?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Website', 'Social Media', 'YouTube', 'Television', 'Events', 'Internal/Training'].map(
            (channel) => (
              <label key={channel} className="flex items-center gap-3 p-3 cursor-pointer rounded-md transition-colors duration-200 ease-smooth hover:bg-stone-50">
                <input
                  type="checkbox"
                  checked={formData.distributionChannels.includes(channel)}
                  onChange={() => handleDistributionChange(channel)}
                  className="w-5 h-5 cursor-pointer accent-terracotta-500"
                />
                <span className="text-base text-stone-600 select-none">{channel}</span>
              </label>
            ),
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mb-12 p-8 bg-white border border-stone-200 rounded-lg">
        <h2 className="text-2xl font-semibold text-stone-900 mb-6 pb-4 border-b border-stone-200">
          Additional Information
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label htmlFor="referenceLinks" className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
              Reference Links
            </label>
            <input
              type="text"
              id="referenceLinks"
              name="referenceLinks"
              value={formData.referenceLinks}
              onChange={handleChange}
              className="w-full px-4 py-3 text-base font-body text-stone-900 bg-white border border-stone-300 rounded-md transition-all duration-200 ease-smooth focus:outline-none focus:border-terracotta-500 focus:shadow-[0_0_0_3px_rgba(194,112,93,0.1)] placeholder:text-stone-400"
              placeholder="Links to videos you like or want to emulate (optional)"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="additionalNotes" className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 text-base font-body text-stone-900 bg-white border border-stone-300 rounded-md transition-all duration-200 ease-smooth resize-y min-h-[120px] leading-relaxed focus:outline-none focus:border-terracotta-500 focus:shadow-[0_0_0_3px_rgba(194,112,93,0.1)] placeholder:text-stone-400"
              placeholder="Any other details we should know about your project?"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-12">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold font-body text-white bg-terracotta-500 rounded-lg cursor-pointer transition-all duration-200 hover:bg-terracotta-600 hover:-translate-y-1 hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-terracotta-500 focus-visible:outline-offset-2"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
          {!isSubmitting && (
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
          )}
        </button>

        {submitStatus === 'success' && (
          <p className="mt-6 p-4 text-base text-green-400 bg-green-400/10 border border-green-600 rounded-md">
            Thank you! We&apos;ve received your consultation request and will be in touch within 24 hours.
          </p>
        )}

        {submitStatus === 'error' && (
          <p className="mt-6 p-4 text-base text-red-400 bg-red-400/10 border border-red-600 rounded-md">
            Something went wrong. Please try again or contact us directly.
          </p>
        )}
      </div>
    </form>
  )
}
