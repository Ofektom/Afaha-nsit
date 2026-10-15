import { home } from '@/content/home';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { SectionHeading } from '@/components/ui/SectionHeading';

const copy = home.campusLife;

/** Photo gallery: one large photo and a 2×2 grid. Not shown on phones (as in the mobile design). */
export function CampusLifeSection() {
  const [main, ...rest] = copy.images;
  if (!main) return null;

  return (
    <section aria-labelledby="home-campus" className="section-y bg-cream max-md:hidden">
      <div className="container-x">
        <SectionHeading
          id="home-campus"
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
        />
        <div className="flex flex-col gap-5 lg:flex-row">
          <ImagePlaceholder
            label={main.label}
            src={main.src}
            className="h-[460px] rounded-card lg:w-[620px] lg:flex-none"
            sizes="(min-width: 1025px) 620px, 100vw"
          />
          <div className="grid flex-1 grid-cols-2 gap-5">
            {rest.map((img) => (
              <ImagePlaceholder
                key={img.label}
                label={img.label}
                src={img.src}
                className="h-[220px] rounded-card"
                sizes="(min-width: 1025px) 320px, 50vw"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
