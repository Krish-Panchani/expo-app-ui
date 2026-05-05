'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="group inline-flex items-center gap-3 rounded-lg border bg-fd-card/70 backdrop-blur px-4 py-2.5 font-mono text-sm hover:bg-fd-accent transition-colors"
      aria-label="Copy command"
    >
      <span className="text-fd-muted-foreground select-none">$</span>
      <code className="text-fd-foreground">{command}</code>
      <span className="ml-1 inline-flex size-7 items-center justify-center rounded-md border bg-fd-background/50 group-hover:bg-fd-card transition-colors">
        {copied ? (
          <Check className="size-3.5 text-green-500" />
        ) : (
          <Copy className="size-3.5 text-fd-muted-foreground" />
        )}
      </span>
    </button>
  );
}
