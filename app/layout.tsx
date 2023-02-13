import type { FC, ReactNode } from 'react';
import '@/styles/globals.css';
import { SocialProfileJsonLd } from 'next-seo';
import { Analytics } from '@/components/analytics';
import { social } from '@/lib/social';
import LinkPreview from '@/components/linkPreview';
import Toaster from '@/components/toaster';
import { serif } from '@/lib/fonts';
import clsx from 'clsx';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    className={clsx(serif.variable, 'scroll-smooth font-serif antialiased')}
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
    <body className="bg-white dark:bg-neutral-900">
      {children}
      <Analytics />
      <LinkPreview />
      <Toaster />
    </body>
  </html>
);

export default RootLayout;
