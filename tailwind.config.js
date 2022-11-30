/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx', './components/**/*.tsx', './content/**/*.mdx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-suisse-intl)'],
        mono: ['var(--font-ibm-plex-mono)'],
      },
    },
  },
  plugins: [],
};
