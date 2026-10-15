/**
 * Captures the built site (out/) for side-by-side comparison with design/png.
 *
 *   npm run build && npm run screenshot            # every shot
 *   npm run screenshot -- home about               # only shots whose name contains a filter
 *
 * Output: design/compare/<name>.png
 */
import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { chromium, type Page } from '@playwright/test';

const OUT_DIR = join(process.cwd(), 'out');
const SHOT_DIR = join(process.cwd(), 'design', 'compare');
const PORT = 4321;

interface Shot {
  name: string;
  path: string;
  width: number;
  height?: number;
  fullPage?: boolean;
  /** Runs after load, before the capture (open a menu, scroll, …). */
  prepare?: (page: Page) => Promise<void>;
}

const desktop = (name: string, path: string): Shot => ({ name, path, width: 1440, fullPage: true });

const shots: Shot[] = [
  desktop('01-home', '/'),
  desktop('02-about', '/about/'),
  desktop('03-academics', '/academics/'),
  desktop('04-admissions', '/admissions/'),
  desktop('05-portal-admissions', '/portals/admissions/'),
  desktop('06-news', '/news/'),
  desktop('07-contact', '/contact/'),
  ...(
    [
      ['08-dropdown-about', 'About Us'],
      ['09-dropdown-academics', 'Academics'],
      ['10-dropdown-admissions', 'Admissions'],
      ['11-dropdown-portals', 'Portals'],
    ] as const
  ).map(([name, label]): Shot => ({
    name,
    path: '/',
    width: 1440,
    height: 820,
    prepare: async (page) => {
      await page.getByRole('banner').getByRole('button', { name: label, exact: true }).click();
      await page.waitForTimeout(300);
      // The designs show the first item in its hover state.
      await page.getByRole('banner').locator('[data-state="open"] a').first().hover();
      await page.waitForTimeout(300);
    },
  })),
  { name: '12-mobile-home', path: '/', width: 390, fullPage: true },
  {
    name: '13-mobile-menu',
    path: '/',
    width: 390,
    height: 844,
    prepare: async (page) => {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('button', { name: 'Academics' }).click();
      await page.waitForTimeout(300);
    },
  },
];

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

/** Minimal static server for out/ that behaves like Netlify/Vercel/Apache. */
function serve(): Promise<Server> {
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);
    let file = normalize(join(OUT_DIR, decodeURIComponent(url.pathname)));
    if (!file.startsWith(OUT_DIR)) {
      res.writeHead(403).end();
      return;
    }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    else if (!existsSync(file) && existsSync(`${file}.html`)) file = `${file}.html`;

    let status = 200;
    if (!existsSync(file)) {
      status = 404;
      file = join(OUT_DIR, '404.html');
    }
    res.writeHead(status, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
    createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error('out/ not found — run `npm run build` first.');
    process.exit(1);
  }
  mkdirSync(SHOT_DIR, { recursive: true });

  const filters = process.argv.slice(2);
  const selected = filters.length
    ? shots.filter((s) => filters.some((f) => s.name.includes(f)))
    : shots;

  const server = await serve();
  // Uses Playwright's bundled Chromium if installed, otherwise the system Chrome
  // (Playwright can't download browsers on older macOS). Override with CHROME_PATH.
  const browser = await chromium
    .launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
    .catch(() => chromium.launch({ channel: 'chrome' }));

  try {
    for (const shot of selected) {
      const page = await browser.newPage({
        viewport: { width: shot.width, height: shot.height ?? 900 },
        reducedMotion: 'reduce',
      });
      // The designs don't include the demo banner; hide it for comparisons.
      await page.addInitScript(() => {
        try {
          sessionStorage.setItem('aksue-demo-banner-dismissed', '1');
        } catch {
          // ignore
        }
      });

      await page.goto(`http://localhost:${PORT}${shot.path}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      if (shot.fullPage) {
        // Trigger in-view effects (count-ups, lazy images) before a full-page capture.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 600) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(300);
      }

      try {
        if (shot.prepare) await shot.prepare(page);
        const file = join(SHOT_DIR, `${shot.name}.png`);
        await page.screenshot({ path: file, fullPage: shot.fullPage ?? false });
        console.log(`✓ ${shot.name}  (${shot.width}px)  ${shot.path}`);
      } catch (err) {
        console.warn(`✗ ${shot.name}: ${(err as Error).message.split('\n')[0]}`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
