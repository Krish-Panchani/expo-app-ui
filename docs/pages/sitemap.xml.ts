import { GetServerSideProps } from 'next'

const SITE_URL = 'https://expo-apps-ui.vercel.app'

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: string
  priority: string
}

function generateSitemap(urls: SitemapUrl[]): string {
  const urlsXml = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const now = new Date().toISOString()

  // Static pages
  const staticPages: SitemapUrl[] = [
    {
      loc: `${SITE_URL}/`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      loc: `${SITE_URL}/docs/getting-started`,
      lastmod: now,
      changefreq: 'monthly',
      priority: '0.9',
    },
    {
      loc: `${SITE_URL}/docs/cli`,
      lastmod: now,
      changefreq: 'monthly',
      priority: '0.8',
    },
  ]

  // Components
  const components = [
    'custom-text',
    'button',
    'box-view',
    'custom-modal',
    'profile-pic',
    'progress-bar',
    'marquee',
    'otp-input',
    'loading-bar',
  ]

  const componentPages: SitemapUrl[] = components.map((component) => ({
    loc: `${SITE_URL}/docs/components/${component}`,
    lastmod: now,
    changefreq: 'monthly',
    priority: '0.8',
  }))

  // Contexts
  const contexts = ['top-loading-bar-context']
  const contextPages: SitemapUrl[] = contexts.map((context) => ({
    loc: `${SITE_URL}/docs/contexts/${context}`,
    lastmod: now,
    changefreq: 'monthly',
    priority: '0.7',
  }))

  // Helpers
  const helpers = ['normalizeSize']
  const helperPages: SitemapUrl[] = helpers.map((helper) => ({
    loc: `${SITE_URL}/docs/helpers/${helper}`,
    lastmod: now,
    changefreq: 'monthly',
    priority: '0.7',
  }))

  // Constants
  const constants = ['theme']
  const constantPages: SitemapUrl[] = constants.map((constant) => ({
    loc: `${SITE_URL}/docs/constants/${constant}`,
    lastmod: now,
    changefreq: 'monthly',
    priority: '0.7',
  }))

  // Combine all URLs
  const allUrls = [
    ...staticPages,
    ...componentPages,
    ...contextPages,
    ...helperPages,
    ...constantPages,
  ]

  const sitemap = generateSitemap(allUrls)

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

// Default export to prevent next.js errors
export default function Sitemap() {
  return null
}

