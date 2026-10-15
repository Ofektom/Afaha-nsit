import { Eyebrow } from './Eyebrow';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Right-aligned action (usually a button), bottom-aligned with the text on desktop. */
  action?: React.ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
  /** Extra classes for the lead / action, e.g. to hide them on phones. */
  /** Bottom margin classes; replaces the default 'mb-8 lg:mb-12'. */
  spacing?: string;
  leadClassName?: string;
  actionClassName?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  tone = 'dark',
  className,
  spacing = 'mb-8 lg:mb-12',
  leadClassName,
  actionClassName,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10',
        spacing,
        className,
      )}
    >
      <div>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <h2
          id={id}
          className={cn(
            'mt-3 font-serif text-[28px] font-semibold leading-[1.12] tracking-[-.015em] md:text-[36px] lg:mt-3.5 lg:text-[44px]',
            tone === 'light' ? 'text-white' : 'text-ink',
          )}
        >
          {title}
        </h2>
        {lead && (
          <p
            className={cn(
              'mt-3.5 max-w-[640px] text-base leading-[1.6] lg:text-[17px]',
              tone === 'light' ? 'text-tint-200' : 'text-muted',
              leadClassName,
            )}
          >
            {lead}
          </p>
        )}
      </div>
      {action && <div className={cn('flex-none', actionClassName)}>{action}</div>}
    </div>
  );
}
