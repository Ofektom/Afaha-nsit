import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { faculties, facultyHref } from '@/content/faculties';
import { home } from '@/content/home';
import { FacultyCard } from '@/components/cards/FacultyCard';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

const copy = home.faculties;

export function FacultiesSection() {
  return (
    <section aria-labelledby="home-faculties" className="section-y bg-primary-dark text-white">
      <div className="container-x">
        <SectionHeading
          id="home-faculties"
          tone="light"
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
          leadClassName="max-md:hidden"
          action={
            <ButtonLink href={copy.cta.href} variant="outline-light">
              {copy.cta.label}
            </ButtonLink>
          }
          actionClassName="max-md:hidden"
          spacing="mb-2 md:mb-8 lg:mb-12"
        />

        <ul className="md:hidden">
          {faculties.map((f) => (
            <li key={f.slug} className="border-b border-tint-800">
              <Link
                href={facultyHref(f.slug)}
                className="flex min-h-11 items-center justify-between py-4 font-serif text-[17px] font-semibold leading-[1.25] tracking-[-.01em]"
              >
                {f.shortName}
                <ArrowRight aria-hidden="true" className="size-5 text-orange" strokeWidth={2} />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-2 gap-6 max-md:hidden lg:grid-cols-3">
          {faculties.map((f) => (
            <li key={f.slug} className="flex">
              <FacultyCard faculty={f} className="flex-1" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
