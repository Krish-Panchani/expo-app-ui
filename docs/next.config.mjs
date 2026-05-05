import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://expo-ui.thunderdevelops.in',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      { source: '/docs', destination: '/docs/getting-started', permanent: false },
    ];
  },
};

export default withMDX(config);
