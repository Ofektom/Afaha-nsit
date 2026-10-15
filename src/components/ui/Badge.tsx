import { Lock } from 'lucide-react';
import { cn } from '@/lib/cn';

interface BadgeProps {
  children?: React.ReactNode;
  /** Show the padlock icon (default true). */
  lock?: boolean;
  className?: string;
}

/** Orange-soft "Coming soon" pill with padlock. */
export function Badge({ children = 'Coming soon', lock = true, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-orange-soft px-2.5 py-[5px] text-[11px] font-bold uppercase leading-none tracking-[.06em] text-badge-text',
        className,
      )}
    >
      {lock && <Lock aria-hidden="true" className="size-3 flex-none" strokeWidth={2} />}
      {children}
    </span>
  );
}
