import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../utilities/revalidate'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Revalidate about page when team members are added, updated, or deleted
        await revalidateContent({
          collection: 'team-members',
          paths: ['/', '/about'],
          tags: ['team', 'about'],
        })

        console.log(
          `🔄 Revalidated about page after ${operation} operation on team member: ${doc.name}`,
        )

        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Revalidate when a team member is deleted
        await revalidateContent({
          collection: 'team-members',
          paths: ['/', '/about'],
          tags: ['team', 'about'],
        })

        console.log(`🔄 Revalidated about page after deleting team member: ${doc.name}`)
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Role/Position',
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      label: 'Biography',
      admin: {
        description: 'A brief description of the team member',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Profile Image',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first',
        position: 'sidebar',
      },
    },
  ],
}
