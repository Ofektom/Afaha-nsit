'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, Search, X } from 'lucide-react';
import type { searchPages } from '@/lib/search';

const suggestions = ['Admissions', 'Faculties', 'Portal', 'Fees', 'Vice-Chancellor', 'Contact'];

type Search = typeof searchPages;
let loading: Promise<Search> | null = null;

/**
 * The search index (every menu page plus all faculties and departments) is loaded on demand,
 * so it isn't part of the JavaScript every page downloads. Started on hover/focus of the button.
 */
function loadSearch(): Promise<Search> {
  loading ??= import('@/lib/search').then((m) => m.searchPages);
  return loading;
}

/**
 * Site search overlay (demo): matches pages and sections from the navigation data.
 * Renders its own trigger button, styled by `triggerClassName`.
 */
export function SearchDialog({
  triggerClassName,
  iconClassName = 'size-[18px]',
}: {
  triggerClassName: string;
  iconClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState<Search | null>(null);
  const inputId = useId();
  const results = search ? search(query) : [];

  const prepare = () => {
    if (!search) loadSearch().then((fn) => setSearch(() => fn));
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o) prepare();
        else setQuery('');
      }}
    >
      <Dialog.Trigger
        aria-label="Search the site"
        className={triggerClassName}
        onPointerEnter={prepare}
        onFocus={prepare}
      >
        <Search aria-hidden="true" className={iconClassName} strokeWidth={2} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-primary-dark/60 data-[state=open]:animate-fade-in" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-x-4 top-4 z-[71] mx-auto max-w-[640px] rounded-panel bg-white p-4 shadow-dropdown data-[state=open]:animate-slide-down sm:top-24 sm:p-5"
        >
          <Dialog.Title className="sr-only">Search the site</Dialog.Title>
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-3"
          >
            <label htmlFor={inputId} className="sr-only">
              Search pages
            </label>
            <div className="flex flex-1 items-center gap-2.5 rounded-full border border-line px-4 focus-within:border-primary">
              <Search
                aria-hidden="true"
                className="size-[18px] flex-none text-muted"
                strokeWidth={2}
              />
              <input
                id={inputId}
                type="search"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, e.g. admissions"
                className="h-12 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-placeholder"
              />
            </div>
            <Dialog.Close
              aria-label="Close search"
              className="flex size-11 flex-none items-center justify-center rounded-full text-ink hover:bg-primary-soft"
            >
              <X aria-hidden="true" className="size-5" strokeWidth={2} />
            </Dialog.Close>
          </form>

          <div className="mt-4" aria-live="polite">
            {query.trim() === '' ? (
              <div>
                <p className="px-1 text-xs font-bold uppercase tracking-eyebrow text-orange-text">
                  Popular searches
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => setQuery(s)}
                        className="min-h-11 rounded-full border border-line px-4 text-sm font-medium text-ink hover:border-primary hover:bg-primary-soft"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : !search ? (
              <p className="px-1 py-3 text-[15px] text-muted">Searching…</p>
            ) : results.length === 0 ? (
              <p className="px-1 py-3 text-[15px] text-muted">
                No pages match “{query}”. Try “admissions” or “portal”.
              </p>
            ) : (
              <>
                <p className="sr-only">{results.length} results</p>
                <ul className="-mx-1 max-h-[60vh] overflow-y-auto">
                  {results.map((r) => (
                    <li key={`${r.label}-${r.href}`}>
                      <Link
                        href={r.href}
                        onClick={() => setOpen(false)}
                        className="group flex min-h-11 items-center gap-3 rounded-input px-3 py-2.5 hover:bg-primary-soft focus-visible:bg-primary-soft"
                      >
                        <span className="flex-1">
                          <span className="block text-[15px] font-semibold text-ink group-hover:text-primary">
                            {r.label}
                          </span>
                          <span className="block text-[13px] text-muted">
                            {r.description ?? r.section}
                          </span>
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 flex-none text-muted group-hover:text-primary"
                          strokeWidth={2}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <p className="mt-3 border-t border-line px-1 pt-3 text-xs text-muted">
            Demo search — lists pages from the site menu.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
