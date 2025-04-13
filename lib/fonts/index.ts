import local from 'next/font/local';

export const sans = local({
  src: [
    {
      path: './soehne-buch.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './soehne-buch-kursiv.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './soehne-kraftig.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './soehne-kraftig-kursiv.woff2',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-sans',
});

export const mono = local({
  src: [
    {
      path: './soehne-mono-buch.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './soehne-mono-buch-kursiv.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-mono',
});
