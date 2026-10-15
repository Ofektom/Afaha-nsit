'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, ChevronRight, ChevronUp, Menu, Phone, X } from 'lucide-react';
import { applyLink, isActive, mainNav, portalMenu } from '@/content/navigation';
import { site } from '@/content/site';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink, buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { SearchDialog } from './SearchDialog';

/**
 * Full-height mobile drawer (≤1279px). Radix Dialog handles focus trapping,
 * Esc to close and body scroll locking.
 */
export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const baseId = useId();

  // Close when navigating to another page (e.g. browser back while open).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors hover:bg-primary-soft-hover"
      >
        <Menu aria-hidden="true" className="size-6" strokeWidth={2} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white data-[state=open]:animate-fade-in"
        >
          <Dialog.Title className="sr-only">Site menu</Dialog.Title>

          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white px-5 py-1.5 md:px-10">
            <Logo size="sm" crestClassName="size-14" />
            <div className="flex items-center gap-2">
              <SearchDialog
                triggerClassName="flex size-11 items-center justify-center rounded-xl text-ink hover:bg-primary-soft"
                iconClassName="size-[22px]"
              />
              <Dialog.Close
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-xl bg-primary text-white"
              >
                <X aria-hidden="true" className="size-6" strokeWidth={2} />
              </Dialog.Close>
            </div>
          </div>

          <nav aria-label="Main" className="px-5 pt-3 md:px-10">
            <ul>
              {mainNav.map((item) => {
                const active = isActive(item, pathname);
                const links = item.mobileLinks;

                if (!links) {
                  return (
                    <li key={item.label} className="border-b border-line">
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={active ? 'page' : undefined}
                        className="flex min-h-11 items-center justify-between py-4 font-serif text-xl font-semibold leading-[1.23] text-ink"
                      >
                        {item.label}
                        <ChevronRight
                          aria-hidden="true"
                          className="size-5 text-muted"
                          strokeWidth={2}
                        />
                      </Link>
                    </li>
                  );
                }

                const isOpen = expanded === item.label;
                const panelId = `${baseId}-${item.label.replace(/\W+/g, '-')}`;

                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      className={cn(
                        'flex min-h-11 w-full items-center justify-between border-b border-line py-4 text-left font-serif text-xl font-semibold leading-[1.23]',
                        isOpen ? 'text-primary' : 'text-ink',
                      )}
                    >
                      {item.label}
                      {isOpen ? (
                        <ChevronUp
                          aria-hidden="true"
                          className="size-5 text-primary"
                          strokeWidth={2}
                        />
                      ) : (
                        <ChevronRight
                          aria-hidden="true"
                          className="size-5 text-muted"
                          strokeWidth={2}
                        />
                      )}
                    </button>
                    <ul
                      id={panelId}
                      hidden={!isOpen}
                      className="my-2.5 flex-col rounded-input bg-cream px-2 py-1.5 [&:not([hidden])]:flex"
                    >
                      {links.map((l) => (
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            onClick={close}
                            className="flex min-h-11 items-center rounded-lg px-2 text-[15px] font-medium text-muted hover:bg-white hover:text-primary"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 px-5 py-6 md:px-10">
            <PortalsAccordion onNavigate={close} />
            <ButtonLink
              href={applyLink.href}
              onClick={close}
              variant="outline-dark"
              className="w-full"
            >
              {applyLink.label}
            </ButtonLink>
          </div>

          <div className="px-5 pb-8 pt-2 text-sm text-muted md:px-10">
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
              className="inline-flex min-h-11 items-center gap-2 hover:text-primary"
            >
              <Phone aria-hidden="true" className="size-4" strokeWidth={2} />
              {site.contact.phone}
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function PortalsAccordion({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={buttonClasses('orange', 'md', 'w-full')}
      >
        Portals
        <ChevronDown
          aria-hidden="true"
          className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
          strokeWidth={2}
        />
      </button>
      <ul id={id} hidden={!open} className="mt-2 rounded-input bg-cream p-2">
        {portalMenu.items.map((p) => (
          <li key={p.label}>
            <Link
              href={p.href}
              onClick={onNavigate}
              className="flex min-h-11 items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-white"
            >
              <span className="flex size-9 flex-none items-center justify-center rounded-[10px] bg-primary-soft text-primary">
                <p.icon aria-hidden="true" className="size-[18px]" strokeWidth={2} />
              </span>
              <span className="flex-1">
                <span className="block text-[15px] font-semibold text-ink">{p.label}</span>
                <span className="block text-[13px] text-muted">{p.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
