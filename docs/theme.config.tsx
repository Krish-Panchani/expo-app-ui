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
  </div>
)

const config: DocsThemeConfig = {
  logo: <span>Expo App UI</span>,
  project: {
    link: 'https://github.com/Krish-Panchani/expo-app-ui',
  },
  docsRepositoryBase: 'https://github.com/Krish-Panchani/expo-app-ui',
  footer: {
    component: <Footer />,
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="A modern UI component library for Expo React Native. Copy components directly into your project and customize them to your needs." />
      <meta name="keywords" content="expo, react-native, ui, components, mobile, ios, android, cli, component-library, expo-ui, react-native-components" />
      <meta name="author" content="Krish Panchani" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://expo-apps-ui.vercel.app" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://expo-apps-ui.vercel.app" />
      <meta property="og:site_name" content="Expo App UI" />
      <meta property="og:title" content="Expo App UI – React Native Component Library" />
      <meta property="og:description" content="A modern UI component library for Expo React Native. Copy components directly into your project and customize them to your needs." />
      <meta property="og:image" content="https://expo-apps-ui.vercel.app/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Expo App UI" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@krishpanchani" />
      <meta name="twitter:creator" content="@krishpanchani" />
      <meta name="twitter:title" content="Expo App UI – React Native Component Library" />
      <meta name="twitter:description" content="A modern UI component library for Expo React Native. Copy components directly into your project and customize them to your needs." />
      <meta name="twitter:image" content="https://expo-apps-ui.vercel.app/og-image.png" />
    </>
  ),
}

export default config

