import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

// Static export so Vercel can cache the index.
export const revalidate = false;

export const { GET } = createFromSource(source);
