# Content needed from the University

Everything below is a placeholder or sample in the demo. Each item names the file to edit (all under `src/content/` unless noted). Photos go in `public/images/`; see [`public/images/README.md`](public/images/README.md) for exact filenames and sizes.

## Identity

- [ ] **Logo**: the site now uses our vector redraw of the crest on the campus signage (`public/logo.svg`). Please send the official artwork (SVG preferred) and confirm the motto on the crest's banner, which isn't legible in the photo → replace `public/logo.svg`
- [ ] **Favicon**: currently a simplified version of the redrawn crest → replace `src/app/icon.svg` with the official one
- [ ] **Year established** → `about.ts` ("At a glance": `[Year]`)
- [ ] **University motto** → `about.ts` (`[University motto]`)
- [ ] **Brand colour codes**: the blue is matched to the crest on the signage (`#1F55A8`). If the University has official hex values for its blue and orange, update them → `src/theme/colors.ts`
- [ ] **Live domain** (currently assumed `https://aksue.edu.ng`) → `site.ts` (`url`)

## Contact details

- [ ] **Main phone number** (`+234 800 000 0000`) → `site.ts`
- [ ] **General email** (`info@aksue.edu.ng`, assumed) → `site.ts`
- [ ] **Full campus address** (`[Full campus address]`) → `site.ts`
- [ ] **Office hours**, if not Mon – Fri 8:00 AM – 4:00 PM → `site.ts`
- [ ] **Admissions Office, Registry and Bursary**: emails and phone numbers (all placeholders) → `contact.ts`
- [ ] **Google Maps embed link** for the main campus → `contact.ts` (`mapEmbedUrl`)
- [ ] **Social media links** (Facebook, X, LinkedIn, YouTube); they currently go to "coming soon" → `site.ts`

## People (names, titles, photos)

Apart from the Vice-Chancellor, all names are `[Full Name]` placeholders. We have not invented any real names.

- [x] **Vice-Chancellor**: name (Prof. Philip Afaha) and photo **added**; appointment date taken from the state government's announcement of 5 October 2026
- [ ] **Vice-Chancellor**: qualifications, discipline and official biography → `leadership.ts`
- [ ] **Vice-Chancellor's welcome — important:** the quote and welcome paragraph on the home page are sample text written for the design, but they now appear under Prof. Afaha's name and photo. Replace them with his own words, or get his approval, before showing the site publicly → `home.ts`
- [ ] **Principal officers**: names, emails (assumed, e.g. `registrar@aksue.edu.ng`) and photos for DVC (Academic), DVC (Admin), Registrar, Bursar and University Librarian → `leadership.ts`
- [ ] **Pro-Chancellor & Chairman of Council**: name, title and photo → `leadership.ts`
- [ ] **Deans** of the 5 faculties and the Postgraduate School: names, emails (assumed, e.g. `dean.education@aksue.edu.ng`) and photos → `faculties.ts`
- [ ] **Heads of department and programme coordinators**: names → `faculties.ts`

## Figures (all sample)

- [ ] **Home page figures**: 6 faculties, 40+ programmes, 12,000+ students & alumni, 350+ academic staff → `site.ts` (`stats`)
- [ ] **Per-faculty figures**: number of programmes and students for each faculty → `faculties.ts` (`stats`)
- [ ] **Academics page summary**: "25+ departments and over 40 accredited programmes" → `faculties.ts` (`academicsPage.lead`)

## Academics

- [ ] **Departments**: confirm the list for every faculty. Only the Faculty of Education list comes from the approved design; the other five faculties are our best guess → `faculties.ts`
- [ ] **Department descriptions and degrees offered** (B.Ed, B.Sc (Ed), PGDE, M.Ed, Ph.D) → `faculties.ts`
- [ ] **Programme tables**: programme names, durations, entry modes and NUC accreditation status (Full / Interim) for each faculty → `faculties.ts`
- [ ] **Faculty descriptions** (one or two sentences each) → `faculties.ts`
- [ ] **Programmes list PDF** for the "Download full list" button; it currently goes to "coming soon" → `faculties.ts` (`programmesCta`)

## Admissions

- [ ] **Entry requirements**: confirm the five points → `admissions.ts`
- [ ] **Key dates** for 2026/2027 (portal opening, post-UTME, admission list, registration) → `admissions.ts`
- [ ] **FAQ answers**: the first is from the design; the other three were written for the demo → `admissions.ts`
- [ ] **Admissions brochure** (PDF) for "Download brochure" → `admissions.ts`
- [ ] **Admissions notice text** and the session year shown on the home page ("2026/2027 Admissions opening soon") → `admissions.ts`, `home.ts`

## News and events

- [ ] **News stories**: all 11 are sample stories written for the demo; replace them with real ones (title, date, category, summary, text, photo) → `news.ts`
- [ ] **Featured stories** on the home page and the News page → `news.ts` (`homeNews`, `newsPage.featured`)
- [ ] **Upcoming events** (titles, dates, venues, times) → `events.ts`

## Portals

- [ ] **Roadmap**: confirm the phases and which phase is in progress → `portals.ts` (`roadmap`, `currentPhase`)
- [ ] **Launch dates or links** for each portal when ready; portal links then point to the real portal instead of the "coming soon" page → `portals.ts`, `navigation.ts`

## Photos

Placeholders show where each photo goes. Needed (exact filenames in `public/images/README.md`):

- [x] Home hero: campus building with students: **added** (the copy received is 960 px wide; the original, ideally 2400 px or wider, would look sharper on large screens)
- [x] About page header: campus signage at the main entrance **added**
- [ ] Principal officers (5), Pro-Chancellor, deans (6)
- [ ] Admissions page: new students
- [ ] **Stand-in photos to replace:** the 6 faculty cards and the 5 "Life on campus" photos currently reuse 6 photos from VC visits and the ICT Centre. Replace each with a photo of its subject (same filenames; see `public/images/README.md`), and update the gallery labels in `home.ts` if the subject changes
- [ ] A photo for each news story (three home-page stories currently use stand-in photos)
- [ ] Link-preview image, 1200 × 630 (`og.jpg`)

## Pages not built yet

These links show a "coming soon" page. Send the content when ready and they can be built as full pages: History, Facts & Figures, Anthem & Symbols, Senate, Deans & Directors, Bursary, Registry, University Library, Academic Planning, ICT Directorate, Works & Services, Student Life, Research, Research & Centres, Academic Calendar, Course Catalogue, Teaching Practice, Distance Learning, Admission Lists, Scholarships & Aid, International Applicants, Alumni, Careers, Governing Council (full list), Vice-Chancellor's message and profile, Office of the Vice-Chancellor, an "All portals" overview, Privacy Policy, Terms of Use, Accessibility statement and a Sitemap page.

## Before launch

- [ ] Cloudinary: add the cloud name, API key and secret to `.env`, run `npm run cloudinary:upload`, commit `src/generated/cloudinary-assets.json`, and set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` on Vercel (see README)

- [ ] Set `showDemoBanner: false` in `site.ts`
- [ ] Contact form and sign-up boxes: decide where messages should go (email service or form handler). In the demo they only confirm on screen.
