'use client'

import { useFormFields } from '@payloadcms/ui'

export const ColorPreview = () => {
  const primaryColor = useFormFields(([fields]) => fields.primaryColor?.value as string)
  const secondaryColor = useFormFields(([fields]) => fields.secondaryColor?.value as string)
  const actionColor = useFormFields(([fields]) => fields.actionColor?.value as string)
  const backgroundColor = useFormFields(([fields]) => fields.backgroundColor?.value as string)

  return (
    <div style={{
      padding: '20px',
      borderTop: '1px solid #e5e5e5',
      marginTop: '20px',
    }}>
      <h3 style={{ marginBottom: '15px', fontSize: '16px', fontWeight: '600' }}>Color Preview</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
      }}>
        <div>
          <div style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}>Primary</div>
          <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: primaryColor || '#000000',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }} />
          <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
            {primaryColor || 'No color set'}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}>Secondary</div>
          <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: secondaryColor || '#000000',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }} />
          <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
            {secondaryColor || 'No color set'}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}>Action</div>
          <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: actionColor || '#000000',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }} />
          <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
            {actionColor || 'No color set'}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}>Background</div>
          <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: backgroundColor || '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }} />
          <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
            {backgroundColor || 'No color set'}
          </div>
        </div>
      </div>
    </div>
  )
}
