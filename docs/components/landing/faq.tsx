const faqs = [
  {
    q: 'Is Expo App UI free to use?',
    a: 'Yes. Expo App UI is open-source under the MIT license — free for personal and commercial projects.',
  },
  {
    q: 'How is this different from React Native Paper or NativeBase?',
    a: 'Those libraries ship as packaged components you import. Expo App UI copies the actual source into your project — you own the code, can edit anything, and have zero runtime dependencies.',
  },
  {
    q: 'Does it work with bare React Native (not Expo)?',
    a: 'Components are written for React Native and most work in bare RN projects. Some use Expo-specific APIs like expo-image — check each component’s docs.',
  },
  {
    q: 'Can I use these components in production?',
    a: 'Absolutely. Components are TypeScript-first, performance-optimized with Reanimated, and battle-tested in shipped apps.',
  },
  {
    q: 'How do I update components after copying them?',
    a: 'Since you own the code, updates are intentional. Re-run `npx expo-app-ui add <component>` to overwrite, or cherry-pick changes from GitHub.',
  },
  {
    q: 'Will more components be added?',
    a: 'Yes — the library grows based on community needs. Open an issue on GitHub to request a component.',
  },
];

export function FAQ() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="border-b">
      <div className="container mx-auto max-w-4xl px-6 py-24 md:py-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-fd-muted-foreground">FAQ</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
        </div>
        <div className="mt-14 divide-y border rounded-xl bg-fd-card/30 overflow-hidden">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6 open:bg-fd-card/50 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer list-none font-medium tracking-tight">
                {f.q}
                <span className="ml-4 size-6 inline-flex items-center justify-center rounded-md border text-fd-muted-foreground group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-fd-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
