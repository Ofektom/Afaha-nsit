'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

interface Tab {
  label: string;
  /** "#id" scrolls to a section on this page; anything else is a normal link. */
  href: string;
}

/**
 * In-page tab bar. Sticks below the header and underlines the section currently in view.
 * Scrolls sideways on narrow screens.
 */
export function SectionTabs({ tabs, label }: { tabs: readonly Tab[]; label: string }) {
  const anchors = tabs.filter((t) => t.href.startsWith('#'));
  const [active, setActive] = useState(anchors[0]?.href ?? '');

  useEffect(() => {
    const sections = anchors
      .map((t) => document.getElementById(t.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const onScroll = () => {
      // The last section whose top has passed the line just below the sticky bars;
      // at the very bottom of the page, the last section (it may never reach the line).
      const line = 180;
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      // Tabs needn't follow page order (Principal Officers sits inside Management).
      const byTop = sections
        .map((el) => ({ el, top: el.getBoundingClientRect().top }))
        .sort((a, b) => a.top - b.top);
      let current = byTop[0]?.el;
      for (const { el, top } of byTop) if (top <= line) current = el;
      if (atBottom) current = byTop[byTop.length - 1]?.el;
      if (current) setActive(`#${current.id}`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // `tabs` is static page data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      aria-label={label}
      className="sticky top-[69px] z-30 border-b border-line bg-white xl:top-[72px]"
    >
      <ul className="container-x flex gap-7 overflow-x-auto [scrollbar-width:none] lg:gap-9">
        {tabs.map((t) => {
          const isActive = t.href === active;
          return (
            <li key={t.label} className="flex-none">
              <Link
                href={t.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => t.href.startsWith('#') && setActive(t.href)}
                className={cn(
                  'flex min-h-11 items-center whitespace-nowrap py-4 text-[15px] leading-[1.3] transition-colors lg:py-5',
                  isActive
                    ? 'font-bold text-primary shadow-underline'
                    : 'font-medium text-muted hover:text-primary',
                )}
              >
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
