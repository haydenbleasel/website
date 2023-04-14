import localFont from 'next/font/local';

export const sans = localFont({
  variable: '--font-sans',
  src: [
    {
      path: '../public/fonts/TWKLausanne-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/TWKLausanne-300Italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/TWKLausanne-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/TWKLausanne-600Italic.woff2',
      weight: '600',
      style: 'italic',
    },
  ],
});
