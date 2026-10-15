/**
 * University leadership. Names, qualifications, biographies and emails are PLACEHOLDERS —
 * replace with official details and add photos to public/images/.
 */

import { comingSoon } from '@/lib/links';

export const viceChancellor = {
  name: 'Prof. Philip Afaha',
  title: 'Vice-Chancellor',
  // PLACEHOLDER — add his qualifications and discipline.
  qualifications: 'Pioneer Vice-Chancellor · Appointed October 2026',
  // Appointment details as reported by the state government (5 October 2026). The rest of
  // the biography is a PLACEHOLDER.
  bio: 'Appointed pioneer Vice-Chancellor by Governor Umo Eno on 5 October 2026, when the Akwa Ibom State College of Education, Afaha Nsit, was upgraded to a university. [Add official biography.]',
  // `position` keeps him in frame when the landscape photo is cropped to a portrait.
  photo: {
    src: '/images/vc.jpg',
    label: 'Vice-Chancellor portrait',
    position: '38% 40%',
  },
  // Second photo (speaking at the lectern), cropped to start at his head. Used in the
  // About Us menu card; anchored to the top so wide crops keep his face.
  speakingPhoto: {
    src: '/images/vc-speaking.jpg',
    label: 'Vice-Chancellor speaking',
    position: '52% 0%',
  },
  messageHref: comingSoon("Vice-Chancellor's Message"),
  profileHref: comingSoon("Vice-Chancellor's Profile"),
  officeHref: comingSoon('Office of the Vice-Chancellor'),
};

export interface Officer {
  role: string;
  name: string;
  email: string;
  photo: { src: string; label: string };
}

/** Principal officers shown under the Vice-Chancellor on the About page. */
export const principalOfficers: Officer[] = [
  {
    role: 'Deputy Vice-Chancellor (Academic)',
    name: 'Prof. [Full Name]',
    email: 'dvc.academic@aksue.edu.ng',
    photo: { src: '/images/dvc-academic.jpg', label: 'Deputy Vice-Chancellor photo' },
  },
  {
    role: 'Deputy Vice-Chancellor (Admin)',
    name: 'Prof. [Full Name]',
    email: 'dvc.admin@aksue.edu.ng',
    photo: { src: '/images/dvc-admin.jpg', label: 'Deputy Vice-Chancellor photo' },
  },
  {
    role: 'Registrar',
    name: '[Title] [Full Name]',
    email: 'registrar@aksue.edu.ng',
    photo: { src: '/images/registrar.jpg', label: 'Registrar photo' },
  },
  {
    role: 'Bursar',
    name: '[Title] [Full Name]',
    email: 'bursar@aksue.edu.ng',
    photo: { src: '/images/bursar.jpg', label: 'Bursar photo' },
  },
  {
    role: 'University Librarian',
    name: 'Dr. [Full Name]',
    email: 'librarian@aksue.edu.ng',
    photo: { src: '/images/librarian.jpg', label: 'University Librarian photo' },
  },
];

export const proChancellor = {
  role: 'Pro-Chancellor & Chairman of Council',
  name: '[Title] [Full Name]',
  photo: { src: '/images/pro-chancellor.jpg', label: 'Pro-Chancellor portrait' },
};
