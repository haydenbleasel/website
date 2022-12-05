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
      'font-sans font-light antialiased'
    )}
  >
    <body className="overflow-x-hidden">
      <Providers>
        <Navbar />
        <div className="w-full overflow-x-hidden">
          <div className="prose mx-auto px-4 pt-24 pb-32">{children}</div>
        </div>
      </Providers>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
