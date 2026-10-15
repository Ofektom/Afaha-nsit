// Uploads photos, the logo and downloadable files from public/ to Cloudinary and records
// them in src/generated/cloudinary-assets.json (commit that file).
//
//   npm run cloudinary:upload              upload new or changed files
//   npm run cloudinary:upload -- --force   upload everything again
//   npm run cloudinary:upload -- --dry-run list what would be uploaded
//
// Needs CLOUDINARY_CLOUD_NAME (or NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME), CLOUDINARY_API_KEY and
// CLOUDINARY_API_SECRET in .env or .env.local. CLOUDINARY_FOLDER is optional (default "aksue").
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import {
  assetFolderFor,
  publicIdFor,
  resourceTypeFor,
  sha1,
  signParams,
} from './cloudinary-lib.mjs';

const root = process.cwd();
const publicDir = join(root, 'public');
const manifestPath = join(root, 'src', 'generated', 'cloudinary-assets.json');
const args = new Set(process.argv.slice(2));
const force = args.has('--force');
const dryRun = args.has('--dry-run');

for (const file of ['.env', '.env.local']) {
  if (existsSync(join(root, file))) process.loadEnvFile(join(root, file));
}

const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const folder = process.env.CLOUDINARY_FOLDER ?? 'aksue';

if (!dryRun && (!cloudName || !apiKey || !apiSecret)) {
  console.error(
    'Missing Cloudinary credentials. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and ' +
      'CLOUDINARY_API_SECRET to .env (see .env.example).',
  );
  process.exit(1);
}

const UPLOADABLE = /\.(jpe?g|png|webp|avif|gif|svg|pdf|docx?|xlsx?|pptx?|mp4|webm)$/i;

/** Files to upload: public/images/**, public/files/** and the logo. */
function collect() {
  const files = [];
  const walk = (dir) => {
    if (!existsSync(dir)) return;
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (UPLOADABLE.test(name)) files.push(full);
    }
  };
  walk(join(publicDir, 'images'));
  walk(join(publicDir, 'files'));
  for (const logo of ['logo.svg', 'logo.png']) {
    if (existsSync(join(publicDir, logo))) files.push(join(publicDir, logo));
  }
  return files;
}

async function upload(file, rel, resourceType, publicId) {
  const timestamp = Math.floor(Date.now() / 1000);
  const params = {
    public_id: publicId,
    asset_folder: assetFolderFor(publicId),
    overwrite: 'true',
    invalidate: 'true',
    timestamp,
  };
  // Empty values are left out of the request and the signature.
  for (const k of Object.keys(params)) if (params[k] === '') delete params[k];
  const form = new FormData();
  for (const [k, v] of Object.entries(params)) form.append(k, String(v));
  form.append('api_key', apiKey);
  form.append('signature', signParams(params, apiSecret));
  form.append('file', new Blob([readFileSync(file)]), rel.split('/').pop());

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: 'POST',
    // A stalled connection fails instead of hanging the whole run.
    signal: AbortSignal.timeout(60_000),
    body: form,
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.error?.message ?? `HTTP ${res.status}`);
  return body;
}

const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};
let uploaded = 0;
let skipped = 0;
let failed = 0;

for (const file of collect()) {
  const rel = relative(publicDir, file).split('\\').join('/');
  const key = `/${rel}`;
  const hash = sha1(readFileSync(file));
  if (!force && manifest[key]?.hash === hash) {
    skipped++;
    continue;
  }
  const resourceType = resourceTypeFor(file);
  const publicId = publicIdFor(rel, folder, resourceType);
  if (dryRun) {
    console.log(`would upload ${key} → ${resourceType}/${publicId}`);
    continue;
  }
  try {
    // One retry: transient network errors are common on slow connections.
    const r = await upload(file, rel, resourceType, publicId).catch((err) => {
      console.warn(`… retrying ${key} (${err.message})`);
      return upload(file, rel, resourceType, publicId);
    });
    manifest[key] = {
      publicId: r.public_id,
      version: r.version,
      format: r.format ?? extname(file).slice(1).toLowerCase(),
      resourceType,
      ...(r.width ? { width: r.width, height: r.height } : {}),
      hash,
    };
    uploaded++;
    console.log(`✓ ${key} → ${r.secure_url}`);
  } catch (err) {
    failed++;
    console.error(`✗ ${key}: ${err.message}`);
  }
}

if (!dryRun) {
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );
  writeFileSync(manifestPath, JSON.stringify(sorted, null, 2) + '\n');
}
console.log(`cloudinary: ${uploaded} uploaded, ${skipped} unchanged, ${failed} failed`);
if (failed) process.exit(1);
