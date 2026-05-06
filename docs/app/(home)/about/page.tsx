import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Rocket, Code } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { MiniFooter } from '@/components/landing/mini-footer';
import { SITE_NAME, SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Expo App UI — a copy-paste React Native component library built for the Expo community by Krish Panchani and Thunder Develops.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About ${SITE_NAME}`,
    description: 'The story behind Expo App UI and the team that built it.',
    url: `${SITE_URL}/about`,
    type: 'article',
  },
};

const principles = [
  {
    icon: Code,
    title: 'Code over abstractions',
    body: 'You should never have to fight a component library. We ship plain React Native code you can read, modify, and ship.',
  },
  {
    icon: Heart,
    title: 'Built with care',
    body: 'Every component is hand-crafted, tested, and refined based on real-world Expo apps shipped to the App Store and Play Store.',
  },
  {
    icon: Rocket,
    title: 'Move fast, own it',
    body: 'The CLI gets you from zero to a styled component in 30 seconds. After that, the code is yours forever.',
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="border-b">
        <div className="container mx-auto max-w-4xl px-6 py-20 md:py-28">
          <p className="text-sm font-medium text-fd-muted-foreground">About</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tighter">
            Components you own,
            <br />
            <span className="text-fd-muted-foreground">not components you import.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-fd-muted-foreground leading-relaxed max-w-2xl">
            Expo App UI was born from a simple frustration: every React Native UI library
            forces tradeoffs. You lose control, you fight defaults, you wait for upstream fixes.
            We took the shadcn/ui philosophy and brought it to React Native.
          </p>
        </div>
      </section>

      <section className="border-b">
        <div className="container mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">The mission</h2>
          <div className="mt-6 space-y-4 text-fd-muted-foreground leading-relaxed">
            <p>
              Most UI libraries treat components as black boxes. You install a package, import a
              component, and pray its API matches your needs. When it doesn’t, you’re stuck —
              styling overrides, refs into internals, opening upstream issues that may never get fixed.
            </p>
            <p>
              <span className="text-fd-foreground font-medium">Expo App UI inverts that.</span>{' '}
              Run a CLI command, and the actual source code lands in your project. You can read it,
              edit it, ship it. There’s no runtime dependency, no version lock, no upstream to wait on.
            </p>
            <p>
              The goal isn’t to be the biggest library — it’s to be the most useful one for serious
              Expo apps. Every component earns its place by being polished, performant, and easy
              to customize.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="container mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Principles</h2>
          <div className="mt-10 grid gap-px bg-fd-border/60 rounded-xl border overflow-hidden md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="bg-fd-background p-7">
                <div className="inline-flex size-10 items-center justify-center rounded-lg border bg-fd-card">
                  <p.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-fd-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="container mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Who built this</h2>
          <p className="mt-6 text-fd-muted-foreground leading-relaxed">
            Expo App UI is created and maintained by{' '}
            <a
              href="https://github.com/Krish-Panchani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fd-foreground font-medium hover:underline"
            >
              Krish Panchani
            </a>
            , a React Native developer building production mobile apps. The project is supported by{' '}
            <a
              href="https://thunderdevelops.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fd-foreground font-medium hover:underline"
            >
              Thunder Develops
            </a>
            , a studio crafting digital products for ambitious teams.
          </p>
          <p className="mt-4 text-fd-muted-foreground leading-relaxed">
            The library is open source under the MIT license. Contributions, issues, and feature
            requests are welcome on GitHub.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="https://github.com/Krish-Panchani/expo-app-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md border bg-fd-card px-4 text-sm font-medium hover:bg-fd-accent transition-colors"
            >
              <GithubIcon className="size-4" /> View on GitHub
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-fd-foreground px-4 text-sm font-medium text-fd-background hover:bg-fd-foreground/90 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
      <MiniFooter />
    </main>
  );
}
