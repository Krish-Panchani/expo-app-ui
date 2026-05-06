const faqs = [
  {
    q: 'Is Expo App UI production-ready?',
    a: 'Yes. Every component is built for real apps — TypeScript strict mode with explicit prop interfaces, accessibility props (role, state, value, live regions) wired in, controlled/uncontrolled modes where it matters, and an automated test suite for the CLI. Components are designed around best-practice React Native patterns, not toy examples.',
  },
  {
    q: 'Is it free to use?',
    a: 'Yes. Expo App UI is open-source under the MIT license — free for personal and commercial projects, no attribution required.',
  },
  {
    q: 'How is this different from React Native Paper or NativeBase?',
    a: 'Those libraries ship as packaged components you import — you trade flexibility for convenience and add runtime weight. Expo App UI copies the actual source into your project: you own the code, edit anything, and avoid runtime dependency cost. See our full comparison page in the docs.',
  },
  {
    q: 'Does it support the New Architecture (Fabric / TurboModules)?',
    a: 'Yes. Components are tested against Expo SDK 52+ with newArchEnabled: true. No legacy bridge APIs, no findNodeHandle, no deprecated lifecycle methods. The Old Architecture is also still supported.',
  },
  {
    q: 'Will it bloat my bundle?',
    a: 'No. You only ship what you copy in — there is no library runtime. Most components have zero required peer dependencies; a few (bottom-sheet, custom-modal, slider) optionally use Reanimated or gesture-handler when present. Your screens stay lightweight.',
  },
  {
    q: 'Does it work with bare React Native (not Expo)?',
    a: 'Most components work in bare RN projects. A few use Expo-specific APIs (e.g. expo-image) and are noted on their docs page. You can usually swap those for RN equivalents in a couple lines since you own the code.',
  },
  {
    q: 'How do I update components after copying them?',
    a: 'Since you own the code, updates are intentional — they never break your app silently. Re-run `npx expo-app-ui add <component> --overwrite` to pull the latest, or cherry-pick specific changes from GitHub.',
  },
  {
    q: 'Will more components be added?',
    a: 'Yes — the library grows based on community needs and follows the same production-readiness bar (a11y, types, tests). Open an issue on GitHub to request or contribute one.',
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
