import { home } from '@/content/home';
import { portals } from '@/content/portals';
import { PortalCard } from '@/components/cards/PortalCard';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

const copy = home.portals;
const featured = portals.filter((p) => p.featuredOnHome);

export function PortalsSection() {
  return (
    <section aria-labelledby="home-portals" className="section-y bg-cream">
      <div className="container-x">
        <SectionHeading
          id="home-portals"
          eyebrow={copy.eyebrow}
          title={
            <>
              <span className="md:hidden">{copy.mobileTitle}</span>
              <span className="max-md:hidden">{copy.title}</span>
            </>
          }
          lead={copy.lead}
          leadClassName="max-md:hidden"
          action={
            <ButtonLink href={copy.cta.href} variant="outline-dark">
              {copy.cta.label}
            </ButtonLink>
          }
          actionClassName="max-md:hidden"
          spacing="mb-7 md:mb-8 lg:mb-12"
        />

        <ul className="flex flex-col gap-3 md:hidden">
          {featured.map((p) => (
            <li key={p.slug}>
              <PortalCard portal={p} layout="row" />
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-2 gap-6 max-md:hidden lg:grid-cols-4">
          {featured.map((p) => (
            <li key={p.slug} className="flex">
              <PortalCard portal={p} className="flex-1" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
