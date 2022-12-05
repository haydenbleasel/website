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
              fontWeight: theme('fontWeight.medium'),
              marginBottom: 0,
            },
            h2: {
              fontWeight: theme('fontWeight.medium'),
            },
            p: {
              color: theme('colors.gray.900'),
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
