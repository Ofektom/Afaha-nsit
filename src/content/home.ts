/**
 * Home page copy. Lists (portals, faculties, news, events, figures) live in their own files.
 */

import { applyLink } from './navigation';
import { comingSoon, portalHref } from '@/lib/links';

export const home = {
  hero: {
    notice: {
      text: '2026/2027 Admissions opening soon — register your interest',
      mobileText: 'Admissions opening soon',
      href: portalHref('admissions'),
    },
    // Rendered as: "Shaping the teachers / who shape *Africa.*"
    titleLine1: 'Shaping the teachers',
    titleLine2: 'who shape',
    titleHighlight: 'Africa.',
    lead: 'A specialised university dedicated to world-class teacher education, research and community impact — raising educators for Akwa Ibom State, Nigeria and beyond.',
    mobileLead: 'World-class teacher education, research and community impact.',
    primaryCta: applyLink,
    secondaryCta: { label: 'Explore Programmes', href: '/academics/' },
    image: {
      src: '/images/hero.jpg',
      label: 'Hero · African students walking on campus (wide shot)',
    },
  },

  portals: {
    eyebrow: 'Digital campus',
    title: 'Everything you need, in one place',
    mobileTitle: 'Quick access',
    lead: 'Apply, register courses, check results and pay fees online. Our integrated portals are launching in phases.',
    cta: { label: 'All portals', href: comingSoon('All Portals') },
  },

  welcome: {
    eyebrow: 'Welcome from the Vice-Chancellor',
    mobileEyebrow: 'From the Vice-Chancellor',
    quote:
      'Every great nation is built in its classrooms. Our mission is to produce teachers who inspire, lead and transform communities.',
    mobileQuote: 'Every great nation is built in its classrooms.',
    body: 'Welcome to the Akwa Ibom State University of Education. As a specialised institution, we combine rigorous scholarship, practical teaching experience and modern digital tools to prepare graduates who are ready for the 21st-century classroom.',
    ctaLabel: 'Read full message',
  },

  faculties: {
    eyebrow: 'Academics',
    title: 'Faculties & Schools',
    lead: 'Choose from accredited programmes designed to meet NUC and TRCN standards for professional teachers.',
    cta: { label: 'Explore all departments', href: '/academics/' },
  },

  news: {
    eyebrow: 'Newsroom',
    title: 'News & upcoming events',
    mobileTitle: 'Latest news',
    cta: { label: 'All news', href: '/news/' },
    eventsHeading: 'Upcoming events',
  },

  campusLife: {
    eyebrow: 'Student life',
    title: 'Life on campus',
    lead: 'From sports and cultural festivals to student unions and community outreach — there is a place for everyone.',
    // The first photo is the large one. Each `label` is also the photo's description for
    // screen readers, so keep it accurate when swapping photos.
    images: [
      { src: '/images/campus-classroom.jpg', label: 'The Vice-Chancellor visiting a classroom' },
      { src: '/images/campus-ict-centre.jpg', label: 'The ICT Centre' },
      { src: '/images/campus-tour.jpg', label: 'Touring the campus grounds' },
      { src: '/images/campus-facility-visit.jpg', label: 'Inspecting campus facilities' },
      { src: '/images/campus-lecture-room.jpg', label: 'In a lecture room' },
    ],
  },

  cta: {
    // Line break on desktop goes between the two parts.
    titleLine1: 'Begin your journey to becoming',
    titleLine2: 'an exceptional educator.',
    text: 'Admission requirements, programmes and key dates — all in one place.',
    primary: { label: 'Admission requirements', href: '/admissions/#requirements' },
    secondary: { label: 'Contact admissions', href: '/contact/' },
  },
};
