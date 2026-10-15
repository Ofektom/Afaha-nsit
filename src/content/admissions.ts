/**
 * Admissions page copy: routes, steps, requirements, key dates and FAQs.
 * Dates are SAMPLE — replace with the official admissions calendar.
 */

import { comingSoon, portalHref } from '@/lib/links';

export const admissions = {
  hero: {
    titleLine1: 'Start your journey as a',
    titleLine2: 'professional educator.',
    lead: 'Everything you need to apply — programmes, requirements, key dates and fees for the 2026/2027 academic session.',
    primaryCta: { label: 'Start application', href: portalHref('admissions') },
    secondaryCta: { label: 'Download brochure', href: comingSoon('Admissions Brochure') },
    image: { src: '/images/admissions.jpg', label: 'Admissions · smiling new students' },
  },

  notice: {
    text: 'The online Admissions Portal is launching soon. Until then, follow official announcements on this page.',
    badge: 'Portal coming soon',
  },

  routes: {
    eyebrow: 'Ways to study',
    title: 'Choose your admission route',
    linkLabel: 'Requirements',
    items: [
      {
        icon: 'undergraduate',
        title: 'Undergraduate (UTME)',
        text: 'Four-year B.Ed / B.Sc (Ed) degrees for candidates with a valid JAMB UTME score.',
      },
      {
        icon: 'direct-entry',
        title: 'Direct Entry',
        text: 'Enter at 200 level with NCE, OND, IJMB or A-Level qualifications.',
      },
      {
        icon: 'postgraduate',
        title: 'Postgraduate',
        text: 'PGDE, M.Ed and Ph.D programmes through the School of Postgraduate Studies.',
      },
      {
        icon: 'part-time',
        title: 'Sandwich / Part-time',
        text: 'Flexible holiday programmes designed for serving teachers.',
      },
    ],
  },

  steps: {
    eyebrow: 'How to apply',
    title: 'Five simple steps',
    lead: 'Once the portal is live, the full process will be completed online — no queues, no paper forms.',
    items: [
      {
        title: 'Choose a programme',
        text: 'Select your course and confirm you meet the entry requirements.',
      },
      {
        title: 'Create an account',
        text: 'Register on the Admissions Portal with your JAMB registration number.',
      },
      {
        title: 'Pay application fee',
        text: 'Generate a Remita RRR and pay online or at any bank.',
      },
      {
        title: 'Complete & upload',
        text: 'Fill the form and upload O’Level, UTME and other documents.',
      },
      {
        title: 'Track & accept',
        text: 'Monitor screening status and download your admission letter.',
      },
    ],
  },

  requirements: {
    eyebrow: 'Requirements',
    title: 'General entry requirements',
    items: [
      'Five (5) O’Level credits in WAEC, NECO or NABTEB, including English Language and Mathematics, in not more than two sittings.',
      'Minimum UTME score as approved by JAMB and the University Senate for the session.',
      'Choice of Akwa Ibom State University of Education as first or second choice on JAMB CAPS.',
      'Successful completion of the University’s post-UTME screening exercise.',
      'Direct Entry: NCE (merit), OND (upper credit), A-Level or IJMB passes in relevant subjects.',
    ],
  },

  // SAMPLE — replace with the official admissions calendar.
  keyDates: {
    heading: 'Key dates · 2026/2027',
    items: [
      { date: 'Nov 2026', event: 'Portal opens for applications' },
      { date: 'Jan 2027', event: 'Post-UTME screening' },
      { date: 'Feb 2027', event: 'First admission list' },
      { date: 'Mar 2027', event: 'Registration & matriculation' },
    ],
    feeNotice:
      'Fees are paid only via Remita RRR. The University will never ask you to pay into a personal account.',
  },

  faqs: {
    eyebrow: 'FAQs',
    title: 'Questions applicants ask',
    cta: { label: 'Contact Admissions Office', href: '/contact/' },
    items: [
      {
        question: 'When does the online application open?',
        answer:
          'Applications open once the Admissions Portal goes live. Dates will be announced here and on our official social media channels.',
      },
      {
        question: 'Can I apply if the University was my second choice on JAMB?',
        answer:
          'Yes. Candidates who chose the University as first or second choice on JAMB CAPS can apply, provided they meet the cut-off mark and entry requirements for their programme.',
      },
      {
        question: 'How do I pay the application fee?',
        answer:
          'The fee is paid only through Remita. Generate a Remita Retrieval Reference (RRR) on the portal, then pay online with a card or at any commercial bank. Never pay into a personal account.',
      },
      {
        question: 'Is there accommodation for first-year students?',
        answer:
          'Hostel spaces are limited and allocated on a first-come, first-served basis after registration. Details will be published with the first admission list.',
      },
    ],
  },
} as const;
