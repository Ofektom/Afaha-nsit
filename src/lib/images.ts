import publicFiles from '@/generated/public-files.json';
import cloudinaryAssets from '@/generated/cloudinary-assets.json';
import { createResolver, type CloudinaryManifest } from './cloudinary';

const resolve = createResolver({
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  manifest: cloudinaryAssets as CloudinaryManifest,
  localFiles: new Set<string>(publicFiles),
});

/**
 * URL for an image in public/ (e.g. "/images/hero.jpg"): from Cloudinary when uploaded and
 * configured, otherwise the local file. Undefined if the file doesn't exist (show a placeholder).
 */
export function existingImage(src?: string): string | undefined {
  return resolve(src);
}

/**
 * URL for any other file in public/ (e.g. "/files/brochure.pdf"): Cloudinary when uploaded,
 * otherwise the local path.
 */
export function assetUrl(path: string): string {
  return resolve(path) ?? path;
}

/** The uploaded logo, if any: public/logo.svg wins over public/logo.png. */
export const logoSrc: string | undefined = existingImage('/logo.svg') ?? existingImage('/logo.png');
