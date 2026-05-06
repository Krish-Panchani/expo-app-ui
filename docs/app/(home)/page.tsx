import { Hero } from '@/components/landing/hero';
import { Stats } from '@/components/landing/stats';
import { Features } from '@/components/landing/features';
import { Categories } from '@/components/landing/categories';
import { ComponentsPreview } from '@/components/landing/components-preview';
import { InstallSteps } from '@/components/landing/install-steps';
import { FAQ } from '@/components/landing/faq';
import { CTA } from '@/components/landing/cta';
import { SiteFooter } from '@/components/landing/site-footer';
import type { Metadata } from 'next';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: `${SITE_NAME} – Beautifully designed React Native components for Expo`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} – Beautifully designed React Native components for Expo`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <ComponentsPreview />
      <Categories />
      <Features />
      <InstallSteps />
      <FAQ />
      <CTA />
      <SiteFooter />
    </main>
  );
}
