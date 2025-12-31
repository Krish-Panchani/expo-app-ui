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
}

export default config

