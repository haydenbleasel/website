import localFont from 'next/font/local';
import { Newsreader as createSerif } from 'next/font/google';

export const serif = createSerif({
  variable: '--font-serif',
  weight: '400',
  subsets: ['latin'],
  style: 'italic',
});

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
