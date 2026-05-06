import { llms } from 'fumadocs-core/source';
import { source } from '@/lib/source';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/utils';

// Static — built once and cached.
export const dynamic = 'force-static';
export const revalidate = false;

export function GET() {
  const { index } = llms(source);

  const header = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `Production-ready, copy-paste React Native components for Expo. TypeScript-first, accessible, New Architecture (Fabric) compatible, with minimal peer dependencies.`,
    '',
    `Site: ${SITE_URL}`,
    `Repository: https://github.com/Krish-Panchani/expo-app-ui`,
    `npm: https://www.npmjs.com/package/expo-app-ui`,
    '',
    '## Documentation',
    '',
  ].join('\n');

  return new Response(header + index(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
