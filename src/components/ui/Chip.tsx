import { cn } from '@/lib/cn';

interface ChipProps {
  children: React.ReactNode;
  tone?: 'primary' | 'orange';
  className?: string;
}

/** Small rounded label: degree tags, news categories, accreditation status. */
export function Chip({ children, tone = 'primary', className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-[5px] text-xs font-bold leading-none',
        tone === 'primary' ? 'bg-primary-soft text-primary' : 'bg-orange-soft text-badge-text',
        className,
      )}
    >
      {children}
    </span>
  );
}
