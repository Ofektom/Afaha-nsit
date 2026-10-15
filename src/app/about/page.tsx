import type { Metadata } from 'next';
import { Eye, Mail, Star, Target, type LucideIcon } from 'lucide-react';
import { about } from '@/content/about';
import { principalOfficers, proChancellor, viceChancellor as vc } from '@/content/leadership';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionTabs } from '@/components/ui/SectionTabs';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { comingSoon } from '@/lib/links';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description: about.hero.lead,
  path: '/about/',
});

const valueIcons: Record<(typeof about.values.items)[number]['icon'], LucideIcon> = {
  vision: Eye,
  mission: Target,
  values: Star,
};

// Sections sit below the sticky header and tab bar when reached by an anchor link.
const anchorOffset = 'scroll-mt-[140px]';

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        title={about.hero.title}
        lead={about.hero.lead}
        image={about.hero.image}
      />
      <SectionTabs tabs={about.tabs} label="About sections" />

      {/* Overview */}
      <section
        id="overview"
        aria-labelledby="overview-title"
        className={cn('section-y', anchorOffset)}
      >
        <div className="container-x lg:flex lg:items-start lg:gap-[72px]">
          <div className="lg:flex-1">
            <Eyebrow>{about.overview.eyebrow}</Eyebrow>
            <h2
              id="overview-title"
              className="mt-3 max-w-[720px] font-serif text-[28px] font-semibold leading-[1.12] tracking-[-.015em] md:text-[36px] lg:mt-3.5 lg:text-[44px]"
            >
              {about.overview.title}
            </h2>
            {about.overview.paragraphs.map((p, i) => (
              <p
                key={p.slice(0, 20)}
                className={cn(
                  'text-base leading-[1.6] text-muted lg:text-[17px]',
                  i === 0 ? 'mt-[22px]' : 'mt-3.5',
                )}
              >
                {p}
              </p>
            ))}
          </div>
          <div className="mt-10 rounded-panel bg-cream p-6 md:p-8 lg:mt-0 lg:w-[440px] lg:flex-none">
            <h3 className="text-[13px] font-bold uppercase tracking-eyebrow text-orange-text">
              At a glance
            </h3>
            <dl>
              {about.overview.atAGlance.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 border-b border-line py-4 text-[15px] leading-[1.3]"
                >
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="text-right font-semibold text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Vision, mission & values */}
      <section
        id="vision-mission"
        aria-labelledby="vision-title"
        className={cn('section-y bg-cream', anchorOffset)}
      >
        <div className="container-x">
          <SectionHeading
            id="vision-title"
            eyebrow={about.values.eyebrow}
            title={about.values.title}
            spacing="mb-8 lg:mb-10"
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {about.values.items.map((item, i) => {
              const Icon = valueIcons[item.icon];
              const featured = i === 0;
              return (
                <li
                  key={item.title}
                  className={cn(
                    'rounded-panel p-7 lg:p-9',
                    featured ? 'bg-primary text-white' : 'border border-line bg-white',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-[50px] items-center justify-center rounded-[14px]',
                      featured ? 'bg-primary-hover text-orange' : 'bg-primary-soft text-primary',
                    )}
                  >
                    <Icon aria-hidden="true" className="size-6" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 font-serif text-[26px] font-semibold leading-[1.25] tracking-[-.01em]">
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-3.5 text-base leading-[1.65]',
                      featured ? 'text-primary-soft' : 'text-muted',
                    )}
                  >
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Management */}
      <section
        id="management"
        aria-labelledby="management-title"
        className={cn('section-y', anchorOffset)}
      >
        <div className="container-x">
          <SectionHeading
            id="management-title"
            eyebrow={about.management.eyebrow}
            title={about.management.title}
            lead={about.management.lead}
            action={
              <ButtonLink href={about.management.cta.href} variant="outline-dark">
                {about.management.cta.label}
              </ButtonLink>
            }
          />

          <article className="overflow-hidden rounded-panel-lg bg-primary-dark text-white md:flex md:items-center md:gap-10 lg:gap-14">
            <ImagePlaceholder
              label={vc.photo.label}
              src={vc.photo.src}
              position={vc.photo.position}
              alt={`${vc.name}, ${vc.title}`}
              icon="person"
              className="h-[340px] w-full flex-none md:h-[460px] md:w-[300px] lg:w-[420px]"
              sizes="(min-width: 1025px) 420px, (min-width: 768px) 300px, 100vw"
            />
            <div className="p-6 md:flex-1 md:py-10 md:pl-0 md:pr-10 lg:pr-14">
              <p className="text-[13px] font-bold uppercase tracking-eyebrow text-orange">
                {vc.title}
              </p>
              <h3 className="mt-3.5 font-serif text-[32px] font-semibold leading-[1.15] tracking-[-.01em] lg:text-[44px]">
                {vc.name}
              </h3>
              <p className="mt-2.5 text-base font-medium text-tint-300">{vc.qualifications}</p>
              <p className="mt-[18px] text-base leading-[1.65] text-tint-50 lg:text-[17px]">
                {vc.bio}
              </p>
              <div className="mt-[26px] flex flex-wrap gap-3">
                <ButtonLink href={vc.profileHref} variant="orange">
                  Read profile
                </ButtonLink>
                <ButtonLink href={vc.officeHref} variant="outline-light">
                  Office of the VC
                </ButtonLink>
              </div>
            </div>
          </article>

          <ul
            id="principal-officers"
            aria-label="Principal officers"
            className={cn(
              'mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5',
              anchorOffset,
            )}
          >
            {principalOfficers.map((o) => (
              <li key={o.role} className="overflow-hidden rounded-card border border-line bg-white">
                <ImagePlaceholder
                  label={o.photo.label}
                  src={o.photo.src}
                  alt={`${o.name}, ${o.role}`}
                  icon="person"
                  className="h-[200px] w-full md:h-[250px]"
                  sizes="(min-width: 1025px) 240px, (min-width: 768px) 33vw, 50vw"
                />
                <div className="p-4 md:p-5">
                  <p className="min-h-[34px] text-xs font-bold uppercase leading-[1.4] tracking-[.08em] text-orange-text">
                    {o.role}
                  </p>
                  <h3 className="mt-1.5 font-serif text-[17px] font-semibold leading-[1.25] tracking-[-.01em] text-ink md:text-[19px]">
                    {o.name}
                  </h3>
                  <div className="-ml-3 flex text-muted">
                    <a
                      href={`mailto:${o.email}`}
                      aria-label={`Email the ${o.role}`}
                      className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-primary-soft hover:text-primary"
                    >
                      <Mail aria-hidden="true" className="size-4" strokeWidth={2} />
                    </a>
                    <a
                      href={comingSoon(`${o.role} — LinkedIn`)}
                      aria-label={`${o.role} on LinkedIn`}
                      className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-primary-soft hover:text-primary"
                    >
                      <SocialIcon name="linkedin" className="size-4" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Governing Council */}
      <section
        id="governing-council"
        aria-labelledby="council-title"
        className={cn('section-y bg-cream', anchorOffset)}
      >
        <div className="container-x lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-[520px] lg:flex-none">
            <Eyebrow>{about.council.eyebrow}</Eyebrow>
            <h2
              id="council-title"
              className="mt-3 font-serif text-[28px] font-semibold leading-[1.12] tracking-[-.015em] md:text-[36px] lg:mt-3.5 lg:text-[44px]"
            >
              {about.council.title}
            </h2>
            <p className="mt-3.5 max-w-[640px] text-base leading-[1.6] text-muted lg:text-[17px]">
              {about.council.lead}
            </p>
            <ButtonLink href={about.council.cta.href} variant="primary" className="mt-[26px]">
              {about.council.cta.label}
            </ButtonLink>
          </div>
          <article className="mt-10 flex flex-col gap-6 rounded-card border border-line bg-white p-6 sm:flex-row sm:items-center sm:gap-7 lg:mt-0 lg:flex-1">
            <ImagePlaceholder
              label={proChancellor.photo.label}
              src={proChancellor.photo.src}
              alt={`${proChancellor.name}, ${proChancellor.role}`}
              icon="person"
              className="h-[240px] w-full flex-none rounded-2xl sm:w-[150px]"
              sizes="150px"
            />
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[.08em] text-orange-text">
                {proChancellor.role}
              </p>
              <h3 className="mt-2.5 font-serif text-2xl font-semibold tracking-[-.01em] text-ink lg:text-[30px]">
                {proChancellor.name}
              </h3>
              <p className="mt-3.5 text-base leading-[1.6] text-muted lg:text-[17px]">
                {about.council.members}
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
