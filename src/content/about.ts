/**
 * About page copy. Leadership names and photos are in leadership.ts.
 */

import { comingSoon } from '@/lib/links';
import { site } from './site';

export const about = {
  hero: {
    title: 'About the University',
    lead: 'A specialised state university committed to excellence in teacher education, research and service — preparing the next generation of educators for Nigeria and Africa.',
    // `label` is the placeholder caption and, once the photo exists, its alt text.
    image: {
      src: '/images/about-main-gate.jpg',
      label: 'University signage at the main entrance, Afaha Nsit',
    },
  },

  /** In-page tabs. `#…` links scroll to a section on this page. */
  tabs: [
    { label: 'Overview', href: '#overview' },
    { label: 'History', href: comingSoon('History') },
    { label: 'Vision & Mission', href: '#vision-mission' },
    { label: 'Management', href: '#management' },
    { label: 'Governing Council', href: '#governing-council' },
    { label: 'Principal Officers', href: '#principal-officers' },
    { label: 'Anthem & Symbols', href: comingSoon('Anthem & Symbols') },
  ],

  overview: {
    eyebrow: 'Our story',
    title: 'From college to a specialised university of education',
    paragraphs: [
      'Akwa Ibom State University of Education builds on a long tradition of teacher training in the state. Its establishment as a university marks a new chapter: degree-awarding status, expanded research capacity and a mandate to raise the quality of teaching across every level of education. In October 2026, Governor Umo Eno upgraded the Akwa Ibom State College of Education, Afaha Nsit, to a university and named Prof. Philip Afaha its pioneer Vice-Chancellor.',
      'Today the University offers undergraduate and postgraduate programmes across six faculties and schools, combining strong subject knowledge with pedagogy, supervised teaching practice and digital literacy.',
    ],
    // PLACEHOLDER — [Year] and [University motto] need official values.
    atAGlance: [
      { label: 'Established', value: '[Year]' },
      { label: 'Type', value: 'State university (specialised)' },
      { label: 'Location', value: site.contact.location },
      { label: 'Faculties & schools', value: '6' },
      { label: 'Accreditation', value: 'National Universities Commission' },
      { label: 'Motto', value: '[University motto]' },
    ],
  },

  values: {
    eyebrow: 'Who we are',
    title: 'Vision, mission & core values',
    items: [
      {
        icon: 'vision',
        title: 'Our Vision',
        text: 'To be a leading university of education in Africa, globally recognised for producing innovative and ethical educators.',
      },
      {
        icon: 'mission',
        title: 'Our Mission',
        text: 'To advance teaching and learning through quality teacher preparation, impactful research and community engagement.',
      },
      {
        icon: 'values',
        title: 'Core Values',
        text: 'Excellence · Integrity · Innovation · Discipline · Service · Inclusiveness',
      },
    ],
  },

  management: {
    eyebrow: 'Leadership',
    title: 'University Management',
    lead: 'The principal officers responsible for the academic and administrative direction of the University.',
    cta: { label: 'Principal officers', href: '#principal-officers' },
  },

  council: {
    eyebrow: 'Governance',
    title: 'Governing Council',
    lead: 'The Council is the highest policy-making body of the University, chaired by the Pro-Chancellor.',
    cta: { label: 'Meet the Council', href: comingSoon('Governing Council') },
    members:
      'Members include representatives of the State Government, Senate, Congregation and the University’s Principal Officers.',
  },
} as const;
