# Addendum v2: blue palette, extra pages and portal demo

> **How to use:** Replace the old `design/` folder in your project with the one from `AKSUE-Design-Package-v2.zip`. Then paste everything below the line into the **same** Claude Code session (or a new one in the same project).

---

The design pack in `design/` has been updated. Read this whole message, then open every PNG in `design/png/` before changing code. As before, `design/html/` holds the exact CSS values and copy for each screen; the PNG wins if the two disagree.

## 1. Primary colour change (do this first)

The primary colour is now **blue #0B6FA4**, replacing green. Orange #F37021 stays as the accent. Update the Tailwind tokens and rename `green*` to `primary*` everywhere:

```
primary       #0B6FA4   (was #0B4D3B)
primary-dark  #06324D   (was #062E23)  heroes, footer, dark sections, portal sidebar
primary-soft  #E6F1F8   (was #E6F0EC)
ink           #12212C   muted #5A6B78   line #DAE3EA   app-bg #F2F5F8
on-dark text  #D6E5EF / #BED3E2 / #A6C2D6   dark card #0A4366   dark divider #1A4766
image placeholder gradient  #D4E5F0 → #A8C8DD → #8BB4CF
```

**Search the codebase for every old green hex** (`#0B4D3B`, `#062E23`, `#E6F0EC`, `#0D4234`, `#13614B`, `#1E4A3D`, `#BFD3CA`, `#A9C3B8`, `#D7E4DE`) **and for `rgba(6,46,35` / `rgba(11,77,59`**, and replace each one. No hard-coded colour may remain outside the token file. Re-screenshot pages 01–13 and compare them with the new PNGs.

**Status colours stay separate from brand colours:** success `#1F7A4D` on `#E3F4EA`, warning `#A8420B` on `#FDEBDD`, error `#B42318` on `#FDECEA`. Status pills always show an icon next to the label, so status never relies on colour alone.

## 2. New website pages (14–19)

| PNG | Route | Notes |
|---|---|---|
| 14 VC profile | `/about/leadership/vice-chancellor` | Make it a **template** `/about/leadership/[slug]` for all principal officers, driven by `leadership.ts` |
| 15 Department detail | `/academics/[faculty]/[department]` | Tabs = in-page anchors; courses table from data; staff grid |
| 16 News article | `/news/[slug]` | Replaces the undesigned article page; sticky "In this article" nav; related news |
| 17 Notices & calendar | `/notices` | Calendar list + mini month view, official notices with PDF links, vacancies sidebar. Add "Notices & Calendar" to the News & Events nav and footer |
| 18 Student life | `/student-life` | Overlapping category cards, accommodation, SUG leaders, gallery grid, events |
| 19 Search overlay | (component) | Grouped results with highlighted match, filter chips, keyboard hints; searches a static index built from the content files |

Point the existing dropdown and coming-soon links at these routes where they now exist.

## 3. Portal demo (20–35)

These screens show management exactly what Modules 2–4 of our proposal deliver. Build them as a **front-end-only, clickable demo** under `/portal`. There is **no real authentication, database, Remita call or email**: all data comes from typed mock files in `src/demo/`.

- A persistent **"DEMO DATA"** pill in the portal top bar (already in the designs). Never remove it.
- The sign-in page (20) has role tabs. Add a small "Demo: sign in as…" chooser under the form that logs straight into each role, so whoever presents can switch roles in one click in front of management.
- Keep the current role in `localStorage` (wrapped in try/catch) so a refresh doesn't log you out.

### Shared portal shell
Build it from screens 21–31: 264px dark sidebar with role-specific navigation (orange active bar and count badges), 72px top bar (search, DEMO DATA pill, session selector, notifications, user menu), `app-bg` content area. Build reusable `KpiCard`, `StatusPill`, `DataTable`, `Stepper`, `Timeline`, `BarChart` and `LineChart` components. Charts are hand-built SVG, single series in primary, with one orange bar or point for emphasis. Bar and line charts need hover tooltips.

| PNG | Route | Role | Proposal line item |
|---|---|---|---|
| 20 Login | `/portal/login` | all | Single identity / role-based access |
| 21 Application form | `/portal/applicant/apply` | Applicant | 2.1 Application engine, dynamic forms. The 6-step wizard **works**: steps navigate, O'Level grades are editable, and the eligibility check updates live |
| 22 Applicant dashboard | `/portal/applicant` | Applicant | Applicant tracking, document vault, automated communication |
| 23 Registry review | `/portal/registry/applications` | Admissions Officer | 2.3 Registry evaluation dashboard. Clicking a row opens the side panel; Approve and Request correction update the row status in local state |
| 24 Student dashboard | `/portal/student` | Student | 3.3 Student dashboards |
| 25 Course registration | `/portal/student/registration` | Student | 3.1 Carry-over enforcement. **The rules must really run in the demo:** carry-over rows are locked on, GCE 309 is blocked until GCE 205 is passed, the unit meter updates on every tick, and submitting is disabled outside 15–24 units |
| 26 Results | `/portal/student/results` | Student | 3.3 Transcript and GPA/CGPA. Compute GPA from the mock grades; never hard-code it |
| 27 Grade entry | `/portal/staff/grades/[course]` | Exams Officer | 3.2 Grading panels. Typing CA or Exam recalculates total and grade live; rows with missing scores are flagged; the distribution chart updates |
| 28 Oversight | `/portal/executive` | VC / Registrar | 3.2 Read-only audit module. Show the "Read-only" badge and render no edit controls |
| 29 Fees & payments | `/portal/student/fees` | Student | 4.1 Remita and RRR. "Pay" opens a mock checkout modal, then a success state, then a link to the receipt (33) |
| 30 Fee configuration | `/portal/bursary/fees` | Bursar | 4.2 Tariff configuration. Editing an amount marks the row as changed and updates the total and the draft banner |
| 31 Reconciliation | `/portal/bursary/reconciliation` | Accountant | 4.2 Accountant dashboards, 4.3 Reconciliation. Read-only |
| 32 Admission letter | `/portal/applicant/documents/admission-letter` | Applicant | 2.2 PDF generation and secure download. Print-ready A4 layout (`@media print`) |
| 33 Receipt | `/portal/student/receipts/[id]` | Student | 4.3 Automated receipts. Print-ready |
| 34–35 Mobile | same routes | Student | Below 1024px the sidebar becomes the bottom tab bar shown |

Mock data must stay **internally consistent**: Idara Etim's failed GCE 205 appears as F in her results, as a locked carry-over in registration, and as the reason GCE 309 is blocked. Her CGPA is 4.20 everywhere, the ₦85,500 invoice equals the sum of its line items, and the RRR shown matches on screens 29, 31, 33 and 35. A management audience will notice mismatched numbers.

Use the QR codes on documents as decorative SVGs only. They must not encode a working URL.

## 4. Website ↔ portal links
- Header "Portals" dropdown items and homepage portal cards now go to `/portal/login?role=…`. **Keep** the "Coming soon" badges on the public website, since the portals aren't procured yet. Put a "Preview demo" link on the coming-soon page (05) that opens the portal demo.
- Add `robots: noindex` to everything under `/portal`.

## 5. Order and verification

Work in this order and stop after each phase to show me screenshots:
1. Colour migration plus re-verification of 01–13.
2. Pages 14–19.
3. Portal shell, login (20) and the student journey (24 → 25 → 26 → 29 → 33).
4. Admissions journey (21 → 22 → 32) and registry (23).
5. Staff and finance (27, 28, 30, 31) and mobile (34–35).

Extend `scripts/screenshot.ts` to cover every new route and compare each screenshot side by side with its PNG, as before. Update `CHANGES_NEEDED.md` and the README with a "How to present the demo" section: which role to open, in which order, and what to click.
