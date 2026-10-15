import { home } from '@/content/home';
import { ButtonLink } from '@/components/ui/Button';

const { cta } = home;

/** Orange call-to-action band above the footer. */
export function CtaBand() {
  return (
    <section
      aria-labelledby="home-cta"
      className="relative overflow-hidden bg-orange text-primary-dark"
    >
      <div
        aria-hidden="true"
        className="absolute -top-[120px] right-[300px] size-[340px] rounded-full border-[1.5px] border-white/25 max-lg:hidden"
      />
      <div className="container-x relative py-9 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:py-[72px]">
        <div>
          <h2
            id="home-cta"
            className="font-serif text-[26px] font-semibold leading-[1.2] tracking-[-.01em] lg:text-[40px] lg:leading-[1.15]"
          >
            {cta.titleLine1} <br className="max-lg:hidden" />
            {cta.titleLine2}
          </h2>
          <p className="mt-2.5 text-[17px] font-medium max-md:hidden">{cta.text}</p>
        </div>
        <div className="mt-[18px] flex flex-wrap gap-3.5 lg:mt-0 lg:flex-none">
          <ButtonLink href={cta.primary.href} variant="primary">
            {cta.primary.label}
          </ButtonLink>
          <ButtonLink href={cta.secondary.href} variant="white" className="max-md:hidden">
            {cta.secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
