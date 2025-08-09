import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import { Layout } from '@/components/layout';
import '@/styles/tailwind.css';
import type { ReactNode } from 'react';
import { baseUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    template: '%s - Hayden Bleasel',
    default: 'Hayden Bleasel - Software engineer, product designer and founder',
  },
  description:
    "I'm Hayden — a software engineer, product designer and founder from 🇦🇺 Sydney, Australia. I currently live in 🇺🇸 San Francisco, California and work on the DX team at Vercel.",
  alternates: {
    types: {
      'application/rss+xml': new URL('/blog.xml', baseUrl).toString(),
    },
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html className="h-full antialiased" lang="en" suppressHydrationWarning>
    <body className="flex h-full bg-zinc-50 dark:bg-black">
      <Providers>
        <div className="flex w-full">
          <Layout>{children}</Layout>
        </div>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
