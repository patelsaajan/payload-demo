'use client'

import { useFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

export const TextColorPreview = () => {
  const textColor = useFormFields(([fields, dispatch]) => {
    // Access the field using dot notation key
    const value = (fields as any)?.['hero.textColor']?.value as string
    return value
  })

  const [themeColors, setThemeColors] = useState<{
    textColor?: string
    primaryTextColor?: string
    secondaryTextColor?: string
  }>({})

  useEffect(() => {
    // Fetch theme settings from the API
    fetch('/api/globals/theme-settings')
      .then(res => res.json())
      .then(data => {
        setThemeColors({
          textColor: data.textColor,
          primaryTextColor: data.primaryTextColor,
          secondaryTextColor: data.secondaryTextColor,
        })
      })
      .catch(err => console.error('Failed to fetch theme settings:', err))
  }, [])

  const colorMap: Record<string, string> = {
    text: themeColors.textColor || '#000000',
    primaryText: themeColors.primaryTextColor || '#000000',
    secondaryText: themeColors.secondaryTextColor || '#666666',
  }

  const selectedColor = colorMap[textColor || 'text'] || colorMap.text

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
          Selected: {textColor || 'text'}
        </div>
        <div style={{ fontSize: '13px', fontWeight: '500', color: '#333', fontFamily: 'monospace' }}>
          {selectedColor}
        </div>
      </div>
    </div>
  )
}
