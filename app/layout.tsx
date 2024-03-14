import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import './globals.css';
import type { FC, ReactNode } from 'react';
import { Toaster } from 'sonner';

type RootLayoutProps = {
  readonly children: ReactNode;
};

const siteUrl = process.env.SITE_URL;

if (!siteUrl) {
  throw new Error('Missing SITE_URL');
}

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
    </body>
  </html>
);

export default RootLayout;
