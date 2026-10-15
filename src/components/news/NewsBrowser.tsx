'use client';

import { useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { newsCategories, sortedNews, type NewsArticle, type NewsCategory } from '@/content/news';
import { NewsGridCard } from '@/components/cards/NewsCard';
import { cn } from '@/lib/cn';

type Filter = 'All' | NewsCategory;

/**
 * Category chips, text search and a paginated grid of stories. The featured story shows
 * above the grid; while filtering it is hidden and treated like any other story.
 */
export function NewsBrowser({
  articles,
  featuredSlug,
  featured,
  perPage,
}: {
  articles: NewsArticle[];
  featuredSlug: string;
  /** Rendered between the filter bar and the grid when no filter is active. */
  featured: React.ReactNode;
  perPage: number;
}) {
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtering = filter !== 'All' || query.trim() !== '';

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return sortedNews(articles).filter(
      (a) =>
        (filtering || a.slug !== featuredSlug) &&
        (filter === 'All' || a.category === filter) &&
        words.every((w) => `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(w)),
    );
  }, [articles, featuredSlug, filtering, filter, query]);

  const pages = Math.max(1, Math.ceil(results.length / perPage));
  const current = Math.min(page, pages);
  const shown = results.slice((current - 1) * perPage, current * perPage);

  const goTo = (p: number) => {
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="border-b border-line">
        <div className="container-x flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter by category"
            className="-mx-5 flex gap-2.5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
          >
            {(['All', ...newsCategories] as Filter[]).map((c) => {
              const active = c === filter;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(c);
                    setPage(1);
                  }}
                  className={cn(
                    'min-h-11 flex-none whitespace-nowrap rounded-full border px-[18px] py-2.5 text-sm transition-colors',
                    active
                      ? 'border-primary bg-primary font-semibold text-white'
                      : 'border-line font-medium text-ink hover:border-primary hover:text-primary',
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <label className="flex min-h-11 items-center gap-2.5 rounded-full border border-line px-[18px] text-sm text-muted focus-within:border-primary lg:w-[300px]">
            <Search aria-hidden="true" className="size-4 flex-none" strokeWidth={2} />
            <span className="sr-only">Search news</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search news"
              className="min-h-11 min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
            />
          </label>
        </div>
      </div>

      {!filtering && featured}
      <div ref={gridRef} className="scroll-mt-[96px]" />
      <p role="status" className="sr-only">
        {results.length} {results.length === 1 ? 'story' : 'stories'} found
      </p>

      <section aria-label="Stories" className="container-x pb-14 pt-8">
        {shown.length === 0 ? (
          <p className="rounded-card bg-cream p-8 text-center text-muted">
            No stories match your search. Try another word or choose “All”.
          </p>
        ) : (
          <ul className="grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((a) => (
              <li key={a.slug}>
                <NewsGridCard article={a} />
              </li>
            ))}
          </ul>
        )}

        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-12 flex flex-wrap gap-2">
            <PageButton
              label="Previous page"
              disabled={current === 1}
              onClick={() => goTo(current - 1)}
            >
              <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={2} />
            </PageButton>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <PageButton
                key={p}
                label={`Page ${p}`}
                current={p === current}
                onClick={() => goTo(p)}
              >
                {p}
              </PageButton>
            ))}
            <PageButton
              label="Next page"
              disabled={current === pages}
              onClick={() => goTo(current + 1)}
            >
              <ChevronRight aria-hidden="true" className="size-4" strokeWidth={2} />
            </PageButton>
          </nav>
        )}
      </section>
    </>
  );
}

function PageButton({
  label,
  current,
  disabled,
  onClick,
  children,
}: {
  label: string;
  current?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={current ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex size-11 items-center justify-center rounded-input border font-semibold transition-colors disabled:opacity-40',
        current
          ? 'border-primary bg-primary text-white'
          : 'border-line text-ink enabled:hover:border-primary enabled:hover:text-primary',
      )}
    >
      {children}
    </button>
  );
}
