import Link from 'next/link';
import {
  ArrowUpRight,
  Type,
  Image as ImageIcon,
  Layers as LayersIcon,
  ToggleRight,
  Layout,
  AlertCircle,
  Activity,
} from 'lucide-react';

const categories = [
  {
    icon: Type,
    name: 'Core',
    href: '/docs/components/button',
    items: ['Button', 'Custom Text', 'Box View'],
  },
  {
    icon: ImageIcon,
    name: 'Display',
    href: '/docs/components/avatar',
    items: ['Badge', 'Avatar', 'Skeleton', 'Profile Pic', 'Progress Bar'],
  },
  {
    icon: ToggleRight,
    name: 'Inputs & Forms',
    href: '/docs/components/switch',
    items: ['Switch', 'Checkbox', 'Radio Group', 'Slider', 'OTP Input', 'Birthdate Picker'],
  },
  {
    icon: Layout,
    name: 'Navigation',
    href: '/docs/components/tabs',
    items: ['Tabs'],
  },
  {
    icon: LayersIcon,
    name: 'Overlays',
    href: '/docs/components/dialog',
    items: ['Dialog', 'Tooltip', 'Custom Modal', 'Bottom Sheet', 'Toast', 'Snackbar'],
  },
  {
    icon: Activity,
    name: 'Feedback & Motion',
    href: '/docs/components/loading-bar',
    items: ['Loading Bar', 'Marquee', 'Accordion', 'Auto Scroll Cards', 'Calendar'],
  },
];

export function Categories() {
  return (
    <section className="border-b">
      <div className="container mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-fd-muted-foreground">What's in the box</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
            A complete toolkit for production apps.
          </h2>
          <p className="mt-4 text-lg text-fd-muted-foreground leading-relaxed">
            Six categories. Twenty-seven components. Each one built around real-world patterns —
            controlled/uncontrolled modes, accessibility props, sensible defaults, and minimal
            peer dependencies.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group rounded-xl border bg-fd-card/30 p-6 hover:bg-fd-card transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex size-10 items-center justify-center rounded-lg border bg-fd-card">
                  <c.icon className="size-5" />
                </div>
                <ArrowUpRight className="size-4 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h3 className="mt-5 font-semibold tracking-tight">{c.name}</h3>
              <p className="mt-2 text-sm text-fd-muted-foreground leading-relaxed">
                {c.items.join(' · ')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
