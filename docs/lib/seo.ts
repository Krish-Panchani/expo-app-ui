import { NextSeoProps } from 'next-seo';

const defaultSEO: NextSeoProps = {
  titleTemplate: '%s | Expo App UI',
  defaultTitle: 'Expo App UI - Beautiful React Native Components',
  description: 'A modern UI component library for Expo React Native. Copy components directly into your project and customize them to your needs.',
  canonical: 'https://expo-app-ui.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://expo-app-ui.vercel.app',
    siteName: 'Expo App UI',
    title: 'Expo App UI - Beautiful React Native Components',
    description: 'A modern UI component library for Expo React Native. Copy components directly into your project and customize them to your needs.',
    images: [
      {
        url: 'https://expo-app-ui.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Expo App UI',
      },
    ],
  },
  twitter: {
    handle: '@krishpanchani',
    site: '@krishpanchani',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'expo, react-native, ui, components, mobile, ios, android, cli, component-library',
    },
    {
      name: 'author',
      content: 'Krish Panchani',
    },
  ],
};

export default defaultSEO;

