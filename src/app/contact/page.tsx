import type { Metadata } from 'next';
import {
  Clock,
  CreditCard,
  FileText,
  GraduationCap,
  Mail,
  Map as MapIcon,
  MapPin,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import { contact } from '@/content/contact';
import { ContactForm } from '@/components/contact/ContactForm';
import { PageHero } from '@/components/ui/PageHero';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: contact.hero.lead,
  path: '/contact/',
});

const officeIcons: Record<(typeof contact.offices)[number]['icon'], LucideIcon> = {
  admissions: GraduationCap,
  registry: FileText,
  bursary: CreditCard,
};

const detailIcons: Record<(typeof contact.details)[number]['icon'], LucideIcon> = {
  campus: MapPin,
  hours: Clock,
  phone: Phone,
};

const tel = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        title={contact.hero.title}
        lead={contact.hero.lead}
      />

      {/* Office cards overlap the bottom of the dark header. */}
      <div className="bg-split-dark">
        <ul className="container-x grid gap-4 md:grid-cols-3 md:gap-6">
          {contact.offices.map((o) => {
            const Icon = officeIcons[o.icon];
            return (
              <li
                key={o.name}
                className="rounded-card border border-line bg-white p-6 shadow-card lg:p-7"
              >
                <span className="flex size-[50px] items-center justify-center rounded-[14px] bg-primary-soft text-primary">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={2} />
                </span>
                <h2 className="mt-4 font-serif text-[22px] font-semibold tracking-[-.01em] text-ink">
                  {o.name}
                </h2>
                <a
                  href={`mailto:${o.email}`}
                  className="mt-1 flex min-h-11 items-center gap-2.5 text-[15px] text-muted hover:text-primary"
                >
                  <Mail aria-hidden="true" className="size-4 flex-none" strokeWidth={2} />
                  {o.email}
                </a>
                <a
                  href={tel(o.phone)}
                  className="flex min-h-11 items-center gap-2.5 text-[15px] text-muted hover:text-primary"
                >
                  <Phone aria-hidden="true" className="size-4 flex-none" strokeWidth={2} />
                  {o.phone}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <section className="container-x py-14 lg:flex lg:items-start lg:gap-12 lg:py-20">
        <div className="lg:flex-1">
          <ContactForm />
        </div>

        <div className="mt-10 flex flex-col gap-5 lg:mt-0 lg:w-[520px] lg:flex-none">
          {contact.mapEmbedUrl ? (
            <iframe
              title="Map of the main campus"
              src={contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[280px] w-full rounded-panel border-0 md:h-[340px]"
            />
          ) : (
            <div
              role="img"
              aria-label="Map placeholder: Google Maps embed"
              className="flex h-[280px] flex-col items-center justify-center gap-2.5 rounded-panel bg-primary-soft text-primary md:h-[340px]"
            >
              <MapIcon aria-hidden="true" className="size-[34px] opacity-85" strokeWidth={2} />
              <span className="text-[11.5px] font-bold uppercase tracking-[.09em]">
                Google Maps embed
              </span>
            </div>
          )}

          <ul className="flex flex-col gap-[18px] rounded-panel bg-primary-dark p-7 text-white">
            {contact.details.map((d) => {
              const Icon = detailIcons[d.icon];
              return (
                <li key={d.label} className="flex items-start gap-3.5">
                  <Icon
                    aria-hidden="true"
                    className="mt-0.5 size-5 flex-none text-orange"
                    strokeWidth={2}
                  />
                  <div>
                    <p className="text-[13px] font-bold uppercase tracking-[.08em] text-orange">
                      {d.label}
                    </p>
                    <p className="mt-1 text-base leading-normal">
                      {d.icon === 'phone' ? (
                        <a href={tel(d.text)} className="hover:underline">
                          {d.text}
                        </a>
                      ) : (
                        d.text
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
