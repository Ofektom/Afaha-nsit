# Photos

Drop photos into this folder using the exact filenames below. Each one replaces its placeholder automatically on the next `npm run dev` or `npm run build`; no code changes are needed. Missing files keep showing the placeholder. If Cloudinary is set up, run `npm run cloudinary:upload` afterwards (see the main README).

Use JPG (or WebP), landscape unless noted, and keep each file under about 400 KB.

## Home page

| File                        | Recommended size      | Where it appears                                                   |
| --------------------------- | --------------------- | ------------------------------------------------------------------ |
| `hero.jpg`                  | 2400 × 1400           | Home hero (wide shot of students on campus)                        |
| `vc.jpg`                    | 920 × 1120 (portrait) | Vice-Chancellor's welcome; About Us menu                           |
| `campus-classroom.jpg`      | 1240 × 920            | "Life on campus", large photo (currently: VC visiting a classroom) |
| `campus-ict-centre.jpg`     | 640 × 440             | "Life on campus" (ICT Centre)                                      |
| `campus-tour.jpg`           | 640 × 440             | "Life on campus" (campus grounds)                                  |
| `campus-facility-visit.jpg` | 640 × 440             | "Life on campus" (facility visit)                                  |
| `campus-lecture-room.jpg`   | 640 × 440             | "Life on campus" (lecture room)                                    |

## About and Admissions

| File                  | Recommended size | Where it appears                                 |
| --------------------- | ---------------- | ------------------------------------------------ |
| `about-main-gate.jpg` | 1120 × 680       | About page header (main gate or Senate building) |
| `admissions.jpg`      | 1080 × 760       | Admissions page header (new students)            |

## Leadership

Portraits, 920 × 1120 (or at least 480 × 580).

| File                 | Person                                              |
| -------------------- | --------------------------------------------------- |
| `vc.jpg`             | Vice-Chancellor (also used on the home page)        |
| `vc-speaking.jpg`    | Vice-Chancellor at the lectern (About Us menu card) |
| `dvc-academic.jpg`   | Deputy Vice-Chancellor (Academic)                   |
| `dvc-admin.jpg`      | Deputy Vice-Chancellor (Admin)                      |
| `registrar.jpg`      | Registrar                                           |
| `bursar.jpg`         | Bursar                                              |
| `librarian.jpg`      | University Librarian                                |
| `pro-chancellor.jpg` | Pro-Chancellor & Chairman of Council                |

Deans, 480 × 560: `dean-education.jpg`, `dean-science-education.jpg`, `dean-arts-social-science-education.jpg`, `dean-vocational-technical-education.jpg`, `dean-early-childhood-special-education.jpg`, `dean-postgraduate.jpg`.

## Faculties

If you replace a "Life on campus" photo with a different subject, update its `label` in `src/content/home.ts` too: it is the photo's description for screen readers.

All 800 × 380.

- `faculty-education.jpg`
- `faculty-science-education.jpg`
- `faculty-arts-social-science-education.jpg`
- `faculty-vocational-technical-education.jpg`
- `faculty-early-childhood-special-education.jpg`
- `faculty-postgraduate.jpg`

## News

Put news photos in `news/`, named after the story's `slug` in `src/content/news.ts`, at 1200 × 800. For example: `news/digital-transformation-portal-ecosystem.jpg`.

## Logo

Put the logo at `public/logo.svg` (preferred) or `public/logo.png`, not in this folder. It replaces the dashed "LOGO" circle everywhere.
