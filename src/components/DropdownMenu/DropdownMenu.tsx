'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface DropdownItem {
  label: string
  href: string
}

interface DropdownMenuProps {
  trigger: string
  items: DropdownItem[]
  mainHref?: string
}

export function DropdownMenu({ trigger, items, mainHref }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle dropdown visibility with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
    } else {
      const timer = setTimeout(() => setShouldRender(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {mainHref ? (
        <Link
          href={mainHref}
          className="
            font-body text-base font-medium text-stone-600 tracking-wide
            relative transition-colors hover:text-stone-900
            after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px]
            after:bg-stone-900 after:transition-all after:duration-200
            hover:after:w-full
            cursor-pointer inline-block z-10 pointer-events-auto
          "
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={(e) => {
            // Allow the link to navigate normally
            e.stopPropagation()
          }}
        >
          {trigger}
        </Link>
      ) : (
        <button
          className="
            font-body text-base font-medium text-stone-600 tracking-wide
            relative transition-colors hover:text-stone-900
            after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px]
            after:bg-stone-900 after:transition-all after:duration-200
            hover:after:w-full
            cursor-pointer
          "
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {trigger}
        </button>
      )}

      {shouldRender && items.length > 0 && (
        <div
          className={`
            absolute top-full left-0 mt-2 min-w-[200px]
            bg-white border border-stone-300 rounded-lg shadow-lg
            py-2 z-50
            transition-all duration-200
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}
          style={{ transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                block px-4 py-2 text-sm font-medium text-stone-700
                hover:bg-stone-100 hover:text-stone-900
                transition-colors duration-150
              "
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
