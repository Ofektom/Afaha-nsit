# Build prompt — Akwa Ibom State University of Education (AKSUE) demo website

> **How to use:** Create an empty project folder. Unzip `AKSUE-Design-Reference.zip` into it so you have `design/png/` and `design/html/`. Open Claude Code in that folder and paste everything below the line.

---

You are building a production-quality **demo website** for **Akwa Ibom State University of Education (AKSUE)**, a Nigerian state university. It will be shown to university management, so polish matters more than features. **No backend, no database, no authentication.** All portal links lead to a "Coming soon" page.

## 1. Source of truth

- `design/png/` has 13 approved screens. **Open and study every PNG before writing code.** Match them closely: layout, spacing, type sizes, colours, radii, shadows.
  - `AKSUE-01-home.png` … `AKSUE-07-contact.png`: desktop pages at 1440px wide, rendered at 2× (divide pixel measurements by 2).
  - `AKSUE-08` … `AKSUE-11`: navbar dropdown open states (About Us, Academics, Admissions, Portals).
  - `AKSUE-12-mobile-home.png`, `AKSUE-13-mobile-menu-open.png`: mobile at 390px wide.
- `design/html/` holds the HTML/CSS each PNG was rendered from. **Use it for exact values** (hex codes, px sizes, gaps, letter-spacing, copy text). Don't copy its markup wholesale; it's flat and hard-coded. Rebuild it properly as components.
- If a PNG and its HTML ever disagree, the PNG wins.
- **Exception: colour.** The university has confirmed its primary colour is **blue, not green**, and the accent is a **yellower amber-orange with dark text on it**. The blue is the **royal blue of the crest**, not a cyan/turquoise sky blue. The PNGs and HTML were made with the old green palette. Match their layout, spacing, type and radii, but take **every colour from §3**, never from the designs. Map design hex codes as shown in the §3 mapping table.

## 2. Tech stack (use exactly this)

- **Next.js 14+ (App Router) + TypeScript (strict)**
- **Tailwind CSS**, with design tokens defined in `src/theme/colors.ts` and loaded by `tailwind.config.ts` (see §3). No other UI kit.
- **Fonts via `next/font/google`:** `Fraunces` (400, 600, plus italic) for headings, `DM Sans` (400, 500, 600, 700) for body.
- **Icons:** `lucide-react`. The designs use Lucide icons.
- **Radix UI `@radix-ui/react-navigation-menu`** for the desktop dropdowns (gives accessible keyboard and hover behaviour), and `@radix-ui/react-dialog` or a simple accessible drawer for the mobile menu.
- **Static export** (`output: 'export'`) so it deploys to Vercel, Netlify or cPanel hosting with no server.
- Package manager: `npm`. Add ESLint and Prettier.

## 3. Design tokens

```
colors — SINGLE SOURCE: src/theme/colors.ts (Tailwind reads it; components use token classes,
never raw hex). Primary is the ROYAL BLUE of the University crest ("AFAHA NSIT" band):
  primary             #1F55A8   brand colour — nav text, primary buttons, links, icons (7.2:1 with white)
  primary-hover       #194789   hover state of primary buttons
  primary-dark        #0B1F44   hero / footer / utility bar / dark sections (deep navy, no green cast)
  primary-panel       #122B5C   cards on primary-dark sections
  primary-glow        #1A3F80   centre of the coming-soon page glow
  primary-soft        #E8EFFA   icon tiles, hover states, chips, active nav pill
  primary-soft-hover  #D5E1F5   hover on primary-soft surfaces
  orange       #F7A21B   amber-orange accent (yellower than the designs' #F37021) — buttons, highlights
  orange-hover #F9B13F   hover for orange buttons (lighter, keeps dark-text contrast)
  orange-soft  #FEF1D6   "Coming soon" badge bg, notice bars
  orange-text  #9A5600   orange text / eyebrow labels on light backgrounds (5.7:1 on white)
  orange-ring  #C97A00   focus outlines (3:1+ on both white and primary-dark)
  orange-deep  #6B3B00   text on orange-soft notice bars
  badge-text   #8A4B00   text inside orange-soft badges
  TEXT ON ORANGE FILLS IS ALWAYS primary-dark (#0B1F44) — never white.
  ink          #111C2E   body text
  muted        #57627A   secondary text
  line         #DCE2EC   borders / dividers
  cream        #F8F5EE   alternate section background
  placeholder  #8A95AA   form placeholder text
  tint-50…800  #DCE4F2 #CDD8EC #C2CFE6 #A9B9D8 #8FA2C8 · #2A4675 #1C3563
               light text (50–400) and rules (700–800) on primary-dark surfaces
gradients (bg-*): hero-desktop, hero-mobile, photo-placeholder, coming-soon, split-dark
shadows (shadow-*): dropdown, header, card, card-hover, orange-card, orange-glow, underline
radius:   card 20px · large panel 24–28px · input 12px · button/pill 999px
container: max-width 1280px, side padding 80px desktop, 20px mobile
section padding: 96–100px desktop, 40px mobile
shadow (dropdowns): `shadow-dropdown` (primary-dark at 22%)
```

**Old design colour → new token.** The files in `design/` still use green. When you read a hex code there, use the new value:

| Design hex | Use instead |
|---|---|
| `#0B4D3B` | `primary` #1F55A8 |
| `#093F30` | `primary-hover` #194789 |
| `#062E23` | `primary-dark` #0B1F44 |
| `#E6F0EC` | `primary-soft` #E8EFFA |
| `#D6E7DF` | `primary-soft-hover` #D5E1F5 |
| `#13231D` / `#5B6B64` / `#DCE3DF` | `ink` / `muted` / `line` |
| `#D7E4DE` `#C9DAD2` `#BFD3CA` `#A9C3B8` `#8FB0A3` | `tint-50` `100` `200` `300` `400` |
| `#2B5A4C` / `#1E4A3D` | `tint-700` / `tint-800` |
| `#93A39C` (placeholder text) | `placeholder` |
| `rgba(6,46,35,…)` (shadows, scrims) | `shadow-*` tokens, or `alpha(palette.primary.dark, …)` |
| `#F37021` (orange) / `#FDEBDD` / `#C04F0E` / `#A8420B` / `#7F3008` | `orange` / `orange-soft` / `orange-text` / `badge-text` / `orange-deep` (amber values above) |
| white text on orange (buttons, CTA band, VC name card, step 01) | `primary-dark` text |
| `rgba(243,112,33,…)` (orange glows) | `shadow-orange-card` / `shadow-orange-glow` |
| image-placeholder green gradient | `bg-photo-placeholder` |

Never write a raw hex in a component when a token exists. Any other green shade in the designs should map to the nearest blue token.

Type: H1 hero is 76–78px Fraunces 600 (40px mobile). Page-hero H1 is 60px. Section H2 is 44px. Eyebrow labels are 13px DM Sans 700, uppercase, 0.12em tracking, with a 28×2px line before them. Body is 16–17px, line-height 1.6.

## 4. Pages and routes

| Route | Screen | Notes |
|---|---|---|
| `/` | 01 Home | hero, stats strip, portal cards, VC welcome, faculties grid, news + events, campus gallery, orange CTA band |
| `/about` | 02 About & Leadership | in-page sub-nav tabs (anchor links), overview + "At a glance", vision/mission/values, management (VC feature + 5 officers), governing council |
| `/academics` | 03 Faculties & Departments | faculty tab bar switches content client-side, **using data for all 6 faculties** (not only Education); department cards; programmes table |
| `/admissions` | 04 Admissions | routes, 5 steps, requirements, key dates, FAQ **accordion** that works |
| `/portals/[slug]` | 05 Coming Soon | slugs: `admissions`, `student`, `fee-payment`, `staff`, `e-library`. Title changes per portal; roadmap highlights that portal's phase |
| `/news` | 06 News & Events | category filter chips actually filter; pagination UI can be static |
| `/news/[slug]` | (no design) | simple article page in the same style: hero image, title, date, body, related news |
| `/contact` | 07 Contact | form with client-side validation; on submit show a success toast ("Thank you — this is a demo, messages are not sent yet"); map placeholder |
| `/coming-soon` | reuse 05 | generic version for **any nav/dropdown link that has no page yet** |

**Every link must go somewhere.** Dropdown items without a real page (History, Senate, Bursary, Teaching Practice and so on) go to `/coming-soon?page=<Name>`, which shows "<Name> — page coming soon". No `#` links, no 404s. Add a `not-found.tsx` styled like the coming-soon page.

## 5. Shared components (build these first)

`UtilityBar`, `Header` (desktop nav + dropdowns), `MobileNav`, `Footer`, `Logo`, `Button` (variants: orange, primary, outline-light, outline-dark, white; sizes), `Badge` (Coming soon), `Chip`, `Eyebrow`, `SectionHeading`, `PageHero` (breadcrumb + title + lead + optional image), `ImagePlaceholder`, `PortalCard`, `FacultyCard`, `DepartmentCard`, `NewsCard`, `EventItem`, `StatStrip`, `Accordion`, `NotifyForm`.

### Header and dropdowns (match screens 08–11 exactly)
- Utility bar (`primary-dark`, 42px): phone, email and location on the left; Student Portal · Staff Portal · e-Library · Alumni · Careers | Bursary on the right.
- Main nav (88px, white, sticky; on scroll add a subtle shadow and shrink to 72px): Logo · Home · About Us ▾ · Academics ▾ · Admissions ▾ · Student Life · News & Events · Contact · search button · orange **Portals ▾** button.
- **Mega-menus** for About Us, Academics and Admissions: full container width, 3px orange top border, rounded bottom corners, columns with orange-text headings, items with optional description, and a feature card on the right. **Exact menu content is in `design/html/08–10*.html`. Copy all items.**
- **Portals dropdown:** compact 400px panel aligned right, with a caret, 5 portal rows (icon tile, title, description, "Soon" badge), and a "Portal help & support" footer link.
- Behaviour: opens on hover (with a short close delay) **and** on click/Enter; Esc closes; arrow keys move between items; the active trigger gets the `primary-soft` pill and rotated chevron; a dark scrim covers the page below while a menu is open. The current page's nav item has a 3px orange underline.
- Search button opens a simple overlay search input (demo only: it can list matching pages from the nav data).

### Mobile (≤1024px)
- The header collapses to logo + search + menu button (screen 12).
- The menu (screen 13) is a full-height drawer with accordion sections for items that have dropdowns, plus full-width Portals and Apply buttons. Lock body scroll while it's open.
- Every desktop section must stack cleanly. Check 390px, 768px, 1024px and 1440px. No horizontal scroll at any width.

## 6. Content and data

- Put **all copy and lists in typed data files** under `src/content/` (`site.ts`, `navigation.ts`, `faculties.ts`, `leadership.ts`, `news.ts`, `events.ts`, `admissions.ts`, `portals.ts`). Pages render from data. Management *will* ask for text changes, and they must be one-file edits.
- Use the copy from `design/html/`. Write plausible departments for the 5 faculties not shown in detail (Science Ed: Biology, Chemistry, Physics, Mathematics, Computer Science, Integrated Science Education; and so on).
- Names stay as placeholders (`Prof. [Full Name]`). **Do not invent real people's names.**
- Numbers (12,000+ students and so on) are sample figures. Keep them in `site.ts` with a `// SAMPLE — replace with official figures` comment.

## 7. Images and logo

- Build `<ImagePlaceholder label="…" />` to match the designs: blue `bg-photo-placeholder` gradient (see §3), dot texture, centred icon and uppercase label. It accepts an optional `src`. **When `src` is provided it renders `next/image` instead**, so swapping in real photos later means adding files only.
- Create `public/images/` with a `README.md` listing every expected filename and its recommended size (e.g. `hero.jpg 2400×1400`, `vc.jpg 920×1120`, `faculty-education.jpg 800×380`…). Reference those paths from the content files, and fall back to the placeholder if a file is missing.
- **Logo:** `<Logo />` shows the dashed orange "LOGO" circle unless `public/logo.svg` (or `.png`) exists. Make it a single swap.
- Do **not** hot-link or download stock photos.

## 8. Quality bar

- **Accessibility (WCAG 2.1 AA):** semantic landmarks, one `h1` per page, alt text, visible focus rings (2px `orange-ring` outline, offset), 44px touch targets, `prefers-reduced-motion` respected, form labels and error messages.
- **Motion:** subtle only. Fade or slide for dropdowns (150–200ms), slight lift on card hover, numbers count up on the stats strip once in view.
- **SEO:** per-page `metadata` (title template "Page | Akwa Ibom State University of Education"), Open Graph tags, `sitemap.ts`, `robots.ts`, favicon placeholder.
- **Performance:** Lighthouse ≥ 90 on Performance, Accessibility, Best Practices and SEO (mobile). No layout shift from fonts or images.
- **Demo banner:** a dismissible slim bar at the very top: "Demo preview — content and figures are illustrative." Controlled by `site.ts` → `showDemoBanner: true`.

## 9. Build order

Work in this order and **stop after each phase to show me the result** (screenshots plus a summary):

1. Scaffold, tokens, fonts, layout shell (UtilityBar, Header without dropdowns, Footer, MobileNav).
2. Dropdown menus and mobile menu. Compare against PNGs 08–13.
3. Home page.
4. About, Academics, Admissions.
5. Portals / coming-soon, News (+ article), Contact, 404.
6. Responsiveness pass, accessibility pass, SEO, Lighthouse.

## 10. Verify against the designs (required)

Install Playwright as a dev dependency and write `scripts/screenshot.ts`. It runs the built site and captures each route at 1440px (full page) and the home and menu pages at 390px, saving to `design/compare/`. After each phase, **open your screenshots next to the matching PNG in `design/png/` and list every visible difference you find, then fix them.** Only call a page done when the side-by-side comparison has no noticeable differences in layout, spacing or typography, and its colours follow the §3 blue palette (green in the PNGs is expected and is not a difference to fix).

## 11. Deliverables

- Working repo. `npm run dev`, `npm run build` (static export to `out/`) and `npm run lint` all pass with zero errors.
- `README.md` covering how to run it, how to deploy (Vercel and plain hosting), how to edit content, how to add photos and logo, and how to switch off the demo banner.
- A short `CHANGES_NEEDED.md` listing every placeholder that needs real content from the university (names, figures, photos, address, phone numbers, emails, motto, year established).

Do not add anything not described here (no CMS, no auth, no analytics, no cookie banner) without asking me first. If something in the designs is ambiguous, make the most sensible choice, note it in your phase summary, and keep going.
