import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx-components';
import { MiniFooter } from '@/components/landing/mini-footer';
import { BuyMeACoffeeButton } from '@/components/bmc-button';
import type { Metadata } from 'next';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = (page.data as any).body as React.ComponentType<{ components?: any }>;

  return (
    <DocsPage
      toc={(page.data as any).toc}
      full={(page.data as any).full}
      tableOfContent={{
        footer: (
          <div className="mt-4 pt-4 border-t border-fd-border">
            <p className="text-xs text-fd-muted-foreground mb-2">
              Find this useful?
            </p>
            <BuyMeACoffeeButton variant="compact" />
          </div>
        ),
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
      <MiniFooter />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const url = `/docs/${(params.slug ?? []).join('/')}`;
  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
    },
  };
}
