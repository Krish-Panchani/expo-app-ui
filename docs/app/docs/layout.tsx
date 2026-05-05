import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '../layout.config';
import { source } from '@/lib/source';
import { SiteFooter } from '@/components/landing/site-footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      sidebar={{ defaultOpenLevel: 99 }}
    >
      {children}
      <SiteFooter />
    </DocsLayout>
  );
}
