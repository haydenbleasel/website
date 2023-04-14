/* eslint-disable id-length */
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class',
  content: ['./{app,components}/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme: (str: string) => string) => ({
        DEFAULT: {
          css: {
            maxWidth: '31.25rem',
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
            textRendering: 'geometricPrecision',
            fontWeight: theme('fontWeight.light'),
            color: theme('colors.neutral.950'),
            p: {
              lineHeight: '160%',
            },
            a: {
              fontWeight: theme('fontWeight.light'),
              color: 'inherit',
            },
            h1: {
              color: theme('colors.neutral.950'),
              margin: 0,
              fontWeight: theme('fontWeight.semibold'),
            },
            h2: {
              marginTop: 0,
              color: theme('colors.neutral.500'),
              fontSize: theme('fontSize.base'),
              fontWeight: theme('fontWeight.light'),
            },
            small: {
              color: theme('colors.neutral.500'),
              fontSize: theme('fontSize.xs'),
              fontWeight: theme('fontWeight.light'),
            },
            sup: {
              color: theme('colors.neutral.500'),
              fontSize: theme('fontSize.xs'),
              fontWeight: theme('fontWeight.light'),
            },
            ol: {
              marginBottom: 0,
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.white'),
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.neutral.400'),
            },
            small: {
              color: theme('colors.neutral.400'),
            },
            sup: {
              color: theme('colors.neutral.400'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography, animate],
};

export default config;
