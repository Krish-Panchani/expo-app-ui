import { CopyCommand } from './copy-command';

const steps = [
  {
    n: '01',
    title: 'Install the CLI',
    body: 'Run the CLI directly with npx — no global install needed.',
    cmd: 'npx expo-app-ui init',
  },
  {
    n: '02',
    title: 'Add a component',
    body: 'Pick what you need. Files are copied straight into your project.',
    cmd: 'npx expo-app-ui add button',
  },
  {
    n: '03',
    title: 'Use & customize',
    body: 'Import, render, and tweak — the code is yours.',
    cmd: 'import Button from "@/components/ui/button"',
  },
];

export function InstallSteps() {
  return (
    <section className="border-b">
      <div className="container mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-fd-muted-foreground">Quick Start</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
            Up and running in 30 seconds.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-xl border bg-fd-card/30 p-7">
              <div className="font-mono text-xs text-fd-muted-foreground">{s.n}</div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-fd-muted-foreground leading-relaxed">{s.body}</p>
              <div className="mt-5">
                <CopyCommand command={s.cmd} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
