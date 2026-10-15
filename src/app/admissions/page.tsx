import type { Metadata } from 'next';
import {
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CreditCard,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { admissions } from '@/content/admissions';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Admissions',
  description: admissions.hero.lead,
  path: '/admissions/',
});

const routeIcons: Record<(typeof admissions.routes.items)[number]['icon'], LucideIcon> = {
  undergraduate: GraduationCap,
  'direct-entry': BookOpen,
  postgraduate: Award,
  'part-time': CalendarDays,
};

const h2 =
  'mt-3 font-serif text-[28px] font-semibold leading-[1.12] tracking-[-.015em] md:text-[36px] lg:mt-3.5 lg:text-[44px]';

export default function AdmissionsPage() {
  const { hero, notice, routes, steps, requirements, keyDates, faqs } = admissions;

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Admissions' }]}
        title={
          <>
            {hero.titleLine1} <br className="max-lg:hidden" />
            {hero.titleLine2}
          </>
        }
        lead={hero.lead}
        image={hero.image}
        imageClassName="lg:h-[380px] lg:w-[540px]"
      >
        <div className="mt-8 flex flex-wrap gap-3.5">
          <ButtonLink href={hero.primaryCta.href} variant="orange">
            {hero.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={hero.secondaryCta.href} variant="outline-light">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>
      </PageHero>

      <div role="note" className="bg-orange-soft text-orange-deep">
        <div className="container-x flex flex-wrap items-center gap-x-4 gap-y-2 py-[18px]">
          <Bell aria-hidden="true" className="size-5 flex-none text-orange" strokeWidth={2} />
          <p className="min-w-[240px] flex-1 text-[15px] font-medium md:text-base">{notice.text}</p>
          <Badge>{notice.badge}</Badge>
        </div>
      </div>

      {/* Admission routes */}
      <section id="routes" aria-labelledby="routes-title" className="section-y">
        <div className="container-x">
          <SectionHeading
            id="routes-title"
            eyebrow={routes.eyebrow}
            title={routes.title}
            spacing="mb-8 lg:mb-10"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {routes.items.map((r, i) => {
              const Icon = routeIcons[r.icon];
              const featured = i === 0;
              return (
                <li
                  key={r.title}
                  className={cn(
                    'flex flex-col gap-4 rounded-card p-7',
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
                  <h3 className="font-serif text-[22px] font-semibold leading-[1.25] tracking-[-.01em]">
                    {r.title}
                  </h3>
                  <p
                    className={cn(
                      'flex-1 text-[15px] leading-[1.55]',
                      featured ? 'text-primary-soft' : 'text-muted',
                    )}
                  >
                    {r.text}
                  </p>
                  <Link
                    href="#requirements"
                    aria-label={`${routes.linkLabel}: ${r.title}`}
                    className={cn(
                      'group inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-semibold',
                      featured ? 'text-white' : 'text-primary',
                    )}
                  >
                    {routes.linkLabel}
                    <ArrowRight
                      aria-hidden="true"
                      className={cn(
                        'size-4 transition-transform group-hover:translate-x-0.5',
                        featured && 'text-orange',
                      )}
                      strokeWidth={2}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Steps */}
      <section id="how-to-apply" aria-labelledby="steps-title" className="section-y bg-cream">
        <div className="container-x">
          <SectionHeading
            id="steps-title"
            eyebrow={steps.eyebrow}
            title={steps.title}
            lead={steps.lead}
            spacing="mb-8 lg:mb-11"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.items.map((s, i) => (
              <li key={s.title} className="rounded-card bg-white p-[26px]">
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex size-[46px] items-center justify-center rounded-full text-[15px] font-bold',
                    i === 0 ? 'bg-orange text-primary-dark' : 'bg-primary-soft text-primary',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-serif text-[19px] font-semibold leading-[1.25] tracking-[-.01em] text-ink">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-[1.55] text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Requirements and key dates */}
      <section id="requirements" aria-labelledby="requirements-title" className="section-y">
        <div className="container-x lg:flex lg:items-start lg:gap-12">
          <div className="lg:flex-1">
            <Eyebrow>{requirements.eyebrow}</Eyebrow>
            <h2 id="requirements-title" className={h2}>
              {requirements.title}
            </h2>
            <ul className="mt-2.5">
              {requirements.items.map((item) => (
                <li key={item} className="mt-[18px] flex items-start gap-3.5">
                  <span className="flex size-[26px] flex-none items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
                  </span>
                  <span className="text-base leading-[1.6] text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            id="key-dates"
            className="mt-10 rounded-panel bg-primary-dark p-6 text-white md:p-8 lg:mt-0 lg:w-[520px] lg:flex-none"
          >
            <h3 className="mb-1.5 text-[13px] font-bold uppercase tracking-eyebrow text-orange">
              {keyDates.heading}
            </h3>
            <dl>
              {keyDates.items.map((d) => (
                <div
                  key={d.date}
                  className="flex items-center gap-5 border-b border-tint-800 py-[18px] leading-[1.3]"
                >
                  <dt className="w-[100px] flex-none text-[15px] font-bold text-orange">
                    {d.date}
                  </dt>
                  <dd className="text-base">{d.event}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-[22px] flex items-start gap-3.5 text-sm leading-[1.55] text-tint-200">
              <CreditCard
                aria-hidden="true"
                className="mt-0.5 size-5 flex-none text-orange"
                strokeWidth={2}
              />
              {keyDates.feeNotice}
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" aria-labelledby="faqs-title" className="section-y bg-cream">
        <div className="container-x lg:flex lg:items-start lg:gap-16">
          <div className="lg:w-[420px] lg:flex-none">
            <Eyebrow>{faqs.eyebrow}</Eyebrow>
            <h2 id="faqs-title" className={h2}>
              {faqs.title}
            </h2>
            <ButtonLink href={faqs.cta.href} variant="primary" className="mt-[26px]">
              {faqs.cta.label}
            </ButtonLink>
          </div>
          <div className="mt-10 lg:mt-0 lg:flex-1">
            <Accordion items={faqs.items} />
          </div>
        </div>
      </section>
    </>
  );
}
