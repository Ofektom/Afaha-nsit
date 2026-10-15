/**
 * Site-wide settings and contact details.
 * Edit this file to change the university name, contact info, figures or the demo banner.
 */

import { comingSoon } from '@/lib/links';

export const site = {
  name: 'Akwa Ibom State University of Education',
  shortName: 'AKSUE',
  nameLine1: 'Akwa Ibom State',
  nameLine2: 'University of Education',
  tagline:
    'Raising competent, ethical and innovative educators for Akwa Ibom State, Nigeria and the world.',
  description:
    'A specialised university dedicated to world-class teacher education, research and community impact — raising educators for Akwa Ibom State, Nigeria and beyond.',
  // Used for canonical URLs, Open Graph and the sitemap. Replace with the live domain.
  url: 'https://aksue.edu.ng',

  /** Slim dismissible bar at the very top of every page. Set to false to hide it. */
  showDemoBanner: true,
  demoBannerText: 'Demo preview — content and figures are illustrative.',

  // PLACEHOLDER — replace with official contact details.
  contact: {
    phone: '+234 800 000 0000',
    email: 'info@aksue.edu.ng',
    location: 'Akwa Ibom State, Nigeria',
    campus: 'Main Campus, Akwa Ibom State',
    address: '[Full campus address], Akwa Ibom State, Nigeria',
    hours: 'Mon – Fri · 8:00 AM – 4:00 PM',
    hoursLong: 'Monday – Friday · 8:00 AM – 4:00 PM',
  },

  // PLACEHOLDER — replace with the official social media URLs.
  social: [
    { name: 'Facebook', icon: 'facebook', href: comingSoon('Facebook page') },
    { name: 'X (Twitter)', icon: 'x', href: comingSoon('X (Twitter) page') },
    { name: 'LinkedIn', icon: 'linkedin', href: comingSoon('LinkedIn page') },
    { name: 'YouTube', icon: 'youtube', href: comingSoon('YouTube channel') },
  ],

  // SAMPLE — replace with official figures.
  // `onMobile: false` hides a figure on phones, where the strip has room for three.
  stats: [
    {
      value: 6,
      suffix: '',
      label: 'Faculties & Schools',
      mobileLabel: 'Faculties',
      onMobile: true,
    },
    {
      value: 40,
      suffix: '+',
      label: 'Degree programmes',
      mobileLabel: 'Programmes',
      onMobile: true,
    },
    {
      value: 12000,
      suffix: '+',
      label: 'Students & alumni',
      mobileLabel: 'Students',
      onMobile: false,
    },
    { value: 350, suffix: '+', label: 'Academic staff', mobileLabel: 'Lecturers', onMobile: true },
  ],

  copyrightYear: 2026,
} as const;

export type SocialIcon = (typeof site.social)[number]['icon'];
