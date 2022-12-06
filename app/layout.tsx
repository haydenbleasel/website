import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import '@/styles/globals.css';
import { NextSeo, SocialProfileJsonLd } from 'next-seo';
import { Analytics } from '@/components/analytics';
import Navbar from '@/components/navbar';
import Providers from '@/components/providers';
import { ibmPlexMono, lausanne } from '@/lib/fonts';
import CommandBar from '@/components/command-bar';
import { social } from '@/lib/social';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    className={clsx(
      ibmPlexMono.variable,
      lausanne.variable,
      'scroll-smooth font-sans font-light antialiased'
    )}
  >
    {/* <head>
      <NextSeo
        useAppDir
        titleTemplate="%s — Hayden Bleasel"
        openGraph={{
          site_name: 'Hayden Bleasel',
          type: 'profile',
          profile: {
            firstName: 'Hayden',
            lastName: 'Bleasel',
            username: 'haydenbleasel',
            gender: 'male',
          },
        }}
        twitter={{
          handle: '@haydenbleasel',
          site: '@haydenbleasel',
          cardType: 'summary_large_image',
        }}
      />

      <SocialProfileJsonLd
        type="Person"
        name="Hayden Bleasel"
        url={process.env.NEXT_PUBLIC_SITE_URL ?? ''}
        sameAs={Object.values(social).map(({ url }) => url)}
      />
    </head> */}
    <body className="overflow-x-hidden bg-white dark:bg-zinc-900">
      <Providers>
        <Navbar />
        <div className="w-full overflow-x-hidden">
          <div className="prose prose-zinc mx-auto px-4 pt-24 pb-32 dark:prose-invert">
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
