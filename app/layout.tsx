import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import '@/styles/globals.css';
import { ibmPlexMono, inter } from '@/lib/fonts';
import { Analytics } from './components/analytics';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    className={clsx(
      ibmPlexMono.variable,
      inter.variable,
      'bg-neutral-50 font-sans font-light'
    )}
  >
    <body>{children}</body>
    <Analytics />
  </html>
);

export default RootLayout;
