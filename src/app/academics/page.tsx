import type { Metadata } from 'next';
import { Suspense } from 'react';
import { academicsPage } from '@/content/faculties';
import {
  AcademicsBrowser,
  AcademicsBrowserWithParams,
  ProgrammeSearch,
  ProgrammeSearchWithParams,
} from '@/components/academics/AcademicsBrowser';
import { PageHero } from '@/components/ui/PageHero';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Faculties & Departments',
  description: academicsPage.lead,
  path: '/academics/',
});

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Academics' },
          { label: academicsPage.title },
        ]}
        title={academicsPage.title}
        lead={academicsPage.lead}
      >
        {/* The static HTML shows the default faculty; the URL's ?faculty=/?q= apply on load. */}
        <Suspense fallback={<ProgrammeSearch />}>
          <ProgrammeSearchWithParams />
        </Suspense>
      </PageHero>
      <Suspense fallback={<AcademicsBrowser />}>
        <AcademicsBrowserWithParams />
      </Suspense>
    </>
  );
}
