import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const Footer = () => (
  <div style={{ textAlign: 'center', padding: '1rem' }}>
    Made by{' '}
    <a href="https://github.com/Krish-Panchani" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
      Krish Panchani
    </a>
    {' X '}
    <a href="https://thunderdevelops.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
      Thunder Develops
    </a>
    {' • Built with ❤️ for the Expo React Native community'}
    <br />
    <a 
      href="https://www.npmjs.com/package/expo-app-ui" 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ textDecoration: 'underline', marginTop: '0.5rem', display: 'inline-block' }}
    >
      📦 View on npm
    </a>
  </div>
)

const config: DocsThemeConfig = {
  logo: <span>Expo App UI</span>,
  project: {
    link: 'https://github.com/Krish-Panchani/expo-app-ui',
  },
  docsRepositoryBase: 'https://github.com/Krish-Panchani/expo-app-ui',
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  navbar: {
    extraContent: (
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
    ),
  },
  footer: {
    component: <Footer />,
  },
  head: (props: any) => {
    // Use the title from frontmatter, or fallback to default
    const pageTitle = props?.title || 'Expo App UI – React Native Component Library'
    const pageDescription = props?.meta?.description || 'A modern UI component library for Expo React Native. Copy components directly into your project and customize them to your needs.'
    const siteUrl = 'https://expo-apps-ui.vercel.app'
    
    return (
      <>
        <title>{pageTitle}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="expo, react-native, ui, components, mobile, ios, android, cli, component-library, expo-ui, react-native-components" />
        <meta name="author" content="Krish Panchani" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content="Expo App UI" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Expo App UI" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@krishpanchani" />
        <meta name="twitter:creator" content="@krishpanchani" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
      </>
    )
  },
}

export default config

