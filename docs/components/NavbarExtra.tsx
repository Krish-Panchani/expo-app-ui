import React from 'react'

export default function NavbarExtra() {
  return (
    <a
      href="https://www.npmjs.com/package/expo-app-ui"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: 'inherit',
        border: '1px solid currentColor',
        transition: 'opacity 0.2s',
        marginRight: '1rem',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.7'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1'
      }}
    >
      📦 npm
    </a>
  )
}

