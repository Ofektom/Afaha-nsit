import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Hourglass } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { ComingSoonHero, HelpBand } from '@/components/ui/ComingSoonHero';
import { site } from '@/content/site';
import { ComingSoonTitle } from './ComingSoonTitle';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Coming soon',
  description: 'This page is being prepared and will be available soon.',
  path: '/coming-soon/',
  noIndex: true,
});

/** Generic page for any link without a page yet: /coming-soon/?page=<Name>. */
export default function ComingSoonPage() {
  return (
    <>
      <ComingSoonHero
        badge="In preparation"
        icon={Hourglass}
        title={
          <Suspense fallback="This page — page coming soon">
            <ComingSoonTitle />
          </Suspense>
        }
        lead="We are preparing this section of the new University website. In the meantime, our offices can help with any questions."
      />
      <HelpBand
        title="Looking for something specific?"
        text={`Call ${site.contact.phone} or email ${site.contact.email}, ${site.contact.hoursLong}.`}
        actions={
          <>
            <ButtonLink href="/contact/" variant="primary">
              Contact us
            </ButtonLink>
            <ButtonLink href="/news/" variant="outline-dark">
              Latest news
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
