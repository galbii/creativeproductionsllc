# Styling Configuration Guide

This document explains how styling is configured in the Creative Productions LLC website.

---

## Table of Contents

1. [Overview](#overview)
2. [Tailwind CSS Setup](#tailwind-css-setup)
3. [Color System](#color-system)
4. [Design Tokens](#design-tokens)
5. [Component Styling Patterns](#component-styling-patterns)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Overview

**Styling Architecture:**
- **Framework**: Tailwind CSS v4 (utility-first CSS framework)
- **Approach**: Utility classes in components + custom theme configuration
- **Color Scheme**: Light, earthy tones with warm neutrals (white, off-white, stone palette, terracotta accents)
- **Responsive**: Mobile-first design with Tailwind breakpoints

**Why Tailwind CSS?**
- **Utility-First**: Faster development with pre-built classes
- **Maintainability**: No orphaned CSS or naming conflicts
- **Consistency**: Design tokens enforced through theme configuration
- **Performance**: PurgeCSS automatically removes unused styles
- **Developer Experience**: IntelliSense support, easy to read and modify

---

## Tailwind CSS Setup

### Installation

Tailwind CSS v4 is installed with the following packages:

```bash
bun add -D tailwindcss@latest
bun add -D @tailwindcss/postcss@latest
bun add -D postcss@latest
bun add -D autoprefixer@latest
```

### Configuration Files

#### 1. `postcss.config.mjs`

Located at the project root, this configures PostCSS to use Tailwind:

```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Tailwind v4 PostCSS plugin
  },
}

export default config
```

**Important**: Tailwind v4 requires `@tailwindcss/postcss`, not the old `tailwindcss` plugin.

#### 2. `src/app/(frontend)/globals.css`

This is the main CSS file for the frontend that imports Tailwind and defines the custom theme:

```css
@import 'tailwindcss';

@theme {
  /* Custom colors, fonts, spacing, etc. */
}

/* Base styles, typography, utilities */
```

**Imported in**: `src/app/(frontend)/layout.tsx`

```typescript
import './globals.css'
```

---

## Color System

### Color Palette

Our design uses a warm, earthy color scheme built on Tailwind's **stone** palette with custom accent colors.

#### Primary Colors (Stone Palette)

These are Tailwind's built-in stone colors, used for neutrals:

| Color | CSS Class | Hex | Usage |
|-------|-----------|-----|-------|
| **White** | `bg-white`, `text-white` | `#FFFFFF` | Primary background |
| **Stone 50** | `bg-stone-50` | `#FAFAF9` | Off-white background |
| **Stone 100** | `bg-stone-100` | `#F5F5F4` | Cream background |
| **Stone 200** | `bg-stone-200` | `#E7E5E4` | Header, light grey sections |
| **Stone 300** | `bg-stone-300` | `#D6D3D1` | Medium borders |
| **Stone 400** | `text-stone-400` | `#A8A29E` | Tertiary text |
| **Stone 500** | `text-stone-500` | `#78716C` | Secondary accents |
| **Stone 600** | `text-stone-600` | `#57534E` | Secondary text |
| **Stone 800** | `text-stone-800` | `#292524` | Body text |
| **Stone 900** | `text-stone-900` | `#1C1917` | Headings, primary text |

#### Custom Accent Colors

Defined in `@theme` block in `globals.css`:

**Terracotta (Primary Accent):**
```css
--color-terracotta-50: #fdf5f3;
--color-terracotta-100: #fbe8e3;
--color-terracotta-200: #f7cec3;
--color-terracotta-300: #f0a99a;
--color-terracotta-400: #e57a63;
--color-terracotta-500: #c2705d; /* PRIMARY */
--color-terracotta-600: #a85642;
--color-terracotta-700: #8b4536;
--color-terracotta-800: #6f3a2f;
--color-terracotta-900: #5a3228;
```

**Usage:**
- Primary CTAs (buttons, links)
- Hover states
- Focus indicators
- Brand accents

**Example:**
```jsx
<button className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
  Contact Us
</button>
```

**Sage Green (Secondary Accent):**
```css
--color-sage-50: #f6f7f6;
--color-sage-100: #e8eae8;
--color-sage-200: #d4d8d4;
--color-sage-300: #b3bcb3;
--color-sage-400: #8b9a8b; /* PRIMARY */
--color-sage-500: #6d7e6d;
--color-sage-600: #586758;
--color-sage-700: #495449;
--color-sage-800: #3d453d;
--color-sage-900: #343a34;
```

**Usage:**
- Subtle accents
- Secondary buttons
- Badge colors

---

## Design Tokens

Design tokens are defined in the `@theme` block of `globals.css`.

### Typography

**Font Families:**
```css
--font-display: var(--font-outfit, 'Outfit', ...); /* Headings */
--font-body: var(--font-inter, 'Inter', ...);      /* Body text */
```

**Usage in Components:**
```jsx
<h1 className="font-display text-5xl font-bold">Heading</h1>
<p className="font-body text-base">Body text</p>
```

**Font Sizes (Tailwind Defaults):**
- `text-xs` - 12px
- `text-sm` - 14px
- `text-base` - 16px
- `text-lg` - 18px
- `text-xl` - 20px
- `text-2xl` - 24px
- `text-3xl` - 30px
- `text-4xl` - 36px
- `text-5xl` - 48px
- `text-6xl` - 60px
- `text-7xl` - 72px

**Responsive Typography:**
```jsx
<h1 className="text-3xl md:text-5xl lg:text-7xl">
  Responsive Heading
</h1>
```

### Spacing

Tailwind uses an 8px grid system with the following scale:

- `p-0` - 0px
- `p-1` - 4px
- `p-2` - 8px
- `p-3` - 12px
- `p-4` - 16px
- `p-6` - 24px
- `p-8` - 32px
- `p-10` - 40px
- `p-12` - 48px
- `p-16` - 64px
- `p-20` - 80px
- `p-24` - 96px

**Custom Section Spacing:**
```css
--spacing-section-y: 6rem; /* 96px */
--spacing-section-x: 2rem; /* 32px */
```

### Animations

**Duration:**
```css
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-moderate: 300ms;
--duration-slow: 400ms;
```

**Easing Functions:**
```css
--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

**Usage:**
```jsx
<div className="transition-all duration-300 hover:scale-105">
  Animated Element
</div>
```

### Responsive Breakpoints

Tailwind uses mobile-first breakpoints:

| Breakpoint | Min Width | CSS Prefix | Usage |
|------------|-----------|------------|-------|
| `sm` | 640px | `sm:` | Small tablets |
| `md` | 768px | `md:` | Tablets |
| `lg` | 1024px | `lg:` | Laptops |
| `xl` | 1280px | `xl:` | Desktops |
| `2xl` | 1536px | `2xl:` | Large desktops |

**Example:**
```jsx
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
  {/* Column on mobile, row on tablet+ */}
</div>
```

---

## Component Styling Patterns

### Pattern 1: Layout Components

**Example: Header**

```jsx
<header className="sticky top-0 z-50 bg-stone-200/90 backdrop-blur-xl">
  <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-4 md:py-6">
    {/* Content */}
  </div>
</header>
```

**Key Classes:**
- `max-w-7xl mx-auto` - Container with max width, centered
- `px-6 md:px-10 lg:px-16` - Responsive horizontal padding
- `backdrop-blur-xl` - Frosted glass effect

### Pattern 2: Cards

**Example: VideoCard**

```jsx
<div className="
  bg-white border border-stone-200 rounded-lg overflow-hidden
  transition-all duration-300
  hover:shadow-lg hover:-translate-y-1
">
  {/* Card content */}
</div>
```

**Key Classes:**
- `bg-white` - White background
- `border border-stone-200` - Light border
- `rounded-lg` - Rounded corners (12px)
- `hover:shadow-lg hover:-translate-y-1` - Lift on hover

### Pattern 3: Buttons

**Primary Button (Terracotta):**

```jsx
<button className="
  inline-flex items-center justify-center
  px-8 py-4 min-w-[200px]
  bg-terracotta-500 text-white
  border-2 border-terracotta-500
  rounded-lg font-semibold
  transition-all duration-200
  hover:bg-terracotta-600
  hover:-translate-y-0.5 hover:shadow-lg
  focus-visible:outline-2 focus-visible:outline-terracotta-500
">
  Contact Us
</button>
```

**Secondary Button (Outline):**

```jsx
<button className="
  inline-flex items-center justify-center
  px-8 py-4
  bg-transparent text-stone-900
  border-2 border-stone-900
  rounded-lg font-semibold
  transition-all duration-200
  hover:bg-stone-900 hover:text-white
">
  Learn More
</button>
```

### Pattern 4: Forms

**Input Fields:**

```jsx
<input
  type="text"
  className="
    w-full px-4 py-3
    bg-white text-stone-900
    border-2 border-stone-300
    rounded-lg
    focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20
    transition-colors duration-200
  "
  placeholder="Your name"
/>
```

### Pattern 5: Sections

**Alternating Background Sections:**

```jsx
{/* White section */}
<section className="bg-white py-16 md:py-20 lg:py-24">
  <div className="container mx-auto px-6">
    {/* Content */}
  </div>
</section>

{/* Off-white section */}
<section className="bg-stone-50 py-16 md:py-20 lg:py-24">
  <div className="container mx-auto px-6">
    {/* Content */}
  </div>
</section>
```

### Pattern 6: Hover Effects with Pseudo-Elements

**Underline Animation on Links:**

```jsx
<Link
  href="/about"
  className="
    relative text-stone-600
    transition-colors hover:text-stone-900
    after:absolute after:bottom-[-4px] after:left-0
    after:w-0 after:h-[1px] after:bg-stone-900
    after:transition-all after:duration-200
    hover:after:w-full
  "
>
  About
</Link>
```

---

## Best Practices

### 1. Use Semantic Color Names

❌ **Don't:**
```jsx
<div className="bg-[#C2705D]">
```

✅ **Do:**
```jsx
<div className="bg-terracotta-500">
```

**Why**: Semantic names are easier to understand and maintain.

### 2. Prefer Tailwind Utilities Over Custom CSS

❌ **Don't:**
```css
.my-button {
  padding: 1rem 2rem;
  background-color: #C2705D;
  border-radius: 0.5rem;
}
```

✅ **Do:**
```jsx
<button className="px-8 py-4 bg-terracotta-500 rounded-lg">
```

**Why**: Keeps styling consistent and reduces CSS bloat.

### 3. Use Responsive Utilities

❌ **Don't:**
```jsx
<div className="flex-row gap-8">
```

✅ **Do:**
```jsx
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
```

**Why**: Mobile-first ensures good experience on all devices.

### 4. Group Related Classes

✅ **Good:**
```jsx
<button className="
  // Layout
  inline-flex items-center justify-center
  px-8 py-4

  // Visual
  bg-terracotta-500 text-white
  border-2 border-terracotta-500
  rounded-lg

  // Interaction
  transition-all duration-200
  hover:bg-terracotta-600
">
```

**Why**: Easier to read and maintain.

### 5. Extract Repeated Patterns to Components

If you use the same combination of classes repeatedly, create a reusable component:

```jsx
// components/ui/Button.tsx
export function Button({ variant = 'primary', children, ...props }) {
  const baseClasses = 'inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all duration-200'

  const variants = {
    primary: 'bg-terracotta-500 text-white hover:bg-terracotta-600',
    secondary: 'bg-transparent text-stone-900 border-2 border-stone-900 hover:bg-stone-900 hover:text-white'
  }

  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </button>
  )
}
```

### 6. Use `@apply` Sparingly

Only use `@apply` in `globals.css` for true base styles:

```css
/* globals.css */
body {
  @apply bg-white text-stone-800 font-body;
}
```

**Why**: Overusing `@apply` defeats the purpose of utility-first CSS.

### 7. Keep Accessibility in Mind

Always include focus states:

```jsx
<button className="
  ...
  focus-visible:outline-2
  focus-visible:outline-terracotta-500
  focus-visible:outline-offset-2
">
```

### 8. Use Opacity for Overlays

```jsx
{/* Light overlay on images */}
<div className="absolute inset-0 bg-white/70" />

{/* Dark overlay */}
<div className="absolute inset-0 bg-stone-900/60" />
```

**Format**: `bg-{color}/{opacity}` where opacity is 0-100.

---

## Troubleshooting

### Issue: Tailwind classes not working

**Solution 1**: Ensure PostCSS is configured correctly

Check `postcss.config.mjs`:
```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Must use @tailwindcss/postcss for v4
  },
}
```

**Solution 2**: Restart the dev server

```bash
# Kill the server
# Then restart
bun dev
```

**Solution 3**: Clear Next.js cache

```bash
bun devsafe  # Deletes .next folder and restarts
```

### Issue: Custom colors not recognized

**Solution**: Ensure they're defined in `@theme` block in `globals.css`:

```css
@theme {
  --color-terracotta-500: #c2705d;
}
```

Then use as: `bg-terracotta-500`, `text-terracotta-500`, etc.

### Issue: Styles look different on mobile

**Solution**: Add responsive variants

```jsx
{/* Mobile: column, Desktop: row */}
<div className="flex flex-col lg:flex-row">
```

### Issue: Fonts not loading

**Solution**: Ensure fonts are configured in layout:

```typescript
// src/app/(frontend)/layout.tsx
import { Inter, Outfit } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

// In HTML tag:
<html className={`${inter.variable} ${outfit.variable}`}>
```

### Issue: Payload admin panel styles broken

**Solution**: The admin panel has its own styling system. Tailwind's base layer can conflict with Payload's styles. If you need Tailwind in the admin panel, create a separate CSS file without the base layer:

```css
/* src/app/(payload)/admin/globals.css */
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
/* NO base layer */
```

---

## Quick Reference

### Common Class Combinations

**Container:**
```jsx
<div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
```

**Section:**
```jsx
<section className="py-16 md:py-20 lg:py-24">
```

**Card:**
```jsx
<div className="bg-white border border-stone-200 rounded-lg p-6 shadow-sm">
```

**Primary Button:**
```jsx
<button className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
```

**Input:**
```jsx
<input className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20">
```

**Grid:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## Additional Resources

- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **Tailwind v4 Upgrade Guide**: https://tailwindcss.com/docs/v4-beta
- **Tailwind Play (Playground)**: https://play.tailwindcss.com
- **Tailwind Color Reference**: https://tailwindcss.com/docs/customizing-colors

---

## Maintenance Notes

**When Adding New Colors:**
1. Add to `@theme` block in `globals.css`
2. Use a complete scale (50-900) for consistency
3. Document in this file

**When Adding New Components:**
1. Follow existing patterns (see Component Styling Patterns section)
2. Use semantic color classes
3. Include responsive variants
4. Add hover/focus states

**When Updating Design:**
1. Update `@theme` values in `globals.css`
2. Colors will automatically update across all components
3. Test on all breakpoints

---

**Last Updated**: October 26, 2025
**Tailwind Version**: v4.1.16
**Next.js Version**: 15.4.4
