/**
 * Online portals and the digital-campus roadmap. Each portal has a "coming soon" page at
 * /portals/<slug>/. When a portal goes live, point its links at the real URL instead.
 */

import type { LucideIcon } from 'lucide-react';
import { BookOpen, CreditCard, GraduationCap, Library, Users } from 'lucide-react';
import { comingSoon } from '@/lib/links';

export type PortalSlug = 'admissions' | 'student' | 'fee-payment' | 'staff' | 'e-library';

interface Link {
  label: string;
  href: string;
}

export interface Portal {
  slug: PortalSlug;
  title: string;
  /** Short line used in the Portals dropdown. */
  short: string;
  /** Longer line used on portal cards. */
  description: string;
  icon: LucideIcon;
  /** Roadmap phase this portal launches in (see `roadmap` below). */
  phase: number;
  /** Shown on the home page "Everything you need" cards. */
  featuredOnHome: boolean;
  /** Coming-soon page. */
  page: {
    /** Rendered as "<headline> / is coming soon." */
    headline: string;
    lead: string;
    help: { title: string; text: string; primary: Link; secondary: Link };
  };
}

/** Phases of the digital-campus programme. Update `currentPhase` as work progresses. */
export const roadmap = {
  currentPhase: 2,
  phases: [
    { phase: 1, title: 'Official Website' },
    { phase: 2, title: 'Admissions Portal' },
    { phase: 3, title: 'Course Registration & Results' },
    { phase: 4, title: 'Fee Payment & e-Library' },
  ],
};

export type PhaseStatus = 'Live' | 'In development' | 'Planned';

export function phaseStatus(phase: number): PhaseStatus {
  if (phase < roadmap.currentPhase) return 'Live';
  if (phase === roadmap.currentPhase) return 'In development';
  return 'Planned';
}

const OFFICE_HOURS = 'Monday – Friday, 8:00 AM – 4:00 PM';

export const portals: Portal[] = [
  {
    slug: 'admissions',
    title: 'Admissions Portal',
    short: 'Apply & track admission',
    description: 'Apply online, upload O’Level & UTME details and track your admission status.',
    icon: GraduationCap,
    phase: 2,
    featuredOnHome: true,
    page: {
      headline: 'The Admissions Portal',
      lead: 'We are building a secure online platform for applications, screening and admission letters. Leave your email and we will notify you the moment it goes live.',
      help: {
        title: 'Need help with admissions today?',
        text: `Our Admissions Office is open ${OFFICE_HOURS}.`,
        primary: { label: 'Contact Admissions', href: '/contact/' },
        secondary: { label: 'Read requirements', href: '/admissions/#requirements' },
      },
    },
  },
  {
    slug: 'student',
    title: 'Student Portal',
    short: 'Courses, results, transcripts',
    description: 'Course registration, carry-over tracking, results and transcripts.',
    icon: BookOpen,
    phase: 3,
    featuredOnHome: true,
    page: {
      headline: 'The Student Portal',
      lead: 'One place for course registration, carry-over tracking, results and transcripts. Leave your email and we will notify you the moment it goes live.',
      help: {
        title: 'Need help with registration today?',
        text: `The Registry is open ${OFFICE_HOURS}.`,
        primary: { label: 'Contact the Registry', href: '/contact/' },
        secondary: { label: 'Academic calendar', href: comingSoon('Academic Calendar') },
      },
    },
  },
  {
    slug: 'fee-payment',
    title: 'Fee Payment',
    short: 'Remita RRR payments',
    description: 'Pay school fees securely via Remita RRR — online or at any bank.',
    icon: CreditCard,
    phase: 4,
    featuredOnHome: true,
    page: {
      headline: 'Online Fee Payment',
      lead: 'Generate your Remita RRR, pay school fees securely and download receipts — all online. Leave your email and we will notify you the moment it goes live.',
      help: {
        title: 'Need help with fees today?',
        text: `The Bursary is open ${OFFICE_HOURS}. Fees are paid only via Remita RRR.`,
        primary: { label: 'Contact the Bursary', href: '/contact/' },
        secondary: { label: 'Key dates', href: '/admissions/#key-dates' },
      },
    },
  },
  {
    slug: 'staff',
    title: 'Staff Portal',
    short: 'Results upload & records',
    description: 'Result upload, academic records and administrative workflows.',
    icon: Users,
    phase: 3,
    featuredOnHome: true,
    page: {
      headline: 'The Staff Portal',
      lead: 'Result upload, academic records and administrative workflows for academic and non-teaching staff. Leave your email and we will notify you the moment it goes live.',
      help: {
        title: 'Need help today?',
        text: `The ICT Directorate is open ${OFFICE_HOURS}.`,
        primary: { label: 'Contact us', href: '/contact/' },
        secondary: { label: 'ICT Directorate', href: comingSoon('ICT Directorate') },
      },
    },
  },
  {
    slug: 'e-library',
    title: 'e-Library',
    short: 'Journals & e-books',
    description: 'Access journals, e-books and research databases from anywhere.',
    icon: Library,
    phase: 4,
    featuredOnHome: false,
    page: {
      headline: 'The e-Library',
      lead: 'Journals, e-books and research databases for students and staff — on and off campus. Leave your email and we will notify you the moment it goes live.',
      help: {
        title: 'Need library help today?',
        text: `The University Library is open ${OFFICE_HOURS}.`,
        primary: { label: 'Contact the Library', href: '/contact/' },
        secondary: { label: 'Library services', href: comingSoon('University Library') },
      },
    },
  },
];

export function getPortal(slug: string): Portal | undefined {
  return portals.find((p) => p.slug === slug);
}
