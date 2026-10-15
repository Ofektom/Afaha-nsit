/**
 * Faculties, schools, departments and programmes.
 * Used by the home page "Faculties & Schools" grid, the Academics page and site search.
 *
 * PLACEHOLDERS: names stay as "[Full Name]". Department lists (other than the Faculty of
 * Education), programme lists, student numbers and accreditation statuses are SAMPLE data —
 * confirm every item with the University before launch.
 */

import { comingSoon } from '@/lib/links';

export type FacultySlug =
  | 'education'
  | 'science-education'
  | 'arts-social-science-education'
  | 'vocational-technical-education'
  | 'early-childhood-special-education'
  | 'postgraduate';

export interface Department {
  name: string;
  description: string;
  /** Degrees awarded, e.g. ["B.Ed", "M.Ed"]. */
  degrees: string[];
  /** Shown in full, e.g. "HOD: Dr. [Full Name]". */
  hod: string;
}

export type Accreditation = 'Full' | 'Interim';

export interface Programme {
  name: string;
  degree: string;
  duration: string;
  entry: string;
  accreditation: Accreditation;
}

export interface Faculty {
  slug: FacultySlug;
  /** Full name, e.g. "Faculty of Education". */
  name: string;
  /** Short name for tabs and compact lists. */
  shortName: string;
  kind: 'Faculty' | 'School';
  description: string;
  /** One line listing a few departments, shown on the home page cards. */
  highlights: string;
  // SAMPLE — replace with official figures.
  stats: { programmes: number; students: string };
  dean: { title: string; name: string; email: string; photo: string };
  /** For the postgraduate school these are programme areas rather than departments. */
  departments: Department[];
  programmesHeading: string;
  programmes: Programme[];
  image: { src: string; label: string };
}

const HOD = 'HOD: Dr. [Full Name]';
const FOUR_YEARS = '4 years';
const UTME_DE = 'UTME / Direct Entry';

/** Undergraduate B.Ed programme row with the most common values. */
const bed = (
  name: string,
  accreditation: Accreditation = 'Full',
  entry = UTME_DE,
  degree = 'B.Ed',
): Programme => ({
  name: `${degree} ${name}`,
  degree,
  duration: FOUR_YEARS,
  entry,
  accreditation,
});

export const faculties: Faculty[] = [
  {
    slug: 'education',
    name: 'Faculty of Education',
    shortName: 'Education',
    kind: 'Faculty',
    description:
      'The foundation of the University — preparing professional teachers, counsellors and education managers through theory, research and supervised teaching practice.',
    highlights: 'Educational Foundations · Guidance & Counselling · Educational Management',
    stats: { programmes: 11, students: '2,400+' },
    dean: {
      title: 'Dean of Faculty',
      name: 'Prof. [Full Name]',
      email: 'dean.education@aksue.edu.ng',
      photo: '/images/dean-education.jpg',
    },
    departments: [
      {
        name: 'Department of Educational Foundations',
        description: 'Philosophy, sociology and history of education.',
        degrees: ['B.Ed', 'PGDE', 'M.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Curriculum Studies & Instruction',
        description: 'Curriculum design, instructional methods and educational technology.',
        degrees: ['B.Ed', 'M.Ed', 'Ph.D'],
        hod: HOD,
      },
      {
        name: 'Department of Guidance & Counselling',
        description: 'Training school counsellors and student-support professionals.',
        degrees: ['B.Ed', 'M.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Educational Management & Planning',
        description: 'Leadership, policy and administration of educational institutions.',
        degrees: ['B.Ed', 'M.Ed', 'Ph.D'],
        hod: HOD,
      },
      {
        name: 'Department of Educational Psychology',
        description: 'Learning, development, measurement and evaluation.',
        degrees: ['B.Ed', 'M.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Adult & Non-Formal Education',
        description: 'Community, continuing and lifelong learning programmes.',
        degrees: ['B.Ed'],
        hod: HOD,
      },
    ],
    programmesHeading: 'Undergraduate programmes in this faculty',
    programmes: [
      bed('Educational Management'),
      bed('Guidance & Counselling'),
      bed('Educational Foundations'),
      bed('Adult & Non-Formal Education', 'Interim'),
      bed('Educational Technology', 'Interim', 'UTME'),
    ],
    image: { src: '/images/faculty-education.jpg', label: 'Education · classroom photo' },
  },
  {
    slug: 'science-education',
    name: 'Faculty of Science Education',
    shortName: 'Science Education',
    kind: 'Faculty',
    description:
      'Training science, mathematics and computing teachers who combine deep subject knowledge with practical, laboratory-based teaching.',
    highlights: 'Biology · Chemistry · Physics · Mathematics · Computer Science Education',
    stats: { programmes: 8, students: '1,900+' },
    dean: {
      title: 'Dean of Faculty',
      name: 'Prof. [Full Name]',
      email: 'dean.science@aksue.edu.ng',
      photo: '/images/dean-science-education.jpg',
    },
    departments: [
      {
        name: 'Department of Biology Education',
        description: 'Life sciences, ecology and laboratory practice for secondary teaching.',
        degrees: ['B.Sc (Ed)', 'M.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Chemistry Education',
        description: 'Chemistry content, safe laboratory practice and science pedagogy.',
        degrees: ['B.Sc (Ed)', 'M.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Physics Education',
        description: 'Physics concepts, experimentation and problem-based teaching.',
        degrees: ['B.Sc (Ed)'],
        hod: HOD,
      },
      {
        name: 'Department of Mathematics Education',
        description: 'Mathematics content and methods for primary and secondary classrooms.',
        degrees: ['B.Sc (Ed)', 'M.Ed', 'Ph.D'],
        hod: HOD,
      },
      {
        name: 'Department of Computer Science Education',
        description: 'Programming, digital literacy and ICT integration in teaching.',
        degrees: ['B.Sc (Ed)'],
        hod: HOD,
      },
      {
        name: 'Department of Integrated Science Education',
        description: 'Basic science and technology for junior secondary schools.',
        degrees: ['B.Sc (Ed)'],
        hod: HOD,
      },
    ],
    programmesHeading: 'Undergraduate programmes in this faculty',
    programmes: [
      bed('Biology Education', 'Full', UTME_DE, 'B.Sc (Ed)'),
      bed('Chemistry Education', 'Full', UTME_DE, 'B.Sc (Ed)'),
      bed('Physics Education', 'Full', UTME_DE, 'B.Sc (Ed)'),
      bed('Mathematics Education', 'Full', UTME_DE, 'B.Sc (Ed)'),
      bed('Computer Science Education', 'Interim', 'UTME', 'B.Sc (Ed)'),
      bed('Integrated Science Education', 'Interim', UTME_DE, 'B.Sc (Ed)'),
    ],
    image: {
      src: '/images/faculty-science-education.jpg',
      label: 'Science Education · classroom photo',
    },
  },
  {
    slug: 'arts-social-science-education',
    name: 'Faculty of Arts & Social Science Education',
    shortName: 'Arts & Social Science Ed.',
    kind: 'Faculty',
    description:
      'Preparing teachers of languages, humanities and the social sciences to build literate, informed and engaged citizens.',
    highlights: 'English · History · Economics · Political Science · Religious Studies Education',
    stats: { programmes: 9, students: '2,100+' },
    dean: {
      title: 'Dean of Faculty',
      name: 'Prof. [Full Name]',
      email: 'dean.arts@aksue.edu.ng',
      photo: '/images/dean-arts-social-science-education.jpg',
    },
    departments: [
      {
        name: 'Department of English Education',
        description: 'Language, literature and the teaching of English as a second language.',
        degrees: ['B.Ed', 'M.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of History Education',
        description: 'Nigerian, African and world history for the classroom.',
        degrees: ['B.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Economics Education',
        description: 'Economic principles, development and financial literacy.',
        degrees: ['B.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Political Science Education',
        description: 'Government, civic education and public policy.',
        degrees: ['B.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Religious Studies Education',
        description: 'Christian and Islamic religious studies and moral education.',
        degrees: ['B.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Geography Education',
        description: 'Physical and human geography, fieldwork and mapping.',
        degrees: ['B.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Social Studies Education',
        description: 'Citizenship, culture and society for basic education.',
        degrees: ['B.Ed', 'M.Ed'],
        hod: HOD,
      },
    ],
    programmesHeading: 'Undergraduate programmes in this faculty',
    programmes: [
      bed('English Education'),
      bed('History Education'),
      bed('Economics Education'),
      bed('Political Science Education', 'Interim'),
      bed('Religious Studies Education'),
      bed('Geography Education', 'Interim'),
      bed('Social Studies Education'),
    ],
    image: {
      src: '/images/faculty-arts-social-science-education.jpg',
      label: 'Arts & Social Science Education · classroom photo',
    },
  },
  {
    slug: 'vocational-technical-education',
    name: 'Faculty of Vocational & Technical Education',
    shortName: 'Vocational & Technical Ed.',
    kind: 'Faculty',
    description:
      'Developing teachers and instructors for business, agriculture, home economics and technical subjects, with a strong focus on hands-on skills.',
    highlights: 'Business · Agricultural · Home Economics · Technical Education',
    stats: { programmes: 6, students: '1,300+' },
    dean: {
      title: 'Dean of Faculty',
      name: 'Prof. [Full Name]',
      email: 'dean.vocational@aksue.edu.ng',
      photo: '/images/dean-vocational-technical-education.jpg',
    },
    departments: [
      {
        name: 'Department of Business Education',
        description: 'Accounting, office technology and entrepreneurship teaching.',
        degrees: ['B.Ed', 'M.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Agricultural Education',
        description: 'Crop and animal production, agribusiness and school farms.',
        degrees: ['B.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Home Economics Education',
        description: 'Food and nutrition, clothing and textiles, and family studies.',
        degrees: ['B.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Technical Education',
        description: 'Building, electrical, metalwork and woodwork technology.',
        degrees: ['B.Ed'],
        hod: HOD,
      },
    ],
    programmesHeading: 'Undergraduate programmes in this faculty',
    programmes: [
      bed('Business Education'),
      bed('Agricultural Education'),
      bed('Home Economics Education'),
      bed('Technical Education (Building)', 'Interim'),
      bed('Technical Education (Electrical/Electronics)', 'Interim'),
    ],
    image: {
      src: '/images/faculty-vocational-technical-education.jpg',
      label: 'Vocational & Technical Education · classroom photo',
    },
  },
  {
    slug: 'early-childhood-special-education',
    name: 'Faculty of Early Childhood & Special Education',
    shortName: 'Early Childhood & Special Ed.',
    kind: 'Faculty',
    description:
      'Equipping teachers for the early years, primary schools and learners with special needs — building strong, inclusive foundations for every child.',
    highlights: 'Early Childhood · Primary Education · Special Needs Education',
    stats: { programmes: 4, students: '900+' },
    dean: {
      title: 'Dean of Faculty',
      name: 'Prof. [Full Name]',
      email: 'dean.ecse@aksue.edu.ng',
      photo: '/images/dean-early-childhood-special-education.jpg',
    },
    departments: [
      {
        name: 'Department of Early Childhood Education',
        description: 'Child development, play-based learning and nursery education.',
        degrees: ['B.Ed', 'M.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Primary Education',
        description: 'Literacy, numeracy and classroom practice for primary schools.',
        degrees: ['B.Ed'],
        hod: HOD,
      },
      {
        name: 'Department of Special Needs Education',
        description: 'Inclusive teaching for learners with disabilities and learning differences.',
        degrees: ['B.Ed', 'M.Ed'],
        hod: HOD,
      },
    ],
    programmesHeading: 'Undergraduate programmes in this faculty',
    programmes: [
      bed('Early Childhood Education'),
      bed('Primary Education'),
      bed('Special Needs Education', 'Interim'),
    ],
    image: {
      src: '/images/faculty-early-childhood-special-education.jpg',
      label: 'Early Childhood & Special Education · classroom photo',
    },
  },
  {
    slug: 'postgraduate',
    name: 'School of Postgraduate Studies',
    shortName: 'Postgraduate School',
    kind: 'School',
    description:
      'Advanced study and research for graduates and serving teachers — from professional diplomas to master’s and doctoral degrees across all faculties.',
    highlights: 'PGDE · M.Ed · Ph.D programmes across all faculties',
    stats: { programmes: 12, students: '600+' },
    dean: {
      title: 'Dean of School',
      name: 'Prof. [Full Name]',
      email: 'dean.spgs@aksue.edu.ng',
      photo: '/images/dean-postgraduate.jpg',
    },
    departments: [
      {
        name: 'Postgraduate Diploma in Education (PGDE)',
        description: 'Professional teaching qualification for graduates of other disciplines.',
        degrees: ['PGDE'],
        hod: 'Coordinator: Dr. [Full Name]',
      },
      {
        name: 'Master of Education (M.Ed)',
        description: 'Specialised master’s degrees offered through each faculty.',
        degrees: ['M.Ed'],
        hod: 'Coordinator: Dr. [Full Name]',
      },
      {
        name: 'Doctor of Philosophy (Ph.D)',
        description: 'Doctoral research in education and subject pedagogy.',
        degrees: ['Ph.D'],
        hod: 'Coordinator: Prof. [Full Name]',
      },
    ],
    programmesHeading: 'Postgraduate programmes in this school',
    programmes: [
      {
        name: 'Postgraduate Diploma in Education',
        degree: 'PGDE',
        duration: '1 year',
        entry: 'First degree',
        accreditation: 'Full',
      },
      {
        name: 'M.Ed Educational Management',
        degree: 'M.Ed',
        duration: '2 years',
        entry: 'B.Ed / PGDE',
        accreditation: 'Full',
      },
      {
        name: 'M.Ed Guidance & Counselling',
        degree: 'M.Ed',
        duration: '2 years',
        entry: 'B.Ed / PGDE',
        accreditation: 'Full',
      },
      {
        name: 'M.Ed Mathematics Education',
        degree: 'M.Ed',
        duration: '2 years',
        entry: 'B.Sc (Ed) / PGDE',
        accreditation: 'Interim',
      },
      {
        name: 'Ph.D Curriculum Studies',
        degree: 'Ph.D',
        duration: '3 years',
        entry: 'M.Ed',
        accreditation: 'Interim',
      },
    ],
    image: {
      src: '/images/faculty-postgraduate.jpg',
      label: 'School of Postgraduate Studies · classroom photo',
    },
  },
];

export function getFaculty(slug: string | null | undefined): Faculty | undefined {
  return faculties.find((f) => f.slug === slug);
}

/** "6 departments", or "12 programmes" for the postgraduate school. */
export function facultyCountLabel(f: Faculty): string {
  if (f.kind === 'School') return `${f.stats.programmes} programmes`;
  const n = f.departments.length;
  return `${n} ${n === 1 ? 'department' : 'departments'}`;
}

export function facultyHref(slug: FacultySlug): string {
  return `/academics/?faculty=${slug}`;
}

/** Department pages don't exist yet. */
export function departmentHref(d: Department): string {
  return comingSoon(d.name);
}

/** Copy for the Academics page header. */
export const academicsPage = {
  title: 'Faculties & Departments',
  lead: 'Explore 6 faculties and schools, 25+ departments and over 40 accredited programmes in teacher education.',
  searchPlaceholder: 'Search programmes, departments or courses…',
  programmesEyebrow: 'Programmes',
  programmesCta: { label: 'Download full list (PDF)', href: comingSoon('Programmes list (PDF)') },
};
