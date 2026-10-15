import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/content/site';
import { utilityLinkEnd, utilityLinks } from '@/content/navigation';

const linkClass = 'rounded transition-colors hover:text-white';

/** Dark 42px bar above the main nav (desktop only). */
export function UtilityBar() {
  return (
    <div className="hidden bg-primary-dark text-[13px] text-tint-50 xl:block">
      <div className="container-x flex h-[42px] items-center justify-between gap-6">
        <ul className="flex items-center gap-[26px]" aria-label="Contact">
          <li>
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
              className={`flex items-center gap-2 ${linkClass}`}
            >
              <Phone aria-hidden="true" className="size-3.5 text-tint-200" strokeWidth={2} />
              {site.contact.phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.contact.email}`}
              className={`flex items-center gap-2 ${linkClass}`}
            >
              <Mail aria-hidden="true" className="size-3.5 text-tint-200" strokeWidth={2} />
              {site.contact.email}
            </a>
          </li>
          <li className="hidden items-center gap-2 xl:flex">
            <MapPin aria-hidden="true" className="size-3.5 text-tint-200" strokeWidth={2} />
            {site.contact.location}
          </li>
        </ul>
        <nav aria-label="Quick links">
          <ul className="flex items-center gap-[26px] font-medium">
            {utilityLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li aria-hidden="true" className="h-3.5 w-px bg-tint-700" />
            <li>
              <Link href={utilityLinkEnd.href} className={linkClass}>
                {utilityLinkEnd.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
