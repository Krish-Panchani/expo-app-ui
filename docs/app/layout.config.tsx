import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Package, BookOpen, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import Image from 'next/image';

const navTitle = (
  <span className="flex items-center gap-2 font-semibold tracking-tight">
    <Image
      src="/android-chrome-192x192.png"
      alt="Expo App UI"
      width={24}
      height={24}
      className="rounded-md"
    />
    <span>Expo App UI</span>
  </span>
);

const docsLinks: BaseLayoutProps['links'] = [
  {
    type: 'main',
    text: 'Docs',
    url: '/docs/getting-started',
    icon: <BookOpen className="size-4" />,
  },
  {
    type: 'main',
    text: 'Components',
    url: '/docs/components/button',
    icon: <Sparkles className="size-4" />,
  },
  {
    type: 'icon',
    icon: <Package />,
    text: 'npm',
    url: 'https://www.npmjs.com/package/expo-app-ui',
    external: true,
  },
  {
    type: 'icon',
    icon: <GithubIcon />,
    text: 'GitHub',
    url: 'https://github.com/Krish-Panchani/expo-app-ui',
    external: true,
  },
];

const homeLinks: BaseLayoutProps['links'] = [
  {
    type: 'main',
    text: 'Docs',
    url: '/docs/getting-started',
    icon: <BookOpen className="size-4" />,
  },
  {
    type: 'main',
    text: 'Components',
    url: '/docs/components/button',
    icon: <Sparkles className="size-4" />,
  },
  {
    type: 'main',
    text: 'About',
    url: '/about',
  },
  {
    type: 'main',
    text: 'Contact',
    url: '/contact',
  },
  {
    type: 'icon',
    icon: <Package />,
    text: 'npm',
    url: 'https://www.npmjs.com/package/expo-app-ui',
    external: true,
  },
  {
    type: 'icon',
    icon: <GithubIcon />,
    text: 'GitHub',
    url: 'https://github.com/Krish-Panchani/expo-app-ui',
    external: true,
  },
];

/**
 * Default options used by the docs layout. About + Contact are intentionally
 * excluded here to keep the docs sidebar/top-nav focused on documentation.
 */
export const baseOptions: BaseLayoutProps = {
  nav: { title: navTitle, transparentMode: 'top' },
  links: docsLinks,
};

/**
 * Home (landing) layout uses the full link set including About and Contact.
 */
export const homeOptions: BaseLayoutProps = {
  nav: { title: navTitle, transparentMode: 'top' },
  links: homeLinks,
};
