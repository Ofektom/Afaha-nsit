/**
 * News articles. Each article gets a page at /news/<slug>/.
 * SAMPLE stories — replace with real University news. Order doesn't matter: lists sort by date.
 */

export const newsCategories = [
  'Announcements',
  'Academics',
  'Events',
  'Research',
  'Student Life',
  'Press Releases',
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export interface NewsArticle {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-10-12". */
  date: string;
  category: NewsCategory;
  excerpt: string;
  /** Article text, one string per paragraph. */
  body: string[];
  image: { src: string; label: string };
}

const img = (slug: string, label: string) => ({ src: `/images/news/${slug}.jpg`, label });

export const news: NewsArticle[] = [
  // Reported by the Akwa Ibom State Government and national press, 5 October 2026.
  {
    slug: 'prof-philip-afaha-pioneer-vice-chancellor',
    title: 'Governor Umo Eno names Prof. Philip Afaha pioneer Vice-Chancellor',
    date: '2026-10-05',
    category: 'Announcements',
    excerpt:
      'The appointment was announced at the World Teachers’ Day celebration in Uyo, as the College of Education, Afaha Nsit, was upgraded to a university.',
    body: [
      'Governor Umo Eno has named Prof. Philip Afaha as the pioneer Vice-Chancellor of the University, following the upgrade of the Akwa Ibom State College of Education, Afaha Nsit, to a university of education.',
      'The announcement was made on Monday, 5 October 2026, at the World Teachers’ Day celebration held at the Uyo Township Stadium.',
      'At the same event, the Governor declared a state of emergency in the education sector, approved the recruitment of an additional 2,000 teachers, and directed the Deputy Governor, Akon Eyakenyi, and the Commissioner for Education, Ubong Umoh, to lead a team that will review the sector and produce a comprehensive reform document.',
      'Addressing teachers, the Governor said: “I want our teachers to work harder and be held accountable in teaching our students.”',
    ],
    image: { src: '/images/vc.jpg', label: 'Vice-Chancellor photo' },
  },
  {
    slug: 'digital-campus-roadmap-2027',
    title: 'University unveils roadmap for a fully digital campus by 2027',
    date: '2026-10-12',
    category: 'Announcements',
    excerpt:
      'The phased programme begins with a new official website, followed by online admissions, course registration, results and Remita-powered fee payments.',
    body: [
      'The University has published its roadmap for a fully digital campus, setting out how students, applicants and staff will move from paper forms and queues to secure online services over the next two academic sessions.',
      'The first phase — the official website you are reading now — brings news, programme information and admissions guidance together in one place. It is followed by the Admissions Portal, which will handle applications, post-UTME screening and admission letters online.',
      'Later phases introduce course registration and results for students, result upload and records for staff, and fee payment through Remita, so that every payment is traceable and no student needs to pay into a personal account.',
      'Speaking at the launch, the Vice-Chancellor said the programme is about service: “Our students should spend their time learning, not standing in queues. Every phase is designed around what they and our staff need most.”',
      'Each portal will be announced on this website and on the University’s official social media channels before it goes live. Applicants and students can also leave their email address on any portal page to be notified at launch.',
    ],
    image: img('digital-campus-roadmap-2027', 'Featured · VC addressing staff & students'),
  },
  {
    slug: 'digital-transformation-portal-ecosystem',
    title: 'University begins digital transformation with new web and portal ecosystem',
    date: '2026-10-12',
    category: 'Announcements',
    excerpt:
      'Management has approved the phased rollout of online admissions, course registration and fee payment portals to improve the student experience.',
    body: [
      'University Management has approved the phased rollout of a new web and portal ecosystem, starting with the official website and followed by online admissions, course registration and fee payment.',
      'The programme is designed to make every key service available online, reduce waiting times at the Registry and Bursary, and give students a single account for their academic records.',
      'The Admissions Portal is the first portal scheduled for launch. Prospective students are encouraged to follow announcements on the website for opening dates.',
    ],
    image: img('digital-transformation-portal-ecosystem', 'News · Convocation / ceremony photo'),
  },
  {
    slug: 'matriculation-ceremony-new-students',
    title: 'Matriculation ceremony for new students',
    date: '2026-10-24',
    category: 'Events',
    excerpt:
      'Newly admitted students will formally join the University at the matriculation ceremony in the Main Auditorium.',
    body: [
      'Newly admitted students for the 2026/2027 session will formally join the University at the matriculation ceremony in the Main Auditorium at 10:00 AM.',
      'Students must complete registration and collect their matriculation gowns from their faculties before the ceremony. Parents and guardians are welcome to attend.',
      'The ceremony will be streamed on the University’s official social media channels for families who cannot be present.',
    ],
    image: img('matriculation-ceremony-new-students', 'Thumbnail'),
  },
  {
    slug: 'teaching-practice-orientation-300-level',
    title: 'Teaching practice orientation for 300 level',
    date: '2026-11-02',
    category: 'Academics',
    excerpt:
      'All 300 level students are expected at the orientation ahead of the teaching practice exercise.',
    body: [
      'All 300 level students are expected to attend the orientation for the coming teaching practice exercise. Attendance is compulsory and will be recorded by each faculty.',
      'The session covers lesson planning, classroom management, professional conduct in host schools and the assessment process used by supervisors.',
      'Students should come with their identity cards and a copy of their course registration form.',
    ],
    image: img('teaching-practice-orientation-300-level', 'Thumbnail'),
  },
  {
    slug: 'senate-approves-academic-calendar',
    title: 'Senate approves 2026/2027 academic calendar',
    date: '2026-10-05',
    category: 'Academics',
    excerpt:
      'Senate has approved the academic calendar for the 2026/2027 session, including registration and examination periods.',
    body: [
      'At its regular meeting, the University Senate approved the academic calendar for the 2026/2027 session.',
      'The calendar sets out the registration window, the start of lectures for both semesters, examination periods and the dates for teaching practice.',
      'Students and staff are advised to plan with the approved calendar, which will be published in full on the Academics pages.',
    ],
    image: img('senate-approves-academic-calendar', 'Academics photo'),
  },
  {
    slug: 'independence-day-lecture',
    title: 'Independence Day lecture on education and national development',
    date: '2026-10-01',
    category: 'Events',
    excerpt:
      'Guest speakers examined the role of teachers in national development at the University’s Independence Day lecture.',
    body: [
      'The University marked Independence Day with a public lecture on education and national development, attended by staff, students and invited guests.',
      'Speakers examined how well-trained teachers drive economic growth, social cohesion and civic participation, and called for sustained investment in teacher education.',
      'The lecture closed with a question-and-answer session led by the Students’ Union.',
    ],
    image: img('independence-day-lecture', 'Events photo'),
  },
  {
    slug: 'science-education-tetfund-grant',
    title: 'Faculty of Science Education wins TETFund research grant',
    date: '2026-09-28',
    category: 'Research',
    excerpt:
      'A team from the Faculty of Science Education has secured a TETFund grant to study practical science teaching in secondary schools.',
    body: [
      'A research team from the Faculty of Science Education has won a TETFund Institution-Based Research grant.',
      'The project will study how practical, laboratory-based teaching affects learning outcomes in secondary school science, working with partner schools across the state.',
      'Findings will feed directly into the Faculty’s teacher-preparation programmes.',
    ],
    image: img('science-education-tetfund-grant', 'Research photo'),
  },
  {
    slug: 'student-union-new-executives',
    title: 'Student Union inaugurates new executives',
    date: '2026-09-22',
    category: 'Student Life',
    excerpt: 'The newly elected Students’ Union executives were sworn in for the new session.',
    body: [
      'The newly elected executives of the Students’ Union Government were sworn in at a ceremony attended by University Management and student leaders.',
      'The new President pledged to work with Management on student welfare, campus safety and the rollout of the new online portals.',
    ],
    image: img('student-union-new-executives', 'Student Life photo'),
  },
  {
    slug: 'staff-resumption-new-session',
    title: 'Notice: Resumption of staff for the new session',
    date: '2026-09-18',
    category: 'Announcements',
    excerpt: 'All academic and non-teaching staff are to resume for the new academic session.',
    body: [
      'All academic and non-teaching staff are hereby notified to resume for the 2026/2027 academic session.',
      'Heads of department are to submit staff resumption returns to the Registry by the end of the first week.',
    ],
    image: img('staff-resumption-new-session', 'Announcements photo'),
  },
  {
    slug: 'teaching-practice-postings-400-level',
    title: 'Teaching practice postings released for 400 level students',
    date: '2026-09-10',
    category: 'Academics',
    excerpt: 'Postings for the teaching practice exercise are now available from each faculty.',
    body: [
      'Teaching practice postings for 400 level students are now available from faculty offices.',
      'Students should report to their host schools on the stated resumption date and submit their acceptance letters to their supervisors within one week.',
    ],
    image: img('teaching-practice-postings-400-level', 'Academics photo'),
  },
  {
    slug: 'press-release-new-website',
    title: 'Press release: University launches new official website',
    date: '2026-09-01',
    category: 'Press Releases',
    excerpt: 'The new website is the first phase of the University’s digital-campus programme.',
    body: [
      'Akwa Ibom State University of Education has launched its new official website, the first phase of its digital-campus programme.',
      'The website brings programme information, admissions guidance and University news into one accessible place, on phones and computers alike.',
    ],
    image: img('press-release-new-website', 'Press photo'),
  },
];

/** Stories featured on the home page and the News page. */
export const homeNews = {
  featured: 'digital-transformation-portal-ecosystem',
  list: [
    'prof-philip-afaha-pioneer-vice-chancellor',
    'matriculation-ceremony-new-students',
    'teaching-practice-orientation-300-level',
  ],
};

export const newsPage = {
  title: 'News & Events',
  lead: 'Official announcements, academic updates, achievements and upcoming events from across the University.',
  featured: 'prof-philip-afaha-pioneer-vice-chancellor',
  perPage: 6,
  newsletter: {
    title: 'Never miss an announcement',
    text: 'Get official University news and admission updates straight to your inbox.',
    placeholder: 'Your email address',
    button: 'Subscribe',
  },
};

export function getArticle(slug: string): NewsArticle | undefined {
  return news.find((a) => a.slug === slug);
}

export function articleHref(slug: string): string {
  return `/news/${slug}/`;
}

/** Newest first. */
export function sortedNews(list: NewsArticle[] = news): NewsArticle[] {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

/** About 200 words a minute, at least 1. */
export function readingMinutes(a: NewsArticle): number {
  const words = a.body.join(' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
