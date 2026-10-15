/**
 * The site's colour palette — the single place to change brand colours.
 *
 * Tailwind reads this file (tailwind.config.ts), so components use class names such as
 * `bg-primary`, `text-orange-text`, `bg-hero-desktop` or `shadow-card`, never raw hex values.
 * The few places that need a raw value (browser theme colour…) import `palette` from here.
 *
 * Primary is the royal blue of the University crest ("AFAHA NSIT" band); the accent is amber.
 * Text on orange fills is primary-dark, never white.
 */

export const palette = {
  primary: {
    DEFAULT: '#1F55A8', // crest blue; white text on it is 7.2:1
    hover: '#194789',
    dark: '#0B1F44', // hero, footer, utility bar, dark sections
    panel: '#122B5C', // cards on primary-dark sections
    glow: '#1A3F80', // centre of the glow on coming-soon pages
    soft: '#E8EFFA', // icon tiles, hovers, chips, active nav pill
    'soft-hover': '#D5E1F5',
  },
  orange: {
    DEFAULT: '#F7A21B',
    hover: '#F9B13F', // lighter, so dark text keeps its contrast
    soft: '#FEF1D6', // badges, notice bars
    text: '#9A5600', // orange text on light backgrounds (5.7:1 on white)
    ring: '#C97A00', // focus outlines: 3:1+ on white and on primary-dark
    deep: '#6B3B00', // text on orange-soft notice bars
  },
  'badge-text': '#8A4B00',
  success: { DEFAULT: '#2E9E6E', light: '#7FD6AE' }, // "Live" status on dark backgrounds
  ink: '#111C2E', // body text
  muted: '#57627A', // secondary text
  line: '#DCE2EC', // borders, dividers
  cream: '#F8F5EE', // alternate section background
  placeholder: '#8A95AA', // form placeholder text
  // Light text and rules on primary-dark surfaces.
  tint: {
    50: '#DCE4F2',
    100: '#CDD8EC',
    200: '#C2CFE6',
    300: '#A9B9D8',
    400: '#8FA2C8',
    700: '#2A4675',
    800: '#1C3563',
  },
  // Photo placeholder gradient (until real photos are added).
  photo: { from: '#DCE6F6', via: '#ADC3E8', to: '#8CA9DC' },
} as const;

/** A palette colour with transparency, e.g. alpha(palette.primary.dark, 0.5). */
export function alpha(hex: string, opacity: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${opacity})`;
}

const { primary, orange, photo } = palette;

/** Background images, available as `bg-<name>` classes. */
export const backgrounds = {
  // Dark overlay over the home hero photo: left-to-right on desktop, bottom-up on mobile.
  'hero-desktop': `linear-gradient(90deg, ${alpha(primary.dark, 0.96)} 0%, ${alpha(primary.dark, 0.82)} 45%, ${alpha(primary.dark, 0.25)} 100%)`,
  'hero-mobile': `linear-gradient(180deg, ${alpha(primary.dark, 0.1)} 0%, ${alpha(primary.dark, 0.85)} 42%, ${primary.dark} 100%)`,
  'photo-placeholder': `linear-gradient(135deg, ${photo.from} 0%, ${photo.via} 55%, ${photo.to} 100%)`,
  'coming-soon': `radial-gradient(ellipse at 50% 30%, ${primary.glow} 0%, ${primary.dark} 70%)`,
  // Top half dark, bottom half white (contact office cards overlapping the header).
  'split-dark': `linear-gradient(180deg, ${primary.dark} 50%, #fff 50%)`,
};

/** Shadows, available as `shadow-<name>` classes. */
export const shadows = {
  dropdown: `0 24px 48px ${alpha(primary.dark, 0.22)}`,
  header: `0 6px 24px ${alpha(primary.dark, 0.08)}`,
  card: `0 16px 40px ${alpha(primary.dark, 0.1)}`,
  'card-hover': `0 18px 36px ${alpha(primary.dark, 0.1)}`,
  'orange-card': `0 16px 32px ${alpha(orange.DEFAULT, 0.3)}`,
  'orange-glow': `0 0 0 4px ${alpha(orange.DEFAULT, 0.3)}`,
  // Current nav item: 3px orange underline.
  underline: `inset 0 -3px 0 ${orange.DEFAULT}`,
};
