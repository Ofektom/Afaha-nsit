// Lists files in public/images (plus logo files) so components can fall back to
// placeholders when a photo hasn't been added yet. Runs before dev/build/lint.
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const publicDir = join(root, 'public');
const files = [];

function walk(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(jpe?g|png|webp|avif|svg)$/i.test(name)) {
      files.push('/' + relative(publicDir, full).split('\\').join('/'));
    }
  }
}

walk(join(publicDir, 'images'));
for (const logo of ['logo.svg', 'logo.png']) {
  if (existsSync(join(publicDir, logo))) files.push('/' + logo);
}

const outDir = join(root, 'src', 'generated');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'public-files.json'), JSON.stringify(files.sort(), null, 2) + '\n');
console.log(`image manifest: ${files.length} file(s)`);
