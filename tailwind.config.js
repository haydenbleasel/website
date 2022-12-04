/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx', './components/**/*.tsx', './content/**/*.mdx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lausanne)'],
        mono: ['var(--font-ibm-plex-mono)'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: theme('fontSize.base'),
              fontWeight: theme('fontWeight.medium'),
            },
            h2: {
              fontSize: theme('fontSize.base'),
              fontWeight: theme('fontWeight.light'),
              margin: 0,
              color: theme('colors.gray.500'),
            },
            p: {
              color: theme('colors.gray.900'),
              margin: 0,
            },
            a: {
              color: theme('colors.gray.900'),
              '&:hover': {
                color: theme('colors.gray.800'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
