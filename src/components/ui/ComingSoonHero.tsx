import Link from 'next/link';
import { ArrowLeft, Lock, type LucideIcon } from 'lucide-react';
import { Badge } from './Badge';

interface ComingSoonHeroProps {
  badge: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  icon?: LucideIcon;
  /** Shown under the lead (sign-up form, buttons…). */
  children?: React.ReactNode;
  /** Shown at the bottom of the dark area (roadmap…). */
  footer?: React.ReactNode;
}

/** Centred dark hero with a glowing icon, used by portal, coming-soon and 404 pages. */
export function ComingSoonHero({
  badge,
  title,
  lead,
  icon: Icon = Lock,
  children,
  footer,
}: ComingSoonHeroProps) {
  return (
    <section className="relative overflow-hidden bg-coming-soon pb-16 pt-14 text-center text-white lg:pb-[110px] lg:pt-24">
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-[200px] size-[520px] rounded-full border-[1.5px] border-orange/20"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-[120px] size-[420px] rounded-full border-[1.5px] border-orange/[.18]"
      />

      <div className="container-x relative">
        <div className="mx-auto flex size-[88px] items-center justify-center rounded-full bg-orange/[.16] lg:size-[104px]">
          <span className="flex size-[60px] items-center justify-center rounded-full bg-orange text-primary-dark lg:size-[72px]">
            <Icon aria-hidden="true" className="size-7 lg:size-8" strokeWidth={2} />
          </span>
        </div>
        <div className="mt-6">
          <Badge>{badge}</Badge>
        </div>
        <h1 className="mx-auto mt-[22px] max-w-[880px] font-serif text-[38px] font-semibold leading-[1.08] tracking-[-.01em] md:text-[52px] lg:text-[64px]">
          {title}
        </h1>
        <p className="mx-auto mt-[22px] max-w-[680px] text-base leading-[1.6] text-tint-200 lg:text-[19px]">
          {lead}
        </p>
        {children}
        <Link
          href="/"
          className="mt-2.5 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[15px] font-semibold text-orange hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2} />
          Back to homepage
        </Link>
        {footer}
      </div>
    </section>
  );
}

/** Cream help band below a coming-soon hero. */
export function HelpBand({
  title,
  text,
  actions,
}: {
  title: string;
  text: string;
  actions: React.ReactNode;
}) {
  return (
    <section aria-label="Help" className="bg-cream py-10">
      <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold leading-[1.25] tracking-[-.01em] text-ink lg:text-[26px]">
            {title}
          </h2>
          <p className="mt-1.5 text-base text-muted">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">{actions}</div>
      </div>
    </section>
  );
}
