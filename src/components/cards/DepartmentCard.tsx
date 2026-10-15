import Link from 'next/link';
import { ArrowRight, BookOpen, UserRound } from 'lucide-react';
import { departmentHref, type Department } from '@/content/faculties';
import { Chip } from '@/components/ui/Chip';

/** Department card: icon, name, short description, degree chips and head of department. */
export function DepartmentCard({ department }: { department: Department }) {
  return (
    <Link
      href={departmentHref(department)}
      className="group flex h-full flex-col gap-3.5 rounded-card border border-line bg-white p-7 transition duration-200 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <span className="flex items-center justify-between">
        <span className="flex size-[50px] items-center justify-center rounded-[14px] bg-primary-soft text-primary">
          <BookOpen aria-hidden="true" className="size-6" strokeWidth={2} />
        </span>
        <ArrowRight
          aria-hidden="true"
          className="size-5 text-orange transition-transform group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      </span>
      <h3 className="font-serif text-[21px] font-semibold leading-[1.25] tracking-[-.01em] text-ink">
        {department.name}
      </h3>
      <p className="flex-1 text-[15px] leading-[1.55] text-muted">{department.description}</p>
      <span className="flex flex-wrap gap-2">
        {department.degrees.map((d) => (
          <Chip key={d}>{d}</Chip>
        ))}
      </span>
      <span className="flex items-center gap-2.5 border-t border-line pt-3.5 text-sm font-medium text-muted">
        <UserRound aria-hidden="true" className="size-4" strokeWidth={2} />
        {department.hod}
      </span>
    </Link>
  );
}
