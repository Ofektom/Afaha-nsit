import type { Metadata } from 'next';
import { site } from '@/content/site';
import { withTransforms } from './cloudinary';
import { existingImage } from './images';

/**
 * Default image for link previews (WhatsApp, Facebook, X…). A dedicated 1200×630
 * `public/images/og.jpg` is used if present; otherwise the home hero photo.
 */
const found = existingImage('/images/og.jpg') ?? existingImage('/images/hero.jpg');
// Cropped to the 1200×630 preview size when served from Cloudinary.
const shareImage = found && withTransforms(found, { width: 1200, height: 630, crop: 'fill' });

export const shareImages = shareImage
  ? [{ url: shareImage, alt: `${site.name} campus` }]
  : undefined;

/**
 * Per-page metadata: title (shown as "Title | University name"), description, canonical
 * URL and Open Graph / X card tags that keep the shared preview image.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  noIndex = false,
}: {
  title: string;
  description: string;
  /** Route with trailing slash, e.g. "/about/". */
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false } : undefined,
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: 'en_NG',
      images: shareImages,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: shareImage ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      images: shareImage ? [shareImage] : undefined,
    },
  };
}
