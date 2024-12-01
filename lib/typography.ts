export const typographyConfig = (theme: (path: string) => string) => ({
  DEFAULT: {
    css: {
      'h1, h2, h3, h4, h5, h6': {
        letterSpacing: theme('letterSpacing.tight'),
      },
      pre: {
        backgroundColor: 'transparent',
        padding: theme('spacing.4'),
        margin: 0,
        fontSize: theme('fontSize.sm'),
      },
    },
  },
  invert: {
    css: {},
  },
});
