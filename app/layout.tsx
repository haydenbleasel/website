import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';
import './globals.css';
import { siteUrl } from '@/lib/consts';

type RootLayoutProps = {
  readonly children: ReactNode;
};

export const metadata: Metadata = {
  applicationName: 'Hayden Bleasel',
  authors: [
    {
      name: 'Hayden Bleasel',
      url: siteUrl,
    },
  ],
  creator: 'Hayden Bleasel',
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
    siteName: 'Hayden Bleasel',
    locale: 'en_US',
  },
  publisher: 'Hayden Bleasel',
  twitter: {
    card: 'summary_large_image',
    creator: '@haydenbleasel',
  },
};

export const runtime = 'edge';

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
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
