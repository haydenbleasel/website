/* eslint-disable id-length */
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: 'class',
  content: ['./{app,components}/**/*.{ts,tsx}'],
  theme: {
    extend: {
      typography: (theme: (str: string) => string) => ({
        DEFAULT: {
          css: {
            maxWidth: '31.25rem',
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
            textRendering: 'geometricPrecision',
            p: {
              lineHeight: '154%',
            },
            h1: {
              color: theme('colors.neutral.950'),
              margin: 0,
              fontFamily: theme('fontFamily.serif'),
              fontStyle: 'italic',
              fontWeight: theme('fontWeight.normal'),
            },
            h2: {
              marginTop: 0,
              color: theme('colors.neutral.500'),
              fontSize: theme('fontSize.base'),
              fontWeight: theme('fontWeight.normal'),
            },
            small: {
              color: theme('colors.neutral.500'),
              fontSize: theme('fontSize.xs'),
              fontWeight: theme('fontWeight.normal'),
            },
            sup: {
              color: theme('colors.neutral.500'),
              fontSize: theme('fontSize.xs'),
              fontWeight: theme('fontWeight.normal'),
            },
            ol: {
              marginBottom: 0,
            },
          },
        },
        invert: {
          css: {
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
