import { academicsPage, type Faculty } from '@/content/faculties';
import { DepartmentCard } from '@/components/cards/DepartmentCard';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProgrammesTable } from './ProgrammesTable';

/** One faculty: intro with figures and dean, department cards and programme table. */
export function FacultyView({ faculty }: { faculty: Faculty }) {
  const figures = [
    {
      value: faculty.departments.length,
      label: faculty.kind === 'School' ? 'Programme areas' : 'Departments',
    },
    { value: faculty.stats.programmes, label: 'Programmes' },
    { value: faculty.stats.students, label: 'Students' },
  ];

  return (
    <>
      <section aria-labelledby="faculty-title" className="pb-12 pt-10 lg:pt-[72px]">
        <div className="container-x lg:flex lg:items-center lg:gap-12">
          <div className="lg:flex-1">
            <Eyebrow>{faculty.kind}</Eyebrow>
            <h2
              id="faculty-title"
              className="mt-3.5 font-serif text-[32px] font-semibold leading-[1.12] tracking-[-.015em] md:text-[40px] lg:text-[48px]"
            >
              {faculty.name}
            </h2>
            <p className="mt-3.5 max-w-[720px] text-base leading-[1.6] text-muted lg:text-[17px]">
              {faculty.description}
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-11 gap-y-4">
              {figures.map((f) => (
                <div key={f.label} className="flex flex-col-reverse">
                  <dt className="text-sm text-muted">{f.label}</dt>
                  <dd className="font-serif text-[32px] font-semibold leading-[1.25] tracking-[-.01em] text-primary">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 flex items-center gap-5 rounded-panel bg-cream p-5 lg:mt-0 lg:flex-none">
            <ImagePlaceholder
              label="Dean photo"
              src={faculty.dean.photo}
              alt={`${faculty.dean.name}, ${faculty.dean.title}`}
              icon="person"
              className="h-[140px] w-[120px] flex-none rounded-2xl"
              iconClassName="size-7"
              sizes="120px"
            />
            <div className="min-w-0 lg:w-[240px]">
              <p className="text-xs font-bold uppercase tracking-[.1em] text-orange-text">
                {faculty.dean.title}
              </p>
              <p className="mt-1.5 font-serif text-[22px] font-semibold tracking-[-.01em] text-ink">
                {faculty.dean.name}
              </p>
              <a
                href={`mailto:${faculty.dean.email}`}
                className="-mb-3 -mt-1.5 block break-words py-3 text-sm text-muted hover:text-primary"
              >
                {faculty.dean.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="departments-title" className="pb-16 lg:pb-24">
        <div className="container-x">
          <h3
            id="departments-title"
            className="mb-6 font-serif text-[28px] font-semibold tracking-[-.01em] text-ink"
          >
            {faculty.kind === 'School' ? 'Programme areas' : 'Departments'}
          </h3>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {faculty.departments.map((d) => (
              <li key={d.name}>
                <DepartmentCard department={d} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="programmes"
        aria-labelledby="programmes-title"
        className="section-y scroll-mt-[150px] bg-cream"
      >
        <div className="container-x">
          <SectionHeading
            id="programmes-title"
            eyebrow={academicsPage.programmesEyebrow}
            title={faculty.programmesHeading}
            action={
              <ButtonLink href={academicsPage.programmesCta.href} variant="outline-dark">
                {academicsPage.programmesCta.label}
              </ButtonLink>
            }
          />
          <ProgrammesTable rows={faculty.programmes} caption={faculty.programmesHeading} />
        </div>
      </section>
    </>
  );
}
