import Link from 'next/link';
import { home } from '@/content/home';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

const { hero } = home;

/** Full-bleed photo with a dark overlay: left-to-right on desktop, top-to-bottom on mobile. */
export function Hero() {
  return (
    <section className="relative h-[640px] overflow-hidden bg-primary-dark text-white lg:h-[720px]">
      {/* Wrapped: the placeholder is `relative` itself, which would beat `absolute`. */}
      <div className="absolute inset-0">
        <ImagePlaceholder
          label={hero.image.label}
          src={hero.image.src}
          alt=""
          priority
          sizes="100vw"
          className="h-full w-full"
          alignClassName="items-center justify-start pt-10 lg:items-end lg:justify-end lg:pb-8 lg:pr-10 lg:pt-0"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-hero-mobile lg:bg-hero-desktop" />

      <div className="container-x absolute inset-x-0 bottom-9 lg:relative lg:bottom-auto lg:pt-[130px]">
        <Link
          href={hero.notice.href}
          className="-my-3 inline-flex min-h-11 items-center rounded-full lg:hidden"
        >
          <Badge>{hero.notice.mobileText}</Badge>
        </Link>
        <Link
          href={hero.notice.href}
          className="-my-[3px] inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/15 max-lg:hidden"
        >
          <span aria-hidden="true" className="size-2 rounded-full bg-orange" />
          {hero.notice.text}
        </Link>

        <h1 className="mt-4 font-serif text-[40px] font-semibold leading-[1.08] tracking-[-.025em] md:text-[56px] lg:mt-7 lg:text-[78px] lg:leading-[1.04]">
          {hero.titleLine1} <br className="max-lg:hidden" />
          {hero.titleLine2} <em className="italic text-orange">{hero.titleHighlight}</em>
        </h1>

        <p className="mt-3.5 max-w-[620px] text-base leading-[1.55] text-tint-50 lg:mt-[26px] lg:text-[19px] lg:leading-[1.6]">
          <span className="lg:hidden">{hero.mobileLead}</span>
          <span className="max-lg:hidden">{hero.lead}</span>
        </p>

        <div className="mt-[22px] flex flex-col gap-3 md:flex-row md:gap-3.5 lg:mt-9">
          <ButtonLink href={hero.primaryCta.href} variant="orange">
            {hero.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={hero.secondaryCta.href} variant="outline-light">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
