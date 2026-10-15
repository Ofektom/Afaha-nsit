import type { ImageLoaderProps } from 'next/image';
import { isCloudinaryUrl, withTransforms } from './cloudinary';

/**
 * next/image loader (see next.config.ts). Cloudinary images get responsive sizes and
 * automatic format/quality; local files in public/ are served as they are.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (isCloudinaryUrl(src)) return withTransforms(src, { width, quality });
  // A static host ignores the query; it keeps each srcset entry distinct.
  return `${src}?w=${width}`;
}
