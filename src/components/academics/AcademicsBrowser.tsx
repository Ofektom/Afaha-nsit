'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import {
  academicsPage,
  faculties,
  getFaculty,
  type Faculty,
  type FacultySlug,
} from '@/content/faculties';
import { DepartmentCard } from '@/components/cards/DepartmentCard';
import { cn } from '@/lib/cn';
import { FacultyView } from './FacultyView';
import { ProgrammesTable } from './ProgrammesTable';

const DEFAULT: FacultySlug = 'education';

/** Reads ?faculty= and ?q= from the URL. Needs a <Suspense> boundary in a static export. */
export function AcademicsBrowserWithParams() {
  const params = useSearchParams();
  return <AcademicsBrowser faculty={params.get('faculty')} query={params.get('q') ?? ''} />;
}

/** Faculty tab bar plus either the selected faculty or search results. */
export function AcademicsBrowser({
  faculty: facultyParam = null,
  query = '',
}: {
  faculty?: string | null;
  query?: string;
}) {
  const router = useRouter();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const q = query.trim();
  const selected = getFaculty(facultyParam) ?? getFaculty(DEFAULT) ?? faculties[0];
  if (!selected) return null;

  const select = (f: Faculty) => {
    router.replace(`/academics/?faculty=${f.slug}`, { scroll: false });
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = faculties.length - 1;
    const next =
      e.key === 'ArrowRight'
        ? index === last
          ? 0
          : index + 1
        : e.key === 'ArrowLeft'
          ? index === 0
            ? last
            : index - 1
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    const f = faculties[next];
    if (!f) return;
    select(f);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div className="border-b border-line">
        <div
          role="tablist"
          aria-label="Faculties and schools"
          className="container-x flex gap-3 overflow-x-auto py-6 [scrollbar-width:none]"
        >
          {faculties.map((f, i) => {
            const isSelected = !q && f.slug === selected.slug;
            return (
              <button
                key={f.slug}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`tab-${f.slug}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="faculty-panel"
                tabIndex={isSelected || (q && i === 0) ? 0 : -1}
                onClick={() => select(f)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  'min-h-11 flex-none whitespace-nowrap rounded-full border px-5 py-3 text-[15px] transition-colors',
                  isSelected
                    ? 'border-primary bg-primary font-semibold text-white'
                    : 'border-line font-medium text-ink hover:border-primary hover:text-primary',
                )}
              >
                {f.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {q ? (
        <SearchResults query={q} />
      ) : (
        <div id="faculty-panel" role="tabpanel" aria-labelledby={`tab-${selected.slug}`}>
          <FacultyView key={selected.slug} faculty={selected} />
        </div>
      )}
    </>
  );
}

/** Hero search box. Plain GET form, so it also works before JavaScript loads. */
export function ProgrammeSearch({ defaultValue = '' }: { defaultValue?: string }) {
  return (
    <form
      role="search"
      action="/academics/"
      method="get"
      className="mt-8 flex w-full max-w-[720px] items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-muted"
    >
      <Search aria-hidden="true" className="size-5 flex-none" strokeWidth={2} />
      <label htmlFor="programme-search" className="sr-only">
        Search programmes, departments or courses
      </label>
      <input
        id="programme-search"
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={academicsPage.searchPlaceholder}
        className="min-h-11 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        className="inline-flex min-h-11 flex-none items-center gap-2 rounded-full bg-orange px-[22px] py-[14px] text-[15px] font-semibold leading-[1.4] text-primary-dark transition-colors hover:bg-orange-hover"
      >
        Search
        <ArrowRight aria-hidden="true" className="size-4 max-sm:hidden" strokeWidth={2} />
      </button>
    </form>
  );
}

export function ProgrammeSearchWithParams() {
  const params = useSearchParams();
  return <ProgrammeSearch key={params.get('q') ?? ''} defaultValue={params.get('q') ?? ''} />;
}

function SearchResults({ query }: { query: string }) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (text: string) => words.every((w) => text.toLowerCase().includes(w));

  const departments = faculties.flatMap((f) =>
    f.departments
      .filter((d) => matches(`${d.name} ${d.description} ${d.degrees.join(' ')} ${f.name}`))
      .map((d) => ({ d, faculty: f })),
  );
  const programmes = faculties.flatMap((f) =>
    f.programmes
      .filter((p) => matches(`${p.name} ${p.degree} ${f.name}`))
      .map((p) => ({ ...p, faculty: f.shortName })),
  );
  const total = departments.length + programmes.length;

  return (
    <section aria-labelledby="results-title" className="section-y">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="results-title"
              className="font-serif text-[28px] font-semibold tracking-[-.01em] text-ink lg:text-[36px]"
            >
              Results for “{query}”
            </h2>
            <p role="status" className="mt-2 text-muted">
              {total === 0
                ? 'No departments or programmes match your search. Try a subject such as “Mathematics” or a degree such as “M.Ed”.'
                : `${departments.length} ${departments.length === 1 ? 'department' : 'departments'} and ${programmes.length} ${programmes.length === 1 ? 'programme' : 'programmes'} found.`}
            </p>
          </div>
          <Link
            href="/academics/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-primary px-5 text-[15px] font-semibold text-primary hover:bg-primary-soft"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={2} />
            Clear search
          </Link>
        </div>

        {departments.length > 0 && (
          <>
            <h3 className="mb-6 mt-12 font-serif text-2xl font-semibold text-ink">Departments</h3>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {departments.map(({ d, faculty }) => (
                <li key={d.name}>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[.08em] text-orange-text">
                    {faculty.shortName}
                  </p>
                  <DepartmentCard department={d} />
                </li>
              ))}
            </ul>
          </>
        )}

        {programmes.length > 0 && (
          <>
            <h3 className="mb-6 mt-12 font-serif text-2xl font-semibold text-ink">Programmes</h3>
            <ProgrammesTable rows={programmes} caption={`Programmes matching “${query}”`} />
          </>
        )}
      </div>
    </section>
  );
}
