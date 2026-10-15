/**
 * All navigation: utility bar, main nav (with mega-menus), mobile menu and footer.
 * Items without a real page link to the generic coming-soon page via `comingSoon()`.
 */

import { comingSoon, portalHref } from '@/lib/links';
import { viceChancellor } from './leadership';
import { portals } from './portals';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  /** Shows a small "Soon" badge next to the label. */
  soon?: boolean;
}

export interface MegaColumn {
  heading: string;
  links: NavLink[];
}

export type MegaFeature =
  | {
      kind: 'message';
      eyebrow: string;
      title: string;
      imageLabel: string;
      imageSrc?: string;
      imagePosition?: string;
      cta: NavLink;
    }
  | {
      kind: 'search';
      eyebrow: string;
      title: string;
      text: string;
      placeholder: string;
    }
  | {
      kind: 'promo';
      badge: string;
      eyebrow: string;
      title: string;
      text: string;
      cta: NavLink;
    };

export interface MainNavItem {
  label: string;
  href: string;
  /** Route prefixes that mark this item as the current page. */
  match?: string[];
  mega?: {
    columns: MegaColumn[];
    feature: MegaFeature;
  };
  /** Shorter list shown in the mobile drawer accordion. */
  mobileLinks?: NavLink[];
}

export const utilityLinks: NavLink[] = [
  { label: 'Student Portal', href: portalHref('student') },
  { label: 'Staff Portal', href: portalHref('staff') },
  { label: 'e-Library', href: portalHref('e-library') },
  { label: 'Alumni', href: comingSoon('Alumni') },
  { label: 'Careers', href: comingSoon('Careers') },
];

/** Shown after the divider in the utility bar. */
export const utilityLinkEnd: NavLink = { label: 'Bursary', href: comingSoon('Bursary') };

export const mainNav: MainNavItem[] = [
  { label: 'Home', href: '/', match: ['/'] },
  {
    label: 'About Us',
    href: '/about/',
    match: ['/about'],
    mega: {
      columns: [
        {
          heading: 'The University',
          links: [
            {
              label: 'Overview',
              description: 'Who we are and what we stand for',
              href: '/about/#overview',
            },
            {
              label: 'History',
              description: 'From college to university',
              href: comingSoon('History'),
            },
            { label: 'Vision, Mission & Values', href: '/about/#vision-mission' },
            { label: 'Anthem & Symbols', href: comingSoon('Anthem & Symbols') },
            { label: 'Facts & Figures', href: comingSoon('Facts & Figures') },
          ],
        },
        {
          heading: 'Leadership',
          links: [
            { label: 'Vice-Chancellor', href: '/about/#management' },
            {
              label: 'Principal Officers',
              description: 'DVCs, Registrar, Bursar, Librarian',
              href: '/about/#principal-officers',
            },
            { label: 'Governing Council', href: '/about/#governing-council' },
            { label: 'Senate', href: comingSoon('Senate') },
            { label: 'Deans & Directors', href: comingSoon('Deans & Directors') },
          ],
        },
        {
          heading: 'Offices & Units',
          links: [
            { label: 'Registry', href: comingSoon('Registry') },
            { label: 'Bursary', href: comingSoon('Bursary') },
            { label: 'University Library', href: comingSoon('University Library') },
            { label: 'Academic Planning', href: comingSoon('Academic Planning') },
            { label: 'ICT Directorate', href: comingSoon('ICT Directorate') },
            { label: 'Works & Services', href: comingSoon('Works & Services') },
          ],
        },
      ],
      feature: {
        kind: 'message',
        eyebrow: 'From the VC',
        title: 'A message from the Vice-Chancellor',
        imageLabel: 'VC portrait',
        imageSrc: viceChancellor.speakingPhoto.src,
        imagePosition: viceChancellor.speakingPhoto.position,
        cta: { label: 'Read message', href: comingSoon("Vice-Chancellor's Message") },
      },
    },
    mobileLinks: [
      { label: 'Overview', href: '/about/#overview' },
      { label: 'Vision, Mission & Values', href: '/about/#vision-mission' },
      { label: 'University Management', href: '/about/#management' },
      { label: 'Governing Council', href: '/about/#governing-council' },
      { label: 'History', href: comingSoon('History') },
    ],
  },
  {
    label: 'Academics',
    href: '/academics/',
    match: ['/academics'],
    mega: {
      columns: [
        {
          heading: 'Faculties & Schools',
          links: [
            { label: 'Faculty of Education', href: '/academics/?faculty=education' },
            { label: 'Science Education', href: '/academics/?faculty=science-education' },
            {
              label: 'Arts & Social Science Education',
              href: '/academics/?faculty=arts-social-science-education',
            },
            {
              label: 'Vocational & Technical Education',
              href: '/academics/?faculty=vocational-technical-education',
            },
            {
              label: 'Early Childhood & Special Education',
              href: '/academics/?faculty=early-childhood-special-education',
            },
            { label: 'School of Postgraduate Studies', href: '/academics/?faculty=postgraduate' },
          ],
        },
        {
          heading: 'Programmes',
          links: [
            {
              label: 'Undergraduate',
              description: 'B.Ed & B.Sc (Ed) degrees',
              href: '/academics/#programmes',
            },
            {
              label: 'Postgraduate',
              description: 'PGDE, M.Ed, Ph.D',
              href: '/academics/?faculty=postgraduate',
            },
            {
              label: 'Sandwich / Part-time',
              description: 'For serving teachers',
              href: '/admissions/#routes',
            },
            { label: 'Distance Learning', href: comingSoon('Distance Learning'), soon: true },
          ],
        },
        {
          heading: 'Resources',
          links: [
            { label: 'Academic Calendar', href: comingSoon('Academic Calendar') },
            { label: 'Course Catalogue', href: comingSoon('Course Catalogue') },
            { label: 'Teaching Practice', href: comingSoon('Teaching Practice') },
            { label: 'e-Library', href: portalHref('e-library') },
            { label: 'Research & Centres', href: comingSoon('Research & Centres') },
          ],
        },
      ],
      feature: {
        kind: 'search',
        eyebrow: 'Find a programme',
        title: 'Search 40+ accredited programmes',
        text: 'Search by course, faculty or degree type.',
        placeholder: 'e.g. Mathematics Education',
      },
    },
    mobileLinks: [
      { label: 'Faculties & Departments', href: '/academics/' },
      { label: 'Undergraduate Programmes', href: '/academics/#programmes' },
      { label: 'Postgraduate School', href: '/academics/?faculty=postgraduate' },
      { label: 'Academic Calendar', href: comingSoon('Academic Calendar') },
      { label: 'e-Library', href: portalHref('e-library') },
    ],
  },
  {
    label: 'Admissions',
    href: '/admissions/',
    match: ['/admissions'],
    mega: {
      columns: [
        {
          heading: 'Apply',
          links: [
            {
              label: 'Undergraduate (UTME)',
              description: 'Four-year degree programmes',
              href: '/admissions/#routes',
            },
            {
              label: 'Direct Entry',
              description: 'Start at 200 level',
              href: '/admissions/#routes',
            },
            { label: 'Postgraduate', href: '/admissions/#routes' },
            { label: 'Sandwich / Part-time', href: '/admissions/#routes' },
            { label: 'International Applicants', href: comingSoon('International Applicants') },
          ],
        },
        {
          heading: 'Information',
          links: [
            { label: 'Entry Requirements', href: '/admissions/#requirements' },
            { label: 'Admission Lists', href: comingSoon('Admission Lists') },
            {
              label: 'Fees & Payments',
              description: 'Paid via Remita RRR only',
              href: portalHref('fee-payment'),
            },
            { label: 'Scholarships & Aid', href: comingSoon('Scholarships & Aid') },
            { label: 'FAQs', href: '/admissions/#faqs' },
          ],
        },
      ],
      feature: {
        kind: 'promo',
        badge: 'Coming soon',
        eyebrow: 'Admissions Portal',
        title: 'Apply online for 2026/2027',
        text: 'Applications, screening and admission letters — all in one secure portal.',
        cta: { label: 'Get notified', href: portalHref('admissions') },
      },
    },
    mobileLinks: [
      { label: 'Admission Routes', href: '/admissions/#routes' },
      { label: 'How to Apply', href: '/admissions/#how-to-apply' },
      { label: 'Entry Requirements', href: '/admissions/#requirements' },
      { label: 'Fees & Payments', href: portalHref('fee-payment') },
      { label: 'FAQs', href: '/admissions/#faqs' },
    ],
  },
  { label: 'Student Life', href: comingSoon('Student Life') },
  { label: 'News & Events', href: '/news/', match: ['/news'] },
  { label: 'Contact', href: '/contact/', match: ['/contact'] },
];

export const portalMenu = {
  heading: 'University Portals',
  items: portals.map((p) => ({
    label: p.title,
    description: p.short,
    href: portalHref(p.slug),
    icon: p.icon,
  })),
  help: { label: 'Portal help & support', href: '/contact/' },
};

export const applyLink: NavLink = { label: 'Apply for Admission', href: '/admissions/' };

export const footerColumns: MegaColumn[] = [
  {
    heading: 'University',
    links: [
      { label: 'About Us', href: '/about/' },
      { label: 'Leadership', href: '/about/#management' },
      { label: 'Governing Council', href: '/about/#governing-council' },
      { label: 'Faculties', href: '/academics/' },
      { label: 'Research', href: comingSoon('Research') },
      { label: 'Careers', href: comingSoon('Careers') },
    ],
  },
  {
    heading: 'Admissions',
    links: [
      { label: 'Undergraduate', href: '/admissions/#routes' },
      { label: 'Postgraduate', href: '/admissions/#routes' },
      { label: 'Sandwich / Part-time', href: '/admissions/#routes' },
      { label: 'Requirements', href: '/admissions/#requirements' },
      { label: 'Fees & Payments', href: portalHref('fee-payment') },
      { label: 'FAQs', href: '/admissions/#faqs' },
    ],
  },
  {
    heading: 'Portals',
    links: portals.map((p) => ({ label: p.title, href: portalHref(p.slug) })),
  },
];

export const legalLinks: NavLink[] = [
  { label: 'Privacy Policy', href: comingSoon('Privacy Policy') },
  { label: 'Terms of Use', href: comingSoon('Terms of Use') },
  { label: 'Accessibility', href: comingSoon('Accessibility Statement') },
  { label: 'Sitemap', href: comingSoon('Sitemap') },
];

/** Returns true when `pathname` belongs to a nav item. */
export function isActive(item: MainNavItem, pathname: string): boolean {
  const path = pathname.replace(/\/+$/, '') || '/';
  return (item.match ?? []).some((m) => (m === '/' ? path === '/' : path.startsWith(m)));
}
