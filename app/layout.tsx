import './globals.css';
import { CallToAction } from '@/components/cta';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { env } from '@/lib/env';
import { ThemeProvider } from '@/providers/theme';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type RootLayoutProps = {
  children: ReactNode;
};

const name = 'Hayden Bleasel';
const protocol = env.VERCEL_PROJECT_PRODUCTION_URL.includes('localhost')
  ? 'http'
  : 'https';
const siteUrl = new URL(`${protocol}://${env.VERCEL_PROJECT_PRODUCTION_URL}`);

export const metadata: Metadata = {
  applicationName: name,
  authors: [
    {
      name,
      url: siteUrl.toString(),
    },
  ],
  creator: name,
  metadataBase: siteUrl,
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

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
      />
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/css?f%5B%5D=jet-brains-mono@400&amp;display=swap"
      />
    </head>
    <body className="bg-backdrop font-sans antialiased">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <div className="container mx-auto h-[52px] sm:h-16 sm:border-x" />
        <main className="divide-y sm:border-b">
          {children}
          <CallToAction />
        </main>
        <Footer />
      </ThemeProvider>
      <Toaster />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
