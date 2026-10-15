# Akwa Ibom State University of Education — website (demo)

A fast, static website for AKSUE, built with Next.js, TypeScript and Tailwind CSS. There is no backend, database or login: every portal link leads to a "coming soon" page, and the contact and sign-up forms only confirm on screen.

> Demo content: names, figures, news and many photos are placeholders. See [`CHANGES_NEEDED.md`](CHANGES_NEEDED.md) for everything the University needs to supply.

## Run it

Requires Node.js 20 or newer.

```bash
npm install        # once
npm run dev        # http://localhost:3000, reloads as you edit
npm run build      # builds the static site into out/
npm start          # serves out/ at http://localhost:3000 to check the build
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run format     # Prettier
npm test           # unit tests (Node's built-in test runner)
```

## Deploy

`npm run build` produces a plain static site in `out/`. It needs no server or database.

**Vercel:** import the repository at vercel.com. The defaults work (framework: Next.js; build command: `npm run build`). Every push to the main branch redeploys.

**Netlify:** build command `npm run build`, publish directory `out`.

**cPanel or any web host:** run `npm run build` on your computer, then upload the **contents** of `out/` (not the folder itself) into `public_html` with the File Manager or FTP. Unknown addresses show the site's own 404 page on hosts that use `404.html` (Apache with `ErrorDocument 404 /404.html`, Netlify and Vercel do this automatically).

Before going live, set the real domain in `src/content/site.ts` (`url`). It is used for the sitemap, `robots.txt`, canonical links and link previews.

## Edit content

All text and lists live in `src/content/`. Each change is a one-file edit; pages update automatically.

| File            | What it holds                                                                                |
| --------------- | -------------------------------------------------------------------------------------------- |
| `site.ts`       | University name, tagline, contact details, social links, key figures, **demo banner switch** |
| `navigation.ts` | Utility bar, main menu, mega-menus, mobile menu and footer links                             |
| `home.ts`       | Home page text (hero, sections, call-to-action)                                              |
| `about.ts`      | About page: story, "At a glance", vision, mission, values, council text                      |
| `leadership.ts` | Vice-Chancellor, principal officers, Pro-Chancellor                                          |
| `faculties.ts`  | All 6 faculties: descriptions, deans, departments, programmes, figures                       |
| `admissions.ts` | Routes, steps, requirements, key dates, FAQs                                                 |
| `news.ts`       | News stories (each gets its own page) and which stories are featured                         |
| `events.ts`     | Upcoming events                                                                              |
| `portals.ts`    | The 5 portals, their coming-soon pages and the roadmap (`currentPhase`)                      |
| `contact.ts`    | Offices, form options, map embed link                                                        |

Text in these files is ordinary text inside quotes. Keep the quotes and commas; use `’` or `\'` for apostrophes inside single-quoted text.

**Pages that don't exist yet** (History, Senate, Bursary…) link to `/coming-soon/?page=Name` through `comingSoon('Name')` in the content files. When a real page is ready, change that link to the page's address.

**Add a news story:** copy one entry in `news.ts`, give it a new `slug` (lowercase-with-dashes; it becomes the address `/news/<slug>/`), a date (`YYYY-MM-DD`), category, excerpt and paragraphs. Lists sort by date automatically.

## Photos and logo

Drop photos into `public/images/` using the filenames listed in [`public/images/README.md`](public/images/README.md). Each photo replaces its placeholder on the next build; no code changes are needed. Missing photos keep showing the placeholder. If Cloudinary is set up, run `npm run cloudinary:upload` after adding photos (see below).

If `npm run dev` is running, restart it after adding photos, uploading to Cloudinary or editing `.env`. The list of available images and the Cloudinary settings are read when it starts; a stale dev server can show a "hydration" error or a placeholder until restarted. Production builds are not affected.

- **Logo:** add `public/logo.svg` (preferred) or `public/logo.png`. It replaces the dashed "LOGO" circle everywhere.
- **Favicon:** replace `src/app/icon.svg` (or delete it and add `src/app/icon.png`).
- **Link-preview image** (WhatsApp, Facebook, X): add `public/images/og.jpg` at 1200 × 630. Until then the home hero photo is used.
- **Map:** paste a Google Maps embed URL into `mapEmbedUrl` in `src/content/contact.ts`.

## Cloudinary (images and files)

Photos, the logo and downloadable files can be served from [Cloudinary](https://cloudinary.com), which resizes and compresses them for each device. Without Cloudinary, the same files are served from `public/` exactly as before.

1. Copy `.env.example` to `.env` and fill in the cloud name, API key and API secret (Cloudinary dashboard → Settings → API Keys). `.env` is never committed.
2. Add photos to `public/images/` (and documents such as PDFs to `public/files/`), then run:

   ```bash
   npm run cloudinary:upload            # uploads new or changed files only
   npm run cloudinary:upload -- --dry-run   # lists what would be uploaded
   ```

   This records each upload in `src/generated/cloudinary-assets.json`. **Commit that file**: the build uses it to know which files are on Cloudinary.

3. On Vercel, add `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` under Project → Settings → Environment Variables and redeploy. The API key and secret are only needed on the computer that runs the upload, not on Vercel.

Images then load from Cloudinary in the right size and format (WebP/AVIF where supported), and link previews use a 1200 × 630 crop. Any file not uploaded yet keeps working from `public/`. JavaScript, CSS and fonts stay on Vercel's CDN, which is faster for them than a second domain.

For other files (e.g. a brochure PDF), use `assetUrl('/files/brochure.pdf')` from `src/lib/images.ts` as the link; it points to Cloudinary once uploaded.

## Demo banner

The slim "Demo preview" bar at the top is controlled by `showDemoBanner` in `src/content/site.ts`. Set it to `false` to remove it. Visitors can also dismiss it for their session.

## Colours and fonts

All colours live in **`src/theme/colors.ts`**: the royal-blue `primary` from the University crest (with `dark`, `soft` and other shades), the amber `orange` accent, text greys, and the gradients and shadows built from them. Tailwind reads that file, so components only use class names (`bg-primary`, `text-orange-text`, `bg-hero-desktop`, `shadow-card`…). Changing a value there recolours the whole site. For a transparent version of a colour in code, use `alpha(palette.primary.dark, 0.5)`. Text on orange is always dark blue, for contrast.

Fonts are Fraunces (headings) and DM Sans (body), served from the site itself (no Google Fonts request).

## Checking the design

`design/png/` holds the approved screens and `design/html/` the source they were rendered from. The designs use the old green palette; the site follows the blue palette in `src/theme/colors.ts` (see `CLAUDE_CODE_PROMPT.md` §3).

```bash
npm run build && npm run screenshot          # all screens
npm run screenshot -- home about             # only some
```

Screenshots are saved to `design/compare/` for side-by-side comparison. The script uses Playwright with the installed Google Chrome.

## Project structure

```
src/
  app/          pages (one folder per route), layout, sitemap, robots, 404
  components/   layout (header, menus, footer), ui (buttons, cards…), page sections
  content/      all text and lists (edit these)
  theme/        colour palette, gradients and shadows (colors.ts)
  lib/          small helpers (links, dates, images, Cloudinary, metadata, search)
  generated/    file lists written by scripts (commit cloudinary-assets.json)
public/         logo, photos (public/images/), documents (public/files/)
scripts/        screenshot tool, image manifest, Cloudinary upload
tests/          unit tests
design/         approved designs and comparison screenshots
```
