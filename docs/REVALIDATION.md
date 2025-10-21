# Automatic Content Revalidation

This project uses Next.js 15's on-demand revalidation to automatically update the frontend when content changes in Payload CMS.

## How It Works

When you create, update, or delete content in the Payload CMS admin panel, the system automatically triggers Next.js to revalidate the affected pages. This ensures that your visitors always see fresh content without needing to manually rebuild or redeploy the site.

## Implementation

### 1. Revalidation Utility (`src/utilities/revalidate.ts`)

The core revalidation logic uses Next.js built-in functions:
- **`revalidatePath(path)`**: Invalidates a specific page or layout
- **`revalidateTag(tag)`**: Invalidates all pages using a specific cache tag

### 2. Collection Hooks

Each Payload collection has `afterChange` and `afterDelete` hooks that trigger revalidation:

#### Gallery Videos (`src/collections/GalleryVideos.ts`)
- **Revalidates**: `/`, `/gallery`
- **Tags**: `gallery`, `videos`
- **Triggers**: When videos are created, updated, or deleted

#### Gallery Sections (`src/collections/GallerySections.ts`)
- **Revalidates**: `/`, `/gallery`
- **Tags**: `gallery`, `sections`
- **Triggers**: When sections are created, updated, or deleted

#### Team Members (`src/collections/TeamMembers.ts`)
- **Revalidates**: `/`, `/about`
- **Tags**: `team`, `about`
- **Triggers**: When team members are created, updated, or deleted

#### Media (`src/collections/Media.ts`)
- **Revalidates**: `/`, `/gallery`, `/about`
- **Tags**: `media`
- **Triggers**: When images/files are uploaded, updated, or deleted

## Usage

### Automatic Revalidation (Default)

No action needed! When you make changes in the CMS, pages update automatically:

1. Edit content in Payload admin panel
2. Click "Save"
3. The system automatically revalidates affected pages
4. Visitors see the new content on their next page load

### Console Feedback

Watch the server logs to see revalidation in action:

```
🔄 Revalidated gallery after create operation on video: New Product Demo
✅ Revalidated content for gallery-videos
```

### Manual Revalidation (Advanced)

If you need to manually trigger revalidation in custom code:

```typescript
import { revalidateContent } from '@/utilities/revalidate'

// Revalidate specific paths
await revalidateContent({
  paths: ['/gallery', '/about'],
})

// Revalidate by collection
await revalidateContent({
  collection: 'gallery-videos',
})

// Revalidate with custom tags
await revalidateContent({
  tags: ['gallery', 'videos'],
})

// Combine all options
await revalidateContent({
  collection: 'gallery-videos',
  slug: 'my-video',
  paths: ['/custom-page'],
  tags: ['custom-tag'],
})
```

## Adding Revalidation to New Collections

When creating a new collection, add revalidation hooks:

```typescript
import type { CollectionConfig } from 'payload'
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

        console.log(
          `🔄 Revalidated after ${operation} operation on: ${doc.title}`,
        )

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

        console.log(`🔄 Revalidated after deleting: ${doc.title}`)
      },
    ],
  },
  fields: [
    // Your fields here
  ],
}
```

## Best Practices

### 1. Revalidate Minimal Paths
Only revalidate pages that actually display the changed content:
- ✅ Revalidate `/gallery` when gallery videos change
- ❌ Don't revalidate all pages for every change

### 2. Use Tags for Related Content
Group related pages with cache tags:
```typescript
revalidateTag('gallery') // Revalidates all pages tagged with 'gallery'
```

### 3. Always Revalidate Homepage
Most collections revalidate `/` to keep the homepage fresh.

### 4. Handle Errors Gracefully
The revalidation utility catches errors to prevent CMS operations from failing if revalidation fails.

### 5. Avoid Infinite Loops
Never update the same collection within its own `afterChange` hook without using context flags:

```typescript
// ❌ BAD: Creates infinite loop
afterChange: [
  async ({ doc, req }) => {
    await req.payload.update({
      collection: 'my-collection',
      id: doc.id,
      data: { updated: true },
    })
  },
]

// ✅ GOOD: Use context flag to prevent loop
afterChange: [
  async ({ doc, req, context }) => {
    if (context.skipUpdate) return

    await req.payload.update({
      collection: 'my-collection',
      id: doc.id,
      data: { updated: true },
      context: { skipUpdate: true },
    })
  },
]
```

## Troubleshooting

### Changes Not Appearing?

1. **Check server logs** - Look for revalidation messages
2. **Clear browser cache** - Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
3. **Verify hooks are installed** - Check that collection files import and use `revalidateContent`
4. **Check paths** - Ensure the correct paths are being revalidated

### Performance Concerns?

Revalidation is very fast and happens in the background:
- **Non-blocking**: Doesn't slow down CMS operations
- **Efficient**: Only revalidates affected pages
- **Cached**: Next.js handles smart caching

### Revalidation Failing?

Check the server logs for errors. Common issues:
- **Import errors**: Ensure `revalidateContent` is properly imported
- **Path typos**: Double-check path strings
- **Next.js version**: Requires Next.js 13.4+ for `revalidatePath` and `revalidateTag`

## Learn More

- [Next.js Revalidation Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [Payload CMS Hooks](https://payloadcms.com/docs/hooks/overview)
- [On-Demand Revalidation](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
