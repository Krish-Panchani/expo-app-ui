import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageCircle, Bug, Lightbulb, Globe } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { SITE_NAME, SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with the ${SITE_NAME} team. Report bugs, request features, or say hello.`,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: `Contact ${SITE_NAME}`,
    description: 'Reach out about Expo App UI — bugs, features, partnerships, or just to say hi.',
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
};

const channels = [
  {
    icon: Bug,
    title: 'Report a bug',
    body: 'Found something broken? File an issue on GitHub with reproduction steps.',
    cta: 'Open an issue',
    href: 'https://github.com/Krish-Panchani/expo-app-ui/issues/new',
  },
  {
    icon: Lightbulb,
    title: 'Request a feature',
    body: 'Have an idea for a new component or improvement? We’d love to hear it.',
    cta: 'Suggest a feature',
    href: 'https://github.com/Krish-Panchani/expo-app-ui/issues/new',
  },
  {
    icon: MessageCircle,
    title: 'Discussions',
    body: 'Ask questions, share what you’re building, or get help from the community.',
    cta: 'Join discussions',
    href: 'https://github.com/Krish-Panchani/expo-app-ui/discussions',
  },
  {
    icon: Mail,
    title: 'Email',
    body: 'Partnerships, collaborations, or anything that needs a private channel.',
    cta: 'krishpanchani1346@gmail.com',
    href: 'mailto:krishpanchani1346@gmail.com',
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="border-b">
        <div className="container mx-auto max-w-4xl px-6 py-20 md:py-28">
          <p className="text-sm font-medium text-fd-muted-foreground">Contact</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tighter">
            Let’s talk.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-fd-muted-foreground leading-relaxed max-w-2xl">
            Whether it’s a bug, a feature idea, or a partnership opportunity — we read every
            message. Pick the channel that fits.
          </p>
        </div>
      </section>

      <section className="border-b">
        <div className="container mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-px bg-fd-border/60 rounded-xl border overflow-hidden sm:grid-cols-2">
            {channels.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="bg-fd-background p-8 hover:bg-fd-card/50 transition-colors group"
              >
                <div className="inline-flex size-10 items-center justify-center rounded-lg border bg-fd-card">
                  <c.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm text-fd-muted-foreground leading-relaxed">{c.body}</p>
                <p className="mt-4 text-sm font-medium group-hover:underline">{c.cta} →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="container mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Other places</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="https://github.com/Krish-Panchani"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md border bg-fd-card px-4 text-sm font-medium hover:bg-fd-accent transition-colors"
            >
              <GithubIcon className="size-4" /> @Krish-Panchani
            </Link>
            <Link
              href="https://thunderdevelops.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md border bg-fd-card px-4 text-sm font-medium hover:bg-fd-accent transition-colors"
            >
              <Globe className="size-4" /> Thunder Develops
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
