import type { Config } from 'tailwindcss';
import { backgrounds, palette, shadows } from './src/theme/colors';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      // ≤1024px is "mobile/tablet" per the spec; page layouts go multi-column above it.
      lg: '1025px',
      xl: '1280px',
      // Header: drawer below xl; crest-only logo below `wide`; full 1440 design at 2xl.
      wide: '1360px',
      '2xl': '1440px',
    },
    extend: {
      // All colours, gradients and shadows come from src/theme/colors.ts.
      colors: palette,
      backgroundImage: backgrounds,
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        input: '12px',
        card: '20px',
        panel: '24px',
        'panel-lg': '28px',
      },
      boxShadow: shadows,
      maxWidth: {
        container: '1440px',
      },
      spacing: {
        gutter: '80px',
      },
      letterSpacing: {
        eyebrow: '.12em',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 180ms ease-out',
        'slide-down': 'slide-down 180ms ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
