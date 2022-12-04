import { IBM_Plex_Mono as createIBMPlex } from '@next/font/google';
import localFont from '@next/font/local';

export const ibmPlexMono = createIBMPlex({
  weight: '400',
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
});

export const lausanne = localFont({
  variable: '--font-lausanne',
  src: [
    {
      path: '../../public/fonts/TWK-Lausanne-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TWK-Lausanne-300Italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/TWK-Lausanne-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TWK-Lausanne-400Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/TWK-Lausanne-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TWK-Lausanne-500Italic.woff2',
      weight: '500',
      style: 'italic',
    },
  ],
});
