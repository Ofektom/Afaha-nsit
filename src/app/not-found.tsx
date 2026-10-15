import type { Metadata } from 'next';
import { SearchX } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { ComingSoonHero, HelpBand } from '@/components/ui/ComingSoonHero';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <ComingSoonHero
        badge="Error 404"
        icon={SearchX}
        title="We couldn’t find that page."
        lead="The link may be out of date, or the page may have moved. Try the menu above, the search button, or one of the links below."
      >
        <div className="mt-[34px] flex flex-wrap justify-center gap-3">
          <ButtonLink href="/admissions/" variant="orange">
            Admissions
          </ButtonLink>
          <ButtonLink href="/academics/" variant="outline-light">
            Faculties & Departments
          </ButtonLink>
          <ButtonLink href="/news/" variant="outline-light">
            News & Events
          </ButtonLink>
        </div>
      </ComingSoonHero>
      <HelpBand
        title="Still can’t find it?"
        text="Tell us what you were looking for and we’ll point you in the right direction."
        actions={
          <ButtonLink href="/contact/" variant="primary">
            Contact us
          </ButtonLink>
        }
      />
    </>
  );
}
