import type { Metadata, Viewport } from 'next';
import { preconnect } from 'react-dom';
import localFont from 'next/font/local';
import { DemoBanner } from '@/components/layout/DemoBanner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UtilityBar } from '@/components/layout/UtilityBar';
import { site } from '@/content/site';
import { shareImages } from '@/lib/metadata';
import { palette } from '@/theme/colors';
import './globals.css';

// Self-hosted via next/font (same files the designs were rendered with), so builds
// don't depend on reaching Google Fonts. Preloaded, with size-adjusted fallbacks: no layout shift.
const fraunces = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/fraunces/files/fraunces-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/fraunces/files/fraunces-latin-400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../node_modules/@fontsource/fraunces/files/fraunces-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/fraunces/files/fraunces-latin-600-italic.woff2',
      weight: '600',
      style: 'italic',
    },
  ],
  display: 'optional',
  variable: '--font-fraunces',
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

const dmSans = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'optional',
  variable: '--font-dm-sans',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: '/',
    locale: 'en_NG',
    images: shareImages,
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description },
};

export const viewport: Viewport = {
  themeColor: palette.primary.DEFAULT,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Start the connection to Cloudinary early when images are served from there.
  if (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) preconnect('https://res.cloudinary.com');

  return (
    <html lang="en-NG" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-orange px-5 py-3 font-semibold text-primary-dark focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <DemoBanner />
        <UtilityBar />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
