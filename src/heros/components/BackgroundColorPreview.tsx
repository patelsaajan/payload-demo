'use client'

import { useFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

export const BackgroundColorPreview = () => {
  const backgroundColor = useFormFields(([fields, dispatch]) => {
    // Access the field using dot notation key
    const value = (fields as any)?.['hero.backgroundColor']?.value as string
    return value
  })

  const [themeColors, setThemeColors] = useState<{
    primaryColor?: string
    secondaryColor?: string
    accentColor?: string
    backgroundColor?: string
  }>({})

  useEffect(() => {
    // Fetch theme settings from the API
    fetch('/api/globals/theme-settings')
      .then(res => res.json())
      .then(data => {
        setThemeColors({
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor,
          accentColor: data.accentColor,
          backgroundColor: data.backgroundColor,
        })
      })
      .catch(err => console.error('Failed to fetch theme settings:', err))
  }, [])

  const colorMap: Record<string, string> = {
    primary: themeColors.primaryColor || '#3B82F6',
    secondary: themeColors.secondaryColor || '#8B5CF6',
    accent: themeColors.accentColor || '#10B981',
    background: themeColors.backgroundColor || '#FFFFFF',
  }

  const selectedColor = colorMap[backgroundColor || 'background'] || colorMap.background

  return (
    <div style={{
      marginTop: '8px',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <div
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: selectedColor,
          borderRadius: '6px',
          border: '2px solid #fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.1)',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '2px' }}>
          Selected: {backgroundColor || 'background'}
        </div>
        <div style={{ fontSize: '13px', fontWeight: '500', color: '#333', fontFamily: 'monospace' }}>
          {selectedColor}
        </div>
      </div>
    </div>
  )
}
