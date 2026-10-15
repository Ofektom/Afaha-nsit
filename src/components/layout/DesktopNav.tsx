'use client';

import Link from 'next/link';
import { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ArrowRight, ChevronDown, CircleHelp, Search } from 'lucide-react';
import type React from 'react';
import {
  isActive,
  mainNav,
  portalMenu,
  type MegaColumn,
  type MegaFeature,
} from '@/content/navigation';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink, buttonClasses } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { cn } from '@/lib/cn';

const PORTALS = 'portals';

const itemBase =
  'flex min-h-11 items-center gap-1 whitespace-nowrap px-2 py-[9px] text-[14px] transition-colors 2xl:px-3 2xl:text-[15px]';
const currentPage = 'font-bold text-primary shadow-underline';
const idle = 'rounded-full font-medium text-ink hover:bg-primary-soft hover:text-primary';

/**
 * Desktop navigation (≥1280px): main links with mega-menus, plus the Portals dropdown.
 * Radix handles hover-with-delay, click/Enter, Esc and arrow-key navigation. Panels are
 * positioned against the header container (the nearest `relative` ancestor).
 */
export function DesktopNav({
  pathname,
  searchButton,
}: {
  pathname: string;
  /** Rendered between the links and the Portals button. */
  searchButton: React.ReactNode;
}) {
  const [value, setValue] = useState('');

  // Radix toggles on click, so a mouse user who hovers (menu opens) and then clicks
  // would close it again. Ignore mouse clicks on an already-open trigger; taps still toggle.
  const triggerHandlers = (itemValue: string) => ({
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
      e.currentTarget.dataset.pointer = e.pointerType;
    },
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      if (e.currentTarget.dataset.pointer === 'mouse' && value === itemValue) e.preventDefault();
      delete e.currentTarget.dataset.pointer;
    },
  });
  const mainValue = value === PORTALS ? '' : value;

  return (
    <>
      <NavigationMenu.Root
        value={mainValue}
        onValueChange={setValue}
        delayDuration={80}
        aria-label="Main"
        // Radix wraps the list in a relative div; make it static so panels anchor to the header.
        className="min-w-0 [&>div]:![position:static]"
      >
        <NavigationMenu.List className="flex items-center gap-0.5 2xl:gap-1.5">
          {mainNav.map((item) => {
            const active = isActive(item, pathname);

            if (!item.mega) {
              return (
                <NavigationMenu.Item key={item.label}>
                  <NavigationMenu.Link asChild active={active}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(itemBase, active ? currentPage : idle)}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              );
            }

            return (
              <NavigationMenu.Item key={item.label} value={item.label}>
                <NavigationMenu.Trigger
                  {...triggerHandlers(item.label)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'group',
                    itemBase,
                    active ? currentPage : idle,
                    'data-[state=open]:rounded-full data-[state=open]:bg-primary-soft data-[state=open]:font-bold data-[state=open]:text-primary data-[state=open]:shadow-none',
                  )}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-3.5 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                    strokeWidth={2}
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute inset-x-10 top-full z-50 flex gap-6 rounded-b-card border border-t-[3px] border-line border-t-orange bg-white p-8 shadow-dropdown data-[state=open]:animate-slide-down 2xl:inset-x-20">
                  {item.mega.columns.map((col) => (
                    <MegaColumnList key={col.heading} column={col} />
                  ))}
                  <FeatureCard feature={item.mega.feature} />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          })}
        </NavigationMenu.List>
      </NavigationMenu.Root>

      <div className="flex flex-none items-center gap-3">
        {searchButton}
        <NavigationMenu.Root
          value={value === PORTALS ? PORTALS : ''}
          onValueChange={setValue}
          delayDuration={80}
          aria-label="Portals"
          className="[&>div]:![position:static]"
        >
          <NavigationMenu.List>
            <NavigationMenu.Item value={PORTALS}>
              <NavigationMenu.Trigger
                {...triggerHandlers(PORTALS)}
                className={buttonClasses(
                  'orange',
                  'md',
                  'px-5 transition-shadow data-[state=open]:shadow-orange-glow 2xl:px-[22px]',
                )}
              >
                Portals
                <ChevronDown aria-hidden="true" className="size-4" strokeWidth={2} />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute right-10 top-[calc(100%-8px)] z-50 w-[400px] rounded-card border border-line bg-white px-3 pb-2 pt-4 shadow-dropdown data-[state=open]:animate-slide-down 2xl:right-20">
                <span
                  aria-hidden="true"
                  className="absolute -top-2 right-[52px] size-4 rotate-45 border-l border-t border-line bg-white"
                />
                <p className="px-3 pb-2.5 text-xs font-bold uppercase tracking-eyebrow text-orange-text">
                  {portalMenu.heading}
                </p>
                <ul className="flex flex-col">
                  {portalMenu.items.map((p) => (
                    <li key={p.label}>
                      <NavigationMenu.Link asChild>
                        <Link
                          href={p.href}
                          className="group flex items-center gap-3 rounded-[14px] p-3 transition-colors hover:bg-primary-soft focus-visible:bg-primary-soft"
                        >
                          <span className="flex size-[42px] flex-none items-center justify-center rounded-[10px] bg-primary-soft text-primary transition-colors group-hover:bg-white group-focus-visible:bg-white">
                            <p.icon aria-hidden="true" className="size-5" strokeWidth={2} />
                          </span>
                          <span className="flex-1">
                            <span className="block text-[15px] font-semibold leading-tight text-ink group-hover:text-primary group-focus-visible:text-primary">
                              {p.label}
                            </span>
                            <span className="mt-0.5 block text-[13px] leading-snug text-muted">
                              {p.description}
                            </span>
                          </span>
                          <Badge>Soon</Badge>
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
                <NavigationMenu.Link asChild>
                  <Link
                    href={portalMenu.help.href}
                    className="mt-2 flex min-h-11 items-center gap-2 border-t border-line px-3 pb-2 pt-3 text-sm font-medium text-muted hover:text-primary"
                  >
                    <CircleHelp aria-hidden="true" className="size-4" strokeWidth={2} />
                    {portalMenu.help.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>

      {/* Scrim over the page below the header while a menu is open. */}
      {value !== '' && (
        <div
          aria-hidden="true"
          onClick={() => setValue('')}
          className="absolute left-1/2 top-full z-40 h-[100dvh] w-screen -translate-x-1/2 animate-fade-in bg-primary-dark/50"
        />
      )}
    </>
  );
}

function MegaColumnList({ column }: { column: MegaColumn }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <p className="px-3 pb-2.5 text-xs font-bold uppercase tracking-eyebrow text-orange-text">
        {column.heading}
      </p>
      <ul className="flex flex-col gap-0.5">
        {column.links.map((l) => (
          <li key={l.label}>
            <NavigationMenu.Link asChild>
              <Link
                href={l.href}
                className="group relative flex items-center rounded-input px-3 py-2.5 transition-colors hover:bg-primary-soft focus-visible:bg-primary-soft"
              >
                <span className="flex-1">
                  <span className="flex items-center gap-2 text-[15px] font-semibold leading-[1.3] text-ink group-hover:font-bold group-hover:text-primary group-focus-visible:font-bold group-focus-visible:text-primary">
                    {l.label}
                    {l.soon && <Badge>Soon</Badge>}
                  </span>
                  {l.description && (
                    <span className="mt-[3px] block text-[13px] leading-[1.4] text-muted">
                      {l.description}
                    </span>
                  )}
                </span>
                {/* Overlaid so it doesn't take width from the label (as in the designs). */}
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary-soft pl-1.5 text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <ArrowRight className="size-4" strokeWidth={2} />
                </span>
              </Link>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureCard({ feature }: { feature: MegaFeature }) {
  const dark = feature.kind === 'promo';
  return (
    <div
      className={cn(
        'flex w-[320px] flex-none flex-col gap-3.5 rounded-2xl p-6',
        dark ? 'bg-primary-dark text-white' : 'bg-cream',
      )}
    >
      {feature.kind === 'message' && (
        <>
          <ImagePlaceholder
            label={feature.imageLabel}
            src={feature.imageSrc}
            position={feature.imagePosition}
            icon="person"
            className="h-[140px] w-full rounded-input"
            sizes="272px"
          />
          <p className="text-xs font-bold uppercase tracking-eyebrow text-orange-text">
            {feature.eyebrow}
          </p>
          <p className="font-serif text-[22px] font-semibold leading-[1.25] text-ink">
            {feature.title}
          </p>
          <div>
            <NavigationMenu.Link asChild>
              <ButtonLink href={feature.cta.href} variant="primary">
                {feature.cta.label}
              </ButtonLink>
            </NavigationMenu.Link>
          </div>
        </>
      )}

      {feature.kind === 'search' && (
        <>
          <p className="text-xs font-bold uppercase tracking-eyebrow text-orange-text">
            {feature.eyebrow}
          </p>
          <p className="font-serif text-[22px] font-semibold leading-[1.25] text-ink">
            {feature.title}
          </p>
          <p className="text-sm leading-normal text-muted">{feature.text}</p>
          <form role="search" action="/academics/" method="get">
            <label className="flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-3 focus-within:border-primary">
              <span className="sr-only">Search programmes</span>
              <Search
                aria-hidden="true"
                className="size-4 flex-none text-placeholder"
                strokeWidth={2}
              />
              <input
                type="search"
                name="q"
                placeholder={feature.placeholder}
                className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-placeholder"
              />
            </label>
          </form>
        </>
      )}

      {feature.kind === 'promo' && (
        <>
          <div>
            <Badge>{feature.badge}</Badge>
          </div>
          <p className="text-xs font-bold uppercase tracking-eyebrow text-orange">
            {feature.eyebrow}
          </p>
          <p className="font-serif text-[22px] font-semibold leading-[1.25]">{feature.title}</p>
          <p className="text-sm leading-normal text-tint-200">{feature.text}</p>
          <div>
            <NavigationMenu.Link asChild>
              <ButtonLink href={feature.cta.href} variant="orange">
                {feature.cta.label}
              </ButtonLink>
            </NavigationMenu.Link>
          </div>
        </>
      )}
    </div>
  );
}
