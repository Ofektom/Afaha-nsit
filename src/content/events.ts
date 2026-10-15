/**
 * Upcoming events, soonest first. SAMPLE events — replace with the official calendar.
 */

export interface UniversityEvent {
  title: string;
  /** ISO date, e.g. "2026-10-24". */
  date: string;
  venue: string;
  time: string;
}

export const events: UniversityEvent[] = [
  {
    title: 'Matriculation Ceremony',
    date: '2026-10-24',
    venue: 'Main Auditorium',
    time: '10:00 AM',
  },
  {
    title: 'Inaugural Lecture Series',
    date: '2026-11-15',
    venue: 'Senate Chamber',
    time: '2:00 PM',
  },
];
