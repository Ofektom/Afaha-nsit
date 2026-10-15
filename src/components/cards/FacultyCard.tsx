import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { facultyCountLabel, facultyHref, type Faculty } from '@/content/faculties';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { cn } from '@/lib/cn';

/** Faculty card for dark sections: photo, department count, name, highlights. */
export function FacultyCard({ faculty, className }: { faculty: Faculty; className?: string }) {
  return (
    <Link
      href={facultyHref(faculty.slug)}
      className={cn(
        'group flex flex-col overflow-hidden rounded-card bg-primary-panel text-white transition duration-200 hover:-translate-y-1',
        className,
      )}
    >
      <ImagePlaceholder
        label={faculty.image.label}
        src={faculty.image.src}
        alt=""
        className="h-[190px] w-full"
        sizes="(min-width: 1025px) 400px, (min-width: 768px) 50vw, 100vw"
      />
      <span className="flex flex-1 flex-col p-[26px]">
        <span className="text-xs font-bold uppercase tracking-eyebrow text-orange">
          {facultyCountLabel(faculty)}
        </span>
        <h3 className="mt-2.5 font-serif text-[22px] font-semibold leading-[1.25] tracking-[-.01em]">
          {faculty.name}
        </h3>
        <span className="mt-2.5 text-sm leading-[1.55] text-tint-300">{faculty.highlights}</span>
        <span className="mt-4 flex items-center gap-2 text-sm font-semibold">
          View departments
          <ArrowRight
            aria-hidden="true"
            className="size-4 text-orange transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </span>
      </span>
    </Link>
  );
}
