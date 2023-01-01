import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import '@/styles/globals.css';
import { SocialProfileJsonLd } from 'next-seo';
import { Analytics } from '@/components/analytics';
import { ibmPlexMono } from '@/lib/fonts';
import { social } from '@/lib/social';
import ThemeSwitcher from '@/components/themeSwitcher';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    className={clsx(ibmPlexMono.variable, 'scroll-smooth antialiased')}
  >
    <head>
      <SocialProfileJsonLd
        useAppDir
        type="Person"
        name="Hayden Bleasel"
        url={process.env.NEXT_PUBLIC_SITE_URL ?? ''}
        sameAs={Object.values(social).map(({ url }) => url)}
      />
    </head>
    <body className="prose prose-zinc mx-auto bg-white px-4 py-12 pb-16 dark:bg-zinc-900 dark:prose-invert sm:pb-32 sm:pt-24">
      {children}
      <Analytics />
      <ThemeSwitcher />
    </body>
  </html>
);

export default RootLayout;
