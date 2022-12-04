import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import '@/styles/globals.css';
import { Analytics } from '@/components/analytics';
import Navbar from '@/components/navbar';
import Providers from '@/components/providers';
import { ibmPlexMono, lausanne } from '@/lib/fonts';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    className={clsx(
      ibmPlexMono.variable,
      lausanne.variable,
      'bg-gray-50 font-sans font-light antialiased'
    )}
  >
    <body>
      <Providers>
        <Navbar />
        <div className="prose mx-auto max-w-[30rem] py-24">{children}</div>
      </Providers>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
