import { IBM_Plex_Mono as createIBMPlex } from '@next/font/google';
import { Inter as createInter } from '@next/font/google';

export const ibmPlexMono = createIBMPlex({
  weight: '400',
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
});

export const inter = createInter({
  variable: '--font-inter',
  subsets: ['latin'],
});
