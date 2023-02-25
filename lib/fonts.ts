import localFont from 'next/font/local';

export const serif = localFont({
  variable: '--font-serif',
  src: [
    {
      path: '../public/fonts/Charter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Charter-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Charter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Charter-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
});
