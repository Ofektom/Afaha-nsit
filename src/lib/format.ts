const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function parts(iso: string) {
  const [year = 0, m = 1, d = 1] = iso.split('-').map(Number);
  const month = MONTHS[m - 1];
  if (!month) throw new Error(`Invalid date "${iso}" — use YYYY-MM-DD.`);
  return { year, month, day: String(d).padStart(2, '0') };
}

/** "12 October 2026" */
export function formatDateLong(iso: string): string {
  const { year, month, day } = parts(iso);
  return `${day} ${month} ${year}`;
}

/** "12 Oct 2026" */
export function formatDateShort(iso: string): string {
  const { year, month, day } = parts(iso);
  return `${day} ${month.slice(0, 3)} ${year}`;
}

/** { day: "24", month: "OCT" } for calendar-style date tiles. */
export function dateTile(iso: string): { day: string; month: string } {
  const { month, day } = parts(iso);
  return { day, month: month.slice(0, 3).toUpperCase() };
}
