/* eslint-disable id-length */
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';
import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

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
              '&:focus': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${theme('colors.neutral.400')}`,
                textDecoration: 'none',
                borderRadius: theme('borderRadius.sm'),
              },
            },
            h1: {
              color: theme('colors.neutral.950'),
              margin: 0,
              fontWeight: theme('fontWeight.light'),
              fontFamily: [theme('fontFamily.serif')],
              fontSize: '2rem',
              fontStyle: 'italic',
              '@screen sm': {
                fontSize: '2.625rem',
              },
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
              transition: 'color 0.2s ease-in-out',
            },
          },
        },
        invert: {
          css: {
            a: {
              textDecorationColor: theme('colors.neutral.600'),
              '&:hover': {
                textDecorationColor: 'inherit',
              },
              '&:focus': {
                boxShadow: `0 0 0 2px ${theme('colors.neutral.500')}`,
              },
            },
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
