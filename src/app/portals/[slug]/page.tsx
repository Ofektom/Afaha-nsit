import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, Clock, Ellipsis } from 'lucide-react';
import { getPortal, phaseStatus, portals, roadmap, type PhaseStatus } from '@/content/portals';
import { ButtonLink } from '@/components/ui/Button';
import { ComingSoonHero, HelpBand } from '@/components/ui/ComingSoonHero';
import { NotifyForm } from '@/components/ui/NotifyForm';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/metadata';
import { portalHref } from '@/lib/links';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return portals.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const portal = getPortal((await params).slug);
  if (!portal) return {};
  return pageMetadata({
    title: `${portal.title} — coming soon`,
    description: portal.page.lead,
    path: portalHref(portal.slug),
  });
}

const statusStyles: Record<PhaseStatus, { icon: typeof Check; dot: string; text: string }> = {
  Live: { icon: Check, dot: 'bg-success text-white', text: 'text-success-light' },
  'In development': { icon: Clock, dot: 'bg-orange text-primary-dark', text: 'text-orange' },
  Planned: { icon: Ellipsis, dot: 'bg-white/15 text-tint-200', text: 'text-tint-300' },
};

export default async function PortalPage({ params }: Props) {
  const portal = getPortal((await params).slug);
  if (!portal) notFound();
  const { page } = portal;
  const status = phaseStatus(portal.phase);

  return (
    <>
      <ComingSoonHero
        badge={`Phase ${portal.phase} · ${status}`}
        title={
          <>
            {page.headline} <br className="max-md:hidden" />
            is coming soon.
          </>
        }
        lead={page.lead}
        footer={
          <ol
            aria-label="Digital campus roadmap"
            className="mx-auto mt-12 grid max-w-[1120px] gap-4 text-left sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
          >
            {roadmap.phases.map((ph) => {
              const s = phaseStatus(ph.phase);
              const style = statusStyles[s];
              const current = ph.phase === portal.phase;
              return (
                <li
                  key={ph.phase}
                  aria-current={current ? 'step' : undefined}
                  className={cn(
                    'rounded-card border p-6',
                    current ? 'border-orange bg-white/[.12]' : 'border-white/[.14] bg-white/5',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-eyebrow text-orange">
                      Phase {ph.phase}
                    </span>
                    <span
                      className={cn(
                        'flex size-[26px] items-center justify-center rounded-full',
                        style.dot,
                      )}
                    >
                      <style.icon aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
                    </span>
                  </div>
                  <p className="mt-3.5 font-serif text-xl font-semibold leading-[1.25]">
                    {ph.title}
                  </p>
                  <p className={cn('mt-2.5 text-sm font-medium', style.text)}>{s}</p>
                </li>
              );
            })}
          </ol>
        }
      >
        <NotifyForm
          label={`Email address for ${portal.title} launch updates`}
          className="mx-auto mt-[34px] max-w-[560px]"
        />
      </ComingSoonHero>

      <HelpBand
        title={page.help.title}
        text={page.help.text}
        actions={
          <>
            <ButtonLink href={page.help.primary.href} variant="primary">
              {page.help.primary.label}
            </ButtonLink>
            <ButtonLink href={page.help.secondary.href} variant="outline-dark">
              {page.help.secondary.label}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
