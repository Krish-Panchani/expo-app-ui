import { promises as fs } from 'node:fs';
import path from 'node:path';
import { source } from '@/lib/source';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/utils';

// Static — built once and cached.
export const dynamic = 'force-static';
export const revalidate = false;

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'docs');

async function readMdx(slugs: string[]): Promise<string | null> {
  // Try <slug>.mdx, then <slug>/index.mdx
  const direct = path.join(CONTENT_ROOT, ...slugs) + '.mdx';
  const indexed = path.join(CONTENT_ROOT, ...slugs, 'index.mdx');
  try {
    return await fs.readFile(direct, 'utf-8');
  } catch {}
  try {
    return await fs.readFile(indexed, 'utf-8');
  } catch {}
  return null;
}

function stripFrontmatter(src: string): string {
  if (!src.startsWith('---')) return src;
  const end = src.indexOf('\n---', 3);
  if (end === -1) return src;
  return src.slice(end + 4).replace(/^\s*\n/, '');
}

export async function GET() {
  const pages = source.getPages();

  const sections = await Promise.all(
    pages.map(async (page) => {
      const slugs = page.slugs;
      const url = `${SITE_URL}${page.url}`;
      const raw = await readMdx(slugs);
      const body = raw ? stripFrontmatter(raw) : '';
      const title = (page.data as any).title ?? slugs.join('/');
      const description = (page.data as any).description ?? '';

      return [
        `# ${title}`,
        '',
        description ? `> ${description}` : null,
        description ? '' : null,
        `Source: ${url}`,
        '',
        body,
      ]
        .filter((line) => line !== null)
        .join('\n');
    })
  );

  const header = [
    `# ${SITE_NAME} — Full Documentation`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `Full text of every documentation page, intended for ingestion by LLMs and AI crawlers.`,
    `Site: ${SITE_URL}`,
    `Repository: https://github.com/Krish-Panchani/expo-app-ui`,
    '',
    '---',
    '',
  ].join('\n');

  const body = sections.join('\n\n---\n\n');

  return new Response(header + body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
