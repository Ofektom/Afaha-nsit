import { cn } from '@/lib/cn';

interface EyebrowProps {
  children: React.ReactNode;
  /** `light` = on dark backgrounds (orange text). */
  tone?: 'dark' | 'light';
  /** Hide the 28×2 leading line. */
  line?: boolean;
  className?: string;
  as?: 'p' | 'div' | 'span';
}

/** Small uppercase label with a short line before it. */
export function Eyebrow({
  children,
  tone = 'dark',
  line = true,
  className,
  as: Tag = 'p',
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        'flex items-center gap-2.5 text-[13px] font-bold uppercase leading-tight tracking-eyebrow',
        line && 'before:h-0.5 before:w-7 before:flex-none before:bg-current',
        tone === 'dark' ? 'text-orange-text' : 'text-orange',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
