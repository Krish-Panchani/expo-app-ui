import Link from 'next/link';
import { ArrowRight, Copy, Sparkles } from 'lucide-react';
import { CopyCommand } from './copy-command';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 bg-grid bg-radial-fade opacity-40 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fd-foreground/20 to-transparent" />

      <div className="container relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="https://www.npmjs.com/package/expo-app-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border bg-fd-card/50 backdrop-blur px-4 py-1.5 text-xs font-medium hover:bg-fd-accent transition-colors"
          >
            <Sparkles className="size-3.5" />
            <span>Production-ready · 27+ components</span>
            <span className="text-fd-muted-foreground">·</span>
            <span className="text-fd-muted-foreground">New Arch</span>
            <ArrowRight className="size-3" />
          </Link>

          <h1 className="animate-fade-up mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter [animation-delay:80ms]">
            Build mobile UIs
            <br />
            <span className="bg-gradient-to-br from-fd-foreground via-fd-foreground to-fd-muted-foreground bg-clip-text text-transparent">
              you actually own.
            </span>
          </h1>

          <p className="animate-fade-up mt-6 text-lg md:text-xl text-fd-muted-foreground max-w-2xl mx-auto leading-relaxed [animation-delay:160ms]">
            Production-ready React Native components for Expo. TypeScript-first,
            accessible, lightweight — with minimal peer dependencies. Copy them in,
            customize freely, ship with confidence.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 [animation-delay:240ms]">
            <Link
              href="/docs/getting-started"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-fd-foreground px-6 text-sm font-medium text-fd-background shadow-sm hover:bg-fd-foreground/90 transition-all"
            >
              Get Started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/docs/components/button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border bg-fd-card/50 backdrop-blur px-6 text-sm font-medium hover:bg-fd-accent transition-colors"
            >
              Browse Components
            </Link>
          </div>

          <div className="animate-fade-up mt-10 flex justify-center [animation-delay:320ms]">
            <CopyCommand command="npx expo-app-ui add button" />
          </div>
        </div>
      </div>
    </section>
  );
}
