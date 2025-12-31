const withNextra = require('nextra').default({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const nextConfig = {
  // Domain: https://expo-apps-ui.vercel.app
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://expo-apps-ui.vercel.app',
  },
}

module.exports = withNextra(nextConfig)
