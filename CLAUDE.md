# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Creative Productions LLC** is a modern video production company website built as a full-stack application combining:
- **Payload CMS 3.x** - Headless CMS for content management
- **Next.js 15** - React framework with App Router
- **MongoDB Atlas** - Cloud-hosted database for production
- **TypeScript** - Strict type safety throughout

The application has two distinct layers:
1. **Admin Panel** - Payload CMS backend for content editors
2. **Frontend** - Public-facing marketing site with video galleries

### Key Features
- **Automatic Revalidation**: Content changes in CMS instantly update the frontend
- **Image Carousel**: Homepage hero cycles through background images
- **Video Gallery**: YouTube/Vimeo video management with sections
- **Responsive Design**: Mobile-first approach with modern CSS

---

## Quick Start

### Prerequisites
- **Node.js**: `^18.20.2` or `>=20.9.0`
- **Bun**: `^1.0.0` (package manager and runtime)

### Initial Setup
```bash
# Clone and navigate to project
cd creativeproductions

# Copy environment variables
cp .env.example .env
# Edit .env and set PAYLOAD_SECRET and DATABASE_URI

# Install dependencies
bun install

# Start development server
bun dev
```

Visit `http://localhost:3000` to view the frontend, or `http://localhost:3000/admin` for the CMS panel.

---

## Package Manager

**IMPORTANT**: This project uses **Bun** as the package manager and runtime.

### Why Bun?
- **Fast**: Significantly faster than npm/pnpm for installs and script execution
- **All-in-one**: Package manager, bundler, test runner, and runtime
- **Drop-in replacement**: Compatible with Node.js and npm packages
- **Built-in TypeScript**: Native TypeScript support without transpilation

### Current State (Needs Cleanup)
The repository currently contains a legacy lock file:
- `package-lock.json` (legacy, should be removed)
- `bun.lock` (current, already exists)

### To Clean Up (Recommended)
```bash
# Remove legacy lock file
rm package-lock.json

# Reinstall with bun to ensure bun.lock is up to date
bun install
```

**Always use `bun` for all package operations** to maintain consistency.

---

## Key Commands

### Development
```bash
bun dev              # Start development server (http://localhost:3000)
bun devsafe          # Clean .next folder and start fresh dev server
```

### Building & Production
```bash
bun build            # Build for production
bun start            # Start production server
```

### Code Quality
```bash
bun lint             # Run ESLint
```
Note: Prettier is configured but must be run via editor integration or manually.

### Payload CMS
```bash
bun payload                    # Access Payload CLI
bun generate:types             # Generate TypeScript types from collections (run after schema changes)
bun generate:importmap         # Generate import map for admin UI
```

**IMPORTANT**: Always run `bun generate:types` after modifying collection schemas to keep TypeScript types in sync.

### Testing
```bash
bun test              # Run all tests (integration + e2e)
bun test:int          # Run integration tests (Vitest)
bun test:e2e          # Run e2e tests (Playwright)
```

---

## Architecture

### Project Structure
```
src/
├── app/
│   ├── (frontend)/          # Public-facing Next.js pages
│   │   ├── layout.tsx       # Root layout with fonts & metadata
│   │   ├── page.tsx         # Homepage
│   │   ├── styles.css       # Frontend global styles
│   │   ├── about/           # About page
│   │   └── gallery/         # Gallery page with video grid
│   ├── (payload)/           # Payload CMS admin panel
│   │   ├── admin/           # Admin UI routes
│   │   ├── api/             # REST & GraphQL API routes
│   │   ├── custom.scss      # Custom admin panel styles
│   │   └── layout.tsx       # Admin layout
│   └── my-route/            # Example custom route
├── collections/             # Payload collection definitions
│   ├── Users.ts            # Admin users (auth-enabled)
│   ├── Media.ts            # File uploads
│   ├── GallerySections.ts  # Gallery section categories
│   ├── GalleryVideos.ts    # Video entries
│   └── TeamMembers.ts      # Team member profiles
├── components/              # React components
│   ├── Header/             # Site header with navigation
│   ├── HeroSection/        # Homepage hero with image carousel
│   ├── SequentialText/     # Animated text component
│   └── gallery/            # Gallery-specific components
│       ├── GalleryGrid.tsx
│       ├── VideoCard.tsx
│       └── VideoPlayer.tsx
├── styles/
│   └── design-system.css   # CSS custom properties & design tokens
├── utilities/
│   └── revalidate.ts       # Next.js revalidation utility for CMS updates
├── payload.config.ts       # Payload CMS configuration
└── payload-types.ts        # Auto-generated TypeScript types
```

### Application Layers

#### 1. Frontend Layer (`src/app/(frontend)/`)
Public-facing marketing site with:
- **Server Components** by default (Next.js 15 App Router)
- **Client Components** marked with `'use client'` directive
- **CSS Modules** for component-scoped styling
- **Global Design System** via CSS custom properties
- **Google Fonts** (Inter for body, Outfit for headings)

**Key Routes:**
- `/` - Homepage with hero section
- `/about` - About page
- `/gallery` - Video gallery with sections

#### 2. Admin Layer (`src/app/(payload)/`)
Payload CMS backend with:
- `/admin/*` - Admin panel UI (provided by Payload)
- `/api/*` - REST API endpoints
- `/api/graphql` - GraphQL API
- `/api/graphql-playground` - GraphQL playground

---

## TypeScript Configuration

### Compiler Options
- **Strict Mode**: Enabled for maximum type safety
- **Target**: ES2022
- **Module Resolution**: `bundler` (modern, optimized for Next.js)
- **JSX**: `preserve` (Next.js handles transformation)
- **Path Aliases**:
  - `@/*` → `./src/*`
  - `@payload-config` → `./src/payload.config.ts`

### Best Practices
1. **Always use explicit types** for function parameters and return values
2. **Leverage auto-generated types** from `src/payload-types.ts` for Payload data
3. **Use type imports** when only importing types: `import type { CollectionConfig } from 'payload'`
4. **Avoid `any`** - ESLint warns about it, use `unknown` or proper types

---

## Code Style & Formatting

### Prettier Configuration (`.prettierrc.json`)
```json
{
  "singleQuote": true,        // Use single quotes
  "trailingComma": "all",     // Trailing commas everywhere
  "printWidth": 100,          // 100 character line width
  "semi": false               // No semicolons
}
```

### ESLint Configuration (`eslint.config.mjs`)
- **Extends**: `next/core-web-vitals`, `next/typescript`
- **Format**: Flat config (ESLint 9+)
- **Custom Rules**:
  - TypeScript strict rules set to `warn` (not error)
  - Unused vars with `_` prefix are ignored
  - Destructured array elements with `_` prefix are ignored

### Coding Conventions

#### Component Organization
```
ComponentName/
├── ComponentName.tsx    # Component logic (Tailwind CSS classes)
└── index.ts             # Barrel export
```

**Example `index.ts`:**
```typescript
export { ComponentName } from './ComponentName'
```

#### Component Style
- **Functional Components**: Always use function declarations, not arrow functions
- **TypeScript**: Define interfaces for props
- **Client Directives**: Place `'use client'` at the very top when needed
- **Imports**: Group by external, Next.js, local components
- **Styling**: Use Tailwind utility classes directly in className

**Example Component:**
```typescript
'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface ComponentProps {
  title: string
  description?: string
}

export function Component({ title, description }: ComponentProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-display font-bold text-stone-900">{title}</h1>
      {description && <p className="text-stone-600 mt-4">{description}</p>}
    </div>
  )
}
```

#### Collection Patterns
Collections follow Payload's `CollectionConfig` structure:

**Key Patterns:**
- Use `slug` for URL-friendly identifiers (kebab-case)
- Include `admin.useAsTitle` for better CMS UX
- Set `admin.group` to organize collections in the admin panel
- Use `access.read: () => true` for public content
- Add hooks for auto-generation (e.g., slug from title)
- Index frequently queried fields

**Example Collection:**
```typescript
import type { CollectionConfig } from 'payload'

export const ExampleCollection: CollectionConfig = {
  slug: 'example-items',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title.toLowerCase().replace(/\s+/g, '-')
            }
            return value
          },
        ],
      },
    },
  ],
}
```

---

## Design System & Styling

### Tailwind CSS v4

The project uses **Tailwind CSS v4** (utility-first CSS framework) with a custom earthy, light color scheme.

**📚 For detailed styling documentation, see [`docs/STYLING.md`](docs/STYLING.md)**

### Color Scheme

**Light, Earthy Palette:**
- **Primary Backgrounds**: White, stone-50 (off-white), stone-100 (cream)
- **Header**: Stone-200 (warm grey)
- **Primary Accent**: Terracotta (#C2705D) - CTAs, hover states
- **Secondary Accent**: Sage green (#8B9A8B) - subtle highlights
- **Text Colors**: Stone-900 (headings), stone-600 (body), stone-500 (tertiary)
- **Borders**: Stone-200, stone-300

### Key Files

**Configuration:**
- `postcss.config.mjs` - PostCSS configuration for Tailwind
- `src/app/(frontend)/globals.css` - Tailwind imports + custom theme

**Theme Definition:**
Custom colors, fonts, and design tokens are defined in the `@theme` block of `globals.css`:

```css
@import 'tailwindcss';

@theme {
  /* Custom terracotta accent */
  --color-terracotta-500: #c2705d;

  /* Custom sage accent */
  --color-sage-400: #8b9a8b;

  /* Font families */
  --font-display: var(--font-outfit, 'Outfit', ...);
  --font-body: var(--font-inter, 'Inter', ...);
}
```

### Usage in Components

**Utility-First Approach:**
```jsx
<header className="sticky top-0 bg-stone-200/90 backdrop-blur-xl">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <button className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 rounded-lg">
      Contact Us
    </button>
  </div>
</header>
```

**Fonts:**
- `font-display` - Outfit (headings, display text)
- `font-body` - Inter (body text, UI)

### Responsive Breakpoints (Mobile-First)

Tailwind's built-in breakpoints:
- **Default**: Mobile (< 640px)
- **sm**: 640px (small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (laptops)
- **xl**: 1280px (desktops)
- **2xl**: 1536px (large desktops)

**Example:**
```jsx
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
  {/* Column on mobile, row on tablet+ */}
</div>
```

---

## Payload CMS Details

### Configuration (`src/payload.config.ts`)
```typescript
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default buildConfig({
  collections: [Users, Media, GallerySections, GalleryVideos, TeamMembers],
  editor: lexicalEditor({}),
  db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(__dirname, 'payload-types.ts') },
})
```

**Note:** The database uses MongoDB Atlas for production hosting.

### Collections in the Project

#### Users (`src/collections/Users.ts`)
- **Purpose**: Admin authentication
- **Auth**: Enabled
- **Fields**: email, password (auto-generated by Payload)

#### Media (`src/collections/Media.ts`)
- **Purpose**: File uploads (images, videos, documents)
- **Upload**: Enabled
- **Fields**: alt text, filename, mimeType, filesize, etc.

#### GallerySections (`src/collections/GallerySections.ts`)
- **Purpose**: Categorize videos into sections
- **Fields**: title, slug (auto-generated), description, order, isVisible
- **Admin Group**: "Gallery"
- **Public Access**: Read-only
- **Revalidation**: Automatically revalidates `/` and `/gallery` on changes

#### GalleryVideos (`src/collections/GalleryVideos.ts`)
- **Purpose**: Individual video entries
- **Fields**: title, description, videoType (youtube/vimeo), videoId, videoUrl, section (relationship), order
- **Admin Group**: "Gallery"
- **Relationships**: Links to GallerySections
- **Revalidation**: Automatically revalidates `/` and `/gallery` on changes

#### TeamMembers (`src/collections/TeamMembers.ts`)
- **Purpose**: Team member profiles
- **Fields**: name, role, bio, image (upload relationship), order
- **Public Access**: Read-only
- **Revalidation**: Automatically revalidates `/` and `/about` on changes

### Working with Collections

**Adding a New Collection:**
1. Create new file in `src/collections/` (e.g., `Services.ts`)
2. Export a `CollectionConfig` object
3. Import and add to `collections` array in `src/payload.config.ts`
4. Run `bun generate:types` to update TypeScript types
5. Restart dev server to see changes

**Accessing Data in Frontend:**
```typescript
// Fetch from Payload API
const response = await fetch('http://localhost:3000/api/gallery-videos')
const data = await response.json()
```

---

## Testing Strategy

### Integration Tests (Vitest)
- **Location**: `tests/int/`
- **Pattern**: `*.int.spec.ts`
- **Environment**: jsdom (browser simulation)
- **Config**: `vitest.config.mts`

**Run:**
```bash
bun test:int
```

### E2E Tests (Playwright)
- **Location**: `tests/e2e/`
- **Pattern**: `*.e2e.spec.ts`
- **Browser**: Chromium
- **Config**: `playwright.config.ts`
- **Auto-starts dev server on port 3000**

**Run:**
```bash
bun test:e2e
```

**Writing Tests:**
- Integration: Test React components and utilities in isolation
- E2E: Test complete user workflows (navigation, forms, content rendering)

---

## Environment Variables

### Required (`.env`)
```bash
DATABASE_URI=mongodb+srv://user:password@cluster.mongodb.net/  # MongoDB Atlas connection string
PAYLOAD_SECRET=your-secret-key-here                             # Secret for JWT tokens
```

### Setup
1. Copy `.env.example` to `.env`
2. Generate a secure random string for `PAYLOAD_SECRET`
3. Set `DATABASE_URI` to your MongoDB connection string

**Generate a secret:**
```bash
openssl rand -base64 32
```

---

## Next.js Configuration

### `next.config.mjs`
- Wrapped with `withPayload()` for Payload integration
- Custom webpack config for TypeScript extension aliasing
- Disables server package bundling in dev (`devBundleServerPackages: false`)

**Extension Aliasing:**
```javascript
'.js': ['.ts', '.tsx', '.js', '.jsx']
'.cjs': ['.cts', '.cjs']
'.mjs': ['.mts', '.mjs']
```

This allows importing `.ts` files with `.js` extensions in imports.

---

## Common Workflows

### Adding a New Frontend Page
1. Create folder in `src/app/(frontend)/new-page/`
2. Create `page.tsx` with default export:
   ```typescript
   export default async function NewPage() {
     return <div>New Page</div>
   }
   ```
3. Optionally add `layout.tsx` for page-specific layout
4. Add styles via `page.module.css` or inline in `page.tsx`

### Creating a New Component
1. Create folder in `src/components/ComponentName/`
2. Create `ComponentName.tsx` with component logic and Tailwind classes
3. Create `index.ts` with barrel export
4. Import via `import { ComponentName } from '@/components/ComponentName'`
5. Refer to `docs/STYLING.md` for styling patterns and color usage

### Modifying Collection Schema
1. Edit collection file in `src/collections/`
2. Run `bun generate:types` to regenerate types
3. Restart dev server
4. Update frontend components that consume the data

### Styling Best Practices
1. **Use Tailwind utility classes** for component styling
2. **Use semantic color names** (e.g., `bg-terracotta-500` not `bg-[#C2705D]`)
3. **Follow mobile-first** responsive design with Tailwind breakpoints
4. **Respect accessibility**: focus states, reduced motion, semantic HTML
5. **Refer to `docs/STYLING.md`** for detailed patterns and examples

---

## Troubleshooting

### Issue: Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 bun dev
```

### Issue: TypeScript errors after schema changes
```bash
# Regenerate types
bun generate:types

# Restart TypeScript server in your editor
# VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Issue: Stale Next.js build
```bash
bun devsafe  # Cleans .next and restarts
```

### Issue: Module resolution errors
```bash
# Clear all caches and reinstall
rm -rf node_modules .next bun.lock
bun install
```

---

## Additional Resources

- **Styling Guide**: [`docs/STYLING.md`](docs/STYLING.md) - Comprehensive Tailwind CSS setup and patterns
- **Payload CMS Docs**: https://payloadcms.com/docs
- **Next.js 15 Docs**: https://nextjs.org/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

## Automatic Content Revalidation

This project uses **Next.js 15 on-demand revalidation** to automatically update the frontend when content changes in Payload CMS.

### How It Works

When you create, update, or delete content in the Payload CMS admin panel:
1. Payload hooks (`afterChange`, `afterDelete`) are triggered
2. The `revalidateContent()` utility function is called
3. Next.js invalidates affected pages using `revalidatePath()` and `revalidateTag()`
4. Visitors see fresh content on their next page load

### Implementation Files

- **Utility**: `src/utilities/revalidate.ts` - Core revalidation logic
- **Collections**: Each collection has hooks that trigger revalidation
- **Documentation**: `docs/REVALIDATION.md` - Detailed usage guide

### Adding Revalidation to New Collections

When creating a new collection, add hooks to enable automatic revalidation:

```typescript
import { revalidateContent } from '../utilities/revalidate'

export const MyCollection: CollectionConfig = {
  slug: 'my-collection',
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        await revalidateContent({
          collection: 'my-collection',
          paths: ['/', '/my-page'],
          tags: ['my-tag'],
        })
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidateContent({
          collection: 'my-collection',
          paths: ['/', '/my-page'],
          tags: ['my-tag'],
        })
      },
    ],
  },
  fields: [/* your fields */],
}
```

### Console Feedback

Watch server logs for revalidation confirmations:
```
🔄 Revalidated gallery after create operation on video: New Product Demo
✅ Revalidated content for gallery-videos
```

---

## Notes for AI Assistants

When working on this project:
1. **Always use bun** for package management and running scripts
2. **Run `bun generate:types`** after collection schema changes
3. **Add revalidation hooks** to new collections (see template above)
4. **Follow established patterns** for components, collections, and styling
5. **Use TypeScript strictly** - avoid `any`, prefer explicit types
6. **Use Tailwind CSS utility classes** - avoid hardcoded values or custom CSS
7. **Use semantic color names** - `bg-terracotta-500` not `bg-[#C2705D]`
8. **Refer to `docs/STYLING.md`** for styling patterns and best practices
9. **Mark client components** with `'use client'` directive when using hooks or browser APIs
10. **Use Server Components by default** in Next.js App Router
11. **Test changes** with both integration and e2e tests when appropriate
12. **Leverage Bun's speed** - it's significantly faster than Node.js for most operations
