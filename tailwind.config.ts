import animate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './providers/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: (theme: (key: string) => string) => ({
        DEFAULT: {
          css: {
            letterSpacing: '-0.0125em',
            'h1, h2, h3, h4, h5, h6': {
              fontWeight: theme('fontWeight.semibold'),
              letterSpacing: theme('letterSpacing.tight'),
            },
            '[data-rehype-pretty-code-fragment]': {
              '[data-rehype-pretty-code-title]': {
                borderTopLeftRadius: '0.375rem',
                borderTopRightRadius: '0.375rem',
                paddingTop: '0.5rem',
                paddingRight: '0.75rem',
                paddingBottom: '0.5rem',
                paddingLeft: '0.75rem',
                borderBottom: `1px solid var(--tw-prose-invert-hr)`,
                backgroundColor: 'var(--tw-prose-pre-bg)',
                color: 'var(--tw-prose-pre-code)',
                fontSize: theme('fontSize.sm'),
                fontFamily: theme('fontFamily.mono'),
              },
              pre: {
                marginTop: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              },
            },
          },
        },
      }),
    },
  },
  plugins: [animate, typography],
};

export default config;
