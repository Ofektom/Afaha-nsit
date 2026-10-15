import type { MetadataRoute } from 'next';
import { news, articleHref } from '@/content/news';
import { portals } from '@/content/portals';
import { site } from '@/content/site';
import { portalHref } from '@/lib/links';

export const dynamic = 'force-static';

/** /sitemap.xml — every public page. Uses `site.url`, so set the live domain there. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  const pages = ['/', '/about/', '/academics/', '/admissions/', '/news/', '/contact/'];

  return [
    ...pages.map((p) => ({
      url: url(p),
      changeFrequency: 'weekly' as const,
      priority: p === '/' ? 1 : 0.8,
    })),
    ...news.map((a) => ({ url: url(articleHref(a.slug)), lastModified: a.date, priority: 0.6 })),
    ...portals.map((p) => ({ url: url(portalHref(p.slug)), priority: 0.4 })),
  ];
}
