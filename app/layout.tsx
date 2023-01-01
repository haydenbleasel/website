import type { FC, ReactNode } from 'react';
import '@/styles/globals.css';
import { SocialProfileJsonLd } from 'next-seo';
import { Analytics } from '@/components/analytics';
import { social } from '@/lib/social';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    className="scroll-smooth antialiased"
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
    <body className="bg-white dark:bg-zinc-900">
      <div className="prose prose-zinc mx-auto px-4 py-12 prose-h2:m-0 prose-p:m-0 dark:prose-invert sm:py-32">
        {children}
      </div>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
