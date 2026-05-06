import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CopyCommand } from './copy-command';

export function CTA() {
  return (
    <section className="border-b">
      <div className="container mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-fd-card to-fd-background p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-grid bg-radial-fade opacity-30 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl mx-auto">
              Ship production-grade Expo apps.
            </h2>
            <p className="mt-4 text-lg text-fd-muted-foreground max-w-xl mx-auto">
              Free, open-source, MIT-licensed. Designed for real apps — TypeScript, accessibility,
              New Architecture, and minimal peer deps from day one.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/docs/getting-started"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-fd-foreground px-6 text-sm font-medium text-fd-background hover:bg-fd-foreground/90 transition-all"
              >
                Read the docs
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <CopyCommand command="npx expo-app-ui add button" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
