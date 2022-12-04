import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import '@/styles/globals.css';
import { Analytics } from './components/analytics';
import { ibmPlexMono, lausanne } from '@/lib/fonts';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    className={clsx(
      ibmPlexMono.variable,
      lausanne.variable,
      'bg-neutral-50 font-sans font-light'
    )}
  >
    <body>{children}</body>
    <Analytics />
  </html>
);

export default RootLayout;
