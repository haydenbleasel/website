import { Navbar } from '@/components/navbar';
import { siteUrl } from '@/lib/consts';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const name = 'Hayden Bleasel';

export const metadata: Metadata = {
  applicationName: name,
  authors: [
    {
      name,
      url: siteUrl,
    },
  ],
  creator: name,
  metadataBase: new URL(siteUrl),
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
  openGraph: {
    type: 'website',
    siteName: name,
    locale: 'en_US',
  },
  publisher: name,
  twitter: {
    card: 'summary_large_image',
    creator: '@haydenbleasel',
  },
};

export const runtime = 'edge';

const RootLayout: FC<RootLayoutProperties> = ({ children }) => (
  <html lang="en">
    <body
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        'bg-white dark:bg-neutral-950 font-sans'
      )}
    >
      {children}
      <Navbar />
      <Toaster />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
