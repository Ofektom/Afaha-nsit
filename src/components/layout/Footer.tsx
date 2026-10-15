import Link from 'next/link';
import { ChevronDown, Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { footerColumns, legalLinks } from '@/content/navigation';
import { site } from '@/content/site';
import { Logo } from '@/components/ui/Logo';
import { SocialIcon } from '@/components/ui/SocialIcon';

const contactRows: Array<{ icon: LucideIcon; text: string; href?: string }> = [
  { icon: MapPin, text: site.contact.campus },
  { icon: Phone, text: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, '')}` },
  { icon: Mail, text: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: Clock, text: site.contact.hours },
];

const linkClass = 'rounded transition-colors hover:text-white';

// On phones the contact links get full-size (44px) tap targets.
function ContactList() {
  return (
    <ul className="space-y-[13px] text-[15px] leading-[1.3] text-tint-100 max-md:space-y-0">
      {contactRows.map(({ icon: Icon, text, href }) => (
        <li key={text} className="flex items-center gap-2.5">
          <Icon aria-hidden="true" className="size-4 flex-none text-orange" strokeWidth={2} />
          {href ? (
            <a
              href={href}
              className={`${linkClass} max-md:inline-flex max-md:min-h-11 max-md:items-center`}
            >
              {text}
            </a>
          ) : (
            <span>{text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function Social() {
  return (
    <ul className="mt-6 flex gap-2.5" aria-label="Social media">
      {site.social.map((s) => (
        <li key={s.name}>
          <Link
            href={s.href}
            aria-label={s.name}
            className="flex size-[38px] items-center justify-center rounded-full border border-tint-700 text-tint-200 transition-colors hover:border-orange hover:text-white max-lg:size-11"
          >
            <SocialIcon name={s.icon} className="size-4" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary-dark text-tint-50">
      <div className="container-x pb-8 pt-9 lg:pt-[72px]">
        {/* Desktop / tablet grid */}
        <div className="hidden gap-12 md:grid md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.25fr]">
          <div className="md:col-span-3 lg:col-span-1">
            <Logo tone="light" crestClassName="size-20" />
            <p className="mt-5 max-w-[300px] text-[15px] leading-[1.6] text-tint-200">
              {site.tagline}
            </p>
            <Social />
          </div>
          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="mb-[18px] text-[13px] font-bold uppercase tracking-eyebrow text-orange">
                {col.heading}
              </h2>
              <ul className="space-y-[13px] text-[15px] leading-[1.3] text-tint-100">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="mb-[18px] text-[13px] font-bold uppercase tracking-eyebrow text-orange">
              Contact
            </h2>
            <ContactList />
          </div>
        </div>

        {/* Mobile accordions */}
        <div className="md:hidden">
          <Logo tone="light" crestClassName="size-16" />
          <div className="mt-5">
            {footerColumns.map((col) => (
              <details key={col.heading} className="group border-b border-tint-800">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-3.5 text-[15px] font-semibold leading-[1.3] text-white [&::-webkit-details-marker]:hidden">
                  {col.heading}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5 text-orange transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={2}
                  />
                </summary>
                <ul className="pb-4 text-[15px] text-tint-100">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="flex min-h-11 items-center hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <details className="group border-b border-tint-800">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-3.5 text-[15px] font-semibold leading-[1.3] text-white [&::-webkit-details-marker]:hidden">
                Contact
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 text-orange transition-transform duration-200 group-open:rotate-180"
                  strokeWidth={2}
                />
              </summary>
              <div className="pb-4 pt-1">
                <ContactList />
              </div>
            </details>
          </div>
          <Social />
        </div>

        <div className="mt-[22px] flex flex-col gap-3 text-xs text-tint-400 md:mt-14 md:border-t md:border-tint-800 md:pt-6 md:text-[13px] lg:flex-row lg:justify-between">
          <p>
            © {site.copyrightYear} {site.name}
            <span className="hidden md:inline">. All rights reserved.</span>
          </p>
          <ul className="flex flex-wrap gap-x-1 max-md:hidden">
            {legalLinks.map((l, i) => (
              <li key={l.label}>
                {i > 0 && <span aria-hidden="true">· </span>}
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
