import Link from 'next/link';

export function MiniFooter() {
  return (
    <footer className="border-t mt-20">
      <div className="container mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-fd-muted-foreground">
        <p>
          © {new Date().getFullYear()} Expo App UI · MIT License · Crafted by{' '}
          <a
            href="https://github.com/Krish-Panchani"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-fd-foreground transition-colors"
          >
            Krish Panchani
          </a>{' '}
          ×{' '}
          <a
            href="https://thunderdevelops.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-fd-foreground transition-colors"
          >
            Thunder Develops
          </a>
        </p>
        <div className="flex gap-5">
          <Link href="/about" className="hover:text-fd-foreground transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-fd-foreground transition-colors">
            Contact
          </Link>
          <a
            href="https://github.com/Krish-Panchani/expo-app-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fd-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
