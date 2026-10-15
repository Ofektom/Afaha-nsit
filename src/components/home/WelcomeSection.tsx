import { Quote } from 'lucide-react';
import { home } from '@/content/home';
import { viceChancellor as vc } from '@/content/leadership';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

const copy = home.welcome;

/** Vice-Chancellor's welcome: portrait with name card, and a pull quote. */
export function WelcomeSection() {
  return (
    <section aria-label={copy.eyebrow} className="section-y">
      <div className="container-x md:flex md:items-center md:gap-12 lg:gap-20">
        <Eyebrow className="md:hidden">{copy.mobileEyebrow}</Eyebrow>

        <div className="relative mt-4 flex-none md:mt-0">
          <ImagePlaceholder
            label={vc.photo.label}
            src={vc.photo.src}
            position={vc.photo.position}
            alt={`${vc.name}, ${vc.title}`}
            icon="person"
            className="h-[380px] w-full rounded-card md:h-[420px] md:w-[300px] lg:h-[560px] lg:w-[460px] lg:rounded-panel"
            sizes="(min-width: 1025px) 460px, (min-width: 768px) 300px, 100vw"
          />
          <div className="absolute -right-6 bottom-10 rounded-2xl bg-orange px-6 py-5 text-primary-dark shadow-orange-card max-md:hidden lg:-right-10">
            <p className="font-serif text-[19px] font-semibold leading-[1.25]">{vc.name}</p>
            <p className="mt-1 text-sm font-medium">{vc.title}</p>
          </div>
        </div>

        <figure className="md:flex-1 lg:pl-5">
          <Eyebrow as="div" className="max-md:hidden">
            {copy.eyebrow}
          </Eyebrow>
          <Quote
            aria-hidden="true"
            className="mt-6 size-10 text-orange max-md:hidden"
            strokeWidth={2}
          />
          <blockquote className="mt-5 font-serif text-[26px] leading-[1.3] text-ink md:text-[28px] lg:text-[34px] lg:leading-[1.35]">
            <p>
              <span className="md:hidden">“{copy.mobileQuote}”</span>
              <span className="max-md:hidden">“{copy.quote}”</span>
            </p>
          </blockquote>
          <figcaption className="mt-3.5 md:hidden">
            <span className="block font-bold text-ink">{vc.name}</span>
            <span className="text-sm text-muted">{vc.title}</span>
          </figcaption>
          <p className="mt-3.5 text-[17px] leading-[1.6] text-muted max-md:hidden">{copy.body}</p>
          <div className="mt-7 max-md:hidden">
            <ButtonLink href={vc.messageHref} variant="primary">
              {copy.ctaLabel}
            </ButtonLink>
          </div>
        </figure>
      </div>
    </section>
  );
}
