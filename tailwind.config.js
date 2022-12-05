/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
            // color: theme('colors.zinc.900'),
            h1: {
              fontWeight: theme('fontWeight.medium'),
              marginBottom: 0,
            },
            h2: {
              fontWeight: theme('fontWeight.medium'),
            },
            h3: {
              fontWeight: theme('fontWeight.medium'),
            },
            h4: {
              fontWeight: theme('fontWeight.medium'),
            },
            h5: {
              fontWeight: theme('fontWeight.medium'),
            },
            h6: {
              fontWeight: theme('fontWeight.medium'),
            },
            // a: {
            //   color: theme('colors.zinc.900'),
            //   '&:hover': {
            //     color: theme('colors.zinc.800'),
            //   },
            // },
            strong: {
              fontWeight: theme('fontWeight.medium'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@thoughtbot/tailwindcss-aria-attributes'),
  ],
};
