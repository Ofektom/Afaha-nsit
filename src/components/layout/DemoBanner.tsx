'use client';

import { useSyncExternalStore } from 'react';
import { Info, X } from 'lucide-react';
import { site } from '@/content/site';

const STORAGE_KEY = 'aksue-demo-banner-dismissed';
const listeners = new Set<() => void>();

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false; // Storage unavailable (private mode) — keep showing the banner.
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function dismiss() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

/** Slim dismissible notice at the very top. Toggle with `site.showDemoBanner`. */
export function DemoBanner() {
  const dismissed = useSyncExternalStore(subscribe, readDismissed, () => false);

  if (!site.showDemoBanner || dismissed) return null;

  return (
    <div role="region" aria-label="Demo notice" className="bg-orange-soft text-badge-text">
      <div className="container-x flex min-h-9 items-center justify-center gap-2 py-1 text-[13px] font-semibold">
        <Info aria-hidden="true" className="size-4 flex-none" strokeWidth={2} />
        <p className="flex-1 text-center sm:flex-none">{site.demoBannerText}</p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss demo notice"
          className="-my-2 -mr-3 flex size-11 flex-none items-center justify-center rounded-full hover:bg-orange/10"
        >
          <X aria-hidden="true" className="size-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
