// Pure helpers for scripts/cloudinary-upload.mjs (kept separate so they can be tested).
import { createHash } from 'node:crypto';
import { extname } from 'node:path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg']);

/** Cloudinary resource type: images are transformable, everything else (PDFs…) is raw. */
export function resourceTypeFor(file) {
  return IMAGE_EXTENSIONS.has(extname(file).toLowerCase()) ? 'image' : 'raw';
}

/**
 * Public ID for a file in public/, e.g. "images/hero.jpg" → "aksue/images/hero".
 * Raw files keep their extension (Cloudinary requires it to serve them correctly).
 */
export function publicIdFor(relPath, folder, resourceType) {
  const path = relPath.split('\\').join('/');
  const id = resourceType === 'raw' ? path : path.slice(0, path.length - extname(path).length);
  return folder ? `${folder.replace(/\/+$/, '')}/${id}` : id;
}

/**
 * Media Library folder for a public ID ("aksue/images/hero" → "aksue/images"). Accounts
 * using dynamic folders only show uploads in a folder when it is set explicitly.
 */
export function assetFolderFor(publicId) {
  const i = publicId.lastIndexOf('/');
  return i === -1 ? '' : publicId.slice(0, i);
}

/** Signed-upload signature: sorted "key=value" pairs joined by "&", then the secret, SHA-1. */
export function signParams(params, apiSecret) {
  const toSign = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== '')
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return createHash('sha1')
    .update(toSign + apiSecret)
    .digest('hex');
}

export function sha1(buffer) {
  return createHash('sha1').update(buffer).digest('hex');
}
