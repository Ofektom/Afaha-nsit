import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import type { Portal } from '@/content/portals';
import { Badge } from '@/components/ui/Badge';
import { portalHref } from '@/lib/links';
import { cn } from '@/lib/cn';

interface PortalCardProps {
  portal: Portal;
  /** `card`: tall card with description (desktop). `row`: compact row (mobile). */
  layout?: 'card' | 'row';
  className?: string;
}

/** A portal with its "Coming soon" badge. The whole card links to the portal page. */
export function PortalCard({ portal, layout = 'card', className }: PortalCardProps) {
  const Icon = portal.icon;

  if (layout === 'row') {
    return (
      <Link
        href={portalHref(portal.slug)}
        className={cn(
          'flex items-center gap-3.5 rounded-card border border-line bg-white p-4 transition-colors hover:border-primary',
          className,
        )}
      >
        <span className="flex size-[42px] flex-none items-center justify-center rounded-[14px] bg-primary-soft text-primary">
          <Icon aria-hidden="true" className="size-5" strokeWidth={2} />
        </span>
        <span className="flex-1">
          <span className="block text-base font-semibold leading-tight text-ink">
            {portal.title}
          </span>
          <Badge className="mt-1.5">Coming soon</Badge>
        </span>
        <ChevronRight aria-hidden="true" className="size-5 text-muted" strokeWidth={2} />
      </Link>
    );
  }

  return (
    <Link
      href={portalHref(portal.slug)}
      className={cn(
        'group flex flex-col gap-[18px] rounded-card border border-line bg-white p-7 transition duration-200 hover:-translate-y-1 hover:shadow-card-hover',
        className,
      )}
    >
      <span className="flex items-center justify-between">
        <span className="flex size-[50px] flex-none items-center justify-center rounded-[14px] bg-primary-soft text-primary">
          <Icon aria-hidden="true" className="size-6" strokeWidth={2} />
        </span>
        <Badge>Coming soon</Badge>
      </span>
      <h3 className="font-serif text-[22px] font-semibold leading-[1.25] tracking-[-.01em] text-ink">
        {portal.title}
      </h3>
      <p className="flex-1 text-[15px] leading-[1.55] text-muted">{portal.description}</p>
      <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary">
        Open portal
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      </span>
    </Link>
  );
}
