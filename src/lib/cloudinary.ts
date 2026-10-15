/**
 * Cloudinary delivery helpers. Files in public/ are uploaded with
 * `npm run cloudinary:upload`, which records them in src/generated/cloudinary-assets.json.
 * When NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set, those files are served from Cloudinary;
 * otherwise (or for files not uploaded yet) the local copy in public/ is used.
 */

export interface CloudinaryAsset {
  publicId: string;
  version: number;
  format: string;
  resourceType: 'image' | 'raw';
  width?: number;
  height?: number;
  /** SHA-1 of the uploaded file, so unchanged files aren't uploaded again. */
  hash: string;
}

/** Keyed by the file's public path, e.g. "/images/hero.jpg". */
export type CloudinaryManifest = Record<string, CloudinaryAsset>;

const HOST = 'https://res.cloudinary.com';

/**
 * Plain delivery URL (no transformations). Raw files carry their extension in the public ID;
 * SVGs get theirs added so they're served as vector files.
 */
export function deliveryUrl(cloudName: string, asset: CloudinaryAsset): string {
  const ext = asset.resourceType === 'image' && asset.format === 'svg' ? '.svg' : '';
  return `${HOST}/${cloudName}/${asset.resourceType}/upload/v${asset.version}/${asset.publicId}${ext}`;
}

export function isCloudinaryUrl(url: string): boolean {
  return url.startsWith(`${HOST}/`);
}

interface TransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  /** `limit` never upscales (default); `fill` crops to the exact width × height. */
  crop?: 'limit' | 'fill';
}

/**
 * Adds automatic format/quality and sizing to a Cloudinary image URL. Raw files, SVGs
 * and non-Cloudinary URLs are returned unchanged.
 */
export function withTransforms(url: string, opts: TransformOptions = {}): string {
  if (!isCloudinaryUrl(url) || !url.includes('/image/upload/') || url.endsWith('.svg')) {
    return url;
  }
  const parts = [
    'f_auto',
    opts.quality ? `q_${opts.quality}` : 'q_auto',
    `c_${opts.crop ?? 'limit'}`,
    opts.width ? `w_${opts.width}` : null,
    opts.height ? `h_${opts.height}` : null,
  ].filter(Boolean);
  return url.replace('/image/upload/', `/image/upload/${parts.join(',')}/`);
}

/**
 * Resolves a public path ("/images/hero.jpg") to the URL to use, or undefined if the
 * file is neither on Cloudinary nor in public/.
 */
export function createResolver({
  cloudName,
  manifest,
  localFiles,
}: {
  cloudName?: string;
  manifest: CloudinaryManifest;
  localFiles: ReadonlySet<string>;
}) {
  return (path: string | undefined): string | undefined => {
    if (!path) return undefined;
    const asset = manifest[path];
    if (cloudName && asset) return deliveryUrl(cloudName, asset);
    return localFiles.has(path) ? path : undefined;
  };
}
