/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.tsx',
    './components/**/*.tsx',
    './content/**/*.mdx',
    './contentlayer.config.js',
  ],
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
            pre: {
              borderRadius: theme('rounded.md'),
              display: 'grid',
              backgroundColor: theme('colors.zinc.800'),
              paddingTop: theme('spacing.4'),
              paddingBottom: theme('spacing.4'),
              paddingLeft: 0,
              paddingRight: 0,
              '& > code': {
                display: 'grid',
                minWidth: '100%',
                overflowWrap: 'break-word',
                padding: 0,
                '& > span': {
                  paddingLeft: theme('spacing.4'),
                  paddingRight: theme('spacing.4'),
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@thoughtbot/tailwindcss-aria-attributes'),
  ],
};
