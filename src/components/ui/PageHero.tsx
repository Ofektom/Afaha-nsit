import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';

export interface Crumb {
  label: string;
  /** Omit for the current page (the last crumb) or for a section without its own page. */
  href?: string;
}

interface PageHeroProps {
  crumbs: Crumb[];
  title: React.ReactNode;
  lead?: React.ReactNode;
  image?: { src: string; label: string };
  /** Image box size on desktop, e.g. "lg:h-[340px] lg:w-[560px]". */
  imageClassName?: string;
  /** Extra content under the lead (buttons, search…). */
  children?: React.ReactNode;
}

/** Dark page header: breadcrumb, H1, lead and an optional photo on the right. */
export function PageHero({
  crumbs,
  title,
  lead,
  image,
  imageClassName = 'lg:h-[340px] lg:w-[560px]',
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary-dark py-12 text-white lg:py-[72px]">
      <div
        aria-hidden="true"
        className="absolute -right-[120px] -top-[160px] size-[520px] rounded-full border-[1.5px] border-orange/20"
      />
      <div className="container-x relative lg:flex lg:items-center lg:gap-16">
        <div className="lg:flex-1">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-tint-300">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && (
                    <ChevronRight aria-hidden="true" className="size-3.5" strokeWidth={2} />
                  )}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="font-semibold text-orange">
                      {c.label}
                    </span>
                  ) : c.href ? (
                    <Link
                      href={c.href}
                      className="-my-3 inline-block rounded py-3 transition-colors hover:text-white"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span>{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-5 font-serif text-[36px] font-semibold leading-[1.08] tracking-[-.02em] md:text-[48px] lg:text-[60px]">
            {title}
          </h1>
          {lead && (
            <p className="mt-5 max-w-[640px] text-base leading-[1.6] text-tint-200 lg:text-lg">
              {lead}
            </p>
          )}
          {children}
        </div>
        {image && (
          <ImagePlaceholder
            label={image.label}
            src={image.src}
            priority
            className={`mt-10 h-[240px] w-full flex-none rounded-panel md:h-[320px] lg:mt-0 ${imageClassName}`}
            sizes="(min-width: 1025px) 560px, 100vw"
          />
        )}
      </div>
    </section>
  );
}
