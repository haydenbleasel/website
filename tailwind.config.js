const lineClamp = require('@tailwindcss/line-clamp');
const typography = require('@tailwindcss/typography');
const animationDelay = require('tailwindcss-animation-delay');

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
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              maxWidth: 'none',
              pre: {
                fontSize: theme('fontSize.sm'),
                margin: 0,
                padding: theme('padding.5'),
                overflow: 'auto',
                borderRadius: theme('borderRadius.sm'),
                backgroundColor: theme('colors.gray.900'),
              },
              code: {
                borderRadius: theme('borderRadius.sm'),
                color: theme('colors.gray.600'),
                backgroundColor: theme('colors.gray.50'),
              },
              'code::before': {
                content: '',
              },
              'code::after': {
                content: '',
              },
              a: {
                color: theme('colors.gray.600'),
                textDecoration: 'none',
                '&:hover': {
                  color: theme('colors.gray.700'),
                },
              },
            },
          ],
        },
        dark: {
          css: [
            {
              pre: {
                backgroundColor: theme('colors.gray.800'),
              },
            },
          ],
        },
      }),
    },
  },
  plugins: [lineClamp, typography, animationDelay],
};
