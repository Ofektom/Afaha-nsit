import type { Programme } from '@/content/faculties';
import { Chip } from '@/components/ui/Chip';

interface Row extends Programme {
  /** Shown in an extra column when listing programmes from several faculties. */
  faculty?: string;
}

/** Programme table; scrolls sideways on small screens. */
export function ProgrammesTable({ rows, caption }: { rows: Row[]; caption: string }) {
  const showFaculty = rows.some((r) => r.faculty);
  const th = 'px-5 py-4 font-bold lg:px-7';
  const td = 'px-5 py-[21px] lg:px-7';

  return (
    <div className="overflow-x-auto rounded-card border border-line bg-white">
      <table className="w-full min-w-[760px] border-collapse text-left text-[15px] text-muted">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-primary text-[13px] uppercase tracking-[.08em] text-white">
            <th scope="col" className={th}>
              Programme
            </th>
            {showFaculty && (
              <th scope="col" className={th}>
                Faculty
              </th>
            )}
            <th scope="col" className={th}>
              Degree
            </th>
            <th scope="col" className={th}>
              Duration
            </th>
            <th scope="col" className={th}>
              Entry mode
            </th>
            <th scope="col" className={th}>
              Accreditation
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={`${p.faculty ?? ''}${p.name}`} className="even:bg-cream/50">
              <th scope="row" className={`${td} font-semibold text-ink`}>
                {p.name}
              </th>
              {showFaculty && <td className={td}>{p.faculty}</td>}
              <td className={td}>{p.degree}</td>
              <td className={td}>{p.duration}</td>
              <td className={td}>{p.entry}</td>
              <td className={td}>
                <Chip tone={p.accreditation === 'Full' ? 'primary' : 'orange'}>
                  {p.accreditation}
                </Chip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
