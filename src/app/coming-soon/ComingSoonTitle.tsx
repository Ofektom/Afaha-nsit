'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { site } from '@/content/site';

/** Page name from ?page=, trimmed to something sensible. */
function usePageName(): string {
  const raw = useSearchParams().get('page') ?? '';
  return raw.trim().slice(0, 80) || 'This page';
}

/** "<Name> — page coming soon", and the browser tab title to match. */
export function ComingSoonTitle() {
  const name = usePageName();

  useEffect(() => {
    document.title = `${name} — coming soon | ${site.name}`;
  }, [name]);

  return <>{name} — page coming soon</>;
}
