import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const showcase = [
  { slug: 'button', name: 'Button', img: '/examples/buttons-example.png', tag: 'Component' },
  { slug: 'custom-modal', name: 'Custom Modal', img: '/examples/custom-modal-example.gif', tag: 'Overlay' },
  { slug: 'otp-input', name: 'OTP Input', img: '/examples/otp-input-example.gif', tag: 'Form' },
  { slug: 'loading-bar', name: 'Loading Bar', img: '/examples/top-loading-bar-example.gif', tag: 'Feedback' },
  { slug: 'accordion', name: 'Accordion', img: '/examples/accordion-example.gif', tag: 'Disclosure' },
  { slug: 'auto-scroll-cards', name: 'Auto Scroll Cards', img: '/examples/auto-scroll-cards-example.gif', tag: 'Layout' },
  { slug: 'marquee', name: 'Marquee', img: '/examples/marquee-example.gif', tag: 'Animation' },
  { slug: 'profile-pic', name: 'Profile Pic', img: '/examples/profile-pic-example.gif', tag: 'Display' },
  { slug: 'progress-bar', name: 'Progress Bar', img: '/examples/progress-bar-example.gif', tag: 'Feedback' },
  { slug: 'calender', name: 'Calendar', img: '/examples/celender-example.gif', tag: 'Date' },
];

export function ComponentsPreview() {
  return (
    <section className="border-b">
      <div className="container mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-fd-muted-foreground">Component Library</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
              27+ components. Production-grade.
            </h2>
            <p className="mt-4 text-lg text-fd-muted-foreground leading-relaxed">
              Buttons, dialogs, sheets, toasts, sliders, tabs, calendar, and more. Each one is
              hand-crafted, accessible, TypeScript-typed, and ready to drop into your Expo app.
            </p>
          </div>
          <Link
            href="/docs/components/button"
            className="inline-flex h-10 items-center gap-1.5 rounded-md border bg-fd-card/50 px-4 text-sm font-medium hover:bg-fd-accent transition-colors self-start md:self-auto"
          >
            View all <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {showcase.map((item, i) => (
            <Link
              key={item.slug}
              href={`/docs/components/${item.slug}`}
              className="group relative overflow-hidden rounded-xl border bg-fd-card/30 hover:bg-fd-card transition-colors"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-fd-muted/40 to-fd-muted/10 flex items-center justify-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain p-6 transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between p-4 border-t">
                <div>
                  <p className="text-xs text-fd-muted-foreground">{item.tag}</p>
                  <h3 className="font-medium tracking-tight">{item.name}</h3>
                </div>
                <ArrowUpRight className="size-4 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
