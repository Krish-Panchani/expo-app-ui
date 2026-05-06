import { Code2, Layers, Palette, Sparkles, Zap, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Own Your Code',
    description:
      'Components are copied directly into your project. No black boxes, no vendor lock-in. Just clean, readable code you control.',
  },
  {
    icon: Palette,
    title: 'Fully Customizable',
    description:
      'Tweak every prop, color, and animation to fit your design system. Modify components freely without fighting a framework.',
  },
  {
    icon: Zap,
    title: 'Auto Dependencies',
    description:
      'The CLI detects required helpers, theme constants, and contexts and adds them to your project automatically.',
  },
  {
    icon: ShieldCheck,
    title: 'Lightweight by default',
    description:
      'No required peer deps for most components. Self-contained, no theme provider, no extra runtime — your bundle stays small.',
  },
  {
    icon: Layers,
    title: 'Built for production',
    description:
      'Designed around real-world best practices: TypeScript strict mode, accessibility roles and states, New Architecture (Fabric) compatible, and covered by an automated test suite.',
  },
  {
    icon: Sparkles,
    title: 'Beautifully Designed',
    description:
      'Each component is hand-crafted to look great out of the box. Modern, native-feeling interactions on iOS and Android.',
  },
];

export function Features() {
  return (
    <section className="border-b">
      <div className="container mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-fd-muted-foreground">Why Expo App UI</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
            Built for developers who ship.
          </h2>
          <p className="mt-4 text-lg text-fd-muted-foreground leading-relaxed">
            Every component is designed for production. Best-practice patterns,
            minimal peer dependencies, and full code ownership — so your screens
            stay lightweight and your team stays in control.
          </p>
        </div>

        <div className="mt-16 grid gap-px bg-fd-border/60 rounded-xl border overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-fd-background p-7 hover:bg-fd-card/50 transition-colors"
            >
              <div className="inline-flex size-10 items-center justify-center rounded-lg border bg-fd-card">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-fd-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
