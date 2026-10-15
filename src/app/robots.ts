import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

/** /robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/coming-soon/' },
    sitemap: new URL('/sitemap.xml', site.url).toString(),
  };
}
