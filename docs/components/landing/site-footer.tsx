import Link from 'next/link';
import { Package } from 'lucide-react';
import { GithubIcon } from '@/components/icons';

const links = {
  Documentation: [
    { label: 'Getting Started', href: '/docs/getting-started' },
    { label: 'CLI Commands', href: '/docs/cli' },
    { label: 'Components', href: '/docs/components/button' },
    { label: 'Theme', href: '/docs/constants/theme' },
  ],
  Resources: [
    { label: 'GitHub', href: 'https://github.com/Krish-Panchani/expo-app-ui' },
    { label: 'npm Package', href: 'https://www.npmjs.com/package/expo-app-ui' },
    { label: 'Releases', href: 'https://github.com/Krish-Panchani/expo-app-ui/releases' },
    { label: 'Issues', href: 'https://github.com/Krish-Panchani/expo-app-ui/issues' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Thunder Develops', href: 'https://thunderdevelops.in' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t bg-fd-card/30 mt-32">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <img
                src="/android-chrome-192x192.png"
                alt="Expo App UI"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span>Expo App UI</span>
            </Link>
            <p className="mt-4 text-sm text-fd-muted-foreground max-w-xs">
              Beautifully designed, copy-paste React Native components for Expo.
              Built for developers who care about quality.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href="https://github.com/Krish-Panchani/expo-app-ui"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex size-9 items-center justify-center rounded-md border hover:bg-fd-accent transition-colors"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href="https://www.npmjs.com/package/expo-app-ui"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="npm"
                className="inline-flex size-9 items-center justify-center rounded-md border hover:bg-fd-accent transition-colors"
              >
                <Package className="size-4" />
              </a>
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-fd-muted-foreground">
            © {new Date().getFullYear()} Expo App UI. Crafted by{' '}
            <a
              href="https://github.com/Krish-Panchani"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-fd-foreground transition-colors"
            >
              Krish Panchani
            </a>{' '}
            ×{' '}
            <a
              href="https://thunderdevelops.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-fd-foreground transition-colors"
            >
              Thunder Develops
            </a>
          </p>
          <p className="text-sm text-fd-muted-foreground">
            MIT License · Built for the Expo community
          </p>
        </div>
      </div>
    </footer>
  );
}
