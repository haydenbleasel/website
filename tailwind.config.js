const lineClamp = require('@tailwindcss/line-clamp');
const typography = require('@tailwindcss/typography');
const animationDelay = require('tailwindcss-animation-delay');
const ariaAttributes = require('@thoughtbot/tailwindcss-aria-attributes');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './templates/**/*.{js,ts,jsx,tsx}',
    './slices/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      text: [
        'TWK Lausanne',
        'Inter',
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'Liberation Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      serif: [
        'Newsreader',
        'ui-serif',
        'Georgia',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif',
      ],
      mono: [
        'IBM Plex Mono',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
    fontSize: {
      xs: ['0.75rem', '1.75'],
      sm: ['0.875rem', '1.75'],
      md: ['1rem', '1.75'],
      lg: ['1.125rem', '1.75'],
      xl: ['1.25rem', '1.75'],
    },
    fontWeight: {
      normal: 300,
      medium: 400,
      semibold: 500,
    },
    extend: {
      colors: {
        gold: '#DC6803',
      },
      animation: {
        enter: 'enter 0.6s forwards',
        burst: 'burst 0.6s forwards',
        'enter-burst': 'enter 0.6s forwards, burst 0.6s forwards',
      },
      keyframes: {
        enter: {
          '0%': {
            opacity: 0,
            transform: 'translateY(0.5rem)',
          },
          to: {
            opacity: 1,
            transform: 'none',
          },
        },
        burst: {
          '0%': { opacity: 0, filter: 'brightness(1) blur(20px)' },
          '10%': { opacity: 1, filter: 'brightness(2) blur(10px)' },
          '100%': { opacity: 1, filter: 'brightness(1) blur(0)' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: '42rem',
            fontWeight: theme('fontWeight.normal'),
            pre: {
              fontSize: theme('fontSize.sm'),
              margin: 0,
              padding: theme('padding.5'),
              overflow: 'auto',
              borderRadius: theme('borderRadius.sm'),
              backgroundColor: theme('colors.neutral.900'),
            },
            code: {
              borderRadius: theme('borderRadius.sm'),
              color: theme('colors.neutral.600'),
              backgroundColor: theme('colors.neutral.50'),
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
            h1: {
              fontWeight: theme('fontWeight.semibold'),
            },
            h2: {
              fontWeight: theme('fontWeight.semibold'),
            },
            h3: {
              fontWeight: theme('fontWeight.semibold'),
            },
            h4: {
              fontWeight: theme('fontWeight.semibold'),
            },
            h5: {
              fontWeight: theme('fontWeight.semibold'),
            },
            h6: {
              fontWeight: theme('fontWeight.semibold'),
            },
            strong: {
              fontWeight: theme('fontWeight.semibold'),
            },
            p: {
              fontWeight: theme('fontWeight.normal'),
            },
            em: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontSize: '17px',
              fontWeight: theme('fontWeight.medium'),
            },
            a: {
              textDecoration: 'underline',
              fontWeight: theme('fontWeight.normal'),
              color: theme('colors.neutral.900'),
              '&:hover': {
                color: theme('colors.neutral.800'),
              },
            },
          },
        },
        invert: {
          css: {
            pre: {
              backgroundColor: theme('colors.neutral.800'),
            },
            a: {
              color: theme('colors.white'),
              '&:hover': {
                color: theme('colors.neutral.100'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [lineClamp, typography, animationDelay, ariaAttributes],
};
