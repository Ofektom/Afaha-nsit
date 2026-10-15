import type { UniversityEvent } from '@/content/events';
import { dateTile } from '@/lib/format';

/** Event with a calendar-style date tile. */
export function EventItem({ event }: { event: UniversityEvent }) {
  const { day, month } = dateTile(event.date);
  return (
    <li className="flex items-center gap-4">
      <time
        dateTime={event.date}
        className="flex min-w-[62px] flex-col items-center rounded-input bg-primary-dark px-3.5 py-2.5 text-white"
      >
        <span className="font-serif text-[22px] font-semibold leading-[1.2]">{day}</span>
        <span className="text-[11px] font-bold tracking-[.1em] text-orange">{month}</span>
      </time>
      <div>
        <p className="text-base font-bold text-ink">{event.title}</p>
        <p className="mt-1 text-sm text-muted">
          {event.venue} · {event.time}
        </p>
      </div>
    </li>
  );
}
