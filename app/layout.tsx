import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import '@/styles/globals.css';
import { Analytics } from '@/components/analytics';
import Navbar from '@/components/navbar';
import Providers from '@/components/providers';
import { ibmPlexMono, lausanne } from '@/lib/fonts';
import CommandBar from '@/components/command-bar';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    className={clsx(
      ibmPlexMono.variable,
      lausanne.variable,
      'scroll-smooth font-sans font-light antialiased'
    )}
  >
    <body className="overflow-x-hidden bg-white dark:bg-zinc-900">
      <Providers>
        <Navbar />
        <div className="w-full overflow-x-hidden">
          <div className="prose mx-auto px-4 pt-24 pb-32 dark:prose-invert">
            {children}
          </div>
        </div>
      </Providers>
      <CommandBar />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
