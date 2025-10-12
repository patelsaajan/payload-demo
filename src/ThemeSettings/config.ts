import type { GlobalConfig } from 'payload'

import { revalidateThemeSettings } from './hooks/revalidateThemeSettings'

export const ThemeSettings: GlobalConfig = {
  slug: 'theme-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'primaryColor',
      type: 'text',
      required: false,
      admin: {
        description: 'Primary brand color (e.g., #3B82F6 or rgb(59, 130, 246))',
      },
    },
    {
      name: 'secondaryColor',
      type: 'text',
      required: false,
      admin: {
        description: 'Secondary brand color (e.g., #8B5CF6 or rgb(139, 92, 246))',
      },
    },
    {
      name: 'actionColor',
      type: 'text',
      required: false,
      admin: {
        description: 'Action/CTA color (e.g., #10B981 or rgb(16, 185, 129))',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      required: false,
      admin: {
        description: 'Background color (e.g., #FFFFFF or rgb(255, 255, 255))',
      },
    },
    {
      name: 'colorPreview',
      type: 'ui',
      admin: {
        components: {
          Field: '@/ThemeSettings/components/ColorPreview#ColorPreview',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateThemeSettings],
  },
}
