/**
 * Contact page: offices, map and form options.
 * PLACEHOLDER phone numbers and emails — replace with official details.
 */

import { site } from './site';

export const contact = {
  hero: {
    title: 'Get in touch',
    lead: 'Reach the right office quickly. Our teams respond to enquiries within two working days.',
  },

  offices: [
    {
      icon: 'admissions',
      name: 'Admissions Office',
      email: 'admissions@aksue.edu.ng',
      phone: '+234 800 000 0001',
    },
    {
      icon: 'registry',
      name: 'Registry',
      email: 'registrar@aksue.edu.ng',
      phone: '+234 800 000 0002',
    },
    { icon: 'bursary', name: 'Bursary', email: 'bursar@aksue.edu.ng', phone: '+234 800 000 0003' },
  ],

  form: {
    title: 'Send us a message',
    // Shown in the "Department / Office" dropdown.
    offices: [
      'Admissions Office',
      'Registry',
      'Bursary',
      'University Library',
      'ICT Directorate',
      'General enquiry',
    ],
    submitLabel: 'Send message',
    successMessage: 'Thank you — this is a demo, messages are not sent yet.',
  },

  /** Paste the Google Maps embed URL here to replace the placeholder. */
  mapEmbedUrl: '',

  details: [
    { icon: 'campus', label: 'Main campus', text: site.contact.address },
    { icon: 'hours', label: 'Office hours', text: site.contact.hoursLong },
    { icon: 'phone', label: 'Switchboard', text: site.contact.phone },
  ],
} as const;
