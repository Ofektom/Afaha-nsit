import { faculties, facultyHref } from '@/content/faculties';
import { footerColumns, mainNav, portalMenu, utilityLinks } from '@/content/navigation';

export interface SearchEntry {
  label: string;
  href: string;
  section: string;
  description?: string;
}

/** Every page and section reachable from the navigation, de-duplicated. */
function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const seen = new Set<string>();
  const add = (e: SearchEntry) => {
    const key = `${e.label.toLowerCase()}|${e.href}`;
    if (seen.has(key)) return;
    seen.add(key);
    entries.push(e);
  };

  for (const item of mainNav) {
    add({ label: item.label, href: item.href, section: 'Main menu' });
    for (const col of item.mega?.columns ?? []) {
      for (const l of col.links) {
        add({
          label: l.label,
          href: l.href,
          section: `${item.label} · ${col.heading}`,
          description: l.description,
        });
      }
    }
    for (const l of item.mobileLinks ?? [])
      add({ label: l.label, href: l.href, section: item.label });
  }
  for (const p of portalMenu.items) {
    add({ label: p.label, href: p.href, section: 'Portals', description: p.description });
  }
  for (const l of utilityLinks) add({ label: l.label, href: l.href, section: 'Quick links' });
  for (const f of faculties) {
    add({
      label: f.name,
      href: facultyHref(f.slug),
      section: 'Academics',
      description: f.highlights,
    });
    for (const d of f.departments) {
      add({
        label: d.name,
        href: facultyHref(f.slug),
        section: f.name,
        description: d.description,
      });
    }
  }
  for (const col of footerColumns) {
    for (const l of col.links) add({ label: l.label, href: l.href, section: col.heading });
  }
  return entries;
}

export const searchIndex = buildIndex();

/** Case-insensitive match on every word of the query against label, description and section. */
export function searchPages(query: string, limit = 8): SearchEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return searchIndex
    .map((e) => {
      const label = e.label.toLowerCase();
      const hay = `${label} ${e.description ?? ''} ${e.section}`.toLowerCase();
      if (!words.every((w) => hay.includes(w))) return null;
      // Rank label matches first, prefix matches highest.
      const score = words.reduce(
        (s, w) => s + (label.startsWith(w) ? 3 : label.includes(w) ? 2 : 0),
        0,
      );
      return { e, score };
    })
    .filter((r): r is { e: SearchEntry; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.e);
}
