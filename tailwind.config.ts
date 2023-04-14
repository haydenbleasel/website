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
        serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme: (str: string) => string) => ({
        DEFAULT: {
          css: {
            maxWidth: '31.25rem',
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
            textRendering: 'optimizeLegibility',
            fontWeight: theme('fontWeight.light'),
            p: {
              lineHeight: '160%',
              transition: 'color 0.2s ease-in-out',
            },
            a: {
              fontWeight: theme('fontWeight.light'),
              textDecorationColor: theme('colors.neutral.300'),
              textDecorationThickness: '1px',
              textUnderlineOffset: '2.5px',
              transition: 'text-decoration-color 0.2s ease-in-out',
              '&:hover': {
                textDecorationColor: 'inherit',
              },
            },
            h1: {
              color: theme('colors.neutral.950'),
              margin: 0,
              fontWeight: theme('fontWeight.light'),
              fontFamily: [theme('fontFamily.serif')],
              fontSize: '2.625rem',
              fontStyle: 'italic',
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
            li: {
              lineHeight: '160%',
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
