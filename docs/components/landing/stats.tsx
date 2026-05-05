const stats = [
  { value: '13', label: 'Components' },
  { value: '0', label: 'External deps' },
  { value: '100%', label: 'TypeScript' },
  { value: 'MIT', label: 'License' },
];

export function Stats() {
  return (
    <section className="border-b bg-fd-card/30">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-semibold tracking-tighter">{s.value}</div>
              <div className="mt-2 text-sm text-fd-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
