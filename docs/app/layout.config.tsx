import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Package, BookOpen, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import Image from 'next/image';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
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
    ),
    transparentMode: 'top',
  },
  links: [
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
  ],
};
