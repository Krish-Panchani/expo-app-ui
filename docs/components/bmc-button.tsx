'use client';
import { Coffee, Heart } from 'lucide-react';
import type { MouseEvent } from 'react';

const HREF = 'https://www.buymeacoffee.com/ThunderDevelops';

function openBmc(e: MouseEvent<HTMLAnchorElement>) {
  if (typeof window === 'undefined') return;
  const widgetBtn =
    document.getElementById('bmc-wbtn') ||
    (document.querySelector('#bmc-wbtn-message, .bmc-btn-container button') as HTMLElement | null);

  if (widgetBtn) {
    e.preventDefault();
    widgetBtn.click();
  }
}

export function BuyMeACoffeeButton({
  className = '',
  variant = 'default',
}: {
  className?: string;
  variant?: 'default' | 'compact';
}) {
  if (variant === 'compact') {
    return (
      <a
        href={HREF}
        onClick={openBmc}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy me a coffee"
        className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-amber-500/30 bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-900 shadow-sm transition-all hover:border-amber-500/60 hover:shadow-md hover:-translate-y-0.5 dark:border-amber-400/20 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-900/40 dark:text-amber-200 dark:hover:border-amber-400/40 ${className}`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full dark:via-white/10"
        />
        <Coffee className="size-3.5 transition-transform group-hover:-rotate-12 group-hover:scale-110" />
        <span className="relative">Buy me a coffee</span>
      </a>
    );
  }

  return (
    <a
      href={HREF}
      onClick={openBmc}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buy me a coffee"
      className={`group relative inline-flex h-11 items-center gap-2.5 overflow-hidden rounded-xl px-5 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, #f59e0b 0%, #f97316 40%, #ef4444 75%, #f59e0b 100%)',
        backgroundSize: '200% 100%',
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-shimmer"
        style={{
          backgroundImage:
            'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <Coffee className="relative size-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
      <span className="relative tracking-tight">Buy me a coffee</span>
      <Heart className="relative size-3.5 fill-white/90 text-white/90 transition-transform duration-300 group-hover:scale-125" />
    </a>
  );
}
