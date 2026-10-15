'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { DesktopNav } from './DesktopNav';
import { SearchDialog } from './SearchDialog';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/cn';

/** Sticky main navigation. 88px tall, shrinking to 72px with a shadow once scrolled. */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-line bg-white transition-shadow duration-200',
        scrolled && 'shadow-header',
      )}
    >
      {/* Desktop */}
      <div
        className={cn(
          'container-x relative hidden items-center justify-between gap-4 transition-[height] duration-200 xl:flex',
          scrolled ? 'h-[72px]' : 'h-[88px]',
        )}
      >
        {/* The crest nearly fills the bar: 76px of 88, 64px of 72 once scrolled. */}
        <Logo
          className="flex-none"
          crestClassName={scrolled ? 'size-16' : 'size-[76px]'}
          wordmarkClassName="hidden wide:block"
        />

        <DesktopNav
          pathname={pathname}
          searchButton={
            <SearchDialog triggerClassName="flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-primary-soft" />
          }
        />
      </div>

      {/* Mobile / tablet */}
      <div className="flex items-center justify-between px-5 py-1.5 md:px-10 xl:hidden">
        <Logo size="sm" crestClassName="size-14" />
        <div className="flex items-center gap-2">
          <SearchDialog
            triggerClassName="flex size-11 items-center justify-center rounded-xl text-ink hover:bg-primary-soft max-[359px]:hidden"
            iconClassName="size-[22px]"
          />
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
