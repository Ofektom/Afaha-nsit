import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';
import { logoSrc } from '@/lib/images';
import { cn } from '@/lib/cn';

interface LogoProps {
  /** `light` is for dark backgrounds (footer). */
  tone?: 'dark' | 'light';
  /** Wordmark size. */
  size?: 'md' | 'sm';
  /** Crest size classes, e.g. "size-20"; defaults to 56px (md) or 44px (sm). */
  crestClassName?: string;
  className?: string;
  /** Hide the wordmark below this point (used by the compact desktop header). */
  wordmarkClassName?: string;
}

/**
 * University crest + wordmark. Shows a dashed "LOGO" placeholder until
 * `public/logo.svg` (or `public/logo.png`) is added.
 */
export function Logo({
  tone = 'dark',
  size = 'md',
  crestClassName,
  className,
  wordmarkClassName,
}: LogoProps) {
  const crest = crestClassName ?? (size === 'md' ? 'size-14' : 'size-11');

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn('flex min-h-11 items-center gap-3 rounded-lg', className)}
    >
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt=""
          width={96}
          height={96}
          priority
          className={cn('flex-none object-contain transition-[width,height] duration-200', crest)}
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            'flex flex-none items-center justify-center rounded-full border-2 border-dashed border-orange bg-orange-soft font-bold tracking-[.1em] text-primary',
            crest,
            size === 'md' ? 'text-[10.5px]' : 'text-[9px]',
          )}
        >
          LOGO
        </span>
      )}
      <span className={cn('block', wordmarkClassName)}>
        {/* Both lines are part of the name, so they share one style. */}
        {[site.nameLine1, site.nameLine2].map((line) => (
          <span
            key={line}
            className={cn(
              'block whitespace-nowrap font-serif font-semibold leading-[1.15]',
              size === 'md' ? 'text-[19px]' : 'text-[15.5px]',
              tone === 'dark' ? 'text-primary' : 'text-white',
            )}
          >
            {line}
          </span>
        ))}
      </span>
    </Link>
  );
}
